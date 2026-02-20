import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { ConfessionCard } from "../components/feed/ConfessionCard";
import { Header } from "./Header";
import { api } from "../lib/api";

export function HomeFeed() {
  const location = useLocation();
  const [isExploding, setIsExploding] = useState(false);
  const [confessions, setConfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("All");
  const [activeSort, setActiveSort] = useState("latest");

  useEffect(() => {
    if (location.state?.showConfetti) {
      setIsExploding(true);
      window.history.replaceState({}, document.title);
      setTimeout(() => setIsExploding(false), 5000);
    }
  }, [location]);

  useEffect(() => {
    const fetchFeed = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (activeTopic !== "All") params.append("topic", activeTopic);
        params.append("sort", activeSort);

        const response = await api.get(`/confessions?${params.toString()}`);
        if (response.data.success) {
          setConfessions(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load feed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchFeed, searchQuery ? 400 : 0);
    return () => clearTimeout(timer);
  }, [searchQuery, activeTopic, activeSort]);

  return (
    <div className="min-h-screen bg-linear-bg relative">
      {isExploding && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Confetti recycle={false} numberOfPieces={400} />
        </div>
      )}

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />

      <div className="p-5 pb-24">
        <div className="w-full mx-auto flex flex-col gap-4">
          {isLoading ? (
            <div className="text-center text-linear-text-muted py-10 font-poppins text-sm">
              Brewing fresh tea...
            </div>
          ) : confessions.length === 0 ? (
            <div className="text-center text-linear-text-muted py-10 font-poppins text-sm">
              No secrets found in this void.
            </div>
          ) : (
            confessions.map((post) => (
              <ConfessionCard key={post._id} data={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
