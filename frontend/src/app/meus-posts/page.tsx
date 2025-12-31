'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import Link from 'next/link';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function MeusPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            // 1. Pega o usuário logado
            const storedUser = localStorage.getItem('@DevBlog:user');
            if (!storedUser) return;
            const user = JSON.parse(storedUser);

            // 2. Busca todos os posts e filtra no front (solução rápida sem mexer no back agora)
            const res = await api.get('/posts');

            // Filtra apenas onde o ID do autor é igual ao meu ID
            const meus = res.data.filter((p: any) => p.author?._id === user._id || p.author === user._id);

            setPosts(meus);
            setLoading(false);
        }
        loadData();
    }, []);

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        try {
            await api.delete(`/posts/${id}`);
            setPosts(posts.filter((p: any) => p._id !== id));
        } catch (err) {
            alert("Erro ao excluir.");
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Meus Posts</h1>
                    <p className="text-zinc-400">Gerencie suas publicações aqui.</p>
                </div>
                <Link href="/posts/novo" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                    <Plus size={18} />
                    Novo Post
                </Link>
            </div>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800">
                            <tr>
                                <th className="p-4 font-medium">Título</th>
                                <th className="p-4 font-medium text-center">Comentários</th>
                                <th className="p-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {posts.map((post: any) => (
                                <tr key={post._id} className="hover:bg-zinc-800/50 transition">
                                    <td className="p-4 font-medium text-zinc-200">{post.title}</td>
                                    <td className="p-4 text-center">
                                        <span className="bg-zinc-800 px-2 py-1 rounded text-xs">{post.commentCount}</span>
                                    </td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <Link href={`/posts/editar/${post._id}`} className="p-2 hover:bg-zinc-800 rounded-lg text-blue-400 transition">
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="p-2 hover:bg-red-900/20 rounded-lg text-red-400 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {posts.length === 0 && (
                        <div className="p-10 text-center text-zinc-500">
                            Você ainda não criou nenhum post.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}