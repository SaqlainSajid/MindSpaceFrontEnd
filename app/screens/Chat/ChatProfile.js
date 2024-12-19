import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import usersApi from '../../api/usersApi';
import roomsApi from '../../api/roomsApi';

const ChatProfile = ({ room: roomId, nav: navigation, userData }) => {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    loadRoom();
  }, []);

  const loadRoom = async () => {
    try {
      const response = await roomsApi.getRoom(roomId);
      setRoom(response.data[0]);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  return (
    <TouchableOpacity
      key={roomId}
      style={{
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 15,
      }}
      onPress={() =>
        navigation.navigate('VolunteerChatScreen', { roomId: roomId })
      }
    >
      <View style={styles.container}>
        <View style={styles.imageName}>
          <Image
            style={styles.pic}
            source={require('../../assets/mountain.jpg')}
          />
          {userData && userData.name ? (
            <Text style={styles.name}>{userData.name}</Text>
          ) : (
            <Text style={styles.name}>User Deleted</Text>
          )}
        </View>

        {room?.UnreadVolunteer > 0 ? (
          <View style={styles.unread}>
            <Text style={styles.num}>{room.UnreadVolunteer}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.num}></Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
  },
  pic: { alignSelf: 'center', width: 50, height: 50, borderRadius: 100 },
  name: {
    marginStart: 15,
    fontWeight: '300',
    fontSize: 20,
  },
  imageName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unread: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 2,
    margin: 2,
    alignItems: 'center',
  },
  num: {
    color: 'white',
    fontWeight: '500',
  },
});
