import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const NotificationComponent = (props) => {
  const nav = useNavigation();
  const { notification } = props.notification || {};
  const navigate = (type) => {
    if (type === 'chat') {
      nav.navigate('Chat');
    }
    if (type === 'bookingAccepted') {
      nav.navigate('Bookings');
    }
    if (type === 'newPendingBooking') {
      nav.navigate('AdminBooking');
    }
    if (
      type === 'commentLike' ||
      type === 'postComment' ||
      type === 'postLike'
    ) {
      nav.navigate('Discussion');
    }
  };
  if (!notification || !notification.data) {
    return (
      <View style={styles.notifContainer}>
        <Text>No notification data available</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={() => navigate(notification.notifType)}>
      <View style={styles.notifContainer}>
        <Text>{notification.data.message}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  notifContainer: {
    borderWidth: 2,
    borderColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 2,
    backgroundColor: 'white',
  },
});
