import { useEffect, useState } from "react";

export function useProblems(sort, page) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/problems?sort=${sort}&page=${page}`
        );
        const data = await res.json();

        if (page === 1) {
          setProblems(data.data || []);
        } else {
          setProblems((prev) => [...prev, ...(data.data || [])]);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchProblems();
  }, [sort, page]);

  return { problems, loading, setProblems };
}