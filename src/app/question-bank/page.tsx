"use client";

import { useEffect, useMemo, useState } from "react";
import { QuestionBankCard } from "~/components/practice/question-bank-card";
import { Input } from "~/components/ui/input";
import { getAllPracticeQuestionsByUnit } from "~/lib/practice-questions";
import { UNITS } from "~/lib/units";
import { cn } from "~/lib/utils";

type Tab = "all" | "unsolved" | "solved" | "incorrect" | "correct";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unsolved", label: "Unsolved" },
  { key: "solved", label: "Solved" },
  { key: "incorrect", label: "Incorrect" },
  { key: "correct", label: "Correct" },
];

const DIFFICULTIES = ["Easy", "Med", "Hard"];

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}

function PillRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>;
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Count({ children }: { children: React.ReactNode }) {
  return <span className="text-[10px] opacity-70">{children}</span>;
}

function ListBox({
  children,
  scroll,
}: {
  children: React.ReactNode;
  scroll?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5",
        scroll && "max-h-56 overflow-y-auto pr-1",
      )}
    >
      {children}
    </div>
  );
}

function ListRow({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <span className="truncate">{label}</span>
      <span className="shrink-0 opacity-70">{count}</span>
    </button>
  );
}

function toggleInSet<T>(set: Set<T>, value: T, setter: (next: Set<T>) => void) {
  const next = new Set(set);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  setter(next);
}

