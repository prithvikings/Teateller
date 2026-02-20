import { useState } from "react";
import {
  Moon,
  Sun,
  Laptop,
  Smartphone,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

import { ResetCodeModal } from "../components/modals/ResetCodeModal";
import { DeleteAccountModal } from "../components/modals/DeleteAccountModal";

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={cn(
      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
      checked ? "bg-linear-text" : "bg-black/10 dark:bg-white/10",
    )}
  >
    <span
      className={cn(
        "inline-block size-4 transform rounded-full bg-linear-bg transition duration-200",
        checked ? "translate-x-4" : "translate-x-1",
      )}
    />
  </button>
);

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout: authLogout } = useAuth();
  const [emailNotifs, setEmailNotifs] = useState(true);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      authLogout();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans pb-24 selection:bg-black/10 dark:selection:bg-white/20">
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border mb-8 font-poppins">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-[18px] font-semibold tracking-tight mb-1">
            Account Settings
          </h1>
          <p className="text-linear-text-muted text-[13px]">
            Manage your profile, preferences, and security.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <section>
          <h2 className="text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider mb-4">
            Profile
          </h2>
          <div className="p-5 rounded-lg border border-linear-border bg-linear-bg shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-black/5 dark:bg-white/5 border border-linear-border flex items-center justify-center font-bold text-linear-text">
                {user?.alias?.[0] || "G"}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[13px] text-linear-text">
                    {user?.email || "anonymous@teateller.com"}
                  </span>
                  <span className="bg-black/5 dark:bg-white/5 text-linear-text-muted text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-linear-border uppercase tracking-wider">
                    Private
                  </span>
                </div>
                <p className="text-[11px] text-linear-text-muted">
                  Linked via Google. This email is used for account recovery.
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-semibold text-linear-text border border-linear-border rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider mb-4">
            Preferences
          </h2>
          <div className="rounded-lg border border-linear-border bg-linear-bg shadow-sm divide-y divide-linear-border">
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-medium mb-1">
                  Email Notifications
                </h3>
                <p className="text-[11px] text-linear-text-muted">
                  Receive updates about your confessions and replies.
                </p>
              </div>
              <Toggle
                checked={emailNotifs}
                onChange={() => setEmailNotifs(!emailNotifs)}
              />
            </div>

            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-medium mb-1">Appearance</h3>
                <p className="text-[11px] text-linear-text-muted">
                  Customize how TeaTeller looks on your device.
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-3 py-1.5 rounded-md border border-linear-border hover:bg-black/5 transition-colors cursor-pointer"
              >
                <span className="text-[12px] font-medium">
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </span>
                <div className="size-7 rounded-md flex items-center justify-center bg-black/5 border border-linear-border">
                  {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
                </div>
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-semibold text-linear-text-muted uppercase tracking-wider mb-4">
            Security
          </h2>
          <div className="rounded-lg border border-linear-border bg-linear-bg shadow-sm divide-y divide-linear-border">
            <div className="p-5 flex items-center justify-between">
              <div className="max-w-lg pr-4">
                <h3 className="text-[13px] font-medium mb-1">
                  Global Secret Code
                </h3>
                <p className="text-[11px] text-linear-text-muted">
                  Your secret code is required to delete or edit confessions. It
                  is never stored in plain text.
                </p>
              </div>
              <ResetCodeModal>
                <button className="shrink-0 px-3 py-1.5 text-[12px] font-semibold border border-linear-border rounded-md hover:bg-black/5 cursor-pointer">
                  Reset Code
                </button>
              </ResetCodeModal>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-semibold text-red-500 uppercase tracking-wider mb-4">
            Danger Zone
          </h2>
          <div className="p-5 rounded-lg border border-red-500/20 bg-red-500/[0.02] flex items-center justify-between shadow-sm">
            <div className="max-w-lg pr-4">
              <h3 className="text-[13px] font-medium text-red-600 mb-1">
                Delete Account
              </h3>
              <p className="text-[11px] text-linear-text-muted leading-relaxed">
                Permanently remove your account and all confessions. This cannot
                be undone.
              </p>
            </div>
            <DeleteAccountModal>
              <button className="shrink-0 px-3 py-1.5 text-[12px] font-bold text-red-600 border border-red-500/20 rounded-md hover:bg-red-500/10 cursor-pointer">
                Delete Account
              </button>
            </DeleteAccountModal>
          </div>
        </section>
      </div>
    </div>
  );
}
