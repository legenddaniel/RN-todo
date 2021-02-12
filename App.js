import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Item from './Item';



export default function App() {

  // Object.keys(data): id, subject, text
  const [data, setData] = useState([]);

  const handlePress = () => {
    setData([...data, { status: 'edit' }]);
  }

  const handleChange = ({ id, subject, text, status }) => {
    const newData = [...data];
    if (subject) {
      newData[id].subject = subject;
    }
    if (text) {
      newData[id].text = text;
    }
    if (status) {
      newData[id].status = status;
    }
    setData(newData);
  }

  return (
    <View style={styles.container}>
      <Text>Todo List App</Text>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Text>+</Text>
      </TouchableWithoutFeedback>
      {data.map((data, index) => {
        return (
          <Item
            key={index}
            id={index}
            data={data}
            onChange={handleChange}
          />
        )
      })}
      <StatusBar style="auto" />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
