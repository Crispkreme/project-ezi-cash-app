import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserTable = ({ keyVal, val, deletedMethod }) => {
  return (
    <View style={styles.userTable}>
      <Text style={styles.userId}>{val.id}</Text>
      <Text style={styles.name}>{val.name}</Text>
      <Text style={styles.username}>{val.username}</Text>

      <TouchableOpacity style={styles.userDelete} onPress={deletedMethod}>
        <Text style={styles.userDeleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserTable;

const styles = StyleSheet.create({
  userTable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  userId: {
    width: 50,
    textAlign: 'center',
    fontSize: 16,
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  username: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
  userDelete: {
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },
  userDeleteText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
