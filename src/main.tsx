import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Recipes from "./pages/Recipes.tsx";
import Contact from "./pages/Contact.tsx";
import RecipeDetails from "./pages/RecipeDetails.tsx";
import About from "./pages/About.tsx";
import NotFound from "./pages/NotFound.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import BlogList from "./pages/BlogList.tsx";
import Blog from "./pages/Blog.tsx";
import { GlobalProvider } from "./GlobalContext";

const isEndpointsWorking = true; // Set based on your backend status
const userRole = "user"; // Replace with the actual role from your auth system

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider isEndpointsWorking={isEndpointsWorking} role={userRole}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </GlobalProvider>
  </StrictMode>
);
