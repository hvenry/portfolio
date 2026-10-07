"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { setup, workflow } from "@/data";
import Image from "next/image";
import { CollapsibleTab, ZIndexProvider } from "@/components/CollapsibleTab";
import Loader from "@/components/Loader";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { techIcons } from "@/components/TechBadge";

// Layout effect on the client so cards position before first paint (no loader flash)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const TabsContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [positions, setPositions] = useState<{ x: number; y: number }[] | null>(
    null
  );
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const numberOfTabs = 6;
    const gridRows = 2;
    const gridCols = 3;

    const gridPositions = shuffleArray(
      Array.from({ length: gridRows * gridCols }, (_, i) => i)
    );

    // One tab per shuffled grid cell, jittered; ranges leave room for the
    // largest card so nothing spawns clipped by the canvas edges
    const estCardWidth = 500;
    const estCardHeight = 380;
    const xSpan = Math.max(0, rect.width - estCardWidth) / (gridCols - 1);
    const ySpan = Math.max(0, rect.height - estCardHeight) / (gridRows - 1);
    const newPositions = gridPositions.slice(0, numberOfTabs).map((pos) => {
      const row = Math.floor(pos / gridCols);
      const col = pos % gridCols;
      const x = col * xSpan + Math.random() * 40;
      const y = row * ySpan + Math.random() * 24;
      return { x, y };
    });

    setPositions(newPositions);
  }, [isSmallScreen]);

  return (
    <div
      className={`${
        isSmallScreen
          ? "relative mx-2 flex h-auto flex-col gap-4"
          : // sm-scoped geometry: pre-hydration this branch also renders on compact
            // screens (media query defaults false); unscoped w-screen would force
            // the column's min-content width past its margins and shift the layout
            "tab-canvas relative overflow-hidden sm:left-1/2 sm:h-[calc(100%+5rem)] sm:min-h-[420px] sm:w-screen sm:-translate-x-1/2"
      }`}
      ref={containerRef}
    >
      {positions === null ? (
        <div className="loader-delayed flex h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <ZIndexProvider>
          <CollapsibleTab title="Daily Drivers" initialPosition={positions[0]}>
            {/* Negative margin makes scrolled text clip at the title bar, not the padding */}
            <div className="-m-4 max-h-[292px] max-w-xl overflow-y-auto p-4">
              <ul className="flex flex-col gap-4 sm:gap-6">
                {workflow.map((tool) => {
                  const Icon = tool.icon ? techIcons[tool.icon] : undefined;
                  return (
                    <li key={tool.name}>
                      <div className="flex flex-row items-center gap-2 mb-2">
                        {Icon && <Icon className="size-5 shrink-0" />}
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-hover text-base sm:text-lg"
                          draggable="false"
                        >
                          {tool.name}
                        </a>
                      </div>
                      <p className="body-copy">{tool.description}</p>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 border-t border-line pt-4 text-sm text-subtle">
                All of it is configured in one repo:{" "}
                <Link
                  href="/projects/dotfiles"
                  className="link"
                  draggable="false"
                >
                  see the dotfiles project
                </Link>
                .
              </p>
            </div>
          </CollapsibleTab>
          <CollapsibleTab
            title="Setup Equipment"
            initialPosition={positions[1]}
          >
            <ul className="flex flex-col gap-2">
              {setup.map((item, index) => (
                <li key={index}>
                  <div className="flex flex-col sm:gap-2 sm:flex-row">
                    <p className="text-sm font-medium text-foreground sm:text-base">
                      {item.name}:
                    </p>
                    <div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item.link}
                        className="text-sm text-subtle underline underline-offset-4 hover:text-foreground sm:text-base"
                        draggable="false"
                      >
                        {item.description}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CollapsibleTab>
          <CollapsibleTab
            title="Currently Reading"
            initialPosition={positions[2]}
          >
            <div className="flex flex-col gap-2 mb-2">
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.amazon.ca/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
                  className="link-hover inline-block text-base sm:text-lg"
                  draggable="false"
                >
                  Clean Code
                </a>
              </div>
              <p className="text-sm text-muted sm:text-base">
                A Handbook of Agile Software Craftsmanship
              </p>
              <p className="text-xs text-subtle sm:text-sm">
                By: Robert C. Martin
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src={"/assets/images/clean_code.jpg"}
                alt="Clean Code"
                width={1920}
                height={1080}
                className="h-48 w-auto border border-line p-1"
                priority
                draggable="false"
              />
            </div>
          </CollapsibleTab>
          <CollapsibleTab title="Hobbies" initialPosition={positions[3]}>
            <ul className="flex flex-col gap-1 text-sm text-muted sm:text-base">
              <li>Espresso</li>
              <li>Cooking</li>
              <li>Music</li>
              <li>Fashion</li>
              <li>Keyboards</li>
              <li>Retro Tech</li>
              <li>Graphic Design</li>
            </ul>
          </CollapsibleTab>
          <CollapsibleTab title="Album Rec" initialPosition={positions[4]}>
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src={"/assets/images/velocity_design_comfort.png"}
                alt="Velocity Design Comfort"
                width={512}
                height={512}
                className="h-48 w-auto border border-line p-1"
                priority
                draggable="false"
              />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://open.spotify.com/album/0eUUQ4rly8Q8PyJPWLgde2"
                className="link-hover inline-block text-base"
                draggable="false"
              >
                Velocity : Design : Comfort
              </a>
            </div>
          </CollapsibleTab>
          <CollapsibleTab title="My Dog (Rocco)" initialPosition={positions[5]}>
            <div className="flex justify-center items-center">
              <Image
                src={"/assets/images/rocco.png"}
                alt="Rocco"
                width={512}
                height={512}
                className="h-64 w-auto border border-line p-1"
                priority
                draggable="false"
              />
            </div>
          </CollapsibleTab>
        </ZIndexProvider>
      )}
    </div>
  );
};

export default TabsContainer;
