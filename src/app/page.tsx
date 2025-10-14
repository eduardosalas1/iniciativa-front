"use client";

import { useState } from "react";
import { IniciativaState } from "@/types/iniciativa";
import Sidebar from "@/components/SideBar/SideBar";
import Chat from "@/components/Chat/Chat";

export default function Page() {
  const [state, setState] = useState<IniciativaState | null>(null);

  const handleReset = () => {
    setState({
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
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar state={state} onReset={handleReset} setState={setState} />
      <div className="flex-1 flex flex-col">
        <Chat state={state} setState={setState} />
      </div>
    </div>
  );
}
