<!-- TODO: Organize multiple languages -->

# 📚 Gerenciamento de Livros

Uma aplicação web para gerenciamento de livros com controle de acesso para usuários e administradores.

## ⚙️ Como Rodar o Projeto

1. Clone o repositório:

```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:

```sh
npm install
```

3. Inicie o servidor Next.js:

```sh
npm run dev
```

## 🚀 Tecnologias Utilizadas

- Next.js 15 (App Router)
- React com TypeScript
- TailwindCSS
- React Query + Server Actions
- JSON Server (Simulação de API REST)
- Next Theme (Modo Claro/Escuro)
- Shadcn/ui

## 📌 Funcionalidades

### 🔑 Autenticação

- **Login:** E-mail e senha, com validação.
- **Registro:** Apenas usuários comuns podem se registrar.

### 👥 Gerenciamento de Usuários

- **Admin Inicial:** O primeiro usuário registrado é o administrador.
- **Criação de Administradores:** Apenas um admin pode promover outro usuário.
- **Controle de Acesso:** Usuários comuns podem visualizar livros, mas não editá-los.

### 📖 Gerenciamento de Livros

- **Listagem:** Todos os usuários podem visualizar livros.
- **CRUD (Somente Administradores):** Criar, editar e remover livros.
- **Detalhes do Livro:** Exibição de informações individuais.

### 🎨 Temas

A aplicação suporta modo claro e escuro via Next Theme.

4. Acesse: [http://localhost:3000](http://localhost:3000)

## 📌 Organização do Código

- `/components` → Componentes reutilizáveis
- `/contexts` → Contexto de autenticação
- `/app` → Páginas e Server Actions
- `/lib` → Configuração do React Query

---

# 📚 Book Management

A web application for managing books with role-based access control for users and admins.

⚙️ How to Run the Project

1. Clone the repository:

```sh
git clone https://github.com/your-user/your-repository.git
cd your-repository
```

2. Install dependencies:

```sh
npm install
```

3. Run Next.js server:

```sh
npm run dev
```

4. Open: [http://localhost:3000](http://localhost:3000)

📌 Project Structure

- `/components` → Reusable components
- `/contexts` → Authentication context
- `/app` → Pages and Server Actions
- `/lib` → React Query configuration

🚀 Technologies Used

- Next.js 15 (App Router)
- React with TypeScript
- TailwindCSS
- React Query + Server Actions
- JSON Server (Mock API)
- Next Theme (Dark/Light Mode)
- Shadcn/ui

## 📌 Features

### 🔑 Authentication

- **Login:** Email and password with validation.
- **Register:** Only regular users can sign up.

### 👥 User Management

- **Initial Admin:** The first registered user is the admin.
- **Admin Creation:** Only an admin can promote another user.
- **Access Control:** Regular users can view books but not edit them.

### 📖 Book Management

- **Listing:** All users can view books.
- **CRUD (Admins Only):** Create, edit, and delete books.
- **Book Details:** Display detailed information.

### 🎨 Themes

The app supports light and dark modes using Next Theme.
