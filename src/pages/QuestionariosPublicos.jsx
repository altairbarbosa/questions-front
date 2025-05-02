import React, { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function QuestionariosPublicos() {
  const [questionarios, setQuestionarios] = useState([]);

  const carregar = async () => {
    try {
      const res = await api.get("/questionarios/publicos");
      setQuestionarios(res.data);
    } catch {
      alert("Erro ao carregar questionários públicos");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">🌐 Questionários Públicos</h2>
      {questionarios.length === 0 ? (
        <p className="text-gray-600">Nenhum questionário público disponível no momento.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {questionarios.map((q) => (
            <li key={q.id} className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">{q.titulo}</h3>
              <p className="text-sm text-gray-600">{q.descricao}</p>
              <div className="mt-3 flex justify-end">
                <Link to={`/questionarios/${q.id}/responder`} className="text-blue-600 hover:underline">
                  Resolver
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
