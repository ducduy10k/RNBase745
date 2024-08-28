import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomIcon from '../../../../components/CustomIcon';
import SearchLocationComponent from './components/SearchLocationComponent';

const SearchLocationControl = () => {
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);
  return (
    <Pressable onPress={() => setIsModalSearchOpen(true)}>
      <View style={styles.controlWrapper}>
        <Modal visible={isModalSearchOpen} animationType="slide">
          <SearchLocationComponent onBack={() => setIsModalSearchOpen(false)}/>
        </Modal>
        <CustomIcon name="search1" lib="Ant" size={16} />
      </View>
    </Pressable>
  );
};

export default SearchLocationControl;

const styles = StyleSheet.create({
  controlWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
