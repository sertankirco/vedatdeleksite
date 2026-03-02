import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Loader2, Play } from "lucide-react";
import { toast } from "sonner";

export default function AdminVideos() {
  const { language } = useLanguage();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    titleTr: "",
    titleEn: "",
    titleEl: "",
    descriptionTr: "",
    descriptionEn: "",
    descriptionEl: "",
    youtubeUrl: "",
  });

  const { data: videos, isLoading, refetch } = trpc.videos.list.useQuery();
  const createMutation = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video eklendi!");
      setFormData({
        titleTr: "",
        titleEn: "",
        titleEl: "",
        descriptionTr: "",
        descriptionEn: "",
        descriptionEl: "",
        youtubeUrl: "",
      });
      setIsCreating(false);
      refetch();
    },
    onError: () => toast.error("Hata oluştu"),
  });

  const deleteMutation = trpc.videos.delete.useMutation({
    onSuccess: () => {
      toast.success("Video silindi!");
      refetch();
    },
    onError: () => toast.error("Silme hatası"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleTr || !formData.titleEn || !formData.titleEl || !formData.youtubeUrl) {
      toast.error("Tüm dillerde başlık ve YouTube URL gerekli!");
      return;
    }
    createMutation.mutate(formData);
  };

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getTitle = (video: any) => {
    if (language === "tr") return video.titleTr;
    if (language === "en") return video.titleEn;
    return video.titleEl;
  };

  const getDescription = (video: any) => {
    if (language === "tr") return video.descriptionTr;
    if (language === "en") return video.descriptionEn;
    return video.descriptionEl;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Video Yönetimi</h2>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          className="btn-astro-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Video
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
                onChange={(e) => setFormData({ ...formData, titleTr: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Başlık (Türkçe)"
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
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Title (English)"
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
                value={formData.titleEl}
                onChange={(e) => setFormData({ ...formData, titleEl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 mb-2"
                placeholder="Τίτλος (Ελληνικά)"
              />
              <textarea
                value={formData.descriptionEl}
                onChange={(e) => setFormData({ ...formData, descriptionEl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600 h-16"
                placeholder="Περιγραφή (Ελληνικά)"
              />
            </div>

            {/* YouTube URL */}
            <div>
              <label className="block text-sm font-medium mb-2">YouTube URL</label>
              <input
                type="text"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-600"
                placeholder="https://youtube.com/watch?v=..."
              />
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

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="flex justify-center py-8 col-span-2">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : videos && videos.length > 0 ? (
          videos.map((video) => {
            const youtubeId = getYoutubeId(video.youtubeUrl);
            return (
              <Card key={video.id} className="p-4 bg-white dark:bg-slate-900 overflow-hidden">
                <div className="relative mb-4 bg-black rounded-lg h-40 flex items-center justify-center">
                  {youtubeId ? (
                    <img
                      src={`https://img.youtube.com/vi/${youtubeId}/0.jpg`}
                      alt={getTitle(video)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Play className="w-12 h-12 text-white opacity-50" />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2">{getTitle(video)}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {getDescription(video)}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => window.open(video.youtubeUrl, "_blank")}
                    className="btn-astro-secondary flex-1"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Aç
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => deleteMutation.mutate({ id: video.id })}
                    disabled={deleteMutation.isPending}
                    className="btn-astro-danger"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-8 text-center text-slate-500 col-span-2">
            Henüz video yok. Yeni bir video ekleyin!
          </Card>
        )}
      </div>
    </div>
  );
}
