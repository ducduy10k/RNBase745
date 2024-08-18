import React, {useRef, useState, useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import ProductCart from '../ui/home/ProductCart';
import {Product} from '../models/product.model';
import {useFocusEffect} from '@react-navigation/native';
import HomeSearch from '../ui/home/search/Search';
import ProductData from '../data/ProductData';
interface HomeScreenProps {
  navigation: any;
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const productList: Product[] = ProductData;
  const hotProductList: Product[] = ProductData;
  const [category, setCategory] = useState(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: undefined,
    category: undefined,
  });
  const [sortItem, setSortItem] = useState(undefined);
  const tabBarHeight = useBottomTabBarHeight();

  const productListRef: any = useRef<FlatList>();
  const resetOffsetProductList = () => {
    productListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };
  const [visibleModalSearch, setVisibleModalSearch] = useState<boolean>(false);
  const viewDetail = (item: Product, index: number) => {
    navigation.push('Details', {
      index,
      id: item.id,
      type: item.type,
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  const handleShowCart = () => {
    navigation.push('Cart');
  }
  return (
    <View style={styles.homeContainer}>
      <StatusBar backgroundColor={'pink'} />
      <Modal visible={visibleModalSearch} animationType="slide">
        <HomeSearch onClose={() => setVisibleModalSearch(false)} />
      </Modal>
      <ScrollView
        // showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollViewFlex}>
        <HeaderBar title="" onSearchPress={() => setVisibleModalSearch(true)} onShowCartPress={() => handleShowCart()}/>
        {/* Product list */}
        <Text style={styles.hotProductTitle}>Hot</Text>
        {hotProductList.length ? (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={hotProductList}
            contentContainerStyle={styles.productListContainer}
            keyExtractor={(item: Product) => item.id + ''}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity key={item.id}>
                <View style={styles.productList}>
                  <ProductCart item={item} index={index}></ProductCart>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>No product available</Text>
          </View>
        )}

        {/* Product list */}
        <Text style={styles.hotProductTitle}>Popular</Text>
        <FlatList
          ref={productListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={productList}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text style={styles.screenTitle}>No product available</Text>
            </View>
          }
          contentContainerStyle={styles.productListContainer}
          renderItem={({item, index, separators}) => (
            <Pressable
              android_ripple={{color: '#dddddd'}}
              key={item.id}
              onPress={() => viewDetail(item, index)}
              style={({pressed}) => pressed && styles.pressedItem}>
              <View style={styles.productList}>
                <ProductCart item={item} index={index}></ProductCart>
              </View>
            </Pressable>
          )}
        />
        <FlatList
          ref={productListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={productList}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <Text style={styles.screenTitle}>No product available</Text>
            </View>
          }
          contentContainerStyle={styles.productListContainer}
          renderItem={({item, index, separators}) => (
            <Pressable
              android_ripple={{color: '#dddddd'}}
              key={item.id}
              onPress={() => viewDetail(item, index)}
              style={({pressed}) => pressed && styles.pressedItem}>
              <View style={styles.productList}>
                <ProductCart item={item} index={index}></ProductCart>
              </View>
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollViewFlex: {
    // flexGrow: 1,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
  },
  searchInputContainer: {
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  iconSeach: {
    marginLeft: 10,
  },
  searchInput: {
    borderColor: '#faf5f5',
  },
  productList: {
    width: Dimensions.get('screen').width / 2.5
  },
  productListContainer: {
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 0
  },
  emptyList: {
    width: Dimensions.get('window').width - 10 * 2,
    textAlign: 'center',
    justifyContent: 'center',
    height: 100,
  },
  emptyText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  hotProductTitle: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },
  pressedItem: {
    opacity: 0.8
  }
});
