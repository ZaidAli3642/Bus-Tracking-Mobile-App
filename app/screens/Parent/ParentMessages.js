import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppText from "../../components/AppText";
import ListItem from "../../components/ListItem";
import Screen from "../../components/Screen";
import Seperator from "../../components/Seperator";
import AuthContext from "../../context/AuthContext";

import { defaultStyles } from "../../config";
import { getAdmins, getParentChats } from "../../firebase/firebaseCalls/admin";
import { useApi } from "../../hooks/useApi";
import Loader from "../../components/Loader";

const ParentMessages = ({ navigation, user, setUser }) => {
  const { data, loading, request } = useApi(getParentChats);

  console.log("data : ", data);
  useEffect(() => {
    request(user);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
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
                label={
                  item.fullName
                    ? item.fullName
                    : `${item.firstname} ${item.lastname}`
                }
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

export default ParentMessages;
