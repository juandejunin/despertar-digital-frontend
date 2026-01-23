import { useState } from "preact/hooks";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  const [status, setStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const ensureCookie = () => {
    if (!document.cookie.includes("contact_fp")) {
      const uuid = crypto.randomUUID();
      document.cookie = `contact_fp=${uuid}; Max-Age=2592000; Path=/; SameSite=Lax`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setShowStatus(false);
    setStatus("");
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const API_URL = import.meta.env.PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    ensureCookie();

    setStatus("Enviando...");
    setShowStatus(true);

    try {
      const res = await fetch(`${API_URL}/config/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Mensaje enviado con éxito ✅");
        setForm({ name: "", email: "", message: "", company: "" });

        setTimeout(() => {
          setShowStatus(false);
        }, 4000);
      } else {
        setStatus(data.message || "Error al enviar mensaje ❌");
        setShowStatus(true);
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setStatus("Error de conexión ❌");
      setShowStatus(true);
    }
  };

  // Contador de caracteres
  const messageLength = form.message.length;
  const remaining = 500 - messageLength;

  let counterColor = "text-gray-500";
  if (remaining <= 50) {
    counterColor = "text-red-600";
  } else if (remaining <= 100) {
    counterColor = "text-orange-600";
  }

  return (
    <form
      class="max-w-xl mx-auto flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="company"
        value={form.company}
        tabIndex={-1}
        autoComplete="off"
        style="display:none"
        onInput={handleChange}
      />

      <label for="name" class="sr-only">
        Nombre
      </label>

      <input
        id="name"
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        required
        onInput={handleChange}
        class="border p-2 rounded"
      />

      <label for="email" class="sr-only">
        Email
      </label>

      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        required
        onInput={handleChange}
        class="border p-2 rounded"
      />

      <label for="message" class="sr-only">
        Message
      </label>

      <textarea
        id="message"
        name="message"
        placeholder="Mensaje"
        value={form.message}
        required
        maxLength={500}
        onInput={handleChange}
        class="border p-2 rounded w-full min-h-[120px] max-h-[250px] resize-y"
      />

      <p
        aria-live="polite"
        class={`text-sm text-right font-medium ${counterColor}`}
      >
        {messageLength} de 500 caracteres
      </p>

      <button
        type="submit"
        class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
      >
        Enviar
      </button>

      <p
        role="status"
        aria-live="polite"

        class={`mt-2 text-center transition-opacity duration-500 ${showStatus ? "opacity-100" : "opacity-0"
          }`}
      >
        {status}
      </p>
    </form>
  );
}
