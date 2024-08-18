import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import ProductCartHorizontal from '../ui/home/ProductCartHorizontal';
import {Product, Shop} from '../models/product.model';
import ProductData from '../data/ProductData';
import {useNavigation} from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';
import {CheckBox} from '@rneui/themed';
import Colors from '../constants/color.constant';
import {CartContext} from '../store/context/CartContext';
import FontSize from '../constants/font-size.constant';

const CartScreen = () => {
  const cartContext = useContext(CartContext);
  const [shops, setShops] = useState<Shop[]>([]);
  const navigation = useNavigation();

  function groupProduct(product: Product[]) {
    const shops: any[] = [];
    product.forEach(product => {
      const shop = shops.find(shop => shop.id === product.shop.id);
      if (!shop) {
        shops.push({...product.shop, products: [product]});
      } else {
        shop.products.push(product);
      }
    });
    return shops;
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Giỏ hàng (' + cartContext.items?.length + ')',
    });
    setShops(groupProduct(cartContext.items || []));
  }, [cartContext.items]);
  return (
    <FlatList
      data={shops || []}
      keyExtractor={(item: Shop) => item.id.toString() + new Date().getTime()}
      renderItem={({item, index}) => (
        <CartShopItem key={item.id} item={item} index={index}></CartShopItem>
      )}
      numColumns={1}></FlatList>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartItemRoot: {
    marginBottom: 10,
  },
  cartItemFirst: {
    marginTop: 10,
  },
  shopContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  shopName: {
    fontWeight: 'bold',
    alignItems: 'center',
  },
  cartProductItemContainer: {
    flexDirection: 'row',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
  },
  productTitlePrefix: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    borderRadius: 3,
    marginRight: 10,
  },
  productTitlePrefixText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FontSize.small,
  },
});

interface CartProductItemProps {
  product: Product;
  index: number;
  onSelect: (product: Product) => void;
  onUnSelect: (product: Product) => void;
}

const CartProductItem = ({
  product,
  index,
  onSelect,
  onUnSelect,
}: CartProductItemProps) => {
  const [check, setCheck] = useState(false);
  const handleSelect = () => {
    const isCheck = !check;
    setCheck(isCheck);
    if (isCheck) {
      onSelect(product);
    } else {
      onUnSelect(product);
    }
  };
  return (
    <>
      <View style={styles.cartProductItemContainer}>
        <View style={{backgroundColor: '#fff', padding: 0}}>
          <CheckBox
            center
            checked={check}
            containerStyle={{
              padding: 0,
            }}
            onPress={() => handleSelect()}
          />
        </View>
        <View style={{flex: 1}}>
          <ProductCartHorizontal
            item={product}
            index={index}></ProductCartHorizontal>
        </View>
      </View>
    </>
  );
};

interface CartShopItemProps {
  item: Shop;
  index: number;
}

const CartShopItem = ({index, item}: CartShopItemProps) => {
  const [selectedProductIds, setSelectedProductIds] = useState<
    (string | number)[]
  >([]);

  const cartContext = useContext(CartContext);
  
  const handleSelectProduct = (product: Product) => {
    setSelectedProductIds(state => [...state, product.id ?? '']);
  };

  const handleUnSelectProduct = (product: Product) => {
    setSelectedProductIds(state => [
      ...state.filter(item => item !== product.id),
    ]);
  };
  const handleDeleteProduct = () => {
    if (cartContext.removeItems) {
      cartContext.removeItems(selectedProductIds);
    }
  }
  return (
    <View
      style={[
        styles.cartItemRoot,
        index === 0 ? styles.cartItemFirst : undefined,
      ]}>
      <View style={styles.shopContainer}>
        <View style={styles.productTitlePrefix}>
          <Text style={styles.productTitlePrefixText}>Mall</Text>
        </View>
        <Text style={styles.shopName}>{item.name}</Text>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Pressable>
            <CustomIcon
              name="right"
              lib="Ant"
              size={16}
              style={{alignItems: 'center'}}
            />
          </Pressable>
        </View>
        <View style={{marginLeft: 'auto'}}>
          <Pressable onPress={() => handleDeleteProduct()}>
            <CustomIcon
              name="trash"
              lib="Awesome6"
              size={20}
              color={selectedProductIds.length ? Colors.dangerColor : '#ddd'}
            />
          </Pressable>
        </View>
      </View>
      {item.products?.map((product, index) => (
        <CartProductItem
          key={index}
          product={product}
          index={index}
          onSelect={handleSelectProduct}
          onUnSelect={handleUnSelectProduct}></CartProductItem>
      ))}
    </View>
  );
};
