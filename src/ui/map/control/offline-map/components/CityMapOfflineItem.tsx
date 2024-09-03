import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomIcon from '../../../../../components/CustomIcon'
import Mapbox from '@rnmapbox/maps'
import { getBoundbox } from '../../../../../utils/mapbox'
import OfflinePack from '@rnmapbox/maps/lib/typescript/src/modules/offline/OfflinePack'

interface CityMapOfflineItemProps{
    city: any;
    defaultPack?: OfflinePack
}

enum ControlStatus {
    Idle,
    Downloading,
    Error,
    Finish
  }

const CityMapOfflineItem = ({city, defaultPack}: CityMapOfflineItemProps) => {
  const [percentage, setPercentage] = useState(0);
    const [status, setStatus] = useState<ControlStatus>((defaultPack as any)?.pack?.state == 'complete' ? ControlStatus.Finish :ControlStatus.Idle);
    const handleDownload = async () => {
        const progressListener = (offlineRegion: any, status: any) => {
          console.log('done: ', offlineRegion, status);
          setPercentage(status.percentage);
          setStatus(status.state === 'complete'? ControlStatus.Finish : ControlStatus.Downloading);
        }
        const errorListener = (offlineRegion: any, err: any) => {
          console.log('error: ', offlineRegion, err);
          Mapbox.offlineManager.unsubscribe('offline_'+city.properties.gid);
          setPercentage(0);
          setStatus(ControlStatus.Error);
        }
        const offlinePack = await Mapbox.offlineManager.getPack('offline_'+city.properties.gid);
        if (offlinePack) {
          await Mapbox.offlineManager.deletePack('offline_'+city.properties.gid);
        }
        const {xMax, yMax, xMin, yMin} = getBoundbox(city);
        if (xMax && yMax &&xMin &&yMin) {
          await Mapbox.offlineManager.createPack(
          {
            name: 'offline_'+city.properties.gid,
            styleURL: 'mapbox://styles/mapbox/streets-v12',
            minZoom: 14,
            maxZoom: 20,
            bounds: [[xMin, yMin], [xMax, yMax]],
          },
          progressListener,
          errorListener,
        );
        } else {
          throw new Error('Invalid coordinates')
        }
      };

      function confirmRedownload() {
        Alert.alert('Bản đồ đã được tải.', 'Bạn có muốn cập nhật mới nhất không', [
            {
              text: 'Đóng',
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
                  <CustomIcon name="reload1" lib="Ant" size={16} />
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