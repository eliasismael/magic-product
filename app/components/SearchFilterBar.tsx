"use client";

import { ChangeEvent } from "react";

type FilterStatus = "all" | "active" | "inactive";

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  statusValue: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  className?: string;
  statuses?: FilterStatus[];
}

export function SearchFilterBar({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
  className = "",
  statuses = ["all", "active", "inactive"],
}: SearchFilterBarProps) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <input
        className="w-full sm:max-w-sm rounded-3xl border px-4 py-2 border-gray-200 outline-none duration-300 hover:shadow-md shadow-sm shadow-gray-400 focus:border-gray-400"
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Busca por nombre o SKU"
        type="text"
        name="querySearch"
        id="querySearch"
      />

      <div className="flex gap-2 0">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-5 py-2 rounded-3xl text-sm font-medium cursor-pointer hover:shadow-sm shadow-gray-400 duration-300 ${
              statusValue === status
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status === "all"
              ? "Todos"
              : status === "active"
              ? "Activos"
              : "Inactivos"}
          </button>
        ))}
      </div>
    </div>
  );
}
