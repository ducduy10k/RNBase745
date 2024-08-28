import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomInputGroupIcon from '../../../../../components/CustomInputGroupIcon';
import Colors from '../../../../../constants/color.constant';
import CustomIcon from '../../../../../components/CustomIcon';
import RecentSearchList from './RecentSearchList';
import {search} from '../../../../../api/mapbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {generateString} from '../../../../../utils/common';
import {RecentSearchItemI} from './RecentSearchItem';

interface SearchLocationComponentProps {
  onBack: () => void;
}
const SearchLocationComponent = ({onBack}: SearchLocationComponentProps) => {
  const [searchString, setSearchString] = useState('');
  let [recentList, setRecentList] = useState<RecentSearchItemI[]>([]);
  const [suggestions, setSuggestions] = useState<RecentSearchItemI[]>([]);
  const myTimeOut = useRef<any>();
  
  useEffect(() => {
    getRecentList();
  }, []);
  
  async function getRecentList() {
    const rl = await AsyncStorage.getItem('RecentList');
    setRecentList(rl ? JSON.parse(rl) : []);
  }

  useEffect(() => {
    if (!searchString) {
      setSuggestions([]);
      return;
    }
    if (myTimeOut.current) {
      clearTimeout(myTimeOut.current);
    }
    myTimeOut.current = setTimeout(() => {
      search(searchString).then(async (res) => {
        res.data.features.map((feature: any) => {
          console.log(feature.properties.context);
        });
        setSuggestions(res.data.features.map((feature: any) => ({
          feature,
          id: generateString(10),
          icon: 'arrow-top-left',
          lib: 'MaterialCommunity',
          text: feature.properties.full_address,
          deleteable: false,
        })));
      });
    }, 500);
  }, [searchString]);
  useEffect(() => {
    AsyncStorage.setItem('RecentList', JSON.stringify(recentList));
  }, [recentList]);
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
            onPress: onBack,
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
                  onPress: () => {
                    setSearchString('');
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
          placeholder="Tìm kiếm"
          value={searchString}
          onChangeText={setSearchString}
          props={{
            returnKeyType: 'done',
            async onSubmitEditing() {
              // Do something
              const createdTime = new Date();
              AsyncStorage.setItem('RecentList', JSON.stringify(recentList));
              setRecentList((state: any) => {
                console.log(recentList);
                let newState = [...state];
                if (state.length > 5) {
                  newState = state.slice(
                    recentList.length - 4,
                    recentList.length,
                  );
                }
                return [
                  ...newState,
                  {
                    id: generateString(10),
                    text: searchString,
                    createdTime,
                    icon: 'clockcircleo',
                    lib: 'Ant',
                    deleteable: true,
                  },
                ];
              });
            },
          }}
          style={styles.input}
        />
      </View>
      <View style={styles.recentSearchs}>
        <View style={styles.recentSearchHeaderWrapper}>
          <Text style={styles.recentText}>Gần đây</Text>
          <CustomIcon name="infocirlceo" lib="Ant" size={16} />
        </View>
        <View style={styles.recentSearchContentWrapper}>
          <RecentSearchList
            items={recentList.filter(item => item.text.includes(searchString))}
            onDelete={item => {
              const index = recentList.findIndex(i => i.id === item.id);
              if (index > -1) {
                recentList.splice(index, 1);
                setRecentList([...recentList]);
              }
            }}
          />
        </View>
        <View></View>
      </View>
      <View style={styles.recentSearchs}>
        <View style={styles.recentSearchHeaderWrapper}>
          <Text style={styles.recentText}>Kết quả</Text>
        </View>
        <View style={styles.recentSearchContentWrapper}>
          <RecentSearchList
            items={suggestions}
            onDelete={() => {}}
          />
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
    flex: 1,
  },
  searchControlWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: Colors.whiteColor,
  },
  recentSearchs: {
    backgroundColor: 'white',
    padding: 20,
  },
  recentSearchHeaderWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  recentSearchContentWrapper: {},
  recentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
