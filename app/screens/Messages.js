import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import Seperator from "../components/Seperator";

import { defaultStyles } from "../config";

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
  return (
    <>
      <StatusBar backgroundColor="black" />
      <Screen>
        <AppText style={[defaultStyles.heading, styles.heading]}>
          Messages
        </AppText>
        <Seperator />
        <FlatList
          data={messages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.ListItemContainer}>
              <ListItem
                image={item.image}
                label={item.label}
                description={item.description}
                rightIcon="chevron-right"
                onPress={() => navigation.navigate("Chat")}
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
