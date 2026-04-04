### TEAM O(1) PRESENTS
Youtube Link - https://youtu.be/gC7-w9ouBgg
# WaifuBinge 🌸

WaifuBinge is a modern, high-performance web application tailored for anime and manga enthusiasts. Explore top-ranked series, browse intricately categorized titles based on your current **Mood**, maintain personal watchlists/readlists, and seamlessly track live global leaderboards.

![Anime Discovery Engine](https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&h=600&fit=crop)

## 🚀 Features
- **Dynamic Mood-Driven Discovery:** Explore Anime and Manga based on customized moods equipped with tailored genres (Excited, Chill, Romantic, Scared, etc.).
- **Live Jikan Integration:** Powered by the comprehensive Jikan V4 API to pull up-to-date data, scores, statistics, and synopses natively from MyAnimeList.
- **Watchlist & Readlist Synchronization:** Manage your personalized favorite titles effortlessly with persisting data logic.
- **Real-Time Leaderboards:** Dedicated slick sidebar leaderboards for Top Anime and Top Manga, showcasing trends and scores complete with collapsible UI.
- **Micro-Animations & Smooth Polish:** Silky hover effects, dynamic drop-shadows matching icon colors, and loading skeletons ensure a highly premium UX.

---

## 🛠️ Technology Stack & Libraries

WaifuBinge is built utilizing a rapid, scalable, and ultra-modern frontend stack.

### Core Frameworks
* **[React](https://react.dev/)**: Robust component-based UI architecture.
* **[Vite](https://vitejs.dev/)**: Next-generation, lightning-fast frontend dev server and bundler.

### Styling & Visuals
* **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first scalable styling structure driving custom theme configurations.
* **[Framer Motion](https://www.framer.com/motion/)**: Production-ready animation library driving fluid element transitions, staggered reveals, and pulsing effects.
* **[Lucide React](https://lucide.dev/)**: Scalable & cleanly responsive SVG Iconography natively matching theme colors and custom SVG glows.

### UI Architecture
* **[shadcn/ui](https://ui.shadcn.com/)**: Exquisite, beautifully designed accessible components like Badges, Skeletons, and dropdowns. 
* **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible component primitives empowering Shadcn.

### State & Data Management
* **[Zustand](https://github.com/pmndrs/zustand)**: A small, shockingly fast, un-opinionated state-management solution used for tracking global Watchlist/Readlist states cross-page.
* **[TanStack Query (React Query)](https://tanstack.com/query/latest)**: Powerful asynchronous state management handling massive Jikan API payloads, data caching, background fetching, and 10-minute stale timeouts.
* **[Axios](https://axios-http.com/)**: Promise-based HTTP client streamlining all robust API requests.
* **[React Router DOM](https://reactrouter.com/)**: Enabling seamless, flicker-free client-side navigation between Home, Manga, Details, and Config pages.

---

## 🤖 AI Development Assistance

This extensive application's layout refactoring, dynamic component generation, complex visual UX fixes, and code generation were deeply pair-programmed alongside **Antigravity**.

* **Antigravity** is a highly capable, autonomous Agentic Coding AI developed natively by the **Google Deepmind Team** focusing on Advanced Agentic Coding. Antigravity was leveraged extensively within this IDE to conceptualize designs, seamlessly refactor structural UI breakpoints dynamically cross-file, migrate code architectures smoothly (such as fully adapting anime-components natively for manga), and track precise UI logic (like reactive drop-shadow tracking).

---

## 💻 Getting Started

1. Clone the repository
2. Navigate to the `WaifuBinge` directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173/`
