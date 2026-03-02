import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Search, Calendar, ArrowRight, Loader2, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts, isLoading } = trpc.blog.list.useQuery();

  // Helper functions for multilingual content
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

  // Calculate reading time (roughly 200 words per minute)
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

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    return posts.filter(post => {
      const title = getTitle(post).toLowerCase();
      const excerpt = getExcerpt(post).toLowerCase();
      const searchLower = searchQuery.toLowerCase();
      
      const matchesSearch = title.includes(searchLower) || excerpt.includes(searchLower);
      const matchesCategory = !selectedCategory || getCategory(post) === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory, language]);

  // Get unique categories
  const categories = useMemo(() => {
    if (!posts) return [];
    const uniqueCategories = new Set(posts.map(post => getCategory(post)));
    return Array.from(uniqueCategories);
  }, [posts, language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('blog.title')}
          </h1>
          <p className="text-subtitle text-slate-600 dark:text-slate-400">
            {t('blog.subtitle')}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            {/* Search and Filters */}
            <div className="mb-12 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={language === 'tr' ? 'Yazılarda ara...' : language === 'en' ? 'Search posts...' : 'Αναζήτηση άρθρων...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  {language === 'tr' ? 'Tümü' : language === 'en' ? 'All' : 'Όλα'}
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
                        {post.imageUrl ? (
                          <img
                            src={post.imageUrl}
                            alt={getTitle(post)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-4xl">📝</span>
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {getCategory(post)}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col h-full">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {getTitle(post)}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">
                          {getExcerpt(post)}
                        </p>

                        {/* Meta Information */}
                        <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                          {/* Date and Reading Time */}
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{getReadingTimeText(getReadingTime(getExcerpt(post)))}</span>
                            </div>
                          </div>

                          {/* Read More Link */}
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                            <span>{language === 'tr' ? 'Devamını Oku' : language === 'en' ? 'Read More' : 'Διαβάστε περισσότερα'}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  {language === 'tr' ? 'Arama sonucu bulunamadı.' : language === 'en' ? 'No posts found.' : 'Δεν βρέθηκαν άρθρα.'}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {t('blog.empty')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
