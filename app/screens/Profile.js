import { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { colors, fonts } from "../config";
import ListItem from "../components/ListItem";
import Seperator from "../components/Seperator";
import AuthContext from "../context/AuthContext";
import { useVisible } from "../hooks/useVisible";
import { useImage } from "../hooks/useImage";
import ImageViewScreen from "./ImageViewScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Profile = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { visible, hide, show } = useVisible();
  const { imageUri, imageSet } = useImage();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const profiles = [
    {
      id: 1,
      icon: "account",
      label: "My Profile",
      rightIcon: "chevron-right",
      target: "MyProfile",
    },
    {
      id: 2,
      icon: "school",
      label: "Student Details",
      rightIcon: "chevron-right",
      target: user.loginUser === "parent" ? "StudentProfile" : "StudentList",
    },
    {
      id: 3,
      icon: "account-tie-hat",
      label: "Driver Details",
      rightIcon: "chevron-right",
      target: "DriverProfile",
    },
    {
      id: 4,
      icon: "bus",
      label: "Bus Details",
      rightIcon: "chevron-right",
      target: "BusDetails",
    },
    {
      id: 5,
      icon: "bus",
      label: "Notifications",
      rightIcon: "chevron-right",
      target: "Notifications",
    },
  ];

  return (
    <>
      <Screen>
        {user.loginUser === "drivers" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("QRCode")}
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              width: 30,
              height: 30,
              zIndex: 999,
            }}
          >
            <MaterialIcons name="qr-code-scanner" size={24} color="black" />
          </TouchableOpacity>
        )}

        <AppText style={styles.heading}>Menu</AppText>
        <View style={styles.personal}>
          <TouchableOpacity
            onPress={() => {
              show();
              imageSet(user.image);
            }}
          >
            <Image
              source={
                user.image
                  ? { uri: user.image }
                  : require("../assets/zaid-saleem-image.jpg")
              }
              style={styles.image}
            />
          </TouchableOpacity>
          <View>
            <AppText style={styles.name}>
              {user.fullName
                ? user.fullName
                : `${user.firstname} ${user.lastname}`}
            </AppText>
            <AppText style={styles.address}>{user.institute}</AppText>
          </View>
        </View>

        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return user.loginUser === "drivers" &&
              item.target === "DriverProfile" ? null : (
              <ListItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                rightIcon={item.rightIcon}
                onPress={() => navigation.navigate(item.target, { user: user })}
              />
            );
          }}
          ItemSeparatorComponent={Seperator}
        ></FlatList>
        <Button
          onPress={() => sendPushNotification(expoPushToken)}
          title="Send"
        />
      </Screen>
      <ImageViewScreen hideModal={hide} imageUri={imageUri} visible={visible} />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  address: {
    fontSize: 18,
    fontStyle: "italic",
  },
  heading: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: fonts.PoppinsBold,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.PoppinsMedium,
  },
  personal: {
    backgroundColor: colors.whiteSmoke,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
});
