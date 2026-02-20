import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export function Header({
  searchQuery,
  setSearchQuery,
  activeTopic,
  setActiveTopic,
  activeSort,
  setActiveSort,
}) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-linear-border bg-linear-bg/90 backdrop-blur-xl font-poppins">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-5 py-4 gap-4">
        <div className="relative w-full max-w-md group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted transition-colors group-focus-within:text-linear-text"
            size={14}
          />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search secrets..."
            className="w-full bg-black/5 dark:bg-white/5 border border-linear-border text-linear-text text-[13px] rounded-md py-1.5 pl-9 pr-12 focus:outline-none focus:border-linear-text/20 transition-all placeholder:text-linear-text-muted/50"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-linear-text-muted hover:text-linear-text transition-colors"
              >
                <X size={14} />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex text-[10px] font-sans font-bold text-linear-text-muted bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded border border-linear-border pointer-events-none">
                ⌘K
              </kbd>
            )}
          </div>
        </div>

        <div className="flex items-center p-1 bg-black/5 dark:bg-white/5 border border-linear-border rounded-md self-start md:self-auto">
          {["latest", "popular"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSort(tab)}
              className={cn(
                "px-3 py-1 rounded-sm text-[11px] font-bold transition-all capitalize",
                activeSort === tab
                  ? "bg-linear-bg text-linear-text shadow-sm"
                  : "text-linear-text-muted hover:text-linear-text",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 px-5 pb-4 overflow-x-auto no-scrollbar">
        {[
          "All",
          "Funny",
          "College",
          "Work",
          "Relationships",
          "Spiciest",
          "Deep Thoughts",
        ].map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={cn(
              "px-3 py-1 text-xs font-poppins rounded-md transition-all border whitespace-nowrap",
              activeTopic === topic
                ? "bg-linear-text text-linear-bg border-transparent shadow-sm"
                : "bg-transparent text-linear-text-muted border-transparent hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5",
            )}
          >
            {topic}
          </button>
        ))}
      </div>
    </header>
  );
}
