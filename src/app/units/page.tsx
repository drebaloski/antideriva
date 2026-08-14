"use client";

import { useState } from "react";
import { UNITS } from "~/lib/units";
import { cn } from "~/lib/utils";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

function BcBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary",
        className,
      )}
    >
      BC
    </span>
  );
}

export default function UnitsPage() {
  const [openUnits, setOpenUnits] = useState<Set<number>>(new Set());

  function toggleUnit(number: number) {
    setOpenUnits((prev) => {
      const next = new Set(prev);
      if (next.has(number)) {
        next.delete(number);
      } else {
        next.add(number);
      }
      return next;
    });
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">AP Calculus Units</h1>
        <p className="text-muted-foreground">
          Every unit covered by AP Calculus AB and BC, in order.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {UNITS.map((unit) => {
          const isOpen = openUnits.has(unit.number);
          return (
            <div key={unit.number} className="rounded-xl border bg-card">
              <button
                type="button"
                onClick={() => toggleUnit(unit.number)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                aria-expanded={isOpen}
              >
                <h3 className="text-base font-semibold">
                  Unit {unit.number}: {unit.title}
                  {unit.bcOnly && <BcBadge className="ml-2 align-middle" />}
                </h3>
                <ChevronIcon
                  className={cn(
                    "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen ? "rotate-0" : "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <ul className="flex flex-col gap-2 border-t px-4 py-3">
                  {unit.chapters.map((chapter) => (
                    <li
                      key={chapter.title}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span>{chapter.title}</span>
                      {chapter.bcOnly && <BcBadge />}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
