import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface FavoritesContextValue {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useLocalStorage<number[]>(
    "app-favorites",
    [],
  );

  const toggleFavorite = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
