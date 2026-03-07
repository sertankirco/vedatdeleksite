import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminBlog() {
  const { language } = useLanguage();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    titleTr: "",
    titleEn: "",
    titleEl: "",
    excerptTr: "",
    excerptEn: "",
    excerptEl: "",
    contentTr: "",
    contentEn: "",
    contentEl: "",
  });

  const { data: blogs, isLoading, refetch } = trpc.blog.list.useQuery();
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Blog yazısı oluşturuldu!");
      setFormData({
        titleTr: "",
        titleEn: "",
        titleEl: "",
        excerptTr: "",
        excerptEn: "",
        excerptEl: "",
        contentTr: "",
        contentEn: "",
        contentEl: "",
      });
      setIsCreating(false);
      refetch();
    },
    onError: (error) => {
      console.error(error);
      toast.error(`Hata oluştu: ${error.message}`);
    },
  });

  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Blog yazısı silindi!");
      refetch();
    },
    onError: () => toast.error("Silme hatası"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleTr || !formData.titleEn || !formData.titleEl) {
      toast.error("Tüm dillerde başlık gerekli!");
      return;
    }
    createMutation.mutate(formData);
  };

  const getTitle = (blog: any) => {
    if (language === "tr") return blog.titleTr;
    if (language === "en") return blog.titleEn;
    return blog.titleEl;
  };

  const getExcerpt = (blog: any) => {
    if (language === "tr") return blog.excerptTr;
    if (language === "en") return blog.excerptEn;
    return blog.excerptEl;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Yönetimi</h2>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          className="btn-astro-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Yazı
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
                value={formData.titleTr}
                onChange={e =>
                  setFormData({ ...formData, titleTr: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Başlık (Türkçe)"
              />
              <input
                type="text"
                value={formData.excerptTr}
                onChange={e =>
                  setFormData({ ...formData, excerptTr: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Özet (Türkçe)"
              />
              <textarea
                value={formData.contentTr}
                onChange={e =>
                  setFormData({ ...formData, contentTr: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 h-24"
                placeholder="İçerik (Türkçe)"
              />
            </div>

            {/* English */}
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-3 text-blue-600">🇬🇧 English</h3>
              <input
                type="text"
                value={formData.titleEn}
                onChange={e =>
                  setFormData({ ...formData, titleEn: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Title (English)"
              />
              <input
                type="text"
                value={formData.excerptEn}
                onChange={e =>
                  setFormData({ ...formData, excerptEn: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Excerpt (English)"
              />
              <textarea
                value={formData.contentEn}
                onChange={e =>
                  setFormData({ ...formData, contentEn: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 h-24"
                placeholder="Content (English)"
              />
            </div>

            {/* Greek */}
            <div>
              <h3 className="font-semibold mb-3 text-blue-600">🇬🇷 Ελληνικά</h3>
              <input
                type="text"
                value={formData.titleEl}
                onChange={e =>
                  setFormData({ ...formData, titleEl: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Τίτλος (Ελληνικά)"
              />
              <input
                type="text"
                value={formData.excerptEl}
                onChange={e =>
                  setFormData({ ...formData, excerptEl: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Περίληψη (Ελληνικά)"
              />
              <textarea
                value={formData.contentEl}
                onChange={e =>
                  setFormData({ ...formData, contentEl: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 h-24"
                placeholder="Περιεχόμενο (Ελληνικά)"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="btn-astro-primary"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Yayınla"
                )}
              </Button>
              <Button
                type="button"
                onClick={() => setIsCreating(false)}
                className="btn-astro-secondary"
              >
                İptal
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Blog List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : blogs && blogs.length > 0 ? (
          blogs.map(blog => (
            <Card key={blog.id} className="p-4 bg-white dark:bg-slate-900">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{getTitle(blog)}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {getExcerpt(blog)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="btn-astro-secondary" disabled>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => deleteMutation.mutate({ id: blog.id })}
                    disabled={deleteMutation.isPending}
                    className="btn-astro-danger"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center text-slate-500">
            Henüz blog yazısı yok. Yeni bir yazı oluşturun!
          </Card>
        )}
      </div>
    </div>
  );
}
