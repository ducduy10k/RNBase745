import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import CustomIcon from '../../components/CustomIcon';
import {Product} from '../../models/product.model';
import {CartContext} from '../../store/context/CartContext';

interface FooterDetailProps {
  item: Product;
}

const FooterDetail = ({item}: FooterDetailProps) => {
  const cartContext = useContext(CartContext);

  const addToCart = () => {
    if (cartContext.addItem) {
      cartContext.addItem(item);
    }
  };
  return (
    <View style={styles.footerDetailContainer}>
      <View style={styles.btnChat}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <CustomIcon
            name="chatbubble-ellipses-outline"
            lib="Ionicons"
            size={22}></CustomIcon>
          <Text style={styles.textChat}>Chat</Text>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider}></View>
        </View>
      </View>
      <View style={styles.btnAddCart}>
        <Pressable style={{
          alignItems: 'center',
        }} onPress={() => addToCart()}>
          <CustomIcon
            name="cart-plus"
            lib="MaterialCommunity"
            size={22}></CustomIcon>
          <Text style={styles.textAddToCart}>Thêm vào giỏ hàng</Text>
        </Pressable>
      </View>
      <View style={styles.buyNow}>
        <Text style={styles.textBuyNow}>Mua ngay</Text>
      </View>
    </View>
  );
};

export default FooterDetail;

const styles = StyleSheet.create({
  footerDetailContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 60,
    alignItems: 'center',
  },
  btnChat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textChat: {
    fontSize: 10,
  },
  dividerContainer: {
    width: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 3,
    backgroundColor: '#E6E6E6',
    height: '60%',
  },
  textAddToCart: {
    fontSize: 10,
  },
  btnAddCart: {
    flex: 1,
    alignItems: 'center',
  },
  buyNow: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5722',
    height: '100%',
  },
  textBuyNow: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
