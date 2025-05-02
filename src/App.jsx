import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Questionarios from "./pages/Questionarios";
import QuestionarioForm from "./pages/QuestionarioForm";
import Perguntas from "./pages/Perguntas";
import PerguntaForm from "./pages/PerguntaForm";
import Alternativas from "./pages/Alternativas";
import AlternativaForm from "./pages/AlternativaForm";
import ResolverQuestionario from "./pages/ResolverQuestionario";
import ResultadoQuestionario from "./pages/ResultadoQuestionario";
import QuestionariosPublicos from "./pages/QuestionariosPublicos";
import ResolverQuestionarioInterativo from "./pages/ResolverQuestionarioInterativo";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota pública */}
          <Route path="/" element={<Login />} />

          {/* Rotas protegidas */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

          {/* CRUD Questionários */}
          <Route path="/questionarios" element={<PrivateRoute><Questionarios /></PrivateRoute>} />
          <Route path="/questionarios/novo" element={<PrivateRoute><QuestionarioForm /></PrivateRoute>} />
          <Route path="/questionarios/:id" element={<PrivateRoute><QuestionarioForm /></PrivateRoute>} />

          {/* CRUD Perguntas */}
          <Route path="/questionarios/:id/perguntas" element={<PrivateRoute><Perguntas /></PrivateRoute>} />
          <Route path="/questionarios/:id/perguntas/nova" element={<PrivateRoute><PerguntaForm /></PrivateRoute>} />
          <Route path="/questionarios/:id/perguntas/:perguntaId" element={<PrivateRoute><PerguntaForm /></PrivateRoute>} />
          
          {/* CRUD Perguntas Públicas */}
          <Route path="/questionarios-publicos" element={<PrivateRoute><QuestionariosPublicos /></PrivateRoute>} />
          
          {/* Formulário Interativo */}
          <Route path="/questionarios/:id/responder-interativo" element={<PrivateRoute><ResolverQuestionarioInterativo /></PrivateRoute>} />
          
          {/* CRUD Alternativas */}
          <Route path="/perguntas/:perguntaId/alternativas" element={<PrivateRoute><Alternativas /></PrivateRoute>} />
          <Route path="/perguntas/:perguntaId/alternativas/nova" element={<PrivateRoute><AlternativaForm /></PrivateRoute>} />
          <Route path="/perguntas/:perguntaId/alternativas/:alternativaId" element={<PrivateRoute><AlternativaForm /></PrivateRoute>} />

          {/* Resolver Questionário + Resultado */}
          <Route path="/questionarios/:id/responder" element={<PrivateRoute><ResolverQuestionario /></PrivateRoute>} />
          <Route path="/questionarios/:id/resultado" element={<PrivateRoute><ResultadoQuestionario /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
