"use client";

import { IniciativaState } from "@/types/iniciativa";
import { Plus, RefreshCw } from "lucide-react";
import {Section} from "./Section";

interface SidebarProps {
  state: IniciativaState | null;
  onReset: () => void;
}

export default function Sidebar({ state, onReset }: SidebarProps) {
  return (
    <div className="w-[70%] overflow-y-auto h-screen bg-white shadow-xl rounded-3xl p-8 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">💡 Tu Iniciativa</h2>

        {state?.nombre ? (
          <p className="text-lg font-semibold text-blue-600 mt-1">{state.nombre}</p>
        ) : (
          <p className="text-gray-400 mt-1 text-sm">
            El agente generará el nombre mientras conversas.
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
      />

      {/* Botones */}
      <div className="mt-8 flex flex-col gap-3">
        <button className="w-full border-2 border-dashed border-orange-400 text-orange-500 font-medium py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-orange-50 transition">
          <Plus size={18} /> Agregar componente
        </button>

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