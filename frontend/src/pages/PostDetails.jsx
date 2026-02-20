import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare, PawPrint, Moon, Zap } from "lucide-react";
import { api } from "../lib/api";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

import { ArrowBigUpIcon } from "../components/ui/arrow-big-up";
import { ArrowBigDownIcon } from "../components/ui/arrow-big-down";
import { MessageCircleIcon } from "../components/ui/message-circle";
import { CircleDollarSignIcon as BadgeDollarSignIcon } from "../components/ui/circle-dollar-sign";
import { PostOptionsMenu } from "../components/modals/post-options-menu";

const AvatarIcon = ({ name }) => {
  if (!name) return <Zap size={14} />;
  if (name.includes("Tiger")) return <PawPrint size={14} />;
  if (name.includes("Owl")) return <Moon size={14} />;
  return <Zap size={14} />;
};

const InteractiveAction = ({
  icon: Icon,
  label,
  onClick,
  hoverTextClass = "hover:text-linear-text",
  iconHoverClass = "",
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-1.5 text-linear-text-muted transition-colors group",
      hoverTextClass,
    )}
  >
    <Icon
      size={18}
      className={cn(
        "opacity-70 group-hover:opacity-100 transition-all",
        iconHoverClass,
      )}
    />
    {label !== undefined && (
      <span className="text-xs font-medium">{label}</span>
    )}
  </button>
);

export function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          api.get(`/confessions/${id}`),
          api.get(`/confessions/${id}/comments`),
        ]);
        if (postRes.data.success) setPost(postRes.data.data);
        setComments(commentRes.data.data || []);
      } catch (error) {
        console.error("Failed to load thread:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchThread();
  }, [id]);

  const handleVote = async (action) => {
    try {
      const { data: res } = await api.post(`/confessions/${id}/vote`, {
        action,
      });
      if (res.success) {
        setPost((prev) => ({
          ...prev,
          upvotes: res.data.upvotes,
          downvotes: res.data.downvotes,
        }));
      }
    } catch (err) {
      console.error("Vote failed");
    }
  };

  const handlePostComment = async (e) => {
    if (e) e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { data: res } = await api.post(`/confessions/${id}/comments`, {
        content: commentText,
      });
      if (res.success) {
        setComments([res.data, ...comments]);
        setCommentText("");
        setPost((prev) => ({
          ...prev,
          commentsCount: (prev.commentsCount || 0) + 1,
        }));
      }
    } catch (err) {
      alert("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading)
    return (
      <div className="p-20 text-center text-sm text-linear-text-muted font-poppins animate-pulse">
        Brewing the thread...
      </div>
    );
  if (!post)
    return (
      <div className="p-20 text-center text-sm text-red-500 font-poppins">
        Post vanished into the void.
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-linear-bg text-linear-text font-sans selection:bg-black/10 dark:selection:bg-white/20">
      <div className="sticky top-0 z-20 bg-linear-bg/90 backdrop-blur-xl border-b border-linear-border px-5 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-1 text-linear-text-muted hover:text-linear-text transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-[15px] font-semibold tracking-tight font-poppins">
          Thread
        </h1>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full p-5 space-y-6 pb-32">
        <div className="relative rounded-lg bg-linear-bg border border-linear-border p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-sm flex items-center justify-center text-linear-text-muted border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                {post.authorAvatar ? (
                  <img
                    src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${post.authorAvatar}&backgroundColor=transparent`}
                    className="size-full p-1"
                    alt="avatar"
                  />
                ) : (
                  <AvatarIcon name={post.authorAlias} />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-linear-text font-medium text-[13px]">
                  {post.authorAlias}
                </h3>
                <span className="text-linear-text-muted text-[11px]">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <PostOptionsMenu
              postId={post._id}
              isOwnPost={user?._id === post.authorId}
              currentContent={post.content}
            />
          </div>

          <p className="text-linear-text/90 text-[14px] leading-relaxed font-poppins mb-6">
            {post.content}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-linear-border/50">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full px-3 py-1">
                <InteractiveAction
                  icon={ArrowBigUpIcon}
                  label={post.upvotes}
                  onClick={() => handleVote("upvote")}
                  hoverTextClass="hover:text-rose-500"
                  iconHoverClass="group-hover:fill-rose-500/20"
                />
                <div className="w-px h-3 bg-black/10 dark:bg-white/10" />
                <InteractiveAction
                  icon={ArrowBigDownIcon}
                  label={post.downvotes}
                  onClick={() => handleVote("downvote")}
                  hoverTextClass="hover:text-blue-500"
                  iconHoverClass="group-hover:fill-blue-500/20"
                />
              </div>
              <InteractiveAction
                icon={MessageCircleIcon}
                label={post.commentsCount || 0}
                hoverTextClass="hover:text-indigo-500"
              />
              <InteractiveAction
                icon={BadgeDollarSignIcon}
                label={post.dollarCoin || 0}
                hoverTextClass="hover:text-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-2">
          <div className="flex items-center gap-2 px-1">
            <span className="text-[11px] font-bold text-linear-text-muted uppercase tracking-wider">
              Discussion
            </span>
            <div className="h-px flex-1 bg-linear-border/50" />
          </div>

          <div className="space-y-5">
            {comments.length === 0 ? (
              <p className="text-center text-[12px] text-linear-text-muted py-10 font-medium">
                No whispers here yet.
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="flex gap-3 px-1 group">
                  <div className="flex-shrink-0 size-7 rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center text-[10px] text-linear-text-muted border border-black/10">
                    {comment.authorAlias ? comment.authorAlias[0] : "G"}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[13px] text-linear-text">
                        {comment.authorAlias}
                      </span>
                      <span className="text-[10px] text-linear-text-muted">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-linear-text/90 text-[13px] leading-relaxed font-poppins">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-linear-border bg-linear-bg/90 backdrop-blur-xl p-3">
        <form
          onSubmit={handlePostComment}
          className="flex gap-2 max-w-3xl mx-auto"
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add to the discussion..."
            className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md py-2 px-3 text-[13px] text-linear-text outline-none focus:border-black/30 transition-all placeholder:text-linear-text-muted/60"
          />
          <button
            type="submit"
            disabled={!commentText.trim() || isSubmitting}
            className="bg-linear-text text-linear-bg px-4 py-2 rounded-md text-[12px] font-bold hover:opacity-90 disabled:opacity-50 transition-all"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
