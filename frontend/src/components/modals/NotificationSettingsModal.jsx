import * as Dialog from "@radix-ui/react-dialog";
import { X, BellRing, Mail, Smartphone, Flame } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={cn(
      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20",
      checked ? "bg-linear-text" : "bg-black/10 dark:bg-white/10",
    )}
  >
    <span
      className={cn(
        "pointer-events-none inline-block size-4 transform rounded-full bg-linear-bg shadow-sm ring-0 transition duration-200 ease-in-out",
        checked ? "translate-x-4" : "translate-x-0",
      )}
    />
  </button>
);

export function NotificationSettingsModal({ children }) {
  const [open, setOpen] = useState(false);

  const [settings, setSettings] = useState({
    push: true,
    email: false,
    comments: true,
    reactions: false,
    trending: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log("Saved Settings:", settings);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-0 border border-linear-border bg-linear-bg shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl overflow-hidden font-sans selection:bg-black/10 dark:selection:bg-white/20">
          <div className="flex items-center justify-between border-b border-linear-border px-6 py-4 bg-linear-bg">
            <Dialog.Title className="text-[15px] font-semibold tracking-tight text-linear-text font-poppins">
              Notification Preferences
            </Dialog.Title>
            <Dialog.Close className="rounded-md p-1 opacity-70 transition-colors hover:bg-black/5 dark:hover:bg-white/5 hover:opacity-100 focus:outline-none">
              <X
                size={18}
                className="text-linear-text-muted hover:text-linear-text transition-colors"
              />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="px-6 py-6 space-y-6 bg-linear-bg">
            <div className="space-y-4">
              <h3 className="text-[10px] font-semibold text-linear-text-muted uppercase tracking-wider">
                Delivery Methods
              </h3>

              <div className="flex items-center justify-between p-3 rounded-lg border border-linear-border bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/10">
                    <Smartphone size={16} className="text-linear-text" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-linear-text">
                      Push Notifications
                    </p>
                    <p className="text-[11px] text-linear-text-muted">
                      Receive alerts on this device.
                    </p>
                  </div>
                </div>
                <Toggle
                  checked={settings.push}
                  onChange={() => toggleSetting("push")}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-linear-border bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/10">
                    <Mail size={16} className="text-linear-text" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-linear-text">
                      Email Digest
                    </p>
                    <p className="text-[11px] text-linear-text-muted">
                      A daily summary of missed activity.
                    </p>
                  </div>
                </div>
                <Toggle
                  checked={settings.email}
                  onChange={() => toggleSetting("email")}
                />
              </div>
            </div>

            <div className="h-px bg-linear-border w-full" />

            <div className="space-y-4">
              <h3 className="text-[10px] font-semibold text-linear-text-muted uppercase tracking-wider">
                Notify me when
              </h3>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <BellRing size={14} className="text-linear-text-muted" />
                  <span className="text-[13px] font-medium text-linear-text">
                    Comments & Replies
                  </span>
                </div>
                <Toggle
                  checked={settings.comments}
                  onChange={() => toggleSetting("comments")}
                />
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-linear-text ml-6">
                    Likes & Reactions
                  </span>
                </div>
                <Toggle
                  checked={settings.reactions}
                  onChange={() => toggleSetting("reactions")}
                />
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <Flame size={14} className="text-linear-text-muted" />
                  <span className="text-[13px] font-medium text-linear-text">
                    Trending Alerts
                  </span>
                </div>
                <Toggle
                  checked={settings.trending}
                  onChange={() => toggleSetting("trending")}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-linear-border px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02]">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-[12px] font-medium text-linear-text-muted hover:text-linear-text transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-linear-text text-linear-bg rounded-md text-[12px] font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              Save Preferences
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
