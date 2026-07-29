"use client";

import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

type NoteFont = "sans" | "serif" | "mono";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
  font?: NoteFont;
}

const STORAGE_KEY = "lumos-notes";

const FONT_OPTIONS: { value: NoteFont; label: string; className: string }[] = [
  { value: "sans", label: "Sans", className: "font-sans" },
  { value: "serif", label: "Serif", className: "font-serif" },
  { value: "mono", label: "Mono", className: "font-mono" },
];

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Note[]) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [font, setFont] = useState<NoteFont>("sans");

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const selected = notes.find((n) => n.id === selectedId) ?? null;

  function selectNote(note: Note) {
    setSelectedId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setFont(note.font ?? "sans");
  }

  function createNote() {
    const note: Note = {
      id: crypto.randomUUID(),
      title: "Untitled",
      content: "",
      updatedAt: Date.now(),
      font: "sans",
    };
    setNotes((prev) => {
      const next = [note, ...prev];
      saveNotes(next);
      return next;
    });
    selectNote(note);
  }

  function updateNote() {
    if (!selectedId) return;
    setNotes((prev) => {
      const next = prev.map((n) =>
        n.id === selectedId
          ? { ...n, title, content, font, updatedAt: Date.now() }
          : n,
      );
      saveNotes(next);
      return next;
    });
  }

  function changeFont(next: NoteFont) {
    setFont(next);
    if (!selectedId) return;
    setNotes((prev) => {
      const updated = prev.map((n) =>
        n.id === selectedId ? { ...n, font: next, updatedAt: Date.now() } : n,
      );
      saveNotes(updated);
      return updated;
    });
  }

  function deleteNote() {
    if (!selectedId) return;
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== selectedId);
      saveNotes(next);
      return next;
    });
    setSelectedId(null);
    setTitle("");
    setContent("");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
        <button
          type="button"
          onClick={createNote}
          className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          New Note
        </button>
      </div>

      <div className="grid flex-1 grid-cols-[240px_1fr] gap-4 overflow-hidden rounded-lg border border-border">
        {/* Sidebar */}
        <div className="flex flex-col gap-1 overflow-y-auto border-r border-border p-2">
          {notes.length === 0 && (
            <p className="p-3 text-sm text-muted-foreground">
              No notes yet. Create one to get started.
            </p>
          )}
          {notes.map((note) => (
            <button
              type="button"
              key={note.id}
              onClick={() => selectNote(note)}
              className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                note.id === selectedId
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              <span className="block truncate font-medium">{note.title}</span>
              <span className="block truncate text-xs opacity-60">
                {new Date(note.updatedAt).toLocaleDateString()}
              </span>
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex flex-col gap-3 p-4">
          {selected ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={updateNote}
                placeholder="Note title"
                className="bg-transparent text-lg font-semibold outline-none placeholder:text-muted-foreground"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={updateNote}
                placeholder="Start writing..."
                className={cn(
                  "flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted-foreground",
                  FONT_OPTIONS.find((f) => f.value === font)?.className,
                )}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {FONT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => changeFont(option.value)}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs transition-colors",
                        option.className,
                        font === option.value
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={deleteNote}
                  className="rounded-md px-3 py-1.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Select a note or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
