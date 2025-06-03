-----

# Foodieland

A modern food recipe platform built with **React**, **TypeScript**, and **Vite**. Foodieland allows users to explore recipes, blogs, and cooking tips while providing admin functionality for managing recipes and blogs.

-----

## 🍽️ Table of Contents

  * [Overview](https://www.google.com/search?q=%23overview)
  * [Features](https://www.google.com/search?q=%23features)
  * [Technologies Used](https://www.google.com/search?q=%23technologies-used)
  * [Installation](https://www.google.com/search?q=%23installation)
  * [Development](https://www.google.com/search?q=%23development)
  * [Deployment](https://www.google.com/search?q=%23deployment)
  * [Folder Structure](https://www.google.com/search?q=%23folder-structure)
  * [Environment Variables](https://www.google.com/search?q=%23environment-variables)
  * [Contributing](https://www.google.com/search?q=%23contributing)

-----

## ✨ Overview

Foodieland is a **single-page application (SPA)** designed for food enthusiasts. It offers a seamless experience for Browse recipes, reading blogs, and managing content. **Admin users** have comprehensive control to add, edit, and delete recipes and blogs, while **regular users** can explore content and interact with the platform.

-----

## 🚀 Features

### User Features

  * Browse recipes and blogs.
  * View detailed recipe and blog pages.
  * Search and filter recipes by category, time, and favorites.
  * **Responsive design** for mobile, tablet, and desktop devices.

### Admin Features

  * Add, edit, and delete recipes.
  * Add, edit, and delete blogs.
  * **Role-based access control** to hide admin-only features from regular users.

### Animations

  * Smooth animations using **AOS (Animate On Scroll)** for an enhanced user experience.

-----

## 🛠️ Technologies Used

### Frontend

  * **React**: Component-based UI development.
  * **TypeScript**: Type-safe JavaScript for scalable development.
  * **Vite**: Fast development server and build tool.
  * **Tailwind CSS**: Utility-first CSS framework for styling.
  * **Swiper.js**: Interactive sliders for hero sections.

### Backend

  * **FastAPI**: Python-based backend framework.
  * **SQLite**: Lightweight database for development and deployment.

### Other Libraries

  * **AOS**: Scroll-based animations.
  * **Draft.js**: Rich text editor for blogs.
  * **React Router**: Client-side routing.

-----

## ⚙️ Installation

### Prerequisites

Before you begin, ensure you have the following installed:

  * **Node.js** (v16 or higher)
  * **npm** or **yarn**
  * **Python** (v3.9 or higher)

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/foodieland.git
    cd foodieland
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

-----

## 👨‍💻 Development

### Scripts

  * `npm run dev`: Starts the Vite development server.
  * `npm run build`: Builds the project for production.
  * `npm run preview`: Previews the production build.
  * `npm run lint`: Runs ESLint to check for code issues.

### Code Quality

  * **ESLint** is configured for React and TypeScript.
  * Please follow the coding standards defined in `.eslintrc.js`.

-----

## 🌐 Deployment

### Frontend Deployment

1.  **Build the project:**

    ```bash
    npm run build
    ```

2.  **Deploy to Vercel:**

      * Ensure the `vercel.json` file is in the root directory.
      * Push the code to your Git repository.
      * Connect the repository to Vercel and deploy.

### Backend Deployment

  * Deploy the **FastAPI** backend to Vercel or another hosting platform.
  * Use **SQLite** for the database.

-----

## 📂 Folder Structure

```
foodieland/
├── src/
│   ├── assets/          # Images and icons
│   ├── components/      # Reusable React components
│   ├── hooks/           # Custom React hooks for shared logic
│   ├── pages/           # Page-level components (e.g., Home, RecipeDetail)
│   ├── styles/          # Global CSS files and stylesheets
│   ├── utils/           # Utility functions and TypeScript types
│   ├── GlobalContext.tsx # Global state management with React Context API
│   ├── main.tsx         # Entry point for the React application
│   └── vite-env.d.ts    # Vite environment type definitions
├── public/              # Static assets served directly (e.g., favicon)
├── node_modules/        # npm dependencies installed
├── package.json         # Project metadata, scripts, and dependencies
├── tsconfig.json        # TypeScript compiler configuration
├── vercel.json          # Vercel deployment configuration
├── vite.config.ts       # Vite build tool configuration
└── README.md            # Project documentation (this file!)
```

-----

## 🔒 Environment Variables

Create a `.env` file in the root directory of your project to store environment variables:

```
VITE_API_BASE_URL=https://foodielandbackend.vercel.app
```

-----

## 👋 Contributing

We welcome contributions to Foodieland\!

### How to Contribute

1.  **Fork** the repository.

2.  **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

3.  **Make your changes** and **commit** them:

    ```bash
    git commit -m "Add your feature"
    ```

4.  **Push** to your branch:

    ```bash
    git push origin feature/your-feature-name
    ```

5.  **Create a pull request** from your forked repository to the `main` branch of this repository.

-----
