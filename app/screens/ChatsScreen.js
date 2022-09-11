import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import Seperator from "../components/Seperator";
import { colors } from "../config";
import Message from "../components/Message";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";

const messages = [
  {
    id: 1,
    message: "Hi This is Zaid Saleem and this is a long string",
    own: true,
  },
  { id: 2, message: "Hi This is Zaid Saleem", own: false },
  { id: 3, message: "Hi This is Zaid Saleem", own: true },
  { id: 4, message: "Hi This is Zaid Saleem", own: false },
  { id: 5, message: "Hi This is Zaid Saleem", own: true },
  { id: 6, message: "Hi This is Zaid Saleem", own: true },
  { id: 7, message: "Hi This is Zaid Saleem", own: true },
  { id: 8, message: "Hi This is Zaid Saleem", own: true },
  { id: 9, message: "Hi This is Zaid Saleem", own: true },
  { id: 11, message: "Hi This is Zaid Saleem", own: true },
  { id: 12, message: "Hi This is Zaid Saleem", own: true },
  { id: 13, message: "Hi This is Zaid Saleem", own: true },
];

const ChatsScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.chatHeader}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Messages")}
        >
          <Icon
            IconComponent={MaterialCommunityIcons}
            color={colors.white}
            name="chevron-left"
            size={40}
          />
        </TouchableOpacity>
        <ListItem
          color={colors.white}
          image={require("../assets/zaid-saleem-image.jpg")}
          label="Zaid Saleem"
          description="Software Engineer"
        />
      </View>
      <Seperator />
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <Message message={item.message} own={item.own} />
        )}
      />
      <View style={styles.messageInput}>
        <TextInput
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder="Write a message!"
        />
        <AppButton
          style={styles.button}
          IconComponent={
            <Icon
              IconComponent={MaterialCommunityIcons}
              name="send"
              color={colors.white}
              size={20}
            />
          }
          onPress={() => console.log("Pressed")}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  chatHeader: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.purple,
  },
  messageInput: {
    padding: 5,
    paddingTop: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: 0,
    borderRadius: 50,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 60,
    flex: 1,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});

export default ChatsScreen;
