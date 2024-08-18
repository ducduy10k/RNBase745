import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from '../../components/CustomIcon';
import {Product} from '../../models/product.model';

interface ShopInfoProps {
  navigation: any;
  item: Product;
}

const ShopInfo: React.FC<ShopInfoProps> = ({navigation, item}) => {
  const viewMap = () => {
    navigation.push('Mapbox', {
      id: item.id,
      type: item.type
    })
  };

  return (
    <View style={styles.shopInfoContainer}>
      <View style={styles.shopInfoWrapper}>
        <View style={styles.shopBaseInfoWrapper}>
          <Image
            style={styles.shopAvatar}
            source={{
              uri: 'https://yt3.ggpht.com/FnAKX8TH4yzJtm5NkPV5LFyHC1BCgN-PUsxmko9AOc0UgqxYKArCmaKU6casaCk0PQd536x0eg=s88-c-k-c0x00ffffff-no-rj',
            }}
          />
          <View style={styles.shopBaseInfo}>
            <Text style={styles.shopName}>Shop name</Text>
            <View style={styles.shopStatus}>
              <CustomIcon
                name="dot-fill"
                lib="Octicons"
                color={'green'}
                size={22}
              />
              <Text>Online</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.shopLocation}
                onPress={() => viewMap()}>
                <CustomIcon
                  name="location-dot"
                  lib="Awesome6"
                  size={16}
                  color={'red'}
                />
                <Text>Hà Nội</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.productQuantity}>
          <Text>
            <Text style={styles.quantity}>50</Text> Sản phẩm
          </Text>
          <Text>
            <Text style={styles.quantity}>4</Text> Đánh giá
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShopInfo;

const styles = StyleSheet.create({
  shopInfoContainer: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 10,
  },
  shopInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  shopBaseInfoWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  shopAvatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopBaseInfo: {},
  shopName: {
    fontWeight: '400',
    fontSize: 16,
  },
  shopStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  shopLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  productQuantity: {
    justifyContent: 'center',
  },
  quantity: {
    color: 'red',
    fontWeight: 'bold',
  },
});
