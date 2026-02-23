# 🍳 Recipe Manager

A modern, full-stack recipe management application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This app allows users to discover, create, save, and manage recipes with a seamless, mobile-first user experience.

## ✨ Features

-   **Dynamic Discovery**: Browse recipes with real-time search and category filtering.
-   **Multi-Step Recipe Creation**: A guided 3-step form (Basics, Ingredients, Instructions) with validation and demo-fill capabilities.
-   **Personal Vault**: Save your favorite recipes and access a dedicated "My Recipes" section.
-   **Shopping List**: Automatically generate a shopping list from recipe ingredients.
-   **Recent Activity**: Quickly jump back into recently viewed recipes using local persistence.
-   **Authentication**: Secure user management powered by **Clerk**.
-   **Infinite Loading**: Smooth scrolling experience using **TanStack Query** (React Query) for paginated data fetching.

## 🛠️ Tech Stack

### Frontend

-   **Framework**: Next.js 14 (App Router)
-   **State Management**: Zustand (Search, UI, Categories, Forms)
-   **Data Fetching**: TanStack Query (v5)
-   **Form Handling**: React Hook Form + Zod validation
-   **Styling**: Tailwind CSS + Shadcn/UI
-   **Icons**: Lucide React

### Backend & Auth

-   **Auth**: Clerk
-   **Database**: (Integrated via Next.js Server Actions)
-   **Deployment**: Vercel (Recommended)

---

## 📂 Project Structure

### State Management (`/stores`)

The application uses **Zustand** for lightweight, modular state:

-   `useSearchStore.ts`: Manages global search queries.
-   `useCategoryStore.ts`: Handles recipe category selection.
-   `useUIStore.ts`: Manages tab switching (Search vs. Saved) and URL sync.
-   `useNewRecipeFormStore.ts`: Persistence for the multi-step creation form.
-   `useShoppingListStore.ts`: Persisted store for ingredients (local storage).
-   `useRecentStore.ts`: Tracks recently viewed recipes via middleware persistence.

### Custom Hooks (`/hooks`)

-   `useRecipes.ts`: Handles infinite query logic for the main feed, including specialized "fetch all" logic for user-specific content.
-   `useSavedRecipes.ts`: Manages fetching and caching of user-bookmarked recipes.

---

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.x or later
-   A Clerk account for authentication keys

### Installation

1.  **Clone the repository**:

    ```bash
    git clone [https://github.com/your-username/recipe-manager.git](https://github.com/your-username/recipe-manager.git)
    cd recipe-manager
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory:

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
    CLERK_SECRET_KEY=your_secret
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the result.

---

## 🧪 Key Logic Patterns

### Infinite Query vs. Bulk Fetching

The application intelligently switches between paginated fetching (12 items per page) for the general discovery feed and bulk fetching (1000 items) when a user views "My Recipes" to ensure all personal content is visible without manual pagination.

### Multi-Step Persistence

The `NewRecipeForm` utilizes a centralized Zustand store to ensure that if a user accidentally refreshes the page during the 3-step process, their progress (Basics, Ingredients, Instructions) is not lost.

## 📄 License

This project is licensed under the MIT License.
