import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Perguntas() {
  const { id } = useParams(); // ID do questionário
  const [questionario, setQuestionario] = useState(null);

  const carregarDados = () => {
    api.get(`/questionarios/${id}/perguntas`)
      .then(res => setQuestionario(res.data))
      .catch(() => alert("Erro ao carregar perguntas"));
  };

  useEffect(() => {
    carregarDados();
  }, [id]);

  const excluirPergunta = async (perguntaId) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta pergunta?");
    if (!confirmar) return;

    try {
      await api.delete(`/perguntas/${perguntaId}`);
      carregarDados(); // atualiza a lista após exclusão
    } catch (err) {
      alert("Erro ao excluir pergunta");
      console.error(err);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">
        {questionario ? questionario.titulo : "Carregando..."}
      </h2>

      <Link
        to={`/questionarios/${id}/perguntas/nova`}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Nova Pergunta
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {questionario?.perguntas?.length > 0 ? (
          questionario.perguntas.map((p) => (
            <div key={p.id} className="bg-white p-4 shadow rounded">
              <p className="text-gray-700 font-semibold mb-2">{p.texto}</p>
              <p className="text-sm italic text-gray-500">
                Tipo: {p.tipo || "Não especificado"}
              </p>
              <div className="mt-3 flex gap-4">
                <Link
                  to={`/questionarios/${id}/perguntas/${p.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => excluirPergunta(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4 text-gray-600">Nenhuma pergunta cadastrada.</p>
        )}
      </div>
    </Layout>
  );
}
