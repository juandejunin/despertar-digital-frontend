import { useState } from "preact/hooks";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState("");

  // Crear cookie técnica si no existe
  const ensureCookie = () => {
    if (!document.cookie.includes("contact_fp")) {
      const uuid = crypto.randomUUID();
      document.cookie = `contact_fp=${uuid}; Max-Age=2592000; Path=/; SameSite=Lax`;
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const API_URL = import.meta.env.PUBLIC_API_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  ensureCookie();

  console.log("Enviando formulario a:", `${API_URL}/config/contacto`);
  console.log("Payload:", form);

  setStatus("Enviando...");

  try {
    const res = await fetch(`${API_URL}/config/contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Respuesta del backend:", data);

    if (res.ok) {
      setStatus("Mensaje enviado con éxito ✅");
      setForm({ name: "", email: "", message: "", company: "" });
    } else {
      setStatus(data.message || "Error al enviar mensaje ❌");
    }
  } catch (err) {
    console.error("Error de conexión:", err);
    setStatus("Error de conexión ❌");
  }
};



  return (
    <form class="max-w-xl mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        value={form.company}
        tabIndex={-1}
        autoComplete="off"
        style="display:none"
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        required
        onChange={handleChange}
        class="border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        required
        onChange={handleChange}
        class="border p-2 rounded"
      />
      <textarea
        name="message"
        placeholder="Mensaje"
        value={form.message}
        required
        onChange={handleChange}
        class="border p-2 rounded"
      />
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Enviar
      </button>
      {status && <p class="mt-2 text-center">{status}</p>}
    </form>
  );
}
