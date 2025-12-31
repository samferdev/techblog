'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, User, LogOut } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();

    // Não mostra a sidebar na tela de login
    if (pathname === '/login') return null;

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 h-screen fixed left-0 top-0 flex flex-col hidden md:flex">
            {/* Logo */}
            <div className="p-6 border-b border-zinc-800">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    DevBlog
                </h1>
            </div>

            {/* Navegação */}
            <nav className="flex-1 p-4 space-y-2">
                <Link
                    href="/"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive('/') ? 'bg-blue-600/10 text-blue-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'}`}
                >
                    <Home size={20} />
                    <span>Feed Geral</span>
                </Link>

                <Link
                    href="/meus-posts"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive('/meus-posts') ? 'bg-blue-600/10 text-blue-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'}`}
                >
                    <FileText size={20} />
                    <span>Meus Posts</span>
                </Link>

                {/* Espaço para futura feat "Perfil" */}
                <div className="px-4 py-3 text-zinc-600 cursor-not-allowed flex items-center gap-3">
                    <User size={20} />
                    <span>Perfil (Em breve)</span>
                </div>
            </nav>

            {/* Rodapé da Sidebar */}
            <div className="p-4 border-t border-zinc-800">
                <button
                    onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
                    className="flex items-center gap-3 text-red-400 hover:text-red-300 transition w-full px-4 py-2"
                >
                    <LogOut size={20} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    );
}