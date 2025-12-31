'use client';
import { useState } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });

            // Salva o token e os dados básicos no navegador
            localStorage.setItem('@DevBlog:token', response.data.access_token);
            localStorage.setItem('@DevBlog:user', JSON.stringify(response.data.user));

            router.push('/'); // Manda de volta para o feed
        } catch (err: any) {
            setError('E-mail ou senha inválidos!');
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                <h1 className="text-2xl font-bold text-zinc-50 mb-2">Bem-vindo de volta</h1>
                <p className="text-zinc-400 mb-8">Faça login para gerenciar seus posts.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">E-mail</label>
                        <input
                            type="email"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-50 focus:border-blue-500 outline-none transition"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">Senha</label>
                        <input
                            type="password"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-50 focus:border-blue-500 outline-none transition"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition mt-4"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}