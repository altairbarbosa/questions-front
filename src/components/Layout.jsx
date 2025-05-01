import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">📘 Questionários</h1>
        <div className="sm:hidden">
          <button onClick={() => setMenuAberto(!menuAberto)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d={menuAberto ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <nav className="hidden sm:flex gap-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </nav>
      </header>

      {menuAberto && (
        <nav className="sm:hidden bg-blue-100 p-3 flex flex-col gap-2 text-blue-800 shadow-inner">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </nav>
      )}

      <main className="flex-1 bg-gray-100 p-4">
        {children}
      </main>

      <footer className="bg-white text-center text-gray-400 p-2 text-sm">
        &copy; {new Date().getFullYear()} Altair Barbosa
      </footer>
    </div>
  );
}
