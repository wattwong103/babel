"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Check, RotateCcw, Lock, ExternalLink } from "lucide-react";
import LucideIcon from "@/components/ui/LucideIcon";
import StatusBadge from "@/components/ui/StatusBadge";
import { KnowledgeNode, ERA_LABELS } from "@/data";
import { getMissingPrerequisites } from "@/lib/unlockEngine";
import { useKnowledgeStore } from "@/store/knowledgeStore";

interface NodeDetailPanelProps {
  nodeId: string | null;
  onClose: () => void;
}

export default function NodeDetailPanel({
  nodeId,
  onClose,
}: NodeDetailPanelProps) {
  const nodes = useKnowledgeStore((s) => s.nodes);
  const markAsLearned = useKnowledgeStore((s) => s.markAsLearned);
  const unmarkAsLearned = useKnowledgeStore((s) => s.unmarkAsLearned);
  const updateNotes = useKnowledgeStore((s) => s.updateNotes);

  const [localNotes, setLocalNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const saveTimerRef = useRef<NodeJS.Timeout>(undefined);

  const node = nodeId ? nodes[nodeId] : null;

  useEffect(() => {
    if (node) {
      setLocalNotes(node.userNotes || "");
    }
  }, [node?.id, node?.userNotes]);

  const handleNotesChange = useCallback(
    (value: string) => {
      setLocalNotes(value);
      setSaved(false);

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        if (nodeId) {
          updateNotes(nodeId, value);
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }
      }, 500);
    },
    [nodeId, updateNotes]
  );

  if (!node) return null;

  const isScience = node.domain === "sciences";
  const accent = isScience ? "text-babel-science-light" : "text-babel-humanities-light";
  const accentBg = isScience ? "bg-babel-science/10" : "bg-babel-humanities/10";
  const accentBorder = isScience ? "border-babel-science" : "border-babel-humanities";
  const accentColor = isScience ? "#3b82f6" : "#a855f7";
  const missingPrereqs = getMissingPrerequisites(node.id, nodes);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md z-50 panel-enter">
        <div className="h-full bg-babel-bg border-l border-babel-border overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-babel-surface text-babel-text-secondary hover:text-babel-text transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-6 pt-14">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`p-3 rounded-xl ${accentBg}`}
              >
                <LucideIcon
                  name={node.icon}
                  size={32}
                  style={{ color: accentColor }}
                />
              </div>
              <div className="flex-1">
                <h2 className="font-heading text-2xl font-bold text-babel-text mb-2">
                  {node.title}
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={node.status} size="md" />
                  <span className="text-xs px-2 py-1 rounded-full bg-babel-border text-babel-text-secondary">
                    {ERA_LABELS[node.era]}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${accentBg} ${accent}`}
                  >
                    {node.domain === "sciences" ? "Sciences" : "Humanities"}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-babel-text-secondary leading-relaxed">
                {node.description}
              </p>
            </div>

            {/* What to Learn */}
            <div className="mb-6">
              <h3 className="font-heading text-lg font-semibold text-babel-text mb-3">
                What to Learn & Master
              </h3>
              <ol className="space-y-2">
                {node.whatToLearn.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-babel-text-secondary"
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full ${accentBg} ${accent} flex items-center justify-center text-xs font-medium mt-0.5`}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {/* Resources */}
            <div className="mb-6">
              <h3 className="font-heading text-lg font-semibold text-babel-text mb-3">
                Suggested Resources
              </h3>
              <ul className="space-y-2">
                {node.resources.map((res, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    {res.url ? (
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${accent} hover:underline flex items-center gap-1`}
                      >
                        {res.label}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-babel-text-secondary">
                        {res.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-lg font-semibold text-babel-text">
                  Your Notes
                </h3>
                {saved && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check size={12} /> Saved
                  </span>
                )}
              </div>
              <textarea
                value={localNotes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Write your notes, insights, or questions here..."
                className="w-full h-32 bg-babel-surface border border-babel-border rounded-lg p-3 text-sm text-babel-text placeholder-babel-text-secondary/50 resize-none focus:outline-none focus:border-babel-border focus:ring-1 focus:ring-babel-border transition-colors"
              />
            </div>

            {/* Status Footer */}
            <div
              className={`border-t border-babel-border pt-6 ${
                node.status === "locked" ? "opacity-75" : ""
              }`}
            >
              {node.status === "unlocked" && (
                <button
                  onClick={() => markAsLearned(node.id)}
                  className={`w-full py-3 px-4 rounded-lg font-heading font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, #10b981)`,
                    boxShadow: `0 0 20px ${accentColor}40`,
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Check size={18} />
                    Mark as Learned
                  </span>
                </button>
              )}

              {node.status === "learned" && (
                <div className="space-y-3">
                  <div className="text-center text-sm text-emerald-400">
                    <Check size={16} className="inline mr-1" />
                    Learned on{" "}
                    {node.learnedAt
                      ? new Date(node.learnedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "unknown date"}
                  </div>
                  <button
                    onClick={() => unmarkAsLearned(node.id)}
                    className="w-full py-2 px-4 rounded-lg border border-babel-border text-babel-text-secondary text-sm hover:bg-babel-surface transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} />
                    Revisit / Unmark
                  </button>
                </div>
              )}

              {node.status === "locked" && (
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-babel-text-secondary text-sm">
                    <Lock size={14} />
                    Locked — complete prerequisites first
                  </div>
                  {missingPrereqs.length > 0 && (
                    <div className="text-xs text-babel-text-secondary">
                      Still needed:{" "}
                      <span className={accent}>
                        {missingPrereqs.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
