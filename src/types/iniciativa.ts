export interface IniciativaState {
  mensajes: { type: "user" | "assistant"; content: string }[];
  nombre: string;
  descripcion: string;
  proposito: Record<string, any>;
  features: { nombre: string; descripcion: string }[];
  casos_de_uso: { nombre: string; descripcion: string }[];
  plan_de_accion: string[];
  fase: number;
  ultima_accion: string;
  componente_modificado: Record<string, any>;
  preguntas_hechas: number;
}