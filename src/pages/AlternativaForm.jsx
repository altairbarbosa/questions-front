import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function AlternativaForm() {
  const { perguntaId, alternativaId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ texto: "", correta: false });

  useEffect(() => {
    if (alternativaId) {
      api.get(`/alternativas/${alternativaId}`)
        .then(res => setForm(res.data))
        .catch(() => alert("Erro ao carregar alternativa"));
    }
  }, [alternativaId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (alternativaId) {
        await api.put(`/alternativas/${alternativaId}`, form);
      } else {
        await api.post(`/perguntas/${perguntaId}/alternativas`, form);
      }
      navigate(`/perguntas/${perguntaId}/alternativas`);
    } catch {
      alert("Erro ao salvar");
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">{alternativaId ? "Editar" : "Nova"} Alternativa</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl space-y-4">
        <input
          type="text"
          name="texto"
          placeholder="Texto da alternativa"
          value={form.texto}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="correta"
            checked={form.correta}
            onChange={handleChange}
          />
          Correta?
        </label>
        <button type="submit" className="bg-fluent-primary text-white px-4 py-2 rounded hover:bg-blue-700">
          Salvar
        </button>
      </form>
    </Layout>
  );
}
