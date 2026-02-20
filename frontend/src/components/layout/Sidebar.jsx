import { Plus, MoreVertical, Coffee, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import { Home } from "../ui/home";
import { Flame } from "../ui/flame";
import { MessageCircleIcon } from "../ui/message-circle";
import { BellIcon } from "../ui/bell";
import { BookmarkIcon } from "../ui/bookmark";
import WalletIcon from "../ui/wallet-icon";

import { cn } from "../../lib/utils";
import { CreateConfessionModal } from "../modals/CreateConfessionModal";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [whisperCount, setWhisperCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      if (!user) return;
      try {
        const [whisperRes, savedRes] = await Promise.all([
          api.get("/users/me/whispers"),
          api.get("/bookmarks"),
        ]);

        if (whisperRes.data.success)
          setWhisperCount(whisperRes.data.data.length);
        if (savedRes.data.success) setSavedCount(savedRes.data.data.length);
      } catch (err) {
        console.error("Failed to fetch counts:", err);
      }
    };

    fetchCounts();
  }, [user]);

  const navItems = [
    { icon: Home, label: "Home Feed", path: "/", public: true },
    { icon: Flame, label: "Trending Tea", path: "/trending", public: true },
    {
      icon: MessageCircleIcon,
      label: "My Whispers",
      path: "/my-whispers",
      count: whisperCount,
      public: false,
    },
    {
      icon: BellIcon,
      label: "Notifications",
      path: "/notifications",
      public: false,
    },
    {
      icon: BookmarkIcon,
      label: "Saved",
      path: "/saved",
      count: savedCount,
      public: false,
    },
    { icon: WalletIcon, label: "Wallet", path: "/wallet", public: false },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavClick = (item) => {
    if (!item.public && !user) {
      navigate("/login");
    } else {
      navigate(item.path);
    }
  };

  return (
    <aside className="font-poppins w-64 flex-shrink-0 flex flex-col justify-between border-r border-linear-border bg-linear-bg h-screen sticky top-0 selection:bg-black/10 dark:selection:bg-white/20">
      <div className="flex flex-col gap-1 p-3">
        <div className="flex items-center gap-3 px-3 py-4 mb-2">
          <div className="flex items-center justify-center rounded-md bg-linear-text text-linear-bg size-6 shadow-sm">
            <Coffee size={14} strokeWidth={3} />
          </div>
          <h1 className="text-linear-text text-[15px] font-semibold tracking-tight">
            TeaTeller
          </h1>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isLocked = !item.public && !user;

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all group w-full text-left relative",
                  active
                    ? "bg-black/5 dark:bg-white/10 text-linear-text"
                    : "text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5",
                  isLocked && "opacity-60",
                )}
              >
                <Icon
                  size={18}
                  className={cn(
                    "size-4",
                    active ? "opacity-100" : "opacity-70",
                  )}
                />
                <span
                  className={cn(
                    "text-[13px]",
                    active ? "font-semibold" : "font-medium",
                  )}
                >
                  {item.label}
                </span>

                {item.count > 0 && user && (
                  <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-black/5 dark:bg-white/5 text-linear-text-muted">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-linear-border flex flex-col gap-3">
        {user ? (
          <>
            <CreateConfessionModal>
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-linear-text text-linear-bg hover:opacity-90 py-2 px-3 shadow-sm transition-opacity text-[13px] font-semibold cursor-pointer">
                <Plus size={16} />
                <span>New Confession</span>
              </button>
            </CreateConfessionModal>

            <div
              onClick={() => navigate("/settings")}
              className="flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer transition-colors group hover:bg-black/5 dark:hover:bg-white/5"
            >
              <div className="relative size-8 rounded-md bg-linear-border overflow-hidden border border-black/10 dark:border-white/10">
                <img
                  src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${user.avatarSeed}&backgroundColor=transparent`}
                  className="size-full p-1"
                />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-[13px] text-linear-text truncate w-32 font-medium">
                  {user.alias}
                </span>
                <span className="text-[11px] text-linear-text-muted capitalize">
                  {user.role || "Anonymous"}
                </span>
              </div>
              <MoreVertical
                size={16}
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-linear-text-muted"
              />
            </div>
          </>
        ) : (
          <div className="p-2 space-y-3">
            <p className="text-[11px] text-linear-text-muted leading-relaxed px-1">
              Sign in to share secrets and interact with the feed.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-linear-text text-linear-bg py-2 px-3 shadow-sm text-[13px] font-bold hover:opacity-90 transition-all"
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
