


export async function sendPrompt(prompt: string, state: any) {
  const res = await fetch("http://localhost:8000/chat/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, state }),
  });
  if (!res.ok) throw new Error("Error al comunicarse con el backend");
  return res.json();
}
