'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useParams, useRouter } from 'next/navigation';

export default function EditarPost() {
    const { id } = useParams();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        api.get('/posts').then(res => {
            const p = res.data.find((item: any) => item._id === id);
            if (p) {
                setTitle(p.title);
                setContent(p.content);
            }
        });
    }, [id]);

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        try {
            await api.patch(`/posts/${id}`, { title, content });
            router.push(`/posts/${id}`);
        } catch (err) {
            alert("Erro ao editar. Só o autor pode fazer isto!");
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Editar Post</h1>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <input
                        className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none"
                        value={title} onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl h-48 outline-none"
                        value={content} onChange={e => setContent(e.target.value)}
                    />
                    <button className="w-full bg-blue-600 py-4 rounded-xl font-bold">Guardar Alterações</button>
                </form>
            </div>
        </div>
    );
}