import { useEffect, useState } from "react";
import { Search, Flame, Loader2, X } from "lucide-react";
import { api } from "../lib/api";
import { cn } from "../lib/utils";
import { ConfessionCard } from "../components/feed/ConfessionCard";

export function TrendingTea() {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTrending = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/confessions/trending");
      if (response.data.success) {
        setTrending(response.data.data);
      }
    } catch (err) {
      console.error("Trending fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const filteredTrending = trending.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.topic.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border font-poppins px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Flame className="text-orange-500" size={14} />
            </div>
            <h1 className="text-[15px] font-semibold tracking-tight text-linear-text">
              Trending Tea
            </h1>
          </div>
          <p className="text-[10px] font-bold text-linear-text-muted uppercase tracking-widest">
            Updated Hourly
          </p>
        </div>

        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted group-focus-within:text-linear-text transition-colors"
            size={14}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trending keywords..."
            className="w-full bg-black/5 dark:bg-white/5 border border-linear-border rounded-md py-1.5 pl-9 pr-9 text-[13px] text-linear-text outline-none focus:border-linear-text/20 transition-all placeholder:text-linear-text-muted/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-linear-text-muted hover:text-linear-text"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="p-5 pb-24 max-w-2xl mx-auto space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2
              className="animate-spin text-linear-text-muted"
              size={24}
            />
            <p className="text-sm text-linear-text-muted font-poppins">
              Calculating the heat...
            </p>
          </div>
        ) : filteredTrending.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-linear-border rounded-xl">
            <p className="text-sm text-linear-text-muted font-medium">
              No trending whispers match your search.
            </p>
          </div>
        ) : (
          filteredTrending.map((post) => (
            <div key={post._id} className="relative group">
              {trending.indexOf(post) < 3 && !searchQuery && (
                <div className="absolute -left-1 top-4 w-0.5 h-8 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)] z-10" />
              )}
              <ConfessionCard data={post} />
            </div>
          ))
        )}

        {!isLoading && filteredTrending.length > 0 && (
          <div className="pt-10 pb-8 text-center border-t border-linear-border border-dashed">
            <p className="text-[12px] font-bold text-linear-text-muted tracking-widest uppercase">
              Stay ahead of the tea
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
