import { httpApi } from "@/api/api";

export async function updateState(session_id: string, updates: any) {
  const res = await fetch(`${httpApi}/update_state/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id, updates }),
  });
  if (!res.ok) throw new Error("Error al actualizar el estado");
  return res.json();
}
