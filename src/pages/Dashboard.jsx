import React, { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [questionarios, setQuestionarios] = useState([]);

  useEffect(() => {
    api.get("/questionarios/publicos")
      .then(res => setQuestionarios(res.data))
      .catch(() => alert("Erro ao carregar questionários"));
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Questionários Públicos</h2>
      <ul className="grid md:grid-cols-2 gap-4">
        {questionarios.map(q => (
          <li key={q.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold text-lg">{q.titulo}</h3>
            <p>{q.descricao}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
