import { useState, useEffect } from "react";
import {
  Search,
  Bookmark,
  SlidersHorizontal,
  StickyNote,
  ArrowUpRight,
  FolderOpen,
  Folder,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConfessionCard } from "../components/feed/ConfessionCard";
import { CreateCollectionModal } from "../components/modals/CreateCollectionModal";
import { cn } from "../lib/utils";
import { SavedFilterModal } from "../components/modals/SavedFilterModal";
import { api } from "../lib/api";

export function Saved() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [activeCollectionId, setActiveCollectionId] = useState("all");
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const colRes = await api.get("/collections");
      if (colRes.data.success) setCollections(colRes.data.data);

      const endpoint =
        activeCollectionId === "all"
          ? "/bookmarks"
          : `/collections/${activeCollectionId}/bookmarks`;

      const bookRes = await api.get(endpoint);

      const result =
        activeCollectionId === "all"
          ? bookRes.data.data
          : bookRes.data.data.bookmarks;

      setBookmarks(result || []);
    } catch (err) {
      console.error("Failed to load saved items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeCollectionId]);

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border font-poppins">
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-md bg-linear-text/10 flex items-center justify-center border border-linear-border text-linear-text">
                <Bookmark size={16} className="fill-current" />
              </div>
              <div>
                <h1 className="text-[15px] font-semibold tracking-tight text-linear-text">
                  Saved Collection
                </h1>
                <p className="text-[11px] font-medium text-linear-text-muted uppercase">
                  {bookmarks.length} {bookmarks.length === 1 ? "item" : "items"}{" "}
                  saved
                </p>
              </div>
            </div>

            <CreateCollectionModal>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-linear-border bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors text-[12px] font-bold text-linear-text-muted hover:text-linear-text cursor-pointer">
                <FolderOpen size={14} />
                <span>New Collection</span>
              </button>
            </CreateCollectionModal>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1 group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted"
                size={14}
              />
              <input
                type="text"
                placeholder="Search within saved items..."
                className="w-full bg-black/5 dark:bg-white/5 border border-linear-border rounded-md py-1.5 pl-8 pr-4 text-[13px] text-linear-text outline-none focus:border-black/30 transition-all placeholder:text-linear-text-muted/60"
              />
            </div>
            <SavedFilterModal>
              <button className="px-3 py-1.5 rounded-md border border-linear-border bg-black/5 hover:bg-black/10 text-linear-text-muted hover:text-linear-text transition-colors cursor-pointer">
                <SlidersHorizontal size={14} />
              </button>
            </SavedFilterModal>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveCollectionId("all")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all whitespace-nowrap border",
                activeCollectionId === "all"
                  ? "bg-linear-text text-linear-bg border-transparent shadow-sm"
                  : "bg-transparent text-linear-text-muted border-transparent hover:text-linear-text",
              )}
            >
              <Bookmark
                size={12}
                className={activeCollectionId === "all" ? "fill-current" : ""}
              />
              All Saved
            </button>

            {collections.map((col) => (
              <button
                key={col._id}
                onClick={() => setActiveCollectionId(col._id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all whitespace-nowrap border",
                  activeCollectionId === col._id
                    ? "bg-linear-text text-linear-bg border-transparent shadow-sm"
                    : "bg-transparent text-linear-text-muted border-transparent hover:text-linear-text",
                )}
              >
                <Folder
                  size={12}
                  className={
                    activeCollectionId === col._id ? "fill-current" : ""
                  }
                />
                {col.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 pb-24 max-w-2xl mx-auto space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2
              className="animate-spin text-linear-text-muted"
              size={24}
            />
            <p className="text-sm text-linear-text-muted font-poppins">
              Opening the vault...
            </p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-linear-border rounded-xl">
            <Bookmark size={24} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm text-linear-text-muted font-medium">
              No whispers saved in this collection.
            </p>
          </div>
        ) : (
          bookmarks.map((bookmark) => (
            <div key={bookmark._id} className="relative group">
              {bookmark.privateNote && (
                <div className="absolute -top-2.5 left-4 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-linear-text text-linear-bg text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
                  <StickyNote size={10} className="fill-current" />
                  Note: {bookmark.privateNote}
                </div>
              )}

              <div className="relative">
                <ConfessionCard data={bookmark.confessionId} />

                <div className="absolute top-4 right-12 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/confession/${bookmark.confessionId._id}`);
                    }}
                    className="p-1.5 rounded-md bg-linear-bg border border-linear-border text-linear-text-muted hover:text-linear-text shadow-md transition-colors"
                  >
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {!isLoading && bookmarks.length > 0 && (
          <div className="pt-10 pb-8 text-center border-t border-linear-border border-dashed">
            <p className="text-[12px] font-bold text-linear-text-muted tracking-widest uppercase">
              End of collection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
