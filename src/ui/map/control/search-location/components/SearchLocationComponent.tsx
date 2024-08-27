import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomInputGroupIcon from '../../../../../components/CustomInputGroupIcon';
import Colors from '../../../../../constants/color.constant';
import CustomIcon from '../../../../../components/CustomIcon';

const SearchLocationComponent = () => {
  const [searchString, setSearchString] = useState('');
  return (
    <View style={styles.root}>
      <View style={styles.searchControlWrapper}>
        <CustomInputGroupIcon
          iconLeft={{
            lib: 'Ant',
            name: 'arrowleft',
            size: 24,
            style: {
              paddingLeft: 10,
            },
          }}
          iconRight={
            searchString
              ? {
                  lib: 'Ant',
                  name: 'close',
                  size: 24,
                  style: {
                    paddingRight: 10,
                  },
                }
              : {
                  lib: 'Awesome',
                  name: 'microphone',
                  size: 24,
                  style: {
                    paddingRight: 10,
                  },
                }
          }
          onChangeText={setSearchString}
          style={styles.input}
        />
      </View>
      <View style={styles.recentSearchs}>
        <View style={styles.recentSearchHeaderWrapper}>
          <Text style={styles.recentText}>Gần đây</Text>
          <CustomIcon name='infocirlceo' lib='Ant' size={16} />
        </View>
        <View style={styles.recentSearchContentWrapper}>

        </View>
        <View></View>
      </View>
      <View></View>
    </View>
  );
};

export default SearchLocationComponent;

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: Dimensions.get('window').width <= 360 ? 40 : 50,
  },
  root: {
    backgroundColor: Colors.gray100,
    flex: 1
  },
  searchControlWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: Colors.whiteColor
  },
  recentSearchs: {
    backgroundColor: 'white',
    padding: 20
  },
  recentSearchHeaderWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  recentSearchContentWrapper: {

  },
  recentText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
