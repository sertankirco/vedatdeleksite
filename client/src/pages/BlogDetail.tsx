import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react";

export default function BlogDetail() {
  const { t, language } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const post = posts?.find(p => p.id === parseInt(id || "0"));

  const getTitle = (post: any) => {
    if (language === 'tr') return post.titleTr;
    if (language === 'en') return post.titleEn;
    return post.titleEl;
  };

  const getExcerpt = (post: any) => {
    if (language === 'tr') return post.excerptTr;
    if (language === 'en') return post.excerptEn;
    return post.excerptEl;
  };

  const getContent = (post: any) => {
    if (language === 'tr') return post.contentTr;
    if (language === 'en') return post.contentEn;
    return post.contentEl;
  };

  const getCategory = (post: any) => {
    if (language === 'tr') return post.categoryTr || 'Astroloji';
    if (language === 'en') return post.categoryEn || 'Astrology';
    return post.categoryEl || 'Αστρολογία';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(
      language === 'tr' ? 'tr-TR' : language === 'en' ? 'en-US' : 'el-GR',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  const getReadingTime = (content: string) => {
    if (!content) return 0;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  const getReadingTimeText = (minutes: number) => {
    if (language === 'tr') return `${minutes} dk okuma`;
    if (language === 'en') return `${minutes} min read`;
    return `${minutes} λ ανάγνωση`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => navigate('/blog')}
            variant="outline"
            className="mb-8 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'tr' ? 'Bloğa Dön' : language === 'en' ? 'Back to Blog' : 'Επιστροφή στο Blog'}
          </Button>
          
          <Card className="p-12 text-center bg-white dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {language === 'tr' ? 'Blog yazısı bulunamadı.' : language === 'en' ? 'Blog post not found.' : 'Το άρθρο δεν βρέθηκε.'}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/blog')}
          variant="outline"
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'tr' ? 'Bloğa Dön' : language === 'en' ? 'Back to Blog' : 'Επιστροφή στο Blog'}
        </Button>

        {/* Article Card */}
        <Card className="bg-white dark:bg-slate-900 border-blue-200 dark:border-slate-700 overflow-hidden">
          {/* Featured Image */}
          {post.imageUrl && (
            <div className="w-full h-96 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={getTitle(post)}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 lg:p-12">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full">
                {getCategory(post)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {getTitle(post)}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{getReadingTimeText(getReadingTime(getContent(post)))}</span>
              </div>
              <div className="text-sm">
                {language === 'tr' ? 'Vedat Delek tarafından yazılmıştır' : language === 'en' ? 'Written by Vedat Delek' : 'Γράφτηκε από τον Vedat Delek'}
              </div>
            </div>

            {/* Excerpt */}
            {getExcerpt(post) && (
              <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-600 p-6 mb-8 rounded">
                <p className="text-lg text-slate-700 dark:text-slate-300 italic font-medium">
                  "{getExcerpt(post)}"
                </p>
              </div>
            )}

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none mb-8">
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                {getContent(post) || (
                  <p className="text-slate-500 dark:text-slate-400">
                    {language === 'tr' ? 'İçerik yakında eklenecek...' : language === 'en' ? 'Content coming soon...' : 'Το περιεχόμενο θα προστεθεί σύντομα...'}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {language === 'tr' ? 'Astrolog Vedat Delek' : language === 'en' ? 'Astrologer Vedat Delek' : 'Αστρολόγος Vedat Delek'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {language === 'tr' ? '20+ yıllık astroloji deneyimi' : language === 'en' ? '20+ years of astrology experience' : '20+ χρόνια εμπειρίας αστρολογίας'}
                  </p>
                </div>
                <Button
                  onClick={() => navigate('/contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {language === 'tr' ? 'Danışmanlık Almak İçin' : language === 'en' ? 'Get Consultation' : 'Λάβετε Συμβουλή'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Related Posts */}
        {posts && posts.length > 1 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              {language === 'tr' ? 'İlgili Yazılar' : language === 'en' ? 'Related Posts' : 'Σχετικά Άρθρα'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                  className="cursor-pointer hover:shadow-lg transition-all bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                >
                  {relatedPost.imageUrl && (
                    <img
                      src={relatedPost.imageUrl}
                      alt={getTitle(relatedPost)}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 mb-2">
                      {getTitle(relatedPost)}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {getExcerpt(relatedPost)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
