import React, {createContext, useState} from 'react';

interface FavoritesContextProviderProps {
  children: React.ReactNode;
}

interface FavoriesContextInterface {
    ids: (string | number)[];
    addFavorite: (id: string | number) => void;
    removeFavorite: (id: string | number) => void;
}

export const FavoriesContext = createContext<FavoriesContextInterface>({
  ids: [],
  addFavorite: (id: string | number) => {},
  removeFavorite: (id: string | number) => {},
});

export const FavoritesContextProvider: React.FC<
  FavoritesContextProviderProps
> = ({children}) => {
  const [favoriteIds, setFavoriteIds] = useState<(string | number)[]>([]);
  function addFavorite(id: string | number) {
    setFavoriteIds(state => [...state, id]);
  }
  function removeFavorite(id: string | number) {
    setFavoriteIds(state => state.filter(it => it !== id));
  }
  const value: FavoriesContextInterface = {
    ids: favoriteIds,
    addFavorite,
    removeFavorite
  }
  return <FavoriesContext.Provider value={value}>{children}</FavoriesContext.Provider>;
};
