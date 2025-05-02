import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function QuestionarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    privacidade: "privado"
  });

  useEffect(() => {
    if (id) {
      api.get(`/questionarios/${id}`)
        .then(res => setForm(res.data))
        .catch(() => alert("Erro ao carregar dados"));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/questionarios/${id}`, form);
      } else {
        await api.post("/questionarios", form);
      }
      navigate("/questionarios");
    } catch {
      alert("Erro ao salvar");
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">{id ? "Editar" : "Novo"} Questionário</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl space-y-4">
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="privacidade"
          value={form.privacidade}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="privado">Privado</option>
          <option value="publico">Público</option>
        </select>
        <button type="submit" className="bg-fluent-primary text-white px-4 py-2 rounded hover:bg-blue-700">
          Salvar
        </button>
      </form>
    </Layout>
  );
}
