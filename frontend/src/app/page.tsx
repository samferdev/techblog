'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Busca os posts
    api.get('/posts').then((res) => setPosts(res.data));

    // Verifica se tem usuário logado no localStorage
    const savedUser = localStorage.getItem('@DevBlog:user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">DevBlog 🚀</h1>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-zinc-400">Olá, <b className="text-zinc-200">{user.username}</b></span>
                <Link href="/posts/novo" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition">
                  Novo Post
                </Link>
                <button
                  onClick={() => { localStorage.clear(); window.location.reload(); }}
                  className="text-zinc-500 hover:text-red-400 text-sm"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="text-blue-400 hover:underline">Entrar</Link>
            )}
          </div>
        </header>

        <div className="grid gap-6">
          {posts.map((post: any) => (
            <div key={post._id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-zinc-400 mb-4">{post.content}</p>
              <div className="flex justify-between text-sm border-t border-zinc-800 pt-4">
                <span>Por: {post.author?.username}</span>
                <span className="text-blue-400">💬 {post.commentCount} comentários</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}