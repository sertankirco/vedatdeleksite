import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
  const { language } = useLanguage();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    nameTr: "",
    nameEn: "",
    nameEl: "",
    descriptionTr: "",
    descriptionEn: "",
    descriptionEl: "",
    price: "",
    etsyUrl: "",
    imageUrl: "",
  });

  const { data: products, isLoading, refetch } = trpc.products.list.useQuery();

  const createMutation = trpc.products.create.useMutation({
    onSuccess: () => {
      toast.success("Ürün eklendi!");
      setFormData({
        nameTr: "",
        nameEn: "",
        nameEl: "",
        descriptionTr: "",
        descriptionEn: "",
        descriptionEl: "",
        price: "",
        etsyUrl: "",
        imageUrl: "",
      });
      setIsCreating(false);
      refetch();
    },
    onError: () => toast.error("Hata oluştu"),
  });

  const deleteMutation = trpc.products.delete.useMutation({
    onSuccess: () => {
      toast.success("Ürün silindi!");
      refetch();
    },
    onError: () => toast.error("Silme hatası"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameTr || !formData.nameEn || !formData.nameEl || !formData.price) {
      toast.error("Tüm dillerde ad ve fiyat gerekli!");
      return;
    }
    if (!formData.etsyUrl) {
      toast.error("Lütfen bir satın alma linki girin!");
      return;
    }
    if (!formData.etsyUrl.includes("http")) {
      toast.error("Geçerli bir URL girin!");
      return;
    }
    createMutation.mutate({
      titleTr: formData.nameTr,
      titleEn: formData.nameEn,
      titleEl: formData.nameEl,
      descriptionTr: formData.descriptionTr,
      descriptionEn: formData.descriptionEn,
      descriptionEl: formData.descriptionEl,
      price: formData.price,
      imageUrl: formData.imageUrl,
      buyLink: formData.etsyUrl,
    });
  };

  const getName = (product: any) => {
    if (language === "tr") return product.nameTr;
    if (language === "en") return product.nameEn;
    return product.nameEl;
  };

  const getDescription = (product: any) => {
    if (language === "tr") return product.descriptionTr;
    if (language === "en") return product.descriptionEn;
    return product.descriptionEl;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">🛍️ Ürün Yönetimi</h2>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          className="btn-astro-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ürün
        </Button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card className="p-6 bg-white dark:bg-slate-900">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Turkish */}
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-3 text-blue-600">🇹🇷 Türkçe</h3>
              <input
                type="text"
                value={formData.nameTr}
                onChange={(e) => setFormData({ ...formData, nameTr: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Ürün adı (Türkçe)"
              />
              <textarea
                value={formData.descriptionTr}
                onChange={(e) => setFormData({ ...formData, descriptionTr: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 h-16"
                placeholder="Açıklama (Türkçe)"
              />
            </div>

            {/* English */}
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-3 text-blue-600">🇬🇧 English</h3>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Product name (English)"
              />
              <textarea
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 h-16"
                placeholder="Description (English)"
              />
            </div>

            {/* Greek */}
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-3 text-blue-600">🇬🇷 Ελληνικά</h3>
              <input
                type="text"
                value={formData.nameEl}
                onChange={(e) => setFormData({ ...formData, nameEl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Όνομα προϊόντος (Ελληνικά)"
              />
              <textarea
                value={formData.descriptionEl}
                onChange={(e) => setFormData({ ...formData, descriptionEl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 h-16"
                placeholder="Περιγραφή (Ελληνικά)"
              />
            </div>

            {/* Price, Image URL and Buy Link */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Fiyat ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Ürün Görseli URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Satın Alma Linki</label>
                <input
                  type="text"
                  value={formData.etsyUrl}
                  onChange={(e) => setFormData({ ...formData, etsyUrl: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
                  placeholder="https://etsy.com/... veya başka pazar yeri linki"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="btn-astro-primary" disabled={createMutation.isPending}>
                {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ekle"}
              </Button>
              <Button type="button" onClick={() => setIsCreating(false)} className="btn-astro-secondary">
                İptal
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-slate-700">
              <th className="text-left p-4 font-semibold">Ürün</th>
              <th className="text-left p-4 font-semibold">Fiyat</th>
              <th className="text-left p-4 font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                </td>
              </tr>
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="p-4">
                    <div>
                      <p className="font-semibold">{getName(product)}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                        {getDescription(product)}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold">${product.price}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {product.buyLink && (
                        <Button
                          size="sm"
                          onClick={() => window.open(product.buyLink, "_blank")}
                          className="btn-astro-secondary"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => deleteMutation.mutate({ id: product.id })}
                        disabled={deleteMutation.isPending}
                        className="btn-astro-danger"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-8 text-slate-500">
                  Henüz ürün yok. Yeni bir ürün ekleyin!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
