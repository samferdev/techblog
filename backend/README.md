# 🚀 TechBlog API - Backend

> Backend robusto para uma plataforma de blog e conteúdo tecnológico, desenvolvido com foco em arquitetura escalável e Clean Code.

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## 📖 Sobre o Projeto

O **TechBlog** é um projeto desenvolvido durante o 3º semestre de Ciência da Computação. O objetivo é estruturar uma aplicação **Fullstack** (com foco intenso no Backend) que simule cenários reais de mercado, como autenticação segura, modelagem de dados complexa e upload de arquivos.

Este repositório contém a API construída em **NestJS**, desenhada para ser modular, testável e fácil de manter.

---

## 🏗️ Arquitetura e Decisões Técnicas

O projeto segue os princípios de **SOLID** e **Separation of Concerns**, utilizando a estrutura nativa do NestJS:

### 1. Organização Modular
O sistema é dividido por domínios (ex: `UsersModule`, `AuthModule`). Cada pasta contém tudo que aquele recurso precisa para funcionar, facilitando a manutenção.

### 2. Camadas da Aplicação
* **Controllers:** A "porta de entrada". Apenas recebem requisições HTTP e validam o formato dos dados.
* **DTOs (Data Transfer Objects):** Camada de segurança e validação. Utilizamos `class-validator` para rejeitar dados inválidos (ex: e-mail incorreto, senha fraca) antes de processar.
* **Services:** O "cérebro". Contém toda a regra de negócio (ex: criptografar senha com Bcrypt, verificar duplicidade).
* **Mongoose Schemas:** Definição da estrutura dos documentos no MongoDB Atlas.

### 3. Segurança & Configuração
* **Variáveis de Ambiente:** Gerenciadas via `ConfigService` para evitar chaves expostas no código.
* **Conexão Assíncrona:** O banco de dados só conecta após a leitura garantida das configurações.

---

## ⚡ Funcionalidades (Status)

- [x] **Configuração Base**
    - [x] Conexão com MongoDB Atlas (Cloud).
    - [x] Configuração de Variáveis de Ambiente (.env).
- [x] **Módulo de Usuários**
    - [x] Schema do Usuário (Senha protegida na leitura).
    - [x] DTOs com validação rigorosa.
    - [x] Criptografia de Senha (Hash) antes de salvar.
    - [x] Rota de Criação (POST /users).
- [ ] **Autenticação (Próximo Passo)**
    - [ ] Login (JWT).
    - [ ] Guards de Proteção.
- [ ] **Posts & Conteúdo**
    - [ ] CRUD de Posts.
    - [ ] Upload de Mídia.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Node.js (v18+)
* NPM ou Yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/SEU-USUARIO/techblog.git](https://github.com/SEU-USUARIO/techblog.git)
   cd techblog/backend

   npm install

   MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/techblog
PORT=3000


# Modo desenvolvimento (com hot-reload)
npm run start:dev

🧪 Testando a API
Você pode testar a criação de usuários usando Insomnia ou Postman:

Rota: POST http://localhost:3000/users

JSON (Body):

JSON

{
  "username": "dev_senior",
  "email": "teste@techblog.com",
  "password": "SenhaSegura123!"
}