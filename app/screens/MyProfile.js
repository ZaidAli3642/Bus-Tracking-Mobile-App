import { StyleSheet, Image, View, FlatList } from "react-native";
import AppText from "../components/AppText";

import Screen from "../components/Screen";
import Seperator from "../components/Seperator";
import { colors, fonts } from "../config";
import ListItem from "../components/ListItem";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { removeSession } from "../storage/storeSession";

const MyProfile = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);

  const { user } = useContext(AuthContext);

  const {
    image,
    firstname,
    lastname,
    fullName,
    nationalIdentityNumber,
    parentcontact,
    institute,
    password,
  } = user;

  const userDetails = [
    {
      id: 1,
      info: nationalIdentityNumber,
      icon: "id-card",
      label: "National ID Number",
    },
    { id: 2, info: password, icon: "lock", label: "Password" },
    {
      id: 3,
      info: parentcontact,
      icon: "cellphone",
      parentContact: "Parent Contact",
    },
  ];

  const logout = async () => {
    setUser(null);
    await removeSession();
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
                <AppText style={styles.name}>
                  {fullName ? fullName : `${firstname} ${lastname}`}
                </AppText>
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
              label={item.label}
              description={item.info}
              icon={item.icon}
              style={styles.listItem}
            />
          )}
          ListFooterComponent={() => (
            <>
              <ListItem
                label="Update"
                style={styles.listItem}
                icon="update"
                onPress={() => navigation.navigate("Update")}
              />
              <ListItem
                label="Logout"
                style={styles.listItem}
                icon="logout"
                onPress={logout}
              />
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
