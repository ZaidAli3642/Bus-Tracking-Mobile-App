import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import Seperator from "../components/Seperator";
import AuthContext from "../context/AuthContext";

import { defaultStyles } from "../config";
import { getAdmins } from "../firebase/firebaseCalls/admin";
import { useApi } from "../hooks/useApi";
import Loader from "../components/Loader";

const messages = [
  {
    id: 1,
    image: require("../assets/zaid-saleem-image.jpg"),
    label: "Zaid Saleem",
    description: "Software Engineer",
    target: "Chat",
  },
  {
    id: 2,
    image: require("../assets/zaid-saleem-image.jpg"),
    label: "Zaid Saleem",
    description: "Software Engineer",
    target: "Chat",
  },
  {
    id: 3,
    image: require("../assets/zaid-saleem-image.jpg"),
    label: "Zaid Saleem",
    description: "Software Engineer",
    target: "Chat",
  },
  {
    id: 4,
    image: require("../assets/zaid-saleem-image.jpg"),
    label: "Zaid Saleem",
    description: "Software Engineer",
    target: "Chat",
  },
  {
    id: 5,
    image: require("../assets/zaid-saleem-image.jpg"),
    label: "Zaid Saleem",
    description: "Software Engineer",
    target: "Chat",
  },
  {
    id: 6,
    image: require("../assets/zaid-saleem-image.jpg"),
    label: "Zaid Saleem",
    description: "Software Engineer",
    target: "Chat",
  },
  {
    id: 7,
    image: require("../assets/zaid-saleem-image.jpg"),
    label: "Zaid Saleem",
    description: "Software Engineer",
    target: "Chat",
  },
  {
    id: 8,
    image: require("../assets/zaid-saleem-image.jpg"),
    label: "Zaid Saleem",
    description: "Software Engineer",
  },
];

const Messages = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { data, loading, request } = useApi(getAdmins);

  useEffect(() => {
    request(user);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <StatusBar backgroundColor="black" />
      <Screen>
        <AppText style={[defaultStyles.heading, styles.heading]}>
          Messages
        </AppText>
        <Seperator />
        <FlatList
          data={data}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.ListItemContainer}>
              <ListItem
                image={item.image}
                label={`${item.firstname} ${item.lastname}`}
                description={item.designation}
                rightIcon="chevron-right"
                onPress={() =>
                  navigation.navigate("Chat", { chatPerson: item })
                }
              />
            </View>
          )}
          ItemSeparatorComponent={Seperator}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
  },
  ListItemContainer: {
    padding: 5,
    paddingHorizontal: 10,
  },
});

export default Messages;
