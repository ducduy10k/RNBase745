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
import { formatDate } from '../../utils/date';
import FontSize from '../../constants/font-size.constant';

interface ProductCartHorizontalProps {
  item: Product;
  index: number;
}

const CART_WIDTH = Dimensions.get('window').width * 0.32;

const ProductCartHorizontal: React.FC<ProductCartHorizontalProps> = ({
  item,
}: ProductCartHorizontalProps) => {
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
      <View style={styles.cardInfo}>
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
    </View>
  );
};

export default ProductCartHorizontal;

const styles = StyleSheet.create({
  producContainer: {
    padding: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  producImageBg: {
    height: CART_WIDTH,
    width: CART_WIDTH,
    marginRight: 10
  },
  producImage: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#faf5f5',
  },
  cardInfo: {
    flex: 1
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
    fontWeight: 'bold',
    width: '100%',
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
