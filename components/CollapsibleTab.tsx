"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";
import { PiCaretUp, PiCaretDown } from "react-icons/pi";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* Shared z-index ordering so the clicked tab always rises above its siblings */
interface ZIndexContextProps {
  zIndexMap: { [key: string]: number };
  bringToFront: (id: string) => void;
  highestZIndex: number;
}

const ZIndexContext = createContext<ZIndexContextProps | undefined>(undefined);

export const ZIndexProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [zIndexMap, setZIndexMap] = useState<{ [key: string]: number }>({});
  const [highestZIndex, setHighestZIndex] = useState(1);

  const bringToFront = (id: string) => {
    setHighestZIndex((prev) => {
      const newZ = prev + 1;
      setZIndexMap((prevMap) => ({ ...prevMap, [id]: newZ }));
      return newZ;
    });
  };

  return (
    <ZIndexContext.Provider value={{ zIndexMap, bringToFront, highestZIndex }}>
      {children}
    </ZIndexContext.Provider>
  );
};

const useZIndex = () => {
  const context = useContext(ZIndexContext);
  if (!context) {
    throw new Error("useZIndex must be used within a ZIndexProvider");
  }
  return context;
};

interface CollapsibleTabProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  initialPosition: { x: number; y: number };
}

export const CollapsibleTab = ({
  title,
  children,
  initialPosition
}: CollapsibleTabProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState<{ x: number; y: number }>(
    initialPosition
  );

  const { zIndexMap, bringToFront, highestZIndex } = useZIndex();
  const isSmallScreen = useMediaQuery("(max-width: 639px)");
  const nodeRef = useRef<HTMLDivElement>(null);

  const tabIdRef = useRef<string>("");
  useEffect(() => {
    tabIdRef.current = `tab-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const toggleCollapsibleTab = () => setIsOpen(!isOpen);

  // Distinguishes a title-bar click (toggle) from a drag (no toggle)
  const dragMovedRef = useRef(false);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    dragMovedRef.current = true;
    setPosition({ x: data.x, y: data.y });
  };

  const handleMouseDown = () => {
    if (tabIdRef.current) bringToFront(tabIdRef.current);
  };

  const currentZIndex = zIndexMap[tabIdRef.current] || 1;
  // No card is "selected" until one has been clicked to the front
  const isSelected =
    zIndexMap[tabIdRef.current] !== undefined &&
    currentZIndex === highestZIndex;

  const bounds = { top: 0 };

  const collapseButton = (
    <button
      type="button"
      aria-label={isOpen ? "collapse" : "expand"}
      onClick={(event) => {
        event.stopPropagation();
        toggleCollapsibleTab();
      }}
      className="link-quiet cursor-pointer text-lg"
    >
      {isOpen ? <PiCaretUp /> : <PiCaretDown />}
    </button>
  );

  const titleBar = (
    <>
      <p className="mr-8 flex-1 font-display text-base font-medium tracking-[0.1em] text-foreground">
        {title}
      </p>
      {collapseButton}
    </>
  );

  // Links only work on the selected card; the first click just brings it to front
  const contentInteractive = isSmallScreen || isSelected;

  // grid-rows 0fr -> 1fr animates height without measuring the content
  const content = (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      } ${contentInteractive ? "" : "pointer-events-none select-none"}`}
      aria-hidden={!isOpen}
    >
      <div className="overflow-hidden">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );

  if (isSmallScreen) {
    return (
      <div
        ref={nodeRef}
        id={tabIdRef.current}
        className="border border-line bg-background"
        style={{ zIndex: currentZIndex }}
      >
        <div
          className="flex cursor-pointer items-center gap-2.5 border-b border-line px-3 py-2.5"
          onClick={toggleCollapsibleTab}
        >
          {titleBar}
        </div>
        {content}
      </div>
    );
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={handleDrag}
      disabled={isSmallScreen}
      bounds={bounds}
      handle=".drag-handle"
    >
      <div
        ref={nodeRef}
        id={tabIdRef.current}
        className={`tab-card panel-ticks-hover absolute border bg-background ${
          isSelected
            ? "panel-ticks border-foreground/40 shadow-[0_0_48px_0_rgb(var(--foreground)/0.12)]"
            : "border-line"
        }`}
        style={{
          zIndex: currentZIndex
        }}
        // react-draggable clobbers onMouseDown via cloneElement; capture phase survives
        onMouseDownCapture={handleMouseDown}
      >
        <div
          className="drag-handle flex cursor-move items-center gap-2.5 border-b border-line px-3 py-2.5"
          onMouseDown={() => {
            dragMovedRef.current = false;
          }}
          onClick={() => {
            if (!dragMovedRef.current) toggleCollapsibleTab();
          }}
        >
          {titleBar}
        </div>
        {content}
      </div>
    </Draggable>
  );
};
