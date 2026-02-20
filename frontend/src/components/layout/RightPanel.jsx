import { ArrowRight, Trophy, Ghost } from "lucide-react";
import { TOPICS } from "../../data/mockData";
import { cn } from "../../lib/utils";

export function RightPanel() {
  return (
    <aside className="w-full max-w-[320px] flex-shrink-0 hidden xl:flex flex-col border-l border-linear-border bg-linear-bg h-screen p-6 overflow-y-auto sticky top-0 selection:bg-black/10 dark:selection:bg-white/20">
      <div className="mb-10">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-linear-text-muted font-poppins">
          Trending Topics
        </h2>
        <div className="flex flex-col gap-0.5">
          {TOPICS.map((topic) => (
            <a
              key={topic.tag}
              href="#"
              className="flex justify-between items-center group py-2.5 px-3 -mx-3 rounded-md hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-linear-text text-[13px] font-medium transition-colors">
                  #{topic.tag}
                </span>
                <span className="text-linear-text-muted text-[11px]">
                  {topic.count} posts
                </span>
              </div>
              <ArrowRight
                size={14}
                className="text-linear-text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-linear-text transition-all duration-200 ease-out"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="bg-black/[0.02] dark:bg-white/[0.02] rounded-xl p-5 border border-linear-border group cursor-pointer hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200">
          <div className="flex items-center gap-2.5 mb-3">
            <Trophy size={14} className="text-yellow-500 drop-shadow-sm" />
            <span className="text-[11px] font-bold text-linear-text-muted uppercase tracking-wider font-poppins">
              Daily Top
            </span>
          </div>
          <p className="text-linear-text/90 text-[13px] leading-relaxed italic mb-5">
            "My roommate thinks our apartment is haunted. It's me moving things
            slightly to the left."
          </p>
          <div className="flex items-center gap-3">
            <div className="size-6 rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center text-linear-text-muted border border-black/10 dark:border-white/10">
              <Ghost size={12} />
            </div>
            <span className="text-[12px] font-medium text-linear-text">
              Spooky Ghost #404
            </span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[11px] font-semibold uppercase tracking-wider mb-4 text-linear-text-muted font-poppins">
          Suggested Accounts
        </h2>
        <div className="flex flex-col gap-4">
          {["Gossip Queen", "Tech Insider"].map((name) => (
            <div key={name} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/10 dark:border-white/10 text-linear-text-muted text-[13px] font-bold font-poppins">
                  {name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-linear-text font-medium group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors cursor-pointer">
                    {name}
                  </span>
                  <span className="text-[11px] text-linear-text-muted">
                    Suggested for you
                  </span>
                </div>
              </div>
              <button className="text-linear-text text-[11px] font-semibold border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
