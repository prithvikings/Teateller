import { X, Lock, EyeOff } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";
import { useState } from "react";

export function CreateConfessionModal() {
  const [topic, setTopic] = useState("Work");
  const [content, setContent] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
      <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-linear-border bg-linear-bg p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <div className="flex items-center justify-between border-b border-linear-border px-6 py-4">
          <Dialog.Title className="text-lg font-semibold text-linear-text">
            Create Confession
          </Dialog.Title>
          <Dialog.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X
              size={18}
              className="text-linear-text-muted hover:text-linear-text"
            />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </div>

        <div className="px-6 py-4 space-y-6">
          <div>
            <label className="text-xs font-bold text-linear-text-muted uppercase tracking-wider mb-3 block">
              TOPIC
            </label>
            <div className="flex gap-2">
              {["Love", "Work", "Petty", "Secret"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium border transition-all",
                    topic === t
                      ? "bg-white text-black border-white"
                      : "bg-transparent border-linear-border text-linear-text-muted hover:text-linear-text hover:bg-white/5",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-linear-text">
                Content
              </label>
              <span className="text-[10px] text-linear-text-muted bg-white/5 px-1.5 py-0.5 rounded border border-linear-border">
                Markdown supported
              </span>
            </div>
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={500}
                placeholder="Write your confession here..."
                className="w-full h-32 bg-linear-surface/50 border border-linear-border rounded-lg p-4 text-sm text-linear-text focus:outline-none focus:ring-1 focus:ring-linear-border transition-all placeholder:text-zinc-600 resize-none"
              />
              <span className="absolute bottom-3 right-3 text-xs text-linear-text-muted">
                {content.length}/500
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-linear-text mb-3 block">
              Deletion Code
            </label>
            <div className="flex items-start gap-6">
              <div className="flex gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="size-10 text-center bg-linear-surface/50 border border-linear-border rounded-md text-lg font-bold text-linear-text focus:outline-none focus:ring-1 focus:ring-linear-border transition-all"
                  />
                ))}
              </div>
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-linear-text-muted">
                  <Lock size={12} />
                  <span>End-to-end encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-linear-text-muted">
                  <EyeOff size={12} />
                  <span>No IP logging</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-linear-text-muted mt-2">
              Four digits to secure your post.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-linear-border px-6 py-4 bg-linear-surface/30">
          <Dialog.Close asChild>
            <button className="px-4 py-2 text-sm font-medium text-linear-text-muted hover:text-linear-text transition-colors">
              Cancel
            </button>
          </Dialog.Close>
          <button className="px-4 py-2 bg-white text-black rounded-md text-sm font-bold hover:bg-white/90 transition-colors shadow-sm">
            Post Anonymously
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
