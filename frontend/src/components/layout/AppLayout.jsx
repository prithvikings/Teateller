import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { RightPanel } from "./RightPanel";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_320px]">
        <Sidebar />
        <main className="min-h-screen border-r border-linear-border relative">
          <Outlet />
        </main>

        <RightPanel />
      </div>
    </div>
  );
}
