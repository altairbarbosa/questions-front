
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function PerguntaForm() {
  const { id, perguntaId } = useParams(); // id do questionário e da pergunta
  const navigate = useNavigate();
  const [form, setForm] = useState({
    enunciado: "",
    tipo: "multipla_escolha"
  });

  const [respostas, setRespostas] = useState([
    { texto: "", correta: false }
  ]);

  useEffect(() => {
    if (perguntaId) {
      api.get(`/perguntas/${perguntaId}`)
        .then(res => {
          setForm({
            enunciado: res.data.texto,
            tipo: res.data.tipo || "multipla_escolha"
          });
          setRespostas(res.data.respostas || [{ texto: "", correta: false }]);
        })
        .catch(() => alert("Erro ao carregar pergunta"));
    }
  }, [perguntaId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRespostaChange = (index, field, value) => {
    const novas = [...respostas];
    if (field === "correta") {
      novas.forEach((r, i) => (novas[i].correta = false));
      novas[index].correta = true;
    } else {
      novas[index][field] = value;
    }
    setRespostas(novas);
  };

  const adicionarResposta = () => {
    setRespostas([...respostas, { texto: "", correta: false }]);
  };

  const removerResposta = (index) => {
    const novas = [...respostas];
    novas.splice(index, 1);
    setRespostas(novas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        texto: form.enunciado,
        tipo: form.tipo,
        justificativa: "",
        respostas
      };

      if (perguntaId) {
        await api.put(`/perguntas/${perguntaId}`, payload);
      } else {
        await api.post(`/questionarios/${id}/perguntas`, payload);
      }

      navigate(`/questionarios/${id}/perguntas`);
    } catch {
      alert("Erro ao salvar pergunta");
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">{perguntaId ? "Editar" : "Nova"} Pergunta</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl space-y-4">
        <input
          type="text"
          name="enunciado"
          placeholder="Enunciado da pergunta"
          value={form.enunciado}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="multipla_escolha">Múltipla Escolha</option>
          <option value="texto">Texto</option>
          <option value="verdadeiro_falso">Verdadeiro ou Falso</option>
        </select>

        <div className="space-y-2">
          <label className="block font-semibold">Respostas:</label>
          {respostas.map((resposta, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Resposta ${index + 1}`}
                className="flex-1 p-2 border rounded"
                value={resposta.texto}
                onChange={(e) =>
                  handleRespostaChange(index, "texto", e.target.value)
                }
              />
              <input
                type="radio"
                name="correta"
                checked={resposta.correta}
                onChange={() => handleRespostaChange(index, "correta", true)}
                title="Marcar como correta"
              />
              <button
                type="button"
                onClick={() => removerResposta(index)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={adicionarResposta}
            className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            + Adicionar Resposta
          </button>
        </div>

        <button type="submit" className="bg-fluent-primary text-white px-4 py-2 rounded hover:bg-blue-700">
          Salvar
        </button>
      </form>
    </Layout>
  );
}
