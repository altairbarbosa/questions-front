import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, senha });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.mensagem || "Erro ao fazer login";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fluent-background">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-fluent-primary">Entrar</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-fluent-primary" />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-fluent-primary" />
        <button type="submit" className="w-full bg-fluent-primary text-white p-2 rounded hover:bg-blue-600 transition">
          Entrar
        </button>
      </form>
    </div>
  );
}