export default function QuestionBankPage() {
  const unitGroups = useMemo(() => getAllPracticeQuestionsByUnit(), []);
  const allQuestions = useMemo(
    () => unitGroups.flatMap((group) => group.questions),
    [unitGroups],
  );
  const totalCount = allQuestions.length;

  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");

  // Filters below mirror the question-bank filter panel design, but are
  // visual only for now — selecting them doesn't change which questions show.
  const [addedFilter, setAddedFilter] = useState<"all" | "new">("all");
  const [trackFilter, setTrackFilter] = useState<"all" | "ab" | "bc">("all");
  const [unitFilters, setUnitFilters] = useState<Set<number>>(new Set());
  const [chapterFilters, setChapterFilters] = useState<Set<string>>(new Set());
  const [difficultyFilters, setDifficultyFilters] = useState<Set<string>>(
    new Set(),
  );

  const chapterBcOnly = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const unit of UNITS) {
      for (const chapter of unit.chapters) {
        map.set(chapter.title, Boolean(unit.bcOnly) || Boolean(chapter.bcOnly));
      }
    }
    return map;
  }, []);

  const abCount = allQuestions.filter(
    (question) => !chapterBcOnly.get(question.chapter),
  ).length;

  const unitCounts = useMemo(() => {
    const counts = new Map<number, number>();
    for (const group of unitGroups) {
      counts.set(group.unit, group.questions.length);
    }
    return counts;
  }, [unitGroups]);

  const chapterCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const question of allQuestions) {
      counts.set(question.chapter, (counts.get(question.chapter) ?? 0) + 1);
    }
    return counts;
  }, [allQuestions]);

  const chaptersForSelectedUnits = useMemo(() => {
    if (unitFilters.size === 0) return [];
    const seen = new Set<string>();
    const chapters: string[] = [];
    for (const unit of UNITS) {
      if (!unitFilters.has(unit.number)) continue;
      for (const chapter of unit.chapters) {
        if (seen.has(chapter.title)) continue;
        seen.add(chapter.title);
        chapters.push(chapter.title);
      }
    }
    return chapters;
  }, [unitFilters]);

  // Drop any selected chapter that no longer belongs to the selected units,
  // so toggling units off doesn't leave an invisible chapter filter active.
  useEffect(() => {
    const visible = new Set(chaptersForSelectedUnits);
    setChapterFilters((prev) => {
      const next = new Set([...prev].filter((chapter) => visible.has(chapter)));
      return next.size === prev.size ? prev : next;
    });
  }, [chaptersForSelectedUnits]);

  const query = search.trim().toLowerCase();
  const visibleGroups = unitGroups
    .map((group) => ({
      ...group,
      questions: group.questions.filter((question) => {
        if (!query) return true;
        return (
          question.label.toLowerCase().includes(query) ||
          question.chapter.toLowerCase().includes(query) ||
          question.prompt.toLowerCase().includes(query)
        );
      }),
    }))
    .filter((group) => group.questions.length > 0);

  const showEmptyTabState =
    tab === "solved" || tab === "incorrect" || tab === "correct";

  function clearFilters() {
    setAddedFilter("all");
    setTrackFilter("all");
    setUnitFilters(new Set());
    setChapterFilters(new Set());
    setDifficultyFilters(new Set());
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-8">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-primary">
          every unit, one place to practice
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Question Bank</h1>
        <p className="text-muted-foreground">
          Every practice question across every AP Calculus unit, all in one
          place.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const count =
              t.key === "all" || t.key === "unsolved" ? totalCount : 0;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {t.label}
                <span
                  className={cn(
                    "text-xs",
                    active
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="relative w-full sm:w-72">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by label, chapter, or keyword..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-56">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Filters</h2>
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-primary hover:underline"
            >
              clear
            </button>
          </div>

          <FilterSection title="Added">
            <PillRow>
              <Pill
                active={addedFilter === "all"}
                onClick={() => setAddedFilter("all")}
              >
                All <Count>{totalCount}</Count>
              </Pill>
              <Pill
                active={addedFilter === "new"}
                onClick={() => setAddedFilter("new")}
              >
                New <Count>0</Count>
              </Pill>
            </PillRow>
          </FilterSection>

          <FilterSection title="Track">
            <PillRow>
              <Pill
                active={trackFilter === "all"}
                onClick={() => setTrackFilter("all")}
              >
                All <Count>{totalCount}</Count>
              </Pill>
              <Pill
                active={trackFilter === "ab"}
                onClick={() => setTrackFilter("ab")}
              >
                AB <Count>{abCount}</Count>
              </Pill>
              <Pill
                active={trackFilter === "bc"}
                onClick={() => setTrackFilter("bc")}
              >
                BC <Count>{totalCount}</Count>
              </Pill>
            </PillRow>
          </FilterSection>

          <FilterSection title="Unit">
            <ListBox scroll>
              {UNITS.map((unit) => (
                <ListRow
                  key={unit.number}
                  label={`Unit ${unit.number}`}
                  count={unitCounts.get(unit.number) ?? 0}
                  active={unitFilters.has(unit.number)}
                  onClick={() =>
                    toggleInSet(unitFilters, unit.number, setUnitFilters)
                  }
                />
              ))}
            </ListBox>
          </FilterSection>

          <FilterSection title="Chapter">
            {chaptersForSelectedUnits.length === 0 ? (
              <p className="rounded-md border border-dashed px-3 py-4 text-center text-xs text-muted-foreground">
                Choose a unit to filter by chapter.
              </p>
            ) : (
              <ListBox scroll>
                {chaptersForSelectedUnits.map((chapter) => (
                  <ListRow
                    key={chapter}
                    label={chapter}
                    count={chapterCounts.get(chapter) ?? 0}
                    active={chapterFilters.has(chapter)}
                    onClick={() =>
                      toggleInSet(chapterFilters, chapter, setChapterFilters)
                    }
                  />
                ))}
              </ListBox>
            )}
          </FilterSection>

          <FilterSection title="Difficulty">
            <PillRow>
              {DIFFICULTIES.map((level) => (
                <Pill
                  key={level}
                  active={difficultyFilters.has(level)}
                  onClick={() =>
                    toggleInSet(difficultyFilters, level, setDifficultyFilters)
                  }
                >
                  {level}
                </Pill>
              ))}
            </PillRow>
            <p className="text-xs text-muted-foreground italic">
              Difficulty ratings are coming soon — these don&apos;t filter
              results yet.
            </p>
          </FilterSection>
        </aside>

        <div className="flex flex-1 flex-col gap-10">
          {showEmptyTabState ? (
            <p className="text-sm text-muted-foreground italic">
              No questions here yet — nothing has been attempted in the question
              bank so far.
            </p>
          ) : visibleGroups.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No questions match &quot;{search}&quot;.
            </p>
          ) : (
            visibleGroups.map((group) => {
              const unit = UNITS.find((u) => u.number === group.unit);
              return (
                <section
                  key={group.unit}
                  id={`unit-${group.unit}`}
                  className="flex scroll-mt-8 flex-col gap-4"
                >
                  <h2 className="text-lg font-semibold tracking-tight">
                    Unit {group.unit}
                    {unit ? `: ${unit.title}` : ""}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {group.questions.map((question) => (
                      <QuestionBankCard
                        key={question.id}
                        question={question}
                        unit={group.unit}
                      />
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
