import {createContext, useReducer} from 'react';
import {Product} from '../../models/product.model';

interface CartContextInterface {
  items: Product[];
  total: number;
  addItem: (item: Product) => void;
  removeItem: (itemId: string | number) => void;
  removeItems: (itemIds: (string | number)[]) => void;
  clearCart: () => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  applyCoupon: (couponCode: string) => void;
  removeCoupon: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemsCount: () => number;
  isCouponApplied: boolean;
  getCoupon: () => string | null;
  getCouponError: () => string | null;
}

interface InitStateCartInterface {
  items: Product[];
  total: number;
  isCouponApplied: boolean;
  coupon: string | null;
  couponError: string | null;
}

const initialState: InitStateCartInterface = {
  items: [],
  total: 0,
  isCouponApplied: false,
  coupon: null,
  couponError: null,
};

export const CartContext = createContext<Partial<CartContextInterface>>({
  items: [],
  total: 0,
  removeItem: function (itemId: string | number): void {
    throw new Error('Function not implemented.');
  },
  removeItems: function (itemIds: (string | number)[]): void {
    throw new Error('Function not implemented.');
  },
  clearCart: function (): void {
    throw new Error('Function not implemented.');
  },
  updateQuantity: function (itemId: string, quantity: number): void {
    throw new Error('Function not implemented.');
  },
  removeCoupon: function (): void {
    throw new Error('Function not implemented.');
  },
  getSubtotal: function (): number {
    throw new Error('Function not implemented.');
  },
  getTax: function (): number {
    throw new Error('Function not implemented.');
  },
  getTotal: function (): number {
    throw new Error('Function not implemented.');
  },
  getItemsCount: function (): number {
    throw new Error('Function not implemented.');
  },
  isCouponApplied: false,
  getCoupon: function (): string | null {
    throw new Error('Function not implemented.');
  },
  getCouponError: function (): string | null {
    throw new Error('Function not implemented.');
  },
  addItem: function (item: Product): void {
    throw new Error('Function not implemented.');
  },
  applyCoupon: function (couponCode: string): void {
    throw new Error('Function not implemented.');
  },
});

interface CartContextProviderProps {
  children: React.ReactNode;
}

interface PaloadAction {
  type: string;
  payload?: any;
}

const CartReducer = (state: InitStateCartInterface, action: PaloadAction) => {
  switch (action.type) {
    case 'ADD': {
      if (state.items.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
        isCouponApplied: state.isCouponApplied,
        coupon: state.coupon,
        couponError: state.couponError,
      };
    }
    case 'DELETE': {
      return {
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - action.payload.price,
        isCouponApplied: state.isCouponApplied,
        coupon: state.coupon,
        couponError: state.couponError,
      };
    }
    case 'DELETES': {
      return {
        items: state.items.filter(item =>  !action.payload.includes(item.id)),
        total: state.total - action.payload.price,
        isCouponApplied: state.isCouponApplied,
        coupon: state.coupon,
        couponError: state.couponError,
      };
    }
    default: {
      return state;
    }
  }
};

export const CartContextProvider = ({children}: CartContextProviderProps) => {
  const [cartState, dispatch] = useReducer(CartReducer, initialState);
  function addItem(item: Product) {
    dispatch({type: 'ADD', payload: item});
  }

  function removeItem(id: string | number) {
    dispatch({type: 'DELETE', payload: id});
  }

  function removeItems(ids: (string | number)[]) {
    dispatch({type: 'DELETES', payload: ids});
  }
  const value: Partial<CartContextInterface> = {
    addItem,
    removeItem,
    removeItems,
    items: cartState.items,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
