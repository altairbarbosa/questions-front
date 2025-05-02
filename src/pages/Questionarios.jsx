import React, { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Questionarios() {
  const [questionarios, setQuestionarios] = useState([]);

  const carregar = async () => {
    try {
      const res = await api.get("/questionarios/meus");
      setQuestionarios(res.data);
    } catch {
      alert("Erro ao carregar questionários");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const excluir = async (id) => {
    if (!window.confirm("Deseja excluir este questionário?")) return;
    try {
      await api.delete(`/questionarios/${id}`);
      carregar();
    } catch {
      alert("Erro ao excluir");
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Meus Questionários</h2>
        <Link to="/questionarios/novo" className="bg-fluent-primary text-white px-4 py-2 rounded hover:bg-blue-700">
          Novo
        </Link>
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {questionarios.map((q) => (
          <li key={q.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">{q.titulo}</h3>
            <p className="text-sm text-gray-600">{q.descricao}</p>
            <p className="text-xs mt-1 italic text-gray-400">Privacidade: {q.privacidade}</p>
            <div className="mt-3 flex gap-2">
              <Link to={`/questionarios/${q.id}`} className="text-blue-600 hover:underline">Editar</Link>
              <Link to={`/questionarios/${q.id}/perguntas`} className="text-green-600 hover:underline">Perguntas</Link>
              <button onClick={() => excluir(q.id)} className="text-red-500 hover:underline">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
