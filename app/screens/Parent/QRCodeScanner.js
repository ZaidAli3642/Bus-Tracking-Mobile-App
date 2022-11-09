import {
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BarCodeScanner } from "expo-barcode-scanner";

const QRCodeScanner = () => {
  const [scanned, setScanned] = useState(false);
  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.getPermissionsAsync();
    if (status === "granted") return true;
    else {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === "granted") return true;
      return false;
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </>
  );
};

export default QRCodeScanner;

const styles = StyleSheet.create({});
