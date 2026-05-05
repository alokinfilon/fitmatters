import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.alignRow}>
     <View style={styles.header}>
  <TouchableOpacity style={styles.button}>
    <FontAwesomeIcon icon={faLessThan} color="#ffffff" size={18} />
 
    <Text style={styles.text}>Back</Text>
  </TouchableOpacity>
</View>
  </View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#fff",
    fontWeight:900,
    marginLeft:8
  },
  header :{
    marginTop:10,
    paddingLeft:20

  },
  alignRow:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
  flexDirection: 'row', 
  alignItems: 'center', 
  marginLeft:8
},



});
