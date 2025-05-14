import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ResolverQuestionario() {
  const { id } = useParams(); // id do questionário
  const [questionario, setQuestionario] = useState(null);
  const [respostas, setRespostas] = useState({});

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get(`/questionarios/${id}/completo`);
        setQuestionario(res.data);
      } catch (err) {
        console.error("Erro ao carregar questionário:", err);
        alert("Erro ao carregar questionário");
      }
    }
    carregar();
  }, [id]);


  const handleResposta = (perguntaId, alternativaId) => {
    setRespostas(prev => ({
      ...prev,
      [perguntaId]: alternativaId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        questionario_id: parseInt(id),
        respostas: Object.entries(respostas).map(([pergunta_id, alternativa_id]) => ({
          pergunta_id: parseInt(pergunta_id),
          alternativa_id: parseInt(alternativa_id)
        }))
      };

      await api.post("/respostas-usuario/lote", payload);

      alert("Respostas enviadas com sucesso!");
      // Você pode redirecionar para uma tela de resultado, se desejar
    } catch (err) {
      console.error("Erro ao enviar respostas:", err);
      alert("Erro ao enviar respostas");
    }
  };

  if (!questionario) return <Layout><p>Carregando...</p></Layout>;

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">{questionario.titulo}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questionario.perguntas?.map((pergunta) => (
          <div key={pergunta.id} className="bg-white p-4 rounded shadow">
            <p className="font-medium mb-2">{pergunta.texto}</p>
            <div className="flex flex-col gap-2">
              {Array.isArray(pergunta.respostas) ? (
                pergunta.respostas.map((alt) => (
                  <label key={alt.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`pergunta_${pergunta.id}`}
                      value={alt.id}
                      checked={respostas[pergunta.id] === alt.id}
                      onChange={() => handleResposta(pergunta.id, alt.id)}
                    />
                    {alt.texto}
                  </label>
                ))
              ) : (
                <p className="text-red-500 text-sm">Nenhuma alternativa cadastrada.</p>
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-fluent-primary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar Respostas
        </button>
      </form>
    </Layout>
  );
}
