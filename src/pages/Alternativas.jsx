import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Alternativas() {
  const { perguntaId } = useParams();
  const [alternativas, setAlternativas] = useState([]);
  const [enunciado, setEnunciado] = useState("");

  const carregar = async () => {
    try {
      const [resAlt, resPergunta] = await Promise.all([
        api.get(`/perguntas/${perguntaId}/alternativas`),
        api.get(`/perguntas/${perguntaId}`)
      ]);
      setAlternativas(resAlt.data);
      setEnunciado(resPergunta.data.enunciado);
    } catch {
      alert("Erro ao carregar alternativas");
    }
  };

  useEffect(() => {
    carregar();
  }, [perguntaId]);

  const excluir = async (altId) => {
    if (!window.confirm("Deseja excluir esta alternativa?")) return;
    try {
      await api.delete(`/alternativas/${altId}`);
      carregar();
    } catch {
      alert("Erro ao excluir");
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Alternativas da pergunta: {enunciado}</h2>
        <Link to={`/perguntas/${perguntaId}/alternativas/nova`} className="bg-fluent-primary text-white px-4 py-2 rounded hover:bg-blue-700">
          Nova Alternativa
        </Link>
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {alternativas.map((a) => (
          <li key={a.id} className="p-4 bg-white rounded shadow">
            <p>{a.texto}</p>
            {a.correta && <span className="text-xs text-green-600 font-semibold">✔ Correta</span>}
            <div className="mt-3 flex gap-3">
              <Link to={`/perguntas/${perguntaId}/alternativas/${a.id}`} className="text-blue-600 hover:underline">Editar</Link>
              <button onClick={() => excluir(a.id)} className="text-red-500 hover:underline">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
