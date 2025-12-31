'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Busca a lista de posts do Backend
    api.get('/posts').then((res) => setPosts(res.data));

    // 2. Verifica se existe um usuário logado no navegador
    const savedUser = localStorage.getItem('@DevBlog:user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* CABEÇALHO */}
        <header className="flex justify-between items-center mb-12">
          <Link href="/" className="text-3xl font-bold hover:opacity-80 transition">
            DevBlog 🚀
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-zinc-400">
                  Olá, <b className="text-zinc-200">{user.username}</b>
                </span>
                <Link
                  href="/posts/novo"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
                >
                  Novo Post
                </Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="text-zinc-500 hover:text-red-400 text-sm transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="text-blue-400 hover:underline">
                Entrar
              </Link>
            )}
          </div>
        </header>

        {/* LISTAGEM DE POSTS */}
        <div className="grid gap-6">
          {posts.map((post: any) => (
            <div
              key={post._id}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition shadow-sm"
            >
              {/* Link dinâmico para a página de detalhes do post */}
              <Link href={`/posts/${post._id}`} className="group">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
                  {post.title}
                </h2>
              </Link>

              <p className="text-zinc-400 mb-4 line-clamp-3 leading-relaxed">
                {post.content}
              </p>

              <div className="flex justify-between items-center text-sm border-t border-zinc-800 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Por:</span>
                  <span className="font-medium text-zinc-300">{post.author?.username}</span>
                </div>

                {/* O famoso contador que fizemos no Backend */}
                <div className="flex items-center gap-2 text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                  <span>💬 {post.commentCount} comentários</span>
                </div>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl">
              <p className="text-zinc-500">Nenhum post encontrado. Seja o primeiro a postar!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}