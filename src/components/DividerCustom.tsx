import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface DividerCustomProps {
  title?: string;
  color?: string;
}

const DividerCustom: React.FC<DividerCustomProps> = ({title, color}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.divider,
          {
            backgroundColor: color || '#cacaca',
          },
        ]}></View>

      {title ? <Text style={styles.text}>{title}</Text> : <></>}
      <View
        style={[
          styles.divider,
          {
            backgroundColor: color || '#cacaca',
          },
        ]}></View>
    </View>
  );
};

export default DividerCustom;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    height: 2,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
