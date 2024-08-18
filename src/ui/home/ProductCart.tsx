import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Product} from '../../models/product.model';
import CustomIcon from '../../components/CustomIcon';
import BgIcon from '../../components/BgIcon';
import FontSize from '../../constants/font-size.constant';

interface ProductCartProps {
  item: Product;
  index: number;
}

const CART_WIDTH = Dimensions.get('window').width * 0.32;

const ProductCart: React.FC<ProductCartProps> = ({item}: ProductCartProps) => {
  const [price, setPrice] = useState(item.prices[0]);
  return (
    <View style={styles.producContainer}>
      <ImageBackground
        style={styles.producImageBg}
        imageStyle={styles.producImage}
        source={{
          uri: item.image,
        }}
        resizeMode="cover">
        {item.discount && item.discount > 0 ? (
          <View style={styles.cardDiscountContainer}>
            <Text style={styles.cardDiscountText}>
              -{item.discount + (item.discountType || '%')}
            </Text>
          </View>
        ) : (
          ''
        )}
      </ImageBackground>
      <Text style={styles.cardTitle} ellipsizeMode="tail" numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.cardRatingContainer}>
        <Text style={styles.cardRatingWrapper}>
          <View style={styles.cardRating}>
            <CustomIcon name="star" lib="Ant" size={12} color={'orange'} />
            <Text style={styles.cardRatingText}>{item.average_rating}</Text>
          </View>
        </Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardCurrency}>
          {price.currency}
          <Text style={styles.cardPrice}>{price.price}</Text>
        </Text>
        {/* <TouchableOpacity>
          <BgIcon bgColor="red" iconName="plus" lib="Ant" iconColor="white" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  producContainer: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,

    elevation: 3,
  },
  producImageBg: {
    minHeight: CART_WIDTH,
    minWidth: CART_WIDTH,
  },
  producImage: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#faf5f5',
  },
  cardDiscountContainer: {
    flexDirection: 'row',
    gap: 5,
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#cccccc54',
    padding: 5,
    borderRadius: 8,
  },
  cardDiscountText: {
    color: 'red',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 12,
    minWidth: CART_WIDTH,
    fontWeight: 'bold',
  },
  cardRatingContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cardRatingWrapper: {
    gap: 5,
    borderRadius: 3,
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#ffffe6',
    borderColor: '#ffff00',
  },
  cardRating: {
    flexDirection: 'row',
    backgroundColor: '#ffffe6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRatingText: {
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: '#ffffe6',
    marginLeft: 4,
  },
  cardSubtitle: {
    fontSize: 10,
  },
  cardCurrency: {
    fontSize: FontSize.base,
    color: 'orange',
  },
  cardPrice: {
    color: '#161622',
    marginLeft: 10,
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});
