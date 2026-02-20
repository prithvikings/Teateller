import {
  Heart,
  MessageCircle,
  Eye,
  ShieldCheck,
  Megaphone,
  Settings,
  Check,
  Bell,
  X,
} from "lucide-react";
import { useState } from "react";
import { NOTIFICATIONS } from "../data/temp";
import { cn } from "../lib/utils";
import { NotificationSettingsModal } from "../components/modals/NotificationSettingsModal";
import { TriangleAlertIcon } from "../components/ui/triangle-alert-icon";

const getNotificationStyle = (type) => {
  switch (type) {
    case "like":
      return {
        icon: <Heart size={14} className="fill-current" />,
        theme:
          "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
      };
    case "comment":
      return {
        icon: <MessageCircle size={14} className="fill-current" />,
        theme:
          "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
      };
    case "view":
      return {
        icon: <Eye size={14} />,
        theme:
          "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      };
    case "security":
      return {
        icon: <ShieldCheck size={14} />,
        theme:
          "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      };
    case "system":
      return {
        icon: <Megaphone size={14} />,
        theme:
          "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20",
      };
    default:
      return {
        icon: <Bell size={14} />,
        theme:
          "text-linear-text-muted bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10",
      };
  }
};

export function Notifications() {
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border px-6 py-5 flex items-center justify-between font-poppins">
        <div className="flex items-center gap-4">
          <h1 className="text-[15px] font-semibold tracking-tight">Activity</h1>
          {unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-sm tracking-wide">
              {unreadCount} NEW
            </span>
          )}
        </div>
        <button className="flex items-center gap-1.5 text-[11px] font-semibold text-linear-text-muted hover:text-linear-text transition-colors bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 py-1.5 rounded-md cursor-pointer">
          <Check size={14} />
          MARK ALL READ
        </button>
      </div>

      <div className="max-w-3xl mx-auto p-6 pb-24">
        {showWarning && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 relative animate-in fade-in slide-in-from-top-2">
            <TriangleAlertIcon
              size={18}
              className="text-amber-500 shrink-0 mt-0.5"
            />
            <div className="pr-6">
              <h3 className="text-[13px] font-bold text-amber-600 dark:text-amber-500 mb-1 font-poppins">
                Work in Progress 🚧
              </h3>
              <p className="text-[12px] font-medium text-amber-600/80 dark:text-amber-400/80 leading-relaxed">
                2 din aur de do, notification realtime hona chahiye aur uske
                liye websocket connect karna hoga. Mera roll no 18 hai jaldi aa
                gaya hai, 2 din ka aur samay de do implement kar dunga!
              </p>
            </div>
            <button
              onClick={() => setShowWarning(false)}
              className="absolute top-4 right-4 text-amber-500/60 hover:text-amber-500 transition-colors p-1"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div className="border border-linear-border rounded-lg bg-linear-bg overflow-hidden shadow-sm">
          <div className="divide-y divide-linear-border/50">
            {NOTIFICATIONS.map((item) => {
              const style = getNotificationStyle(item.type);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "group flex gap-4 p-4 transition-colors duration-200 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02]",
                    item.unread
                      ? "bg-blue-500/[0.03] dark:bg-blue-500/[0.05]"
                      : "bg-transparent",
                  )}
                >
                  <div className="pt-0.5 shrink-0">
                    <div
                      className={cn(
                        "size-8 rounded-full flex items-center justify-center border",
                        style.theme,
                      )}
                    >
                      {style.icon}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-[13px] leading-relaxed font-poppins">
                      <span className="font-semibold text-linear-text">
                        {item.user}
                      </span>{" "}
                      <span className="text-linear-text-muted">
                        {item.action}
                      </span>{" "}
                      <span className="font-medium text-linear-text">
                        {item.target}
                      </span>
                    </p>
                    <p className="text-[11px] text-linear-text-muted mt-1.5 font-medium">
                      {item.time}
                    </p>
                  </div>

                  {item.unread && (
                    <div className="flex items-center justify-center pl-2 shrink-0">
                      <div className="size-2 bg-blue-500 dark:bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <NotificationSettingsModal>
            <button className="flex items-center gap-2 text-[12px] font-medium text-linear-text-muted hover:text-linear-text transition-colors px-4 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
              <Settings size={14} />
              Notification Settings
            </button>
          </NotificationSettingsModal>
        </div>
      </div>
    </div>
  );
}
