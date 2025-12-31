import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar'; // Importe a Sidebar

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevBlog - Dashboard',
  description: 'Blog Fullstack com NestJS e Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50`}>
        <div className="flex min-h-screen">
          {/* Sidebar Fixa na Esquerda */}
          <Sidebar />

          {/* Conteúdo Principal na Direita */}
          {/* O 'md:ml-64' empurra o conteúdo para não ficar embaixo da sidebar no Desktop */}
          <main className="flex-1 md:ml-64 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}