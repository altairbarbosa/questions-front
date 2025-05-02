import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Perguntas() {
  const { id } = useParams(); // id do questionário
  const [perguntas, setPerguntas] = useState([]);
  const [titulo, setTitulo] = useState("");

  const carregar = async () => {
    try {
      const [respPerguntas, respQuestionario] = await Promise.all([
        api.get(`/questionarios/${id}/perguntas`),
        api.get(`/questionarios/${id}`)
      ]);
      setPerguntas(respPerguntas.data);
      setTitulo(respQuestionario.data.titulo);
    } catch {
      alert("Erro ao carregar perguntas");
    }
  };

  useEffect(() => {
    carregar();
  }, [id]);

  const excluir = async (perguntaId) => {
    if (!window.confirm("Deseja excluir esta pergunta?")) return;
    try {
      await api.delete(`/perguntas/${perguntaId}`);
      carregar();
    } catch {
      alert("Erro ao excluir");
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Perguntas de: {titulo}</h2>
        <Link to={`/questionarios/${id}/perguntas/nova`} className="bg-fluent-primary text-white px-4 py-2 rounded hover:bg-blue-700">
          Nova Pergunta
        </Link>
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {perguntas.map(p => (
          <li key={p.id} className="p-4 bg-white rounded shadow">
            <p className="font-medium">{p.enunciado}</p>
            <p className="text-sm text-gray-500 italic mt-1">Tipo: {p.tipo}</p>
            <div className="mt-3 flex gap-3">
              <Link to={`/questionarios/${id}/perguntas/${p.id}`} className="text-blue-600 hover:underline">Editar</Link>
              <button onClick={() => excluir(p.id)} className="text-red-500 hover:underline">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
