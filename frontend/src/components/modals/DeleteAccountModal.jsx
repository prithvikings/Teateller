import * as Dialog from "@radix-ui/react-dialog";
import { X, Loader2, AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { api } from "../../lib/api";
import { cn } from "../../lib/utils";

export function DeleteAccountModal({ children }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [shake, setShake] = useState(false);

  const isConfirmed = confirmText.trim().toUpperCase() === "DELETE";

  const handleDelete = async () => {
    if (!isConfirmed) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete("/users/me");

      localStorage.removeItem("token");

      window.location.href = "/login";
    } catch (err) {
      console.error("Purge failed:", err);
      alert(
        err.response?.data?.message ||
          "System error. Failed to purge account data.",
      );
      setIsDeleting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-[2px] z-[999] animate-in fade-in duration-300" />

        <Dialog.Content
          aria-describedby={undefined}
          onPointerDownOutside={(e) => e.preventDefault()}
          className={cn(
            "fixed left-[50%] top-[50%] z-[1000] w-[calc(100%-2rem)] max-w-[420px] translate-x-[-50%] translate-y-[-50%] overflow-hidden",
            "border border-linear-border bg-linear-bg shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-xl font-sans outline-none",
            "animate-in zoom-in-95 duration-200",
            shake && "animate-shake",
          )}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-linear-border bg-black/[0.01] dark:bg-white/[0.01]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-red-500/10 border border-red-500/20">
                <Trash2 size={14} className="text-red-500" />
              </div>
              <Dialog.Title className="text-[14px] font-semibold tracking-tight text-linear-text font-poppins">
                Delete Account
              </Dialog.Title>
            </div>
            <Dialog.Close className="p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              <X size={16} className="text-linear-text" />
            </Dialog.Close>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[13px] text-linear-text leading-relaxed">
                  You are about to permanently purge your account. This will
                  immediately delete:
                </p>
                <ul className="space-y-1.5">
                  {[
                    "All active whispers",
                    "Saved collections",
                    "Wallet balance",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[12px] text-linear-text-muted"
                    >
                      <div className="size-1 rounded-full bg-linear-text-muted/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-linear-border space-y-3">
                <div className="flex items-center gap-2 text-linear-text-muted">
                  <AlertTriangle size={14} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Confirm intent
                  </span>
                </div>
                <p className="text-[12px] text-linear-text-muted leading-snug">
                  Please type{" "}
                  <span className="font-mono font-bold text-linear-text select-none">
                    DELETE
                  </span>{" "}
                  to proceed.
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className={cn(
                    "w-full bg-linear-bg border border-linear-border rounded-md px-3 py-2 text-[13px] transition-all outline-none font-mono font-bold",
                    isConfirmed
                      ? "border-red-500/40 ring-4 ring-red-500/5 text-red-600"
                      : "focus:border-linear-text/20",
                  )}
                  placeholder="Type to confirm"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-8">
              <button
                disabled={!isConfirmed || isDeleting}
                onClick={handleDelete}
                className={cn(
                  "w-full py-2.5 rounded-lg text-[13px] font-bold transition-all flex items-center justify-center gap-2 shadow-sm",
                  isConfirmed
                    ? "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]"
                    : "bg-black/5 dark:bg-white/5 text-linear-text-muted cursor-not-allowed border border-linear-border",
                )}
              >
                {isDeleting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Purge account data"
                )}
              </button>

              <Dialog.Close asChild>
                <button className="w-full py-2 text-[12px] font-medium text-linear-text-muted hover:text-linear-text transition-colors">
                  Keep my account
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
