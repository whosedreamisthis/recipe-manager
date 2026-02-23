# 🍳 Recipe Manager

A modern, full-stack recipe management application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This app allows users to discover, create, save, and manage recipes with a seamless, mobile-first user experience.

## ✨ Features

-   **Dynamic Discovery**: Browse recipes with real-time search and category filtering.
-   **Personal Vault**: Dedicated "My Recipes" section that fetches all your creations at once.
-   **Multi-Step Recipe Creation**: A guided 3-step form (Basics, Ingredients, Instructions) with persistence and demo-fill capabilities.
-   **Shopping List**: Automatically generate a shopping list from recipe ingredients.
-   **Recent Activity**: Quickly jump back into recently viewed recipes using local persistence.
-   **Authentication**: Secure user management and identity powered by **Clerk**.
-   **Infinite Loading**: Smooth scrolling experience using **TanStack Query** (React Query) for paginated discovery.

## 🛠️ Tech Stack

### Frontend

-   **Framework**: Next.js 14 (App Router)
-   **State Management**: Zustand (Search, UI, Categories, Forms, Shopping List, Recents)
-   **Data Fetching**: TanStack Query (v5)
-   **Form Handling**: React Hook Form + Zod validation
-   **Styling**: Tailwind CSS + Shadcn/UI

### Backend & Auth

-   **Auth**: Clerk (Identity Management)
-   **Database Interface**: Next.js Server Actions

---

## 📂 Project Structure

### State Management (`/stores`)

The application uses **Zustand** for lightweight, modular state:

-   `useSearchStore.ts`: Manages global search queries.
-   `useCategoryStore.ts`: Handles recipe category selection.
-   `useUIStore.ts`: Manages tab switching (Search vs. Saved) and URL synchronization.
-   `useNewRecipeFormStore.ts`: Persistence for the multi-step creation form.
-   `useShoppingListStore.ts`: Persisted store for ingredients (local storage).
-   `useRecentStore.ts`: Tracks recently viewed recipes via middleware persistence.

### Custom Hooks (`/hooks`)

-   `useRecipes.ts`: Handles infinite query logic for the main feed and bulk-fetching for user content.
-   `useSavedRecipes.ts`: Manages fetching and caching of user-bookmarked recipes.

---

## 🧪 Key Logic Patterns

### 🔑 Robust Identity & Filtering

The application implements a "Source of Truth" pattern for user-generated content:

-   **Immutable Identity**: Recipes are stored with a permanent `authorId` (sourced from Clerk). This ensures that "My Recipes" filtering remains 100% accurate even if a user changes their display name.
-   **Display Metadata**: The `author` name is saved at the time of creation as a "Display Label," ensuring fast rendering without extra lookups.

### 🔄 Hybrid Fetching Strategy

We use a conditional fetching logic in `useRecipes.ts`:

-   **Discovery Feed**: Uses standard 12-item pagination for optimal performance.
-   **My Recipes**: Automatically switches to a bulk-fetch strategy (e.g., limit 1000) when the category is selected. This provides an exhaustive view of personal content without the UX friction of "Load More" buttons.

### 💾 Multi-Step Form Persistence

The `NewRecipeForm` utilizes a centralized Zustand store to ensure that if a user accidentally refreshes the page or navigates away during the 3-step process, their progress is not lost.

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

## 📄 License

This project is licensed under the MIT License.
