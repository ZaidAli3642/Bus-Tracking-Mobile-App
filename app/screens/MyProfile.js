import { StyleSheet, Image, Text, View } from "react-native";
import AppText from "../components/AppText";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import Screen from "../components/Screen";
import Seperator from "../components/Seperator";
import { colors, fonts } from "../config";
import ListItem from "../components/ListItem";
import AppButton from "../components/AppButton";
import { FlatList } from "react-native-gesture-handler";

const MyProfile = ({ route }) => {
  const { image, firstname, lastname, email, contact, institute, password } =
    route.params.user;

  const userDetails = [
    { id: 1, info: email, icon: "email" },
    { id: 2, info: password, icon: "lock" },
    { id: 3, info: contact, icon: "cellphone" },
  ];

  const logout = async () => {
    await signOut(auth);
  };
  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.imageAndDetails}>
                <Image
                  style={styles.image}
                  source={
                    image
                      ? { uri: image }
                      : require("../assets/zaid-saleem-image.jpg")
                  }
                />
                <AppText
                  style={styles.name}
                >{`${firstname} ${lastname}`}</AppText>
                <AppText style={styles.address}>{institute}</AppText>
              </View>
              <Seperator />
              <AppText style={styles.heading}>Personal Information</AppText>
            </>
          }
          data={userDetails}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              label={item.info}
              icon={item.icon}
              style={styles.listItem}
            />
          )}
          ListFooterComponent={() => (
            <>
              <ListItem
                label="Logout"
                style={styles.listItem}
                icon="logout"
                onPress={logout}
              />
              <ListItem label="Update" style={styles.listItem} icon="update" />
            </>
          )}
        />
      </View>
    </Screen>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  address: {
    fontSize: 18,
    fontStyle: "italic",
    color: colors.lightBlack,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detail: {
    fontSize: 20,
    marginLeft: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  heading: {
    fontSize: 27,
    marginTop: 5,
    fontFamily: fonts.PoppinsMedium,
    marginLeft: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginTop: 50,
    elevation: 10,
  },
  imageAndDetails: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  listItem: {
    marginVertical: 5,
    padding: 0,
  },
  name: {
    fontSize: 22,
    fontFamily: fonts.PoppinsBold,
    color: colors.mediumBlack,
  },
});
