import React from 'react';
import { StyleSheet, Text, View , TextInput, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

const YourApp = () => {
  return (
    
    <View style={styles.mainContainer} >
      <View style={styles.upperTextContainer}>
        <Text style = {styles.text1}>
        Create your Account
      </Text>
       <Text style = {styles.text2}>
        Join Out.Fit.Find to Discover curated looks tailored to Your style and budget.
      </Text>
      </View>
      <View  style = {styles.inputContainer}>
     
      <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#ffffff"
         
          
        />
          <TextInput
          style={styles.input}
          placeholder="Create password"
          placeholderTextColor="#ffffff"
         
       />

      </View>
      <View style = {styles.passwordView}>
        <Text style = {styles.text3}>Password Strength</Text>
        <View style = {styles.statusView}>
        <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={[styles.box, { backgroundColor: '#fff',borderRadius: 8,  }]} />
        </View>
        <Text style={styles.text4}>Password must include</Text>
      </View>
     <View style={styles.iconView} >
       <FontAwesomeIcon icon={faCircleCheck} color="green" />
        <FontAwesomeIcon icon={faCircleCheck} color="green" />
         <FontAwesomeIcon icon={faCircleCheck} color="green" />
          <FontAwesomeIcon icon={faXmark} color="red" />
     </View>
     <View style= {styles.noticeContainer} >
        <View style={styles.noticeBox}>
          <Text style = {styles.text2}>Dont use Spaces, your name , email , or previously used passwords </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Create password"
          placeholderTextColor="#ffffff"
         
       />
       
     </View>
     

      </View>
      
  );
}

export default YourApp;

const styles = StyleSheet.create({
  
  mainContainer : {
    flex: 1, 
   height:"auto",
    backgroundColor:"#171717",
  },

    text1 : {
      color: "#fff",
      fontSize:20,
      fontWeight: 900,
      

    },
    text2 : {
      color: "#fff",
      fontSize:14,
      fontWeight: 300,
      

    },

    upperTextContainer : {
        padding: 30,
        alignItems:"flex-start",
        gap:30
    },
    inputContainer:{
     paddingHorizontal:20,
     gap:15
    },
     input: {
    height: 55,
    backgroundColor: '#484848',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
     },

     passwordView :{
      paddingHorizontal: 20
     },
     text3:{
       color: "#f1f0f0",
      fontSize:16,
      fontWeight: 900,
      },
      statusView : {
      flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop:15,
    marginBottom:20
     

      },
      //<FontAwesomeIcon icon={["fas", "circle-check"]} color="green" />
      box : {
    width: 76,
    height: 10,
    backgroundColor:"#42b842",
    borderRadius: 8,
    
      },
      text4:{
        color: "#f1f0f0",
      fontSize:14,
      fontWeight: 900,
      },
      iconView :{
      gap:8,
      marginLeft:15,
      marginTop:15
      }, 
      noticeBox: {
        width:"100%" ,
        height : "24%",
        backgroundColor:"#3e3e3e",
        borderRadius:10, 
        marginTop:15,
        marginBottom:30


      },
      noticeContainer:{
        paddingHorizontal:15
      }

})