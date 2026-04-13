"use client";

import { useState } from "react";

export function VoteButton({ initialVotes = 0 }) {
  const [votes, setVotes] = useState(initialVotes);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (voted) {
      setVotes(votes - 1);
      setVoted(false);
    } else {
      setVotes(votes + 1);
      setVoted(true);
    }
  };

  return (
    <button
      onClick={handleVote}
      className={`rounded-xl px-5 py-3 font-semibold transition ${
        voted
          ? "bg-cyan-500 text-slate-950"
          : "bg-slate-800 text-white hover:bg-slate-700"
      }`}
    >
      👍 {votes} Vote{votes !== 1 ? "s" : ""}
    </button>
  );
};