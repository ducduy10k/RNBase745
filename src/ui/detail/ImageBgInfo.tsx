import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomIcon from '../../components/CustomIcon';
import Colors from '../../constants/color.constant';
import FontSize from '../../constants/font-size.constant';

interface ImageBgInfoProps {
  image: string;
  favourite: boolean;
  average_rating: string | number;
  backHandler?: () => void;
  onAddFavorite: () => void
}

const ImageBgInfo: React.FC<ImageBgInfoProps> = ({
  image,
  favourite,
  average_rating,
  backHandler,
  onAddFavorite
}) => {
  return (
    <View style={styles.imageBgContainer}>
      <ImageBackground
        source={{
          uri: image,
        }}
        style={styles.imageBg}>
        <View style={styles.backBtn}>
          <TouchableOpacity
            onPress={() => (backHandler ? backHandler() : null)}>
            <CustomIcon name="left" lib="Ant" size={16} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.btnRightBar}>
          <Pressable onPress={() => onAddFavorite()}>
            <CustomIcon
              name="heart"
              lib="Ant"
              size={20}
              color={favourite ? Colors.dangerColor : Colors.gray400}
            />
          </Pressable>
          <Pressable>
            <CustomIcon
              name="share-alt"
              lib="Awesome"
              size={20}
              color={'blue'}
            />
          </Pressable>
        </View>
        <View style={styles.productRatingContainer}>
              <Text style={styles.productRatingWrapper}>
                <View style={styles.productRating}>
                  <CustomIcon
                    name="star"
                    lib="Ant"
                    size={12}
                    color={'orange'}
                  />
                  <Text style={styles.productRatingText}>
                    {average_rating}
                  </Text>
                  <Text>(450)</Text>
                </View>
              </Text>
            </View>
      </ImageBackground>
    </View>
  );
};

export default ImageBgInfo;

const styles = StyleSheet.create({
  imageBgContainer: {
  },
  imageBg: {
    width: '100%',
    resizeMode: 'cover',
    aspectRatio: 4 / 3,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#c1c1c1',
    backgroundColor: '#ccc'
  },
  btnRightBar: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 15,
  },
  productRatingContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    bottom: 10,
    zIndex: 1,
  },
  productRatingWrapper: {
    gap: 5,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productRatingText: {
    fontWeight: 'bold',
    fontSize: FontSize.base,
    marginLeft: 4,
  },
});
