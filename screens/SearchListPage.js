import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import ProfileScreen from "./ProfileScreen";

const SearchListPage = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      console.log(status);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data}) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      let values = data.split(',');
      navigation.navigate('List', {
          uid: values[0],
          listId: values[1],
      })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        )}
      </View>

  );
}

SearchListPage.navigationOptions = {
    title: 'Items',
};

const styles = StyleSheet.create({

});

export default SearchListPage;