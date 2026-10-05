import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  FiArrowRight,
  FiAward,
  FiCopy,
  FiFileText,
  FiGithub,
  FiHash,
  FiLinkedin,
  FiMoon,
  FiSearch,
} from "react-icons/fi";
import Dialog from "./Dialog";
import { onPaletteOpen } from "./paletteEvents";
import { SECTIONS } from "../../lib/site";
import { projects } from "../../data/projects";
import { papers } from "../../data/writing";
import { getEmail, profile } from "../../data/profile";
import { setTheme } from "../../hooks/useTheme";
import { showToast } from "./toast";
import "./command-palette.css";

interface Command {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: ReactNode;
  run: () => void;
}

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    const off = onPaletteOpen(() => setOpen(true));
    return () => {
      window.removeEventListener("keydown", onKey);
      off();
    };
  }, []);

  const commands = useMemo<Command[]>(() => {
    const go = (to: string) => () => {
      close();
      navigate(to);
    };
    const external = (url: string) => () => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    };
    return [
      ...SECTIONS.map((s) => ({
        id: `section-${s.id}`,
        group: "Sections",
        label: s.label,
        icon: <FiHash />,
        run: go(`/#${s.id}`),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Case studies",
        label: p.title,
        hint: p.category,
        icon: <FiArrowRight />,
        run: go(`/work/${p.slug}`),
      })),
      ...papers.map((p) => ({
        id: `paper-${p.href}`,
        group: "Papers",
        label: p.title,
        hint: `${p.pages} pages`,
        icon: <FiFileText />,
        run: external(p.href),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        icon: <FiCopy />,
        run: () => {
          close();
          navigator.clipboard?.writeText(getEmail()).then(
            () => showToast("Email copied to clipboard"),
            () => showToast(getEmail()),
          );
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle light / dark theme",
        icon: <FiMoon />,
        run: () => {
          close();
          setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
        },
      },
      {
        id: "certs",
        group: "Actions",
        label: "View certifications",
        icon: <FiAward />,
        run: go("/certifications"),
      },
      {
        id: "github",
        group: "Links",
        label: "GitHub",
        icon: <FiGithub />,
        run: external(profile.github),
      },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn",
        icon: <FiLinkedin />,
        run: external(profile.linkedin),
      },
    ];
  }, [close, navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint ?? ""} ${c.group}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[index]?.run();
    }
  };

  return (
    <Dialog open={open} onClose={close} label="Command menu" className="palette" showClose={false}>
      <div className="palette__search">
        <FiSearch aria-hidden="true" />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search sections, projects, papers..."
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
        />
        <kbd>esc</kbd>
      </div>
      <ul id="palette-list" ref={listRef} className="palette__list" role="listbox">
        {filtered.length === 0 && <li className="palette__empty">No results for "{query}"</li>}
        {filtered.map((c, i) => {
          const showGroup = i === 0 || filtered[i - 1].group !== c.group;
          return (
            <li key={c.id} role="presentation">
              {showGroup && <div className="palette__group">{c.group}</div>}
              <div
                id={`cmd-${c.id}`}
                role="option"
                aria-selected={i === index}
                data-index={i}
                className={`palette__item${i === index ? " is-active" : ""}`}
                onMouseMove={() => setIndex(i)}
                onClick={c.run}
              >
                <span className="palette__icon">{c.icon}</span>
                <span className="palette__label">{c.label}</span>
                {c.hint && <span className="palette__hint">{c.hint}</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="palette__footer mono">
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> navigate
        </span>
        <span>
          <kbd>enter</kbd> open
        </span>
      </div>
    </Dialog>
  );
};

export default CommandPalette;
