import { Button, StyleSheet, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

import { database } from "../../firebase/firebaseConfig";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import AuthContext from "../../context/AuthContext";
import { colors } from "../../config";
import { async } from "@firebase/util";

const QRCodeScanner = () => {
  const { user } = useContext(AuthContext);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.getPermissionsAsync();
    if (status === "granted") return true;
    else {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === "granted") return true;
      return false;
    }
  };

  const getStudent = async (scannedData) => {
    const studentRef = doc(database, "students", scannedData.studentId);
    const docSnap = await getDoc(studentRef);
    let onAndOffBoard = docSnap.get("onAndOffBoard");

    if (onAndOffBoard === true) return false;
    return true;
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    if (!data.includes("studentId"))
      return alert("Sorry! this QR Code is invalid.");
    try {
      const scannedData = JSON.parse(data);

      if (
        scannedData.institute !== user.institute ||
        scannedData.busNo !== user.busNo
      )
        return alert("Sorry! this QR Code is invalid.");

      setLoading(true);

      const onAndOffBoard = await getStudent(scannedData);

      const docRef = doc(database, "students", scannedData.studentId);
      await updateDoc(docRef, { onAndOffBoard });

      setLoading(false);
      alert(
        onAndOffBoard
          ? `${scannedData.rollNo} is on-Boarded.`
          : `${scannedData.rollNo} is off-Boarded.`
      );
    } catch (error) {
      alert("Something went wrong while scanning QR");
      console.log("ERROR SCANNING BAR CODE :", error);
    }
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  return (
    <>
      {loading && (
        <ActivityIndicator
          style={{ position: "absolute", top: "50%", left: "45%", zIndex: 999 }}
          size="large"
          color={colors.purple}
        />
      )}
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
