"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { animationConfig, useAnimationPerformance } from "@/lib/animations";

type GlassCardProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  hover?: boolean;
  glassLevel?: "light" | "medium" | "heavy" | "branded";
  brandColor?: string;
  interactive?: boolean;
  glowOnHover?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
  role?: string;
  "aria-label"?: string;
};

// Multi-layer glass effect system with performance optimizations
const GlassLayers = {
  light: "bg-white/50 backdrop-blur-sm border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
  medium: "bg-white/70 backdrop-blur-md border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
  heavy: "bg-white/80 backdrop-blur-lg border border-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.16)]",
  branded: () => `
    relative overflow-hidden
    bg-gradient-to-br from-white/80 to-white/60
    backdrop-blur-md
    border border-white/30
    shadow-[0_8px_32px_rgba(0,0,0,0.12)]
    before:absolute before:inset-0 before:bg-gradient-to-br
    before:opacity-20 before:pointer-events-none
  `
};

// Enhanced glass card with performance optimizations and brand integration
export default function GlassCard({
  children,
  className,
  hover = true,
  glassLevel = "medium",
  brandColor,
  interactive = true,
  glowOnHover = false,
  as: Tag = "div",
  role,
  "aria-label": ariaLabel,
  ...props
}: GlassCardProps) {
  const { shouldReduceMotion } = useAnimationPerformance();

  // Performance-optimized hover effects
  const hoverEffects = hover && !shouldReduceMotion() ? {
    scale: 1.02,
    y: -2,
    boxShadow: glowOnHover && brandColor
      ? `0 12px 40px ${brandColor}20, 0 0 20px ${brandColor}10`
      : "0 12px 32px rgba(0,0,0,0.16)",
    borderColor: brandColor ? `${brandColor}30` : "rgba(255,255,255,0.4)",
    transition: animationConfig.transforms.hover.transition
  } : undefined;

  const tapEffects = interactive && !shouldReduceMotion() ? {
    scale: 0.98,
    transition: animationConfig.transforms.tap.transition
  } : undefined;

  // Dynamic glass styling with brand integration
  const getGlassClasses = () => {
    if (glassLevel === "branded" && brandColor) {
      return cn(
        GlassLayers.branded(),
        "before:from-transparent before:via-transparent before:to-current",
        `[--brand-accent:${brandColor}]`
      );
    }
    return GlassLayers[glassLevel];
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl transition-all duration-300",
        getGlassClasses(),
        interactive && "cursor-pointer",
        className
      )}
      style={{
        willChange: hover ? "transform, box-shadow, border-color" : "auto",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)", // Force GPU acceleration
        ...(brandColor && glassLevel === "branded" && {
          background: `linear-gradient(135deg, rgba(255,255,255,0.8), ${brandColor}08)`
        })
      }}
      whileHover={hoverEffects}
      whileTap={tapEffects}
      viewport={animationConfig.viewport}
      initial={shouldReduceMotion() ? undefined : { opacity: 0, scale: 0.95 }}
      animate={shouldReduceMotion() ? undefined : { opacity: 1, scale: 1 }}
      transition={animationConfig.spring}
      role={role}
      aria-label={ariaLabel}
      {...props}
    >
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Tag className="contents">{children}</Tag>
      </div>

      {/* Optional brand accent stripe */}
      {brandColor && glassLevel === "branded" && (
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-60"
          style={{ backgroundColor: brandColor }}
        />
      )}
    </motion.div>
  );
}

// Specialized branded glass card for service pages
export function BrandedGlassCard({
  brand,
  children,
  glassLevel = "branded",
  ...props
}: GlassCardProps & { brand?: { accentHex: string } }) {
  return (
    <GlassCard
      glassLevel={glassLevel}
      brandColor={brand?.accentHex}
      glowOnHover={true}
      {...props}
    >
      {children}
    </GlassCard>
  );
}

// Performance-optimized card grid with staggered animations
export function CardGrid({
  children,
  className,
  staggerDelay = 0.05
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const { shouldReduceMotion } = useAnimationPerformance();

  return (
    <motion.div
      className={cn("grid gap-6", className)}
      initial={shouldReduceMotion() ? undefined : "hidden"}
      whileInView={shouldReduceMotion() ? undefined : "visible"}
      viewport={animationConfig.viewport}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.1,
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Interactive card with enhanced animations
export function InteractiveCard({
  children,
  onClick,
  ...props
}: GlassCardProps & { onClick?: () => void }) {
  const { shouldReduceMotion } = useAnimationPerformance();

  return (
    <GlassCard
      interactive={true}
      hover={true}
      glowOnHover={true}
      onClick={onClick}
      whileHover={!shouldReduceMotion() ? {
        scale: 1.03,
        rotateY: 2,
        rotateX: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      } : undefined}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      {...props}
    >
      {children}
    </GlassCard>
  );
}
