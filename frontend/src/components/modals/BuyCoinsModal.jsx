import * as Dialog from "@radix-ui/react-dialog";
import { X, CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { TriangleAlertIcon } from "../ui/triangle-alert-icon";

export function BuyCoinsModal({
  children,
  packageAmount = "500",
  price = "$3.99",
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("form");

  const handlePay = (e) => {
    e.preventDefault();
    setStep("warning");
  };

  const handleClose = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => setStep("form"), 300);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-0 border border-linear-border bg-linear-bg shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-xl overflow-hidden font-sans selection:bg-black/10 dark:selection:bg-white/20">
          <div className="flex items-center justify-between border-b border-linear-border px-6 py-4 bg-linear-bg">
            <Dialog.Title className="text-[15px] font-semibold tracking-tight text-linear-text flex items-center gap-2 font-poppins">
              <CreditCard size={16} className="text-linear-text-muted" />
              Checkout
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 opacity-70 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:opacity-100 focus:outline-none">
              <X
                size={18}
                className="text-linear-text-muted hover:text-linear-text transition-colors"
              />
            </Dialog.Close>
          </div>

          <div className="p-6 bg-linear-bg min-h-[280px] flex flex-col justify-center">
            {step === "form" ? (
              <form
                onSubmit={handlePay}
                className="space-y-5 animate-in fade-in slide-in-from-bottom-2"
              >
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 rounded-lg mb-2">
                  <div>
                    <p className="text-[13px] font-bold text-linear-text">
                      {packageAmount} Tea Coins
                    </p>
                    <p className="text-[11px] text-linear-text-muted mt-0.5">
                      One-time purchase
                    </p>
                  </div>
                  <div className="text-[16px] font-bold text-linear-text font-mono">
                    {price}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-linear-text-muted uppercase tracking-wider block">
                    Card Details
                  </label>
                  <div className="flex flex-col gap-px rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-black/10 dark:bg-white/10">
                    <input
                      type="text"
                      placeholder="Card number"
                      required
                      maxLength={19}
                      className="w-full bg-linear-bg py-2.5 px-3 text-[13px] text-linear-text focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all placeholder:text-linear-text-muted/50 font-mono"
                    />
                    <div className="flex gap-px">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        required
                        maxLength={5}
                        className="w-1/2 bg-linear-bg py-2.5 px-3 text-[13px] text-linear-text focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all placeholder:text-linear-text-muted/50 font-mono"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        required
                        maxLength={3}
                        className="w-1/2 bg-linear-bg py-2.5 px-3 text-[13px] text-linear-text focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all placeholder:text-linear-text-muted/50 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-linear-text text-linear-bg rounded-lg text-[13px] font-bold hover:opacity-90 transition-opacity shadow-sm"
                >
                  <Lock size={14} />
                  Pay {price}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-300 py-6">
                <div className="size-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-2">
                  <TriangleAlertIcon size={32} className="animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-linear-text font-poppins">
                  Ruk ja bhai! 🚧
                </h3>
                <p className="text-[14px] font-medium text-linear-text-muted max-w-[250px] leading-relaxed">
                  Sab abhi thodi hoga? Database and payment gateway integration
                  baaki hai.
                </p>
                <Dialog.Close asChild>
                  <button className="mt-4 px-6 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md text-[13px] font-semibold text-linear-text hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                    Theek hai samajh gaya
                  </button>
                </Dialog.Close>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
