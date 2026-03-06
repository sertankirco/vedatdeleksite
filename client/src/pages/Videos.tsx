import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Play, Loader2 } from "lucide-react";

const getYoutubeEmbedUrl = (url: string) => {
  const videoId = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  )?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

export default function Videos() {
  const { t, language } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const { data: videos, isLoading } = trpc.videos.list.useQuery();

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

  const firstVideo = videos?.[0];
  const embedUrl =
    firstVideo && selectedVideo === null
      ? getYoutubeEmbedUrl(firstVideo.youtubeUrl)
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("videos.title")}
          </h1>
          <p className="text-subtitle">{t("videos.subtitle")}</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white dark:bg-slate-900 border-blue-200 dark:border-slate-700">
                {selectedVideo === null && firstVideo ? (
                  <>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                      {embedUrl && (
                        <iframe
                          width="100%"
                          height="100%"
                          src={embedUrl}
                          title={getTitle(firstVideo)}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                      {getTitle(firstVideo)}
                    </h2>
                    {getDescription(firstVideo) && (
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {getDescription(firstVideo)}
                      </p>
                    )}
                  </>
                ) : selectedVideo ? (
                  <>
                    {videos?.map(video => {
                      if (video.youtubeUrl === selectedVideo) {
                        const embedUrl = getYoutubeEmbedUrl(video.youtubeUrl);
                        return (
                          <div key={video.id}>
                            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                              {embedUrl && (
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={embedUrl}
                                  title={getTitle(video)}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              )}
                            </div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                              {getTitle(video)}
                            </h2>
                            {getDescription(video) && (
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                {getDescription(video)}
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </>
                ) : null}
              </Card>
            </div>

            {/* Video List */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                Tüm Videolar
              </h3>
              <div className="space-y-3">
                {videos?.map(video => (
                  <Card
                    key={video.id}
                    onClick={() => setSelectedVideo(video.youtubeUrl)}
                    className={`p-3 cursor-pointer transition-all hover:shadow-lg ${
                      selectedVideo === video.youtubeUrl
                        ? "bg-blue-100 dark:bg-blue-900 border-blue-400"
                        : ""
                    }`}
                  >
                    <div className="relative mb-2">
                      <div className="aspect-video bg-slate-300 dark:bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden relative group">
                        <Play className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-2">
                      {getTitle(video)}
                    </h4>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Play className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {t("videos.empty")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
