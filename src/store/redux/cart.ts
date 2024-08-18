import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitStateCartInterface {
  ids: (string | number)[];
}

const initialState: InitStateCartInterface = {
  ids: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<{id: string | number}>) => {
      state.ids.push(action.payload.id);
    },
    removeCart: (state, action: PayloadAction<{id: string | number}>) => {
      state.ids.slice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

export const addCart = cartSlice.actions.addCart;
export const removeCart = cartSlice.actions.removeCart;

export default cartSlice.reducer;
