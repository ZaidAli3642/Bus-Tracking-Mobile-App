import { useContext } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { colors, fonts } from "../config";
import ListItem from "../components/ListItem";
import Seperator from "../components/Seperator";
import AuthContext from "../context/AuthContext";
import { useVisible } from "../hooks/useVisible";
import { useImage } from "../hooks/useImage";
import ImageViewScreen from "./ImageViewScreen";

const Profile = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { visible, hide, show } = useVisible();
  const { imageUri, imageSet } = useImage();

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
  ];

  return (
    <>
      <Screen>
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
