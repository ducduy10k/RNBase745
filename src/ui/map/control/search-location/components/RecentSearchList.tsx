import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RecentSearchItem, {RecentSearchItemI} from './RecentSearchItem';

interface RecentSearchListProps {
  items: RecentSearchItemI[];
  onDelete: (item: RecentSearchItemI) => void;
  onPress: (item: RecentSearchItemI) => void;
}

const RecentSearchList = ({items, onDelete, onPress}: RecentSearchListProps) => {
  
  return (
    <View>
      {items.map(item => (
        <RecentSearchItem key={item.id} item={item} onPress={() => onPress(item)} onDelete={() => onDelete(item)} />
      ))}
    </View>
  );
};

export default RecentSearchList;

const styles = StyleSheet.create({});
