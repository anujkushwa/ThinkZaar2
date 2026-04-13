"use client";

import { useState, useEffect } from "react";
import ProblemCard from "@/components/ProblemCard";
import { useProblems } from "@/hooks/useProblems";

export default function ProblemsPage() {
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const { problems, loading, setProblems } = useProblems(sort, page);

  // infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8">

      <div className="max-w-5xl mx-auto mb-6 flex justify-between">
        <h1 className="text-3xl font-bold">Explore Problems</h1>

        <select
          value={sort}
          onChange={(e) => {
            const nextSort = e.target.value;
            setSort(nextSort);
            setPage(1);
            setProblems([]);
          }}
          className="bg-slate-800 px-3 py-2 rounded"
        >
          <option value="latest">Latest</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>

      {loading && <p className="text-center mt-6">Loading...</p>}
    </div>
  );
}