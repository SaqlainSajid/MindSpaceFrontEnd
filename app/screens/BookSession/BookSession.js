import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Profile from "./Profile";
import { Doctors } from "../../components/FakeData";

const BookSession = (props) => {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <FlatList
          data={Doctors(props)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Profile
              pic={item.pic}
              name={item.name}
              degrees={item.degrees}
              spec={item.spec}
              payment={item.payment}
              navigation={props.navigation}
            />
          )}
          ItemSeparatorComponent={<View style={{ height: 10 }} />}
          scrollEnabled={true}
        />
      </View>
    </ScreenTemplate>
  );
};

export default BookSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
