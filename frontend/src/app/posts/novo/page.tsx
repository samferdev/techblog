'use client';
import { useState } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function NovoPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await api.post('/posts', { title, content, tags: ['novo'] });
            router.push('/');
        } catch (err) {
            alert('Erro ao criar post! Verifique se você está logado.');
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Criar novo post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-blue-500"
                        placeholder="Título do post"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-blue-500 h-48"
                        placeholder="O que você está pensando?"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <button className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-700 transition">
                        Publicar Post
                    </button>
                </form>
            </div>
        </div>
    );
}