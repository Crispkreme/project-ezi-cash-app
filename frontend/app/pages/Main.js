import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Main = ({ navigation, route }) => {
  const [userArray, setUserArray] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle new user addition
  useEffect(() => {
    if (route.params?.newUser) {
      setUserArray((prevArray) => [...prevArray, route.params.newUser]);
    }
  }, [route.params?.newUser]);

  // Handle updated user
  useEffect(() => {
    if (route.params?.updatedUser) {
      const { updatedUser, index } = route.params;
      setUserArray((prevArray) =>
        prevArray.map((user, i) => (i === index ? updatedUser : user))
      );
    }
  }, [route.params?.updatedUser]);

  const handleDelete = (index) => {
    setUserArray((prevArray) => prevArray.filter((_, i) => i !== index));
  };

  const handleUpdate = (index) => {
    navigation.navigate('Update', { user: userArray[index], index });
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://192.168.1.37:3000/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(false); 
        navigation.navigate('Login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred while logging out.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {userArray.length > 0 && (
          <View>
            <Text style={styles.label}>Users:</Text>
            {userArray.map((user, index) => (
              <View key={index} style={styles.userItem}>
                <Text style={styles.user}>
                  {index + 1}. {user.name} ({user.email})
                </Text>
                <TouchableOpacity onPress={() => handleUpdate(index)}>
                  <Text style={styles.update}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {isLoggedIn ? (
          // Show logout if user is logged in
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.link}>Logout</Text>
          </TouchableOpacity>
        ) : (
          // Show Register and Login if user is not logged in
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  user: {
    fontSize: 14,
  },
  update: {
    color: 'orange',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  delete: {
    color: 'red',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
