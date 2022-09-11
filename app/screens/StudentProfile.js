import { useEffect } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import Seperator from "../components/Seperator";
import Loader from "../components/Loader";
import { colors, fonts } from "../config";
import { getSpecificStudent } from "../firebase/firebaseCalls/students";
import { useApi } from "../hooks/useApi";

const StudentProfile = ({ route }) => {
  const { user } = route.params;
  const { data, loading, request } = useApi(getSpecificStudent);

  const { firstname, lastname, image, institute } = data;
  const userDetails = [
    { id: 1, info: data.parent, icon: "account-child" },
    { id: 2, info: data.parentcontact, icon: "cellphone" },
    { id: 3, info: data.contact, icon: "cellphone" },
    { id: 4, info: data.address, icon: "map-marker" },
    { id: 5, info: data.city, icon: "city" },
    { id: 6, info: data.postalcode, icon: "post" },
    { id: 7, info: data.rollNo, icon: "numeric" },
    { id: 8, info: data.busNo, icon: "bus" },
  ];

  useEffect(() => {
    request(user);
  }, [user]);

  if (loading) return <Loader />;
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
        />
      </View>
    </Screen>
  );
};

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

export default StudentProfile;
