import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, { useContext } from 'react';
import ImageBgInfo from '../ui/detail/ImageBgInfo';
import {Product} from '../models/product.model';
import CustomIcon from '../components/CustomIcon';
import ShopInfo from '../ui/detail/ShopInfo';
import { FavoriesContext } from '../store/context/FavoritesContext';
import ProductData from '../data/ProductData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/redux/root.reducer';
import { addFavorite, removeFavorite } from '../store/redux/favorite';
import FooterDetail from '../ui/detail/FooterDetail';
import FontSize from '../constants/font-size.constant';

interface DetailScreenProps {
  navigation: any;
  route: any;
}

const DetailsScreen = ({navigation, route}: DetailScreenProps) => {
  const favoriteIds = useSelector((state: RootState)=> state.favorite.ids);
  const dispatch = useDispatch();
  const item: Product | undefined = ProductData[route.params.index];
  const isFavorite = favoriteIds?.includes(item ? item.id : '');
  
  const backHandler = () => {
    navigation.pop();
  };

  const handleAddFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({id: item ? item.id : ''}));
    } else {
      dispatch(addFavorite({id: item ? item.id : ''}));
    }
  };
  
  return item ? (
    <View style={styles.detailScreenContainer}>
      <StatusBar backgroundColor={'pink'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailScreenView}>
        <ImageBgInfo
          image={item?.image || ''}
          favourite={isFavorite}
          average_rating={item?.average_rating || ''}
          backHandler={() => backHandler()}
          onAddFavorite={() => handleAddFavorite()}
        />
        <View style={styles.productTypeContainer}>
          <Text style={styles.productTypeText}>Loại</Text>
          <View>
            <TouchableOpacity>
              <ImageBackground
                source={{uri: item?.image || ''}}
                style={styles.productType}
                imageStyle={styles.productTypeImg}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productTitleContainer}>
          <View style={styles.priceContainer}>
            <View style={styles.productPrice}>
              <Text style={styles.actualProductPriceText}>
                <Text style={styles.productCurrency}>$</Text>1.000.000
              </Text>
              <Text style={styles.priceOfManufacturer}>$2.000.000</Text>
              <Text style={styles.discountText}>50%</Text>
            </View>
            <View>
              <Text style={styles.sold}>Đã bán 1,1k</Text>
            </View>
          </View>
          <View style={styles.productTitle}>
            <Text style={styles.productName}>
              <View style={styles.productTitlePrefix}>
                <Text style={styles.productTitlePrefixText}>Mall</Text>
              </View>
              {'\t '}
              {item?.name}
            </Text>
          </View>
        </View>
        <View style={styles.benefitContainer}>
          <View style={styles.benefitWrapper}>
            <CustomIcon
              name="people-carry-box"
              lib="Awesome6"
              color={'red'}
              size={12}
            />
            <Text style={styles.benefitText}>Đổi trả miễn phí</Text>
          </View>
          <View style={styles.benefitWrapper}>
            <CustomIcon name="shield-halved" lib="Awesome6" color={'red'} />
            <Text style={styles.benefitText}>Chính hãng 100%</Text>
          </View>
          <View style={styles.benefitWrapper}>
            <CustomIcon name="truck-fast" lib="Awesome6" color={'red'} />
            <Text style={styles.benefitText}>Giao hàng miễn phí</Text>
          </View>
        </View>
        <ShopInfo item={item} navigation={navigation} />
      </ScrollView>
      <FooterDetail item={item}></FooterDetail>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  detailScreenContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1
  },
  detailScreenView: {},
  productTypeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    marginTop: 5,
  },
  productTypeText: {
    fontSize: FontSize.base,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  productType: {
    width: 60,
    borderRadius: 10,
    aspectRatio: 1 / 1,
  },
  productTypeImg: {
    borderRadius: 10,
    borderColor: '#cccccc54',
    borderWidth: 2,
  },
  productTitleContainer: {
    backgroundColor: 'white',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  productPrice: {
    flexDirection: 'row',
    fontWeight: 'bold',
    gap: 10,
  },
  productCurrency: {
    fontSize: FontSize.base,
  },
  actualProductPriceText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'red',
  },
  priceOfManufacturer: {
    fontSize: FontSize.base,
    textDecorationLine: 'line-through',
    alignSelf: 'flex-end',
  },
  discountText: {
    alignSelf: 'flex-end',
    color: 'red',
    backgroundColor: 'yellow',
    paddingHorizontal: 5,
  },

  productTitle: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    paddingBottom: 10,
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
    fontSize: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sold: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  benefitContainer: {
    marginTop: 4,
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%',
    flexWrap: 'wrap',
  },
  benefitWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  benefitText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
