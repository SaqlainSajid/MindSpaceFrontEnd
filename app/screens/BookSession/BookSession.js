import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import Profile from "./Profile";
import { Doctors } from "../../components/FakeData";
import doctorsApi from "../../api/doctorsApi";

const BookSession = (props) => {
  const [doctorsData, setDoctorsData] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const response = await doctorsApi.getDoctors();
    setDoctorsData(response.data);
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <FlatList
          data={doctorsData}
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
