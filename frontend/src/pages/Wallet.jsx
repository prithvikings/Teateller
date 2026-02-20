import {
  Coins,
  CreditCard,
  ArrowDownRight,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Unlock,
} from "lucide-react";
import { cn } from "../lib/utils";
import { BuyCoinsModal } from "../components/modals/BuyCoinsModal";

const TRANSACTIONS = [
  {
    id: 1,
    type: "spend",
    action: "Unlocked Secret",
    target: "Office Drama #892",
    amount: 5,
    date: "2 hours ago",
  },
  {
    id: 2,
    type: "spend",
    action: "Tipped Author",
    target: "Ghost #404",
    amount: 20,
    date: "Yesterday",
  },
  {
    id: 3,
    type: "add",
    action: "Purchased Coins",
    target: "Starter Pack",
    amount: 100,
    date: "3 days ago",
  },
  {
    id: 4,
    type: "spend",
    action: "Feed Bump",
    target: "Your Confession",
    amount: 50,
    date: "Last week",
  },
];

export function Wallet() {
  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20 pb-24">
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border font-poppins">
        <div className="px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-[16px] font-semibold tracking-tight">Wallet</h1>
            <p className="text-[12px] font-medium text-linear-text-muted mt-0.5">
              Manage your Tea Coins and transactions.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-7 rounded-2xl border border-linear-border bg-linear-bg shadow-sm flex flex-col justify-center relative overflow-hidden group">
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-linear-text-muted">
                <Coins size={16} className="text-amber-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider font-poppins">
                  Current Balance
                </span>
              </div>
              <div className="text-6xl font-bold font-poppins tracking-tighter mb-8 text-linear-text">
                1,245
                <span className="text-xl text-linear-text-muted font-semibold ml-2 tracking-normal">
                  Coins
                </span>
              </div>
              <div className="flex gap-3">
                <BuyCoinsModal packageAmount="Custom" price="TBD">
                  <button className="flex-1 bg-linear-text text-linear-bg py-3 rounded-lg text-[13px] font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
                    <CreditCard size={16} />
                    Buy More
                  </button>
                </BuyCoinsModal>
                <button className="px-5 py-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-linear-text text-[13px] font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                  Redeem
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-7 rounded-2xl border border-linear-border bg-black/[0.02] dark:bg-white/[0.02] flex flex-col justify-center space-y-6">
            <h3 className="text-[14px] font-bold font-poppins">
              What can I do with Coins?
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[13px] text-linear-text-muted leading-relaxed">
                <div className="p-1.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-indigo-500 shrink-0">
                  <Unlock size={14} />
                </div>
                <span>
                  <strong className="text-linear-text font-semibold">
                    Unlock Secrets:
                  </strong>{" "}
                  Read blurred, premium confessions from top users.
                </span>
              </li>
              <li className="flex items-start gap-3 text-[13px] text-linear-text-muted leading-relaxed">
                <div className="p-1.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-amber-500 shrink-0">
                  <Zap size={14} />
                </div>
                <span>
                  <strong className="text-linear-text font-semibold">
                    Feed Bumps:
                  </strong>{" "}
                  Push your confession to the top of Trending.
                </span>
              </li>
              <li className="flex items-start gap-3 text-[13px] text-linear-text-muted leading-relaxed">
                <div className="p-1.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-emerald-500 shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <span>
                  <strong className="text-linear-text font-semibold">
                    Anonymity Guaranteed:
                  </strong>{" "}
                  Purchases are never linked to your alias.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[11px] font-bold text-linear-text-muted uppercase tracking-wider font-poppins">
              Refill Coins
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <BuyCoinsModal packageAmount="100" price="$0.99">
              <div className="p-6 rounded-xl border border-linear-border bg-linear-bg flex flex-col items-center text-center hover:border-black/20 dark:hover:border-white/20 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1">
                <div className="size-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-4">
                  <Coins
                    size={20}
                    className="text-linear-text-muted group-hover:text-amber-500 transition-colors"
                  />
                </div>
                <h3 className="text-[14px] font-semibold mb-1 font-poppins">
                  Starter
                </h3>
                <p className="text-3xl font-bold font-poppins tracking-tight mb-1">
                  100{" "}
                  <span className="text-[13px] text-linear-text-muted font-medium">
                    Coins
                  </span>
                </p>
                <p className="text-[13px] font-medium text-linear-text-muted mb-6">
                  $0.99
                </p>
                <button className="w-full py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-[13px] font-semibold group-hover:bg-linear-text group-hover:text-linear-bg transition-colors">
                  Select
                </button>
              </div>
            </BuyCoinsModal>

            <BuyCoinsModal packageAmount="500" price="$3.99">
              <div className="p-6 rounded-xl border-2 border-linear-text bg-linear-bg flex flex-col items-center text-center relative cursor-pointer group shadow-lg hover:-translate-y-1 transition-transform">
                <div className="absolute -top-3 bg-linear-text text-linear-bg text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
                <div className="size-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 shadow-sm">
                  <Coins size={20} className="text-amber-500" />
                </div>
                <h3 className="text-[14px] font-semibold mb-1 font-poppins">
                  Tea Drinker
                </h3>
                <p className="text-3xl font-bold font-poppins tracking-tight mb-1">
                  500{" "}
                  <span className="text-[13px] text-linear-text-muted font-medium">
                    Coins
                  </span>
                </p>
                <p className="text-[13px] font-medium text-linear-text-muted mb-6">
                  $3.99{" "}
                  <span className="text-[10px] font-bold text-emerald-500 ml-1">
                    SAVE 20%
                  </span>
                </p>
                <button className="w-full py-2.5 bg-linear-text text-linear-bg rounded-lg text-[13px] font-bold hover:opacity-90 transition-opacity shadow-sm">
                  Select
                </button>
              </div>
            </BuyCoinsModal>

            <BuyCoinsModal packageAmount="2,000" price="$12.99">
              <div className="p-6 rounded-xl border border-linear-border bg-linear-bg flex flex-col items-center text-center hover:border-black/20 dark:hover:border-white/20 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1">
                <div className="size-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mb-4">
                  <Coins
                    size={20}
                    className="text-linear-text-muted group-hover:text-amber-500 transition-colors"
                  />
                </div>
                <h3 className="text-[14px] font-semibold mb-1 font-poppins">
                  The Gossip
                </h3>
                <p className="text-3xl font-bold font-poppins tracking-tight mb-1">
                  2,000{" "}
                  <span className="text-[13px] text-linear-text-muted font-medium">
                    Coins
                  </span>
                </p>
                <p className="text-[13px] font-medium text-linear-text-muted mb-6">
                  $12.99{" "}
                  <span className="text-[10px] font-bold text-emerald-500 ml-1">
                    SAVE 35%
                  </span>
                </p>
                <button className="w-full py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-[13px] font-semibold group-hover:bg-linear-text group-hover:text-linear-bg transition-colors">
                  Select
                </button>
              </div>
            </BuyCoinsModal>
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-bold text-linear-text-muted uppercase tracking-wider mb-4 font-poppins">
            Recent Transactions
          </h2>
          <div className="rounded-xl border border-linear-border bg-linear-bg overflow-hidden shadow-sm">
            <div className="divide-y divide-linear-border/50">
              {TRANSACTIONS.map((tx) => (
                <div
                  key={tx.id}
                  className="p-5 flex items-center justify-between hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "size-10 rounded-full flex items-center justify-center border",
                        tx.type === "add"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                          : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-linear-text-muted",
                      )}
                    >
                      {tx.type === "add" ? (
                        <ArrowDownRight size={16} />
                      ) : (
                        <ArrowUpRight size={16} />
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-linear-text">
                        {tx.action}
                      </p>
                      <p className="text-[12px] text-linear-text-muted mt-0.5">
                        {tx.target} • {tx.date}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-[15px] font-bold font-mono tracking-tight",
                      tx.type === "add"
                        ? "text-emerald-500"
                        : "text-linear-text",
                    )}
                  >
                    {tx.type === "add" ? "+" : "-"}
                    {tx.amount}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-linear-border bg-black/[0.01] dark:bg-white/[0.01]">
              <button className="w-full py-2.5 rounded-lg text-[12px] font-semibold text-linear-text-muted hover:text-linear-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                View All History
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
