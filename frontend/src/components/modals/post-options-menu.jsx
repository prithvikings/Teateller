import { useState, useRef, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  MoreHorizontal,
  Trash2,
  Link,
  Bookmark,
  Pencil,
  X,
  AlertCircle,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { api } from "../../lib/api";
import { SaveToCollectionModal } from "./SaveToCollectionModal";

export function PostOptionsMenu({
  postId,
  isOwnPost = false,
  currentContent = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const [code, setCode] = useState(["", "", "", ""]);
  const [editText, setEditText] = useState(currentContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuAction = (e, action) => {
    e.stopPropagation();
    setIsOpen(false);

    if (action === "save") {
      setIsSaveModalOpen(true);
      return;
    }

    if (action === "copy_link") {
      navigator.clipboard.writeText(
        `${window.location.origin}/confession/${postId}`,
      );
      return;
    }

    setActiveModal(action);
    setCode(["", "", "", ""]);
    if (action === "edit") setEditText(currentContent);
  };

  const executeAction = async () => {
    setIsSubmitting(true);
    const finalCode = code.join("");

    try {
      if (activeModal === "delete") {
        await api.delete(`/confessions/${postId}`, {
          data: { secretCode: finalCode },
        });
        window.location.reload();
      }

      if (activeModal === "edit") {
        await api.put(`/confessions/${postId}`, {
          secretCode: finalCode,
          content: editText,
        });
        window.location.reload();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Action failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCodeInput = () => (
    <div className="flex gap-2 mt-2">
      {code.map((digit, index) => (
        <input
          key={index}
          id={`action-code-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => {
            if (!/^\d*$/.test(e.target.value)) return;
            const newCode = [...code];
            newCode[index] = e.target.value;
            setCode(newCode);
            if (e.target.value && index < 3)
              document.getElementById(`action-code-${index + 1}`)?.focus();
          }}
          className="size-10 text-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md text-linear-text outline-none focus:border-black/30 transition-all"
          placeholder="0"
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-linear-text-muted hover:text-linear-text transition-colors"
        >
          <MoreHorizontal size={16} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-44 bg-white dark:bg-[#181818] border border-linear-border rounded-lg shadow-xl z-50 p-1 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            <button
              onClick={(e) => handleMenuAction(e, "copy_link")}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              <Link size={14} /> Copy Link
            </button>
            <button
              onClick={(e) => handleMenuAction(e, "save")}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              <Bookmark size={14} /> Save Whisper
            </button>
            {isOwnPost && (
              <>
                <button
                  onClick={(e) => handleMenuAction(e, "edit")}
                  className="w-full flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
                >
                  <Pencil size={14} /> Edit Post
                </button>
                <button
                  onClick={(e) => handleMenuAction(e, "delete")}
                  className="w-full flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                >
                  <Trash2 size={14} /> Delete Post
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <SaveToCollectionModal
        postId={postId}
        open={isSaveModalOpen}
        onOpenChange={setIsSaveModalOpen}
      />

      <Dialog.Root
        open={!!activeModal}
        onOpenChange={(open) => !open && setActiveModal(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] border border-linear-border bg-linear-bg p-6 shadow-2xl rounded-xl outline-none font-sans">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-linear-text">
                {activeModal === "edit" ? "Edit" : "Delete"} Confession
              </Dialog.Title>
              <Dialog.Close className="text-linear-text-muted hover:text-linear-text">
                <X size={18} />
              </Dialog.Close>
            </div>

            {activeModal === "edit" && (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full h-32 bg-black/5 dark:bg-white/5 border border-linear-border rounded-lg p-3 text-[13px] mb-4 resize-none text-linear-text outline-none focus:border-black/30"
              />
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-linear-text">
                Enter 4-Digit Secret Code
              </label>
              {activeModal === "delete" && (
                <div className="flex items-center gap-2 text-red-500 text-[11px] font-medium mb-2">
                  <AlertCircle size={12} />
                  This action is permanent.
                </div>
              )}
              {renderCodeInput()}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Dialog.Close className="px-4 py-2 text-sm text-linear-text-muted hover:text-linear-text font-medium">
                Cancel
              </Dialog.Close>
              <button
                onClick={executeAction}
                disabled={isSubmitting || code.join("").length < 4}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-bold transition-all disabled:opacity-50",
                  activeModal === "delete"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-linear-text text-linear-bg hover:opacity-90",
                )}
              >
                {isSubmitting ? "Processing..." : "Confirm"}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
