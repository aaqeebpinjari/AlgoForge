import React, { useState, useCallback, useMemo } from "react";

function QuizTopicSelection({ topics = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const lower = useCallback(
    (v) => (v ?? "").toString().trim().toLowerCase(),
    []
  );

  const filteredTopics = useMemo(() => {
    const q = lower(searchTerm);
    if (!q) return []; // 🔥 No search → No cards
    return (Array.isArray(topics) ? topics : []).filter((t) => {
      const title = lower(t?.title) || lower(t?.name) || lower(t?.label);
      const desc = lower(t?.description);
      return title.includes(q) || desc.includes(q);
    });
  }, [topics, lower, searchTerm]);

  return (
    <div className="quiz">
      <div className="quiz-selection">
        <input
          type="text"
          placeholder="Search topics…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🔥 Only show cards section if searchTerm is not empty */}
      {searchTerm && (
        <div className="topic-grid">
          {filteredTopics.length === 0 ? (
            <p>No topics found.</p>
          ) : (
            filteredTopics.map((t) => (
              <div key={t.key ?? t.id ?? t.title} className="topic-card">
                <h3>{t.title ?? t.name ?? t.label}</h3>
                <p>{t.description}</p>
              </div>
            ))
          )} 
        </div>
      )}
    </div>
  );
}

export default QuizTopicSelection;
