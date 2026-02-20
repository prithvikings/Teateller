import * as Dialog from "@radix-ui/react-dialog";
import { X, ShieldCheck, Loader2, KeyRound, AlertCircle } from "lucide-react";
import { useState } from "react";
import { api } from "../../lib/api";
import { cn } from "../../lib/utils";

export function ResetCodeModal({ children }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCode, setNewCode] = useState(["", "", "", ""]);

  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const nextCode = [...newCode];
    nextCode[index] = value.slice(-1);
    setNewCode(nextCode);

    if (value && index < 3) {
      document.getElementById(`reset-digit-${index + 1}`)?.focus();
    }
  };

  const handleReset = async () => {
    const finalCode = newCode.join("");
    if (finalCode.length !== 4) return;

    setIsSubmitting(true);
    try {
      await api.put("/users/me/reset-secret", { secretCode: finalCode });
      alert("Security code updated successfully.");
      setOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-[2px] z-[999] animate-in fade-in duration-300" />

        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-[50%] top-[50%] z-[1000] w-[calc(100%-2rem)] max-w-[400px] translate-x-[-50%] translate-y-[-50%] overflow-hidden border border-linear-border bg-linear-bg shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-xl font-sans outline-none animate-in zoom-in-95 duration-200"
        >
          <div className="h-1.5 bg-gradient-to-r from-transparent via-linear-text/10 to-transparent w-full" />

          <div className="p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="size-12 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-linear-border flex items-center justify-center mb-4 shadow-sm">
                <KeyRound
                  size={22}
                  className="text-linear-text"
                  strokeWidth={1.5}
                />
              </div>
              <Dialog.Title className="text-lg font-bold text-linear-text font-poppins tracking-tight">
                Update Security Code
              </Dialog.Title>
              <p className="text-[13px] text-linear-text-muted mt-2 leading-relaxed">
                This code is required to authorize edits or deletions. <br />
                <span className="font-semibold text-linear-text">
                  It cannot be recovered if lost.
                </span>
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center gap-3">
                {newCode.map((digit, i) => (
                  <input
                    key={i}
                    id={`reset-digit-${i}`}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    className="size-12 rounded-lg border border-linear-border bg-black/[0.02] dark:bg-white/[0.02] text-center text-lg font-mono font-bold text-linear-text focus:border-linear-text/40 focus:ring-4 focus:ring-linear-text/5 outline-none transition-all"
                    placeholder="•"
                  />
                ))}
              </div>

              <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-linear-border rounded-lg p-3 flex items-start gap-3">
                <ShieldCheck size={16} className="text-emerald-500 mt-0.5" />
                <p className="text-[11px] text-linear-text-muted leading-tight">
                  Your new code will be hashed instantly. Not even TeaTeller
                  admins can see it.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <button
                disabled={newCode.join("").length < 4 || isSubmitting}
                onClick={handleReset}
                className={cn(
                  "w-full py-2.5 rounded-lg text-[13px] font-bold transition-all flex items-center justify-center gap-2 shadow-sm",
                  newCode.join("").length === 4
                    ? "bg-linear-text text-linear-bg hover:opacity-90 active:scale-[0.98]"
                    : "bg-black/5 dark:bg-white/5 text-linear-text-muted cursor-not-allowed border border-linear-border",
                )}
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Set New Security Code"
                )}
              </button>

              <Dialog.Close asChild>
                <button className="w-full py-2 text-[12px] font-medium text-linear-text-muted hover:text-linear-text transition-colors">
                  Keep current code
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
