import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <div className="flex h-screen overflow-hidden bg-fluent-background">
      {/* Menu lateral */}
      <aside
        className={classNames(
          "bg-fluent-sidebar text-fluent-textLight w-64 space-y-6 py-6 px-4 transition-transform duration-200 ease-in-out z-30 h-full fixed",
          {
            "-translate-x-full": !menuAberto,
            "translate-x-0": menuAberto
          }
        )}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white hover:text-red-300"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-3 mt-14">
          <Link to="/home" onClick={toggleMenu} className="hover:underline">🏠 Início</Link>
          <Link to="/dashboard" onClick={toggleMenu} className="hover:underline">📊 Dashboard</Link>
          <Link to="/questionarios" onClick={toggleMenu} className="hover:underline">🧾 Meus Questionários</Link>
          <Link to="/questionarios-publicos" onClick={toggleMenu} className="hover:underline">🌐 Questionários Públicos</Link>
        </nav>

        <hr className="border-gray-600 my-4" />

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="text-left text-red-300 hover:text-red-500"
        >
          Sair
        </button>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <header className="bg-fluent-primary text-white px-6 py-3 flex items-center justify-between shadow">
          <div className="flex items-center gap-4">
            <button onClick={toggleMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d={menuAberto
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">📘 Questions</h1>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-auto bg-fluent-background">
          {children}
        </main>

        <footer className="bg-white text-center text-gray-400 p-2 text-sm">
          &copy; {new Date().getFullYear()} Altair Barbosa
        </footer>
      </div>
    </div>
  );
}
