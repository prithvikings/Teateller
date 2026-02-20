import { useRef } from "react";
import { cn } from "../../lib/utils";

export const InteractiveAction = ({
  icon: Icon,
  label,
  onClick,
  hoverTextClass = "hover:text-linear-text",
  iconHoverClass = "",
  className,
}) => {
  const iconRef = useRef(null);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      className={cn(
        "flex items-center gap-1.5 text-linear-text-muted transition-colors group",
        hoverTextClass,
        className,
      )}
    >
      <Icon
        ref={iconRef}
        size={16}
        className={cn(
          "opacity-70 group-hover:opacity-100 transition-all",
          iconHoverClass,
        )}
      />
      {label !== undefined && (
        <span className="text-[12px] font-medium">{label}</span>
      )}
    </button>
  );
};
