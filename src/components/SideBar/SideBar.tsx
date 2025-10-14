// src/components/SideBar/SideBar.tsx
"use client";

import { IniciativaState } from "@/types/iniciativa";
import { Plus, RefreshCw } from "lucide-react";
import { Section } from "./Section";
import { useEffect, useState } from "react";
import { updateState as apiUpdateState } from "@/services/updateState";

interface SidebarProps {
  state: IniciativaState | null;
  onReset: () => void;
  setState: React.Dispatch<React.SetStateAction<IniciativaState>>;
}

export default function Sidebar({ state, onReset, setState }: SidebarProps) {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(state?.nombre || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNewName(state?.nombre || "");
  }, [state?.nombre]);

  const flush = async (updates: Partial<IniciativaState>) => {
    if (!state) return;
    setSaving(true);
    try {
      const res = await apiUpdateState("default", updates);
      // preservamos los mensajes anteriores
      setState((prev: IniciativaState) => ({
        ...prev!,
        ...res.state,
        mensajes: prev?.mensajes || [],
      }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-[70%] overflow-y-auto h-screen bg-white shadow-xl rounded-3xl p-8 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Tu Iniciativa</h2>
          <span className="text-xs text-gray-500">
            {saving ? "Guardando..." : "Listo"}
          </span>
        </div>

        {editingName ? (
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={async () => {
              setEditingName(false);
              // local optimistic update
              setState({ ...state!, nombre: newName });
              await flush({ nombre: newName });
            }}
            className="border-b-2 border-blue-500 text-lg font-semibold w-full focus:outline-none"
            autoFocus
          />
        ) : (
          <p
            className="text-lg font-semibold text-blue-600 mt-1 cursor-pointer hover:underline"
            onClick={() => setEditingName(true)}
          >
            {state?.nombre || "Sin nombre aún (haz clic para editar)"}
          </p>
        )}
      </div>

      {/* Funcionalidades */}
      <Section
        title="Funcionalidades"
        items={state?.features?.map((f) => ({
          title: f.nombre,
          desc: f.descripcion,
          color: "border-blue-400",
        }))}
        placeholder="Se generarán automáticamente."
        onChange={(newItems) => {
          // local optimistic
          const newFeatures = newItems.map((i) => ({
            nombre: i.title,
            descripcion: i.desc || "",
          }));
          setState({ ...state!, features: newFeatures });
        }}
        onBlurSection={async () => {
          await flush({ features: state!.features });
        }}
      />

      {/* Casos de uso */}
      <Section
        title="Casos de Uso"
        items={state?.casos_de_uso?.map((c) => ({
          title: c.nombre,
          desc: c.descripcion,
          color: "border-green-400",
        }))}
        placeholder="Pendiente de generar."
        onChange={(newItems) => {
          const newCasos = newItems.map((i) => ({
            nombre: i.title,
            descripcion: i.desc || "",
          }));
          setState({ ...state!, casos_de_uso: newCasos });
        }}
        onBlurSection={async () => {
          await flush({ casos_de_uso: state!.casos_de_uso });
        }}
      />

      {/* Plan de acción */}
      <Section
        title="Plan de Acción"
        items={state?.plan_de_accion?.map((p) => ({
          title: p,
          desc: "",
          color: "border-yellow-400",
        }))}
        placeholder="El agente lo generará luego."
        onChange={(newItems) => {
          const newPlan = newItems.map((i) => i.title);
          setState({ ...state!, plan_de_accion: newPlan });
        }}
        onBlurSection={async () => {
          await flush({ plan_de_accion: state!.plan_de_accion });
        }}
      />

      {/* Botones */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <RefreshCw size={18} /> Reiniciar / Mejorar con IA
        </button>
      </div>
    </div>
  );
}
