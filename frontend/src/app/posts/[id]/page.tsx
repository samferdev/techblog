'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useParams, useRouter } from 'next/navigation';

export default function PostDetalhes() {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<any>(null);
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState('');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Busca o post e comentários
        api.get('/posts').then(res => {
            const p = res.data.find((item: any) => item._id === id);
            setPost(p);
        });
        api.get(`/comments/post/${id}`).then(res => setComentarios(res.data));

        // Pega o user logado para comparar com o autor
        const savedUser = localStorage.getItem('@DevBlog:user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, [id]);

    async function handleDeletar() {
        if (!confirm("Tens a certeza que queres apagar este post?")) return;
        try {
            await api.delete(`/posts/${id}`);
            router.push('/');
        } catch (err) {
            alert("Erro ao apagar o post.");
        }
    }

    async function handleComentar(e: React.FormEvent) {
        e.preventDefault();
        if (!novoComentario.trim()) return;
        try {
            const res = await api.post('/comments', { content: novoComentario, postId: id });
            setComentarios([...comentarios, res.data] as any);
            setNovoComentario('');
        } catch (err) {
            alert("Erro ao comentar. Estás logado?");
        }
    }

    if (!post) return <div className="min-h-screen bg-zinc-950 p-10 text-white">A carregar...</div>;

    const isOwner = user?._id === post.author?._id;

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-4xl font-bold">{post.title}</h1>

                    {/* BOTÕES DE DONO */}
                    {isOwner && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => router.push(`/posts/editar/${id}`)}
                                className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg text-sm transition"
                            >
                                ✏️ Editar
                            </button>
                            <button
                                onClick={handleDeletar}
                                className="bg-red-900/30 hover:bg-red-900/50 p-2 rounded-lg text-sm text-red-400 transition"
                            >
                                🗑️ Apagar
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">{post.content}</p>

                <hr className="border-zinc-800 mb-8" />

                <section>
                    <h2 className="text-xl font-semibold mb-6">Comentários ({comentarios.length})</h2>

                    <form onSubmit={handleComentar} className="mb-10 flex gap-2">
                        <input
                            className="flex-1 bg-zinc-900 border border-zinc-800 p-3 rounded-lg outline-none focus:border-blue-500"
                            placeholder="Escreve a tua opinião..."
                            value={novoComentario}
                            onChange={e => setNovoComentario(e.target.value)}
                        />
                        <button className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Enviar</button>
                    </form>

                    <div className="space-y-4">
                        {comentarios.map((c: any) => (
                            <div key={c._id} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                                <span className="text-sm font-medium text-blue-400">@{c.author?.username}</span>
                                <p className="text-zinc-400 text-sm mt-1">{c.content}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}