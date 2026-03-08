import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // This caused "Cannot find package"
import Sitemap from 'vite-plugin-pages-sitemap';

export default defineConfig({
  plugins: [react(), tailwindcss(),  Sitemap({
    hostname: "https://moviefinder-teckish.com/", // Replace with your actual domain
    routes: [
      "/",
      "/trending",
      "/blog",
      "/about",
      "/contact",
      // Dynamic routes can be approximated or handled server-side
      // "/movie/:id" (note: dynamic routes require special handling, see below)
    ],
    changefreq: "weekly", // Default changefreq for all pages
      priority: 0.7, // Default priority
      lastmod: new Date().toISOString(), // Dynamic lastmod
      // Optionally, override specific routes
      routeConfig: {
        "/": { priority: 1.0, changefreq: "daily" }, // Homepage
        "/blog": { priority: 0.8, changefreq: "monthly" }, // Blog index
        // Add more specific configurations as needed
      },
   
  })],

  build: {
    outDir: 'dist'
  }
});