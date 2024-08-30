import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import CustomIcon from '../../../../components/CustomIcon';
import Mapbox from '@rnmapbox/maps';
import ListCity from './components/ListCity';

interface OfflineMapControlProps {
  map: Mapbox.MapView;
}

enum ControlStatus {
  Idle,
  Downloading,
  Error,
  Finish
}

const OfflineMapControl = ({map}: OfflineMapControlProps) => {
  const [percentage, setPercentage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<ControlStatus>(ControlStatus.Idle);
  const handleDownload = async () => {
    const bounds = await map.getVisibleBounds();
    console.log(bounds);
    const progressListener = (offlineRegion: any, status: any) => {
      console.log('done: ', offlineRegion, status);
      setPercentage(status.percentage);
      setStatus(status.state === 'complete'? ControlStatus.Finish : ControlStatus.Downloading);
    }
    const errorListener = (offlineRegion: any, err: any) => {
      console.log('error: ', offlineRegion, err);
      Mapbox.offlineManager.unsubscribe('offlinePack');
      setPercentage(0);
      setStatus(ControlStatus.Error);

    }
    console.log(map);
    const offlinePack = await Mapbox.offlineManager.getPack('offlinePack');
    if (offlinePack) {
      await Mapbox.offlineManager.deletePack('offlinePack');
    }
    await Mapbox.offlineManager.createPack(
      {
        name: 'offlinePack',
        styleURL: 'mapbox://styles/mapbox/streets-v12',
        minZoom: 14,
        maxZoom: 20,
        bounds //: [[106.6973376145533, 10.7791546909693], [106.70357106825233, 10.77426430960464]],
      },
      progressListener,
      errorListener,
    );
  };
  const render = () => {
    switch(status) {
      case ControlStatus.Idle:
        return (
          <Pressable onPress={() => setIsModalOpen(true)}>
            <View style={styles.controlWrapper}>
              <CustomIcon name="download" lib="Ant" size={16} />
            </View>
          </Pressable>
        );
      case ControlStatus.Downloading:
        return (
          <View style={styles.controlWrapper}>
            <Text style={{color: 'black', fontSize: 12}}>{percentage.toFixed(2)}%</Text>
          </View>
        );
      case ControlStatus.Error:
        return (
          <Pressable onPress={() => handleDownload()}>
            <View style={styles.controlWrapper}>
              <CustomIcon name="undo" lib="Ant" size={16} />
            </View>
          </Pressable>
        );
      case ControlStatus.Finish: {
        <View style={styles.controlWrapper}>
          <CustomIcon name="check" lib="Ant" size={16} />
        </View>
      }
    }
  }
  return (
    <>
      <Modal visible={isModalOpen} animationType="slide">
        <ListCity />
      </Modal>
    {
      render()
    }
    </>
  );
};

export default OfflineMapControl;

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
