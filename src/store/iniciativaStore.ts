import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IniciativaState } from "@/types/iniciativa";
import { updateState } from "@/services/updateState";
import { sendPrompt } from "@/services/sendPrompt";

interface IniciativaStore {
  state: IniciativaState | null;
  setState: (newState: IniciativaState) => void;
  resetState: () => void;
  updateField: (updates: Partial<IniciativaState>) => Promise<void>;
  sendMessage: (prompt: string) => Promise<void>;
}

export const useIniciativaStore = create<IniciativaStore>()(
  persist(
    (set, get) => ({
      state: {
        mensajes: [],
        nombre: "",
        descripcion: "",
        proposito: {},
        features: [],
        casos_de_uso: [],
        plan_de_accion: [],
        fase: 0,
        ultima_accion: "",
        componente_modificado: {},
        preguntas_hechas: 0,
      },

      setState: (newState) => set({ state: newState }),

      resetState: () =>
        set({
          state: {
            mensajes: [],
            nombre: "",
            descripcion: "",
            proposito: {},
            features: [],
            casos_de_uso: [],
            plan_de_accion: [],
            fase: 0,
            ultima_accion: "",
            componente_modificado: {},
            preguntas_hechas: 0,
          },
        }),

      updateField: async (updates) => {
        const current = get().state;
        if (!current) return;
        const res = await updateState("default", updates);
        set({ state: res.state });
      },

      sendMessage: async (prompt: string) => {
        const current = get().state;
        const res = await sendPrompt(prompt, current);
        set({ state: res });
      },
    }),
    { name: "iniciativa-storage" }
  )
);
