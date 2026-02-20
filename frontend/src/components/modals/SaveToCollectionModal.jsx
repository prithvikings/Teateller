import * as Dialog from "@radix-ui/react-dialog";
import { X, Bookmark, Folder, Loader2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { cn } from "../../lib/utils";

export function SaveToCollectionModal({ postId, open, onOpenChange }) {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [privateNote, setPrivateNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCreateInput, setShowCreateInput] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const fetchCollections = async () => {
    try {
      const { data } = await api.get("/collections");
      if (data.success) setCollections(data.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCollections();
    } else {
      setSelectedCollection(null);
      setPrivateNote("");
      setShowCreateInput(false);
    }
  }, [open]);

  const handleInlineCreate = async () => {
    if (!newCollectionName.trim()) return;
    try {
      const { data } = await api.post("/collections", {
        name: newCollectionName,
      });
      if (data.success) {
        setCollections([...collections, data.data]);
        setSelectedCollection(data.data._id);
        setShowCreateInput(false);
        setNewCollectionName("");
      }
    } catch (err) {
      alert("Failed to create collection");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedCollection) return;

    setIsSubmitting(true);
    try {
      await api.post("/bookmarks", {
        confessionId: postId,
        collectionId: selectedCollection,
        privateNote: privateNote.trim(),
      });
      alert("Whisper saved!");
      onOpenChange(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]" />
        <Dialog.Content
          aria-describedby={undefined}
          onClick={(e) => e.stopPropagation()}
          className="fixed left-[50%] top-[50%] z-[1000] w-[calc(100%-2rem)] max-w-sm translate-x-[-50%] translate-y-[-50%] border border-linear-border bg-linear-bg p-6 shadow-2xl rounded-xl font-sans outline-none"
        >
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-[15px] font-bold font-poppins flex items-center gap-2 text-linear-text">
              <Bookmark
                size={16}
                className="text-linear-text fill-current opacity-20"
              />
              Save to Collection
            </Dialog.Title>
            <Dialog.Close className="p-1 rounded-md text-linear-text-muted hover:text-linear-text transition-colors">
              <X size={18} />
            </Dialog.Close>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-linear-text-muted uppercase tracking-wider">
                  Select Folder
                </label>
                <button
                  onClick={() => setShowCreateInput(!showCreateInput)}
                  className="text-[10px] font-bold text-linear-text hover:opacity-70 flex items-center gap-1 transition-opacity"
                >
                  <Plus size={10} /> New
                </button>
              </div>

              {showCreateInput && (
                <div className="flex gap-2 mb-2 animate-in slide-in-from-top-1">
                  <input
                    autoFocus
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="Collection name..."
                    className="flex-1 bg-black/5 dark:bg-white/5 border border-linear-border rounded-md px-2 py-1.5 text-[12px] text-linear-text outline-none focus:border-linear-text/30"
                  />
                  <button
                    onClick={handleInlineCreate}
                    className="bg-linear-text text-linear-bg px-3 py-1.5 rounded-md text-[11px] font-bold hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="max-h-40 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2
                      className="animate-spin text-linear-text-muted"
                      size={20}
                    />
                  </div>
                ) : collections.length === 0 ? (
                  <button
                    onClick={() => setShowCreateInput(true)}
                    className="w-full py-6 border border-dashed border-linear-border rounded-lg text-[12px] text-linear-text-muted hover:text-linear-text hover:border-linear-text/30 transition-all"
                  >
                    Click here to create your first collection
                  </button>
                ) : (
                  collections.map((col) => (
                    <button
                      key={col._id}
                      type="button"
                      onClick={() => setSelectedCollection(col._id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] transition-all border",
                        selectedCollection === col._id
                          ? "bg-linear-text text-linear-bg border-transparent font-semibold shadow-sm"
                          : "bg-transparent border-transparent text-linear-text-muted hover:bg-black/5 dark:hover:bg-white/5",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Folder
                          size={14}
                          className={cn(
                            selectedCollection === col._id
                              ? "fill-current"
                              : "",
                          )}
                        />
                        {col.name}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-linear-text-muted uppercase tracking-wider block">
                Private Note
              </label>
              <textarea
                value={privateNote}
                onChange={(e) => setPrivateNote(e.target.value)}
                placeholder="Personal reminder..."
                className="w-full bg-black/5 dark:bg-white/5 border border-linear-border rounded-lg p-3 text-[13px] text-linear-text resize-none h-20 outline-none focus:border-linear-text/20 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleSave}
              disabled={!selectedCollection || isSubmitting}
              className={cn(
                "w-full py-2.5 rounded-lg text-[13px] font-bold transition-all",
                !selectedCollection || isSubmitting
                  ? "bg-black/5 dark:bg-white/5 text-linear-text-muted cursor-not-allowed border border-linear-border"
                  : "bg-linear-text text-linear-bg hover:opacity-90 shadow-sm",
              )}
            >
              {isSubmitting ? "Saving..." : "Save Whisper"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
