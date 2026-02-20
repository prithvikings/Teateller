import { motion, useAnimation } from "motion/react";
import { forwardRef, useImperativeHandle } from "react";

const SVG_VARIANTS = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -10, 10, -10, 0] },
};

export const BellIcon = forwardRef(
  ({ className, size = 28, ...props }, ref) => {
    const controls = useAnimation();

    useImperativeHandle(ref, () => ({
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    }));

    return (
      <motion.svg
        className={className}
        animate={controls}
        initial="normal"
        variants={SVG_VARIANTS}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        fill="none"
        height={size}
        width={size}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </motion.svg>
    );
  },
);

BellIcon.displayName = "BellIcon";
