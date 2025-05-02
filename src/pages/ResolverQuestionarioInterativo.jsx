import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function ResolverQuestionarioInterativo() {
  const { id } = useParams();
  const [questionario, setQuestionario] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get(`/questionarios/${id}/completo`);
        setQuestionario(res.data);
      } catch {
        alert("Erro ao carregar questionário");
      }
    }
    carregar();
  }, [id]);

  const responder = (perguntaId, alternativa) => {
    const correta = alternativa.correta;
    setRespostas(prev => ({ ...prev, [perguntaId]: alternativa.id }));
    setFeedback(correta ? "✅ Correta!" : "❌ Incorreta");
    if (correta) {
      setAcertos(prev => prev + 1);
    }
  };

  const avancar = () => {
    setFeedback(null);
    if (indiceAtual + 1 < questionario.perguntas.length) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      setFinalizado(true);
    }
  };

  if (!questionario) return <Layout><p>Carregando...</p></Layout>;

  const perguntaAtual = questionario.perguntas[indiceAtual];
  const progresso = Math.round(((indiceAtual + (finalizado ? 1 : 0)) / questionario.perguntas.length) * 100);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-2">{questionario.titulo}</h2>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div className="bg-green-500 h-3 rounded-full" style={{ width: `${progresso}%` }}></div>
        </div>

        {finalizado ? (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-green-600">Você finalizou!</h3>
            <p className="text-lg mt-2">Acertos: <strong>{acertos}</strong> de <strong>{questionario.perguntas.length}</strong></p>
          </div>
        ) : (
          <>
            <p className="text-lg font-semibold mb-4">
              {indiceAtual + 1}. {perguntaAtual.enunciado}
            </p>
            <ul className="space-y-2">
              {perguntaAtual.alternativas.map((alt) => (
                <li key={alt.id}>
                  <button
                    onClick={() => responder(perguntaAtual.id, alt)}
                    className="w-full text-left px-4 py-2 border rounded hover:bg-blue-100"
                    disabled={respostas[perguntaAtual.id]}
                  >
                    {alt.texto}
                  </button>
                </li>
              ))}
            </ul>

            {feedback && (
              <div className="mt-4 text-center font-semibold text-lg">
                {feedback}
                <button
                  onClick={avancar}
                  className="ml-4 bg-fluent-primary text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Avançar
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
