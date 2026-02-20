import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PawPrint, Zap, Moon } from "lucide-react";
import { ArrowBigUpIcon } from "../ui/arrow-big-up";
import { ArrowBigDownIcon } from "../ui/arrow-big-down";
import { MessageCircleIcon } from "../ui/message-circle";
import { CircleDollarSignIcon as BadgeDollarSignIcon } from "../ui/circle-dollar-sign";
import { PostOptionsMenu } from "../modals/post-options-menu";
import { InteractiveAction } from "../ui/interactive-action";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";

const AvatarIcon = ({ name }) => {
  if (!name) return <Zap size={14} />;
  if (name.includes("Tiger")) return <PawPrint size={14} />;
  if (name.includes("Owl")) return <Moon size={14} />;
  return <Zap size={14} />;
};

export function ConfessionCard({ data }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [votes, setVotes] = useState({
    upvotes: data.upvotes || 0,
    downvotes: data.downvotes || 0,
    userVote:
      data.voters?.find((v) => v.userId === user?._id)?.voteType || null,
  });
  const [isVoting, setIsVoting] = useState(false);

  const authorAlias = data.authorAlias || data.author?.alias || "Unknown Ghost";
  const authorAvatar = data.authorAvatar || data.author?.avatarSeed;
  const isOwnPost =
    user && (data.authorId === user._id || data.author?._id === user._id);

  const getTagStyles = (tag) => {
    switch (tag) {
      case "College":
        return "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "Spiciest":
        return "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20";
      case "DeepThoughts":
        return "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20";
      default:
        return "text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20";
    }
  };

  const handleVote = async (e, type) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }

    if (isVoting) return;
    setIsVoting(true);

    try {
      const action = type === "up" ? "upvote" : "downvote";
      const response = await api.post(`/confessions/${data._id}/vote`, {
        action,
      });

      if (response.data.success) {
        setVotes({
          upvotes: response.data.data.upvotes,
          downvotes: response.data.data.downvotes,
          userVote: response.data.data.userVote,
        });
      }
    } catch (error) {
      console.error("Voting failed:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div
      onClick={() => navigate(`/confession/${data._id}`)}
      className="relative rounded-lg bg-linear-bg border font-sans border-linear-border p-5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "size-8 rounded-sm flex items-center justify-center text-linear-text-muted border border-black/10 dark:border-white/10",
              data.avatarColor || "bg-black/5 dark:bg-white/5",
            )}
          >
            {authorAvatar ? (
              <img
                src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${authorAvatar}&backgroundColor=transparent`}
                alt="Avatar"
                className="size-full object-contain p-1"
              />
            ) : (
              <AvatarIcon name={authorAlias} />
            )}
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-linear-text font-medium text-[13px]">
              {authorAlias}
            </h3>
            <span className="text-linear-text-muted text-[11px]">
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <PostOptionsMenu
          postId={data._id}
          isOwnPost={isOwnPost}
          currentContent={data.content}
        />
      </div>

      <p className="text-linear-text/90 text-[13px] leading-relaxed font-poppins mb-5 text-left">
        {data.content}
      </p>

      {data.topic && (
        <div className="flex items-center gap-2 mb-5">
          <span
            className={cn(
              "text-[11px] px-2 py-0.5 rounded-sm border font-medium",
              getTagStyles(data.topic),
            )}
          >
            #{data.topic}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-linear-border/50">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full px-3 py-1">
            <InteractiveAction
              icon={ArrowBigUpIcon}
              label={votes.upvotes}
              onClick={(e) => handleVote(e, "up")}
              hoverTextClass={
                votes.userVote === "upvote"
                  ? "text-rose-500"
                  : "hover:text-rose-500"
              }
              iconHoverClass={
                votes.userVote === "upvote"
                  ? "fill-rose-500/20 text-rose-500"
                  : "group-hover:fill-rose-500/20"
              }
            />
            <div className="w-px h-3 bg-black/10 dark:bg-white/10" />
            <InteractiveAction
              icon={ArrowBigDownIcon}
              label={votes.downvotes}
              onClick={(e) => handleVote(e, "down")}
              hoverTextClass={
                votes.userVote === "downvote"
                  ? "text-blue-500"
                  : "hover:text-blue-500"
              }
              iconHoverClass={
                votes.userVote === "downvote"
                  ? "fill-blue-500/20 text-blue-500"
                  : "group-hover:fill-blue-500/20"
              }
            />
          </div>

          <div className="flex items-center gap-4">
            <InteractiveAction
              icon={MessageCircleIcon}
              label={data.commentsCount || 0}
              onClick={(e) => {
                e.stopPropagation();
                if (!user) return navigate("/login");
                navigate(`/confession/${data._id}`);
              }}
              hoverTextClass="hover:text-indigo-500 dark:hover:text-indigo-400"
            />
            <InteractiveAction
              icon={BadgeDollarSignIcon}
              label={data.dollarCoin || 0}
              hoverTextClass="hover:text-emerald-500 dark:hover:text-emerald-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
