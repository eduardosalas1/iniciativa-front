// src/components/SideBar/Section.tsx
"use client";

import { useState } from "react";

interface SectionProps {
  title: string;
  items?: { title: string; desc?: string; color?: string }[];
  placeholder?: string;
  onChange?: (
    newItems: { title: string; desc?: string; color?: string }[]
  ) => void;
  onBlurSection?: () => void; // para “guardar” al salir (flush manual)
}

export function Section({
  title,
  items,
  placeholder,
  onChange,
  onBlurSection,
}: SectionProps) {
  const handleAdd = () => {
    const newItems = [
      ...(items || []),
      { title: "Nuevo elemento", desc: "", color: "" },
    ];
    onChange?.(newItems);
  };

  const commitTitle = (index: number, value: string) => {
    if (!items) return;
    const newItems = [...items];
    newItems[index].title = value;
    onChange?.(newItems);
  };

  const commitDesc = (index: number, value: string) => {
    if (!items) return;
    const newItems = [...items];
    newItems[index].desc = value;
    onChange?.(newItems);
  };

  const handleDelete = (index: number) => {
    if (!items) return;
    const newItems = items.filter((_, i) => i !== index);
    onChange?.(newItems);
    onBlurSection?.();
  };

  return (
    <div
      className="mb-6"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node))
          onBlurSection?.();
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-2 border-b-2 border-orange-400 w-fit pb-1">
        {title}
      </h4>

      {items && items.length > 0 ? (
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-gray-50 border-l-4 ${item.color} rounded-lg p-3 shadow-sm flex flex-col gap-2`}
            >
              <input
                className="font-medium text-gray-800 bg-transparent border-b border-blue-400/0 focus:border-blue-400 outline-none"
                value={item.title}
                onChange={(e) => commitTitle(i, e.target.value)}
              />
              {item.desc !== undefined && (
                <textarea
                  className="text-sm text-gray-600 bg-transparent border-b border-blue-300/0 focus:border-blue-300 outline-none resize-none"
                  value={item.desc}
                  onChange={(e) => commitDesc(i, e.target.value)}
                />
              )}
              <button
                className="text-red-500 text-xs self-end hover:underline"
                onClick={() => handleDelete(i)}
              >
                Eliminar
              </button>
            </div>
          ))}

          <button
            onClick={handleAdd}
            className="text-blue-500 text-sm mt-2 hover:underline self-start"
          >
            + Agregar nuevo
          </button>
        </div>
      ) : (
        <p
          className="text-gray-400 text-sm cursor-pointer hover:underline"
          onClick={handleAdd}
        >
          {placeholder || "Agregar nuevo elemento"}
        </p>
      )}
    </div>
  );
}
