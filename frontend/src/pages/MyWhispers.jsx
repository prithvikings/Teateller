import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, BarChart2, Lock, Globe } from "lucide-react";
import { api } from "../lib/api";
import { cn } from "../lib/utils";
import { CreateConfessionModal } from "../components/modals/CreateConfessionModal";
import { PostOptionsMenu } from "../components/modals/post-options-menu";

export function MyWhispers() {
  const navigate = useNavigate();
  const [whispers, setWhispers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchMyWhispers = async () => {
      try {
        const response = await api.get("/users/me/whispers");
        if (response.data.success) {
          setWhispers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load my whispers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyWhispers();
  }, []);

  const totalItems = whispers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWhispers = whispers.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border px-8 py-5 flex items-center justify-between font-poppins">
        <div className="flex items-center gap-4">
          <h1 className="text-[15px] font-semibold tracking-tight">
            My Whispers
          </h1>
          <span className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-linear-text-muted text-[11px] px-2 py-0.5 rounded-sm font-medium tracking-wide">
            {totalItems} ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-linear-text-muted transition-colors"
              size={14}
            />
            <input
              type="text"
              placeholder="Search your secrets..."
              className="w-64 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-1.5 pl-8 pr-8 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/60"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-linear-text-muted border border-black/10 dark:border-white/10 px-1 py-px rounded-sm bg-black/5 dark:bg-white/5">
              ⌘K
            </div>
          </div>

          <CreateConfessionModal>
            <button className="flex items-center gap-1.5 bg-linear-text text-linear-bg hover:opacity-90 px-3 py-1.5 rounded-md text-[13px] font-medium transition-opacity shadow-sm cursor-pointer">
              <Plus size={14} />
              New Secret
            </button>
          </CreateConfessionModal>
        </div>
      </div>

      <div className="p-8">
        <div className="border border-linear-border rounded-lg bg-linear-bg shadow-sm">
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-3 border-b border-linear-border bg-black/[0.02] dark:bg-white/[0.02] text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider rounded-t-lg">
            <div>Confession</div>
            <div>Views</div>
            <div>Reactions</div>
            <div>Created</div>
            <div className="text-right">Actions</div>
          </div>

          <div className="divide-y divide-linear-border/50">
            {isLoading ? (
              <div className="px-6 py-8 text-center text-[13px] text-linear-text-muted">
                Loading your secrets...
              </div>
            ) : currentWhispers.length === 0 ? (
              <div className="px-6 py-8 text-center text-[13px] text-linear-text-muted">
                You haven't posted any whispers yet.
              </div>
            ) : (
              currentWhispers.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/confession/${item._id}`)}
                  className="grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-4 items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  <div className="pr-8 min-w-0">
                    <p className="text-[13px] font-medium text-linear-text line-clamp-2 mb-1.5 font-poppins">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-linear-text-muted mt-2">
                      <span className="font-mono bg-black/5 dark:bg-white/5 px-1 rounded-sm">
                        ID: {item._id.slice(-6)}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-linear-text-muted/50" />
                      <div className="flex items-center gap-1.5">
                        <Globe size={12} className="opacity-70" />
                        <span className="font-medium">Public</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[13px] text-linear-text-muted tabular-nums">
                    <BarChart2 size={14} className="opacity-70" />
                    {item.views || 0}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-linear-text-muted">
                    <span className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 px-2 py-0.5 rounded-sm">
                      👍 {item.likes || 0}
                    </span>
                    <span className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 px-2 py-0.5 rounded-sm">
                      👎 {item.dislikes || 0}
                    </span>
                  </div>

                  <div className="text-[12px] text-linear-text-muted font-medium">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>

                  <div
                    className="flex justify-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PostOptionsMenu
                      postId={item._id}
                      isOwnPost={true}
                      currentContent={item.content}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-6 py-3 border-t border-linear-border bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between rounded-b-lg">
            <span className="text-[11px] font-medium text-linear-text-muted">
              Showing {totalItems > 0 ? startIndex + 1 : 0}-
              {Math.min(endIndex, totalItems)} of {totalItems} secrets
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-[11px] font-medium border border-linear-border rounded-md text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
                disabled={currentPage === totalPages || totalItems === 0}
                className="px-3 py-1.5 text-[11px] font-medium border border-linear-border rounded-md text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
