import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitStateFavoriteInterface {
  ids: (string | number)[];
}

const initialState: InitStateFavoriteInterface = {
  ids: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<{id: string | number}>) => {
      state.ids.push(action.payload.id);
    },
    removeFavorite: (state, action: PayloadAction<{id: string | number}>) => {
      state.ids.slice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

export const addFavorite = favoriteSlice.actions.addFavorite;
export const removeFavorite = favoriteSlice.actions.removeFavorite;

export default favoriteSlice.reducer;
