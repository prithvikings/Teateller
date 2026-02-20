import * as Dialog from "@radix-ui/react-dialog";
import { X, FolderPlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { api } from "../../lib/api";
import { cn } from "../../lib/utils";

export function CreateCollectionModal({ children }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post("/collections", {
        name: name.trim(),
        description: description.trim(),
      });

      if (response.data.success) {
        setOpen(false);
        setName("");
        setDescription("");

        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to create collection:", error);
      alert(
        error.response?.data?.message ||
          "Failed to create collection. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200" />

        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-0 border border-linear-border bg-linear-bg shadow-2xl duration-200 animate-in zoom-in-95 sm:rounded-xl overflow-hidden font-sans selection:bg-black/10 dark:selection:bg-white/20 outline-none">
          <div className="flex items-center justify-between border-b border-linear-border px-6 py-4 bg-linear-bg">
            <Dialog.Title className="text-[15px] font-semibold tracking-tight text-linear-text flex items-center gap-2 font-poppins">
              <FolderPlus size={16} className="text-linear-text-muted" />
              New Collection
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 opacity-70 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:opacity-100 focus:outline-none">
              <X
                size={18}
                className="text-linear-text-muted hover:text-linear-text transition-colors"
              />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="p-6 bg-linear-bg space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider mb-2 block">
                Collection Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Crazy Office Drama"
                autoFocus
                disabled={isSubmitting}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-2.5 px-3 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/50 font-poppins"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider mb-2 block">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this collection about?"
                rows={3}
                disabled={isSubmitting}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-2.5 px-3 text-[13px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/50 resize-none font-poppins"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-linear-border px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02]">
            <Dialog.Close asChild>
              <button
                disabled={isSubmitting}
                className="px-4 py-2 text-[12px] font-medium text-linear-text-muted hover:text-linear-text transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleCreate}
              disabled={!name.trim() || isSubmitting}
              className="flex items-center gap-2 px-5 py-2 bg-linear-text text-linear-bg rounded-md text-[12px] font-bold hover:opacity-90 transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                "Create Collection"
              )}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
