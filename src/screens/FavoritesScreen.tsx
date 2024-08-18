import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import ProductCart from '../ui/home/ProductCart'
import { Product } from '../models/product.model'
import ProductData from '../data/ProductData'
import { useSelector } from 'react-redux'
import { RootState } from '../store/redux/root.reducer'

const FavoritesScreen = () => {
  // const favoriteCtx = useContext(FavoriesContext);
  const favoriteIds = useSelector((state: RootState) => state.favorite.ids);
  const productList: Product[] = ProductData;
  const  favoriteItem = productList.filter(product => favoriteIds.includes(product.id));
  
  return (
    <FlatList
      data={favoriteItem.length % 2 ? [...favoriteItem, {id: 'item_blank'} as Product] : favoriteItem}
      keyExtractor={(item: Product) => item?.id?.toString() || ''}
      renderItem={({item, index}) => {
        return item.id !== 'item_blank' ? <View style={[style.favoriteContainer, index%2 ? style.favoriteOdd : style.favoriteEven , [0, 1].includes(index) && style.favoriteTop]}>
          <ProductCart item={item} index={index}></ProductCart>
        </View> : <View style={[style.favoriteContainer, index%2 ? style.favoriteOdd : style.favoriteEven]}></View>
      }}
      numColumns={2}
    >
    </FlatList>
  )
}

export default FavoritesScreen

const style = StyleSheet.create({
  favoriteContainer: {
    flex: 0.5,
    marginBottom: 10
  },
  favoriteTop: {
    marginTop: 10
  },
  favoriteEven: {
    marginLeft: 10,
    marginRight: 5,
  },
  favoriteOdd: {
    marginRight: 10,
    marginLeft: 5,
  }
})