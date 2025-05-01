import React, { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Home() {
  const [publicos, setPublicos] = useState([]);
  const [meus, setMeus] = useState([]);

  useEffect(() => {
    api.get("/questionarios/publicos")
      .then(res => setPublicos(res.data))
      .catch(() => alert("Erro ao carregar públicos"));

    api.get("/questionarios/meus")
      .then(res => setMeus(res.data))
      .catch(() => alert("Erro ao carregar meus questionários"));
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Meus Questionários (Privados e Públicos)</h2>
        {meus.length === 0 ? (
          <p className="text-gray-500">Nenhum questionário criado ainda.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {meus.map(q => (
              <li key={q.id} className="p-4 bg-white rounded shadow">
                <h3 className="font-bold">{q.titulo}</h3>
                <p className="text-sm text-gray-600">{q.descricao}</p>
                <span className="text-xs inline-block mt-2 px-2 py-1 rounded bg-gray-100 text-gray-700">
                  {q.privacidade === "publico" ? "Público" : "Privado"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Todos os Públicos</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {publicos.map(q => (
            <li key={q.id} className="p-4 bg-white rounded shadow">
              <h3 className="font-bold">{q.titulo}</h3>
              <p className="text-sm text-gray-600">{q.descricao}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
