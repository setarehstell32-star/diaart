"use client";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StarRating({
  value,
  size = 14,
  showValue = true,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
}) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-1" dir="ltr">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              i < rounded ? "fill-gold text-gold" : "fill-none text-line"
            )}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-softBlack/60">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
