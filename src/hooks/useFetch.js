"use client";

import { useState } from "react";

export default function useFetch(initialValue = null) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  return { data, loading, setData, setLoading };
}
