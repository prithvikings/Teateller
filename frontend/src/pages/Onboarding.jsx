import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ghost, Sparkles, Check, ChevronRight, Dices } from "lucide-react";
import { cn } from "../lib/utils";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const INTERESTS = [
  "Work Drama",
  "College Life",
  "Relationships",
  "Tech Industry",
  "Spiciest",
  "Deep Thoughts",
  "Petty Complaints",
  "Finances",
];

export function Onboarding() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [alias, setAlias] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState("");

  useEffect(() => {
    setAvatarSeed(Math.random().toString(36).substring(7));
  }, []);

  const avatarUrl = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${avatarSeed}&backgroundColor=transparent`;

  const generateNewAvatar = () => {
    setAvatarSeed(Math.random().toString(36).substring(7));
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };
  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.post("/users/onboard", {
        alias,
        interests: selectedInterests,
        avatarSeed,
      });

      if (response.data.success) {
        await fetchUser();
        navigate("/", { state: { showConfetti: true }, replace: true });
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    alias.trim().length > 2 && selectedInterests.length > 0 && !isSubmitting;

  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans flex flex-col selection:bg-black/10 dark:selection:bg-white/20">
      <div className="w-full border-b border-linear-border px-6 py-4 flex items-center justify-between">
        <span className="font-poppins font-bold tracking-tight text-[15px]">
          TeaTeller
        </span>
        <span className="text-[11px] font-semibold text-linear-text-muted tracking-wider uppercase">
          Account Setup
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight font-poppins mb-2">
              Create your alter ego
            </h1>
            <p className="text-[13px] text-linear-text-muted">
              You are completely anonymous here. Pick an avatar, a ghost name,
              and tell us what you want to read about.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative size-24 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center p-3 shadow-sm">
              {avatarSeed && (
                <img
                  src={avatarUrl}
                  alt="Random Avatar"
                  className="size-full object-contain drop-shadow-sm"
                />
              )}
            </div>
            <button
              onClick={generateNewAvatar}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[11px] font-bold text-linear-text-muted hover:text-linear-text transition-colors uppercase tracking-wider"
            >
              <Dices size={14} />
              Shuffle Avatar
            </button>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold text-linear-text-muted uppercase tracking-wider flex items-center gap-2">
              <Ghost size={14} />
              Your Ghost Alias
            </label>
            <div className="relative">
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="e.g. Spooky Tech Bro"
                maxLength={20}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg py-3 px-4 text-[14px] text-linear-text focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all placeholder:text-linear-text-muted/50 font-medium"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-linear-text-muted font-mono">
                {alias.length}/20
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold text-linear-text-muted uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} />
              What brings you here?
            </label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-medium border transition-all duration-200",
                      isSelected
                        ? "bg-linear-text text-linear-bg border-transparent shadow-sm"
                        : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-linear-text-muted hover:text-linear-text hover:border-black/20 dark:hover:border-white/20",
                    )}
                  >
                    {isSelected && <Check size={14} />}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-linear-border">
            <button
              onClick={handleComplete}
              disabled={!isFormValid}
              className="w-full flex items-center justify-center gap-2 bg-linear-text text-linear-bg py-3 rounded-lg text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-sm group"
            >
              {isSubmitting ? "Entering the Void..." : "Enter the Void"}
              {!isSubmitting && (
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
