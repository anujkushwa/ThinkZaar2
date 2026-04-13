"use client";

export default function usePagination(items = [], pageSize = 10) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  return {
    currentPage: 1,
    items,
    pageSize,
    totalPages,
  };
}
