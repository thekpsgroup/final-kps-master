"use client";
import { useState, useEffect, useRef } from "react";

interface TouchGesture {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  deltaX: number;
  deltaY: number;
  duration: number;
  velocity: number;
}

export function useTouch(element?: React.RefObject<HTMLElement | HTMLInputElement | HTMLTextAreaElement | null>) {
  const [gesture, setGesture] = useState<TouchGesture | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const startTime = useRef<number>(0);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const target = element?.current || document;

    const handleTouchStart = (e: TouchEvent) => {
      setIsTouch(true);
      const touch = e.touches[0];
      startTime.current = Date.now();
      startPos.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTouch) return;

      const touch = e.changedTouches[0];
      const endTime = Date.now();
      const duration = endTime - startTime.current;

      const deltaX = touch.clientX - startPos.current.x;
      const deltaY = touch.clientY - startPos.current.y;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const velocity = distance / duration;

      setGesture({
        startX: startPos.current.x,
        startY: startPos.current.y,
        endX: touch.clientX,
        endY: touch.clientY,
        deltaX,
        deltaY,
        duration,
        velocity
      });

      setIsTouch(false);
    };

    target.addEventListener('touchstart', handleTouchStart as EventListener);
    target.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      target.removeEventListener('touchstart', handleTouchStart as EventListener);
      target.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [element, isTouch]);

  return { gesture, isTouch };
}
