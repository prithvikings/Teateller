import * as Dialog from "@radix-ui/react-dialog";
import { X, SlidersHorizontal, Check, SortDesc, Filter } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export function SavedFilterModal({ children }) {
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [contentType, setContentType] = useState("all");

  const handleApply = () => {
    console.log("Filters Applied:", { sortBy, contentType });
    setOpen(false);
  };

  const SortOption = ({ id, label }) => (
    <button
      onClick={() => setSortBy(id)}
      className={cn(
        "flex items-center justify-between w-full px-3 py-2 text-[13px] rounded-md transition-all duration-200",
        sortBy === id
          ? "bg-black/5 dark:bg-white/5 text-linear-text font-medium"
          : "text-linear-text-muted hover:text-linear-text hover:bg-black/[0.02] dark:hover:bg-white/[0.02]",
      )}
    >
      {label}
      {sortBy === id && <Check size={14} className="text-linear-primary" />}
    </button>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] z-50 animate-in fade-in duration-300" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-[360px] translate-x-[-50%] translate-y-[-50%] border border-linear-border bg-linear-bg shadow-2xl duration-300 animate-in zoom-in-95 sm:rounded-xl overflow-hidden font-sans outline-none">
          <div className="flex items-center justify-between px-5 py-4 border-b border-linear-border bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                <SlidersHorizontal size={14} className="text-linear-text" />
              </div>
              <Dialog.Title className="text-[14px] font-semibold tracking-tight text-linear-text font-poppins">
                Filter & Sort
              </Dialog.Title>
            </div>
            <Dialog.Close className="p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              <X size={16} className="text-linear-text" />
            </Dialog.Close>
          </div>

          <div className="p-5 space-y-7">
            <div>
              <div className="flex items-center gap-2 mb-3 text-linear-text-muted">
                <SortDesc size={12} />
                <label className="text-[11px] font-bold uppercase tracking-[0.05em]">
                  Sort order
                </label>
              </div>
              <div className="space-y-0.5">
                <SortOption id="newest" label="Newest First" />
                <SortOption id="oldest" label="Oldest First" />
                <SortOption id="popular" label="Most Reactions" />
                <SortOption id="views" label="Most Viewed" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3 text-linear-text-muted">
                <Filter size={12} />
                <label className="text-[11px] font-bold uppercase tracking-[0.05em]">
                  Filter posts
                </label>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["all", "confessions", "replies", "with_notes"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-md text-[12px] font-medium border transition-all duration-200 capitalize",
                      contentType === type
                        ? "bg-linear-text text-linear-bg border-transparent shadow-md"
                        : "bg-transparent border-linear-border text-linear-text-muted hover:border-black/20 dark:hover:border-white/20 hover:text-linear-text",
                    )}
                  >
                    {type.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-linear-border bg-black/[0.03] dark:bg-white/[0.03]">
            <button
              onClick={() => {
                setSortBy("newest");
                setContentType("all");
              }}
              className="text-[12px] font-medium text-linear-text-muted hover:text-linear-text transition-colors px-2 py-1"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 bg-linear-text text-linear-bg rounded-md text-[13px] font-bold hover:opacity-90 active:scale-[0.97] transition-all shadow-sm"
            >
              Apply Changes
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
