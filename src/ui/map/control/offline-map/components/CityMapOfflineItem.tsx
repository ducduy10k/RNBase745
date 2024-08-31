import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomIcon from '../../../../../components/CustomIcon'
import Mapbox from '@rnmapbox/maps'

interface CityMapOfflineItemProps{
    city: any
}

enum ControlStatus {
    Idle,
    Downloading,
    Error,
    Finish
  }

const CityMapOfflineItem = ({city}: CityMapOfflineItemProps) => {
    const [percentage, setPercentage] = useState(0);
    const [status, setStatus] = useState<ControlStatus>(ControlStatus.Idle);
    const handleDownload = async () => {
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
            bounds: [[106.6973376145533, 10.7791546909693], [106.70357106825233, 10.77426430960464]],
          },
          progressListener,
          errorListener,
        );
      };

      function confirmRedownload() {
        Alert.alert('Bản đồ đã được tải.', 'Bạn có muốn cập nhật mới nhất không', [
            {
              text: 'Đóng',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Tải lại', onPress: () => handleDownload()},
          ]);
      }

      const render = () => {
        switch(status) {
          case ControlStatus.Idle:
            return (
              <Pressable onPress={() => handleDownload()}>
                  <CustomIcon name="download" lib="Ant" size={16} />
              </Pressable>
            );
          case ControlStatus.Downloading:
            return (
                <Text style={{color: 'black', fontSize: 12}}>{percentage.toFixed(2)}%</Text>
            );
          case ControlStatus.Error:
            return (
              <Pressable onPress={() => handleDownload()}>
                  <CustomIcon name="undo" lib="Ant" size={16} />
              </Pressable>
            );
          case ControlStatus.Finish: {
            return <Pressable onPress={() => confirmRedownload()}>
             <CustomIcon name="check" lib="Ant" size={16} />
            </Pressable>

          }
        }
      }
  return (
    <Pressable onPress={() => handleDownload()} style={styles.item}>
      <Text >{city.properties.ten_tinh}</Text>
      {
        render()
      }
    </Pressable>
  )
}

export default CityMapOfflineItem

const styles = StyleSheet.create({
    item: {
        padding: 5,
        borderColor: '#faf5f5',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
})