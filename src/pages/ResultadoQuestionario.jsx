import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ResultadoQuestionario() {
  const { id } = useParams(); // id do questionário
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get(`/respostas-usuario/resultado/${id}`);
        setResultado(res.data);
      } catch {
        alert("Erro ao carregar resultado");
      }
    }
    carregar();
  }, [id]);

  if (!resultado) return <Layout><p>Carregando resultado...</p></Layout>;

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Resultado: {resultado.questionario}</h2>
      <p className="mb-4 text-lg">
        Acertos: <span className="text-green-600 font-semibold">{resultado.acertos}</span> de{" "}
        <span className="font-semibold">{resultado.total}</span>
      </p>

      <ul className="space-y-4">
        {resultado.detalhes.map((item) => (
          <li key={item.pergunta_id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{item.enunciado}</p>
            <p className="text-sm mt-1">
              Sua resposta: <span className={item.correta ? "text-green-600" : "text-red-600"}>
                {item.resposta_usuario || "Nenhuma"}
              </span>
            </p>
            {!item.correta && (
              <p className="text-sm text-gray-500">
                Correta: <span className="text-green-700">{item.resposta_correta}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
