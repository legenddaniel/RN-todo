import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Item from './Item';

// const deleteItem = (id, data) => {
//   const newData = data.reduce((a, b) => {
//     if (b.id !== id) {
//       a.push(b);
//       return a;
//     }
//   }, []);

//   return newData;
// };

export default function App() {

  // Object.keys(data): id, subject, text, status
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
    // if (cancel) {
    // const newerData = deleteItem(id, newData);
    // setData(newerData);
    // return;
    // }
    setData(newData);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List App</Text>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Text style={styles.addNew}>+</Text>
      </TouchableWithoutFeedback>
      {data.map((item, index) => {
        return item.status === 'cancelled' || (
          <Item
            key={index}
            id={index}
            data={item}
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
  title: {
    fontSize: '2rem',
  },
  addNew: {
    paddingHorizontal: '1.5rem',
    paddingTop: '1rem',
    paddingBottom: '1.3rem',
    border: '1px solid #000',
    fontSize: '1.5rem',
  }
});
