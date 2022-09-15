import { useContext, useEffect } from "react";
import { StyleSheet, Image, FlatList, View } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { colors, fonts } from "../config";
import ListItem from "../components/ListItem";
import Seperator from "../components/Seperator";
import AuthContext, { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { getSpecificParent } from "../firebase/firebaseCalls/parent";
import { useApi } from "../hooks/useApi";

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
    target: "StudentProfile",
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

const Profile = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Screen>
        <AppText style={styles.heading}>Menu</AppText>
        <View style={styles.personal}>
          <Image
            source={
              user.image
                ? { uri: user.image }
                : require("../assets/zaid-saleem-image.jpg")
            }
            style={styles.image}
          />
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
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              rightIcon={item.rightIcon}
              onPress={() => navigation.navigate(item.target, { user: user })}
            />
          )}
          ItemSeparatorComponent={Seperator}
        ></FlatList>
      </Screen>
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
