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
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import {
  createChatConversation,
  createConversation,
  send,
} from "../firebase/firebaseCalls/chat";
import { useConversation } from "../hooks/useConversation";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { database } from "../firebase/firebaseConfig";
import Loader from "../components/Loader";
import AppText from "../components/AppText";

const ChatsScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const textInput = useRef();
  const {
    id: receiverId,
    firstname,
    lastname,
    designation,
  } = route.params.chatPerson;

  const { conversation, requestConversation } =
    useConversation(createConversation);

  const getPersonChat = () => {
    setLoading(true);
    const chatCollections = collection(database, "messages");
    const q = query(
      chatCollections,
      where("conversationId", "==", conversation.conversationId),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (chatSnapshot) => {
      const chats = chatSnapshot.docs.map((chat) => ({
        id: chat.id,
        ...chat.data(),
      }));
      setMessages(chats);
    });

    setLoading(false);
  };

  const sendMessage = async () => {
    try {
      const data = {
        message: message,
        senderId: user.id,
        reveiverId: receiverId,
        conversationId: conversation.conversationId,
        createdAt: serverTimestamp(),
      };
      textInput.current.clear();
      await send(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    requestConversation(user, route.params.chatPerson);
  }, []);

  useEffect(() => {
    if (conversation.conversationId) getPersonChat();
  }, [conversation]);

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
          label={`${firstname} ${lastname}`}
          description={designation}
        />
      </View>
      <Seperator />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <AppText>Loading</AppText>
        </View>
      ) : (
        <FlatList
          data={[...messages].reverse()}
          inverted={true}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <Message message={item.message} own={item.senderId === user.id} />
          )}
        />
      )}

      <View style={styles.messageInput}>
        <TextInput
          ref={textInput}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder="Write a message!"
          onChangeText={(text) => setMessage(text)}
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
          onPress={sendMessage}
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
