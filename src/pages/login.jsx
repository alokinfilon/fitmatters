import React from 'react';
import { StyleSheet, Text, View , TextInput, ScrollView, Button,TouchableOpacity  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import {faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion';
import { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient'
export default function LoginPage  ()  {
   const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <ScrollView style={styles.Container}>
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
     <View style={styles.iconView}>
            <View style={styles.iconRow}>
               <FontAwesomeIcon icon={faCircleCheck} color="#42b842" size={18} />
               <Text style={styles.iconLabel}>At least 8 characters</Text>
            </View>
            <View style={styles.iconRow}>
               <FontAwesomeIcon icon={faCircleCheck} color="#42b842" size={18} />
               <Text style={styles.iconLabel}>Capital and lowercase letters </Text>
            </View>
            <View style={styles.iconRow}>
               <FontAwesomeIcon icon={faCircleCheck} color="#42b842" size={18} />
               <Text style={styles.iconLabel}>A special character ~ # @ $ % & ! * _ ? ^ -</Text>
            </View>
            <View style={styles.iconRow}>
               <FontAwesomeIcon icon={faXmark} color="#ff4d4d" size={18} />
               <Text style={styles.iconLabel}>Uppercase letter</Text>
            </View>
          </View>
     <View style= {styles.noticeContainer} >
        <View style={styles.noticeBox}>
         <View style={styles.iconRow1}>
          <FontAwesomeIcon icon={faCircleQuestion} style= {styles.questionMarkIcon} size={32} />
           <Text style = {styles.text2}>Dont use Spaces, your name , email , or previously used passwords </Text>
         </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Comfirm password"
          placeholderTextColor="#ffffff"
        
       />
        <View style={styles.iconRow}>
          <Text style={styles.text4}>Your password matched </Text>
               <FontAwesomeIcon icon={faCircleCheck} color="#42b842" size={18} style={styles.matchedMark}/>
               
            </View>
             <View style={styles.iconRow}>
            <CheckBox
      disabled={false}
      value={toggleCheckBox}
      onValueChange={(newValue) => setToggleCheckBox(newValue)}
     style={styles.checkBox}
        tintColors={{ true: '#fe9267', false: '#ffffff' }}
 />
     <Text style={styles.text4}>Terms & privacy consent checkbox </Text>
</View>
      
     </View>

     <View style={styles.button}>
      <TouchableOpacity onPress={() => console.log('Pressed!')}>
     
      <LinearGradient 
        colors={['#f0a374', '#e77a37', '#f0a374']} 
        style={styles.buttonbox}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }}   
      >
       <Text style = {styles.text5}>Continue</Text>
      </LinearGradient>
    </TouchableOpacity>
     </View>
     <View style = {styles.signupText}>
      <Text style = {styles.text2}>— or sign up with —</Text>
     </View>
     <View style={styles.button}>
      <TouchableOpacity onPress={() => console.log('Pressed!')}>
     
      
    <View style= {styles.buttonbox1}>
        <Text style = {styles.text5}>Continue with google </Text>
      </View>
      
    </TouchableOpacity>
     <TouchableOpacity onPress={() => console.log('Pressed!')}>
     
       <View style= {styles.buttonbox1} >
        <Text style = {styles.text5}>Continue with apple </Text>
      </View>
       
      
    </TouchableOpacity>
     </View>
     <View style = {styles.AccountText}>
      <Text style = {styles.text2}>already have an account ? log in</Text>
     </View>
     
  

      </View>
      </ScrollView>
  );
}



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
        padding: 20,
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
     },

     passwordView :{
      paddingHorizontal: 20,
      marginTop: 10,
     },
     text3:{
       color: "#f1f0f0",
      fontSize:16,
      fontWeight: 900,
      },
      statusView : {
      flex: 1,
     flexDirection: 'row', 
     gap:5,
     
     marginTop:15,
    marginBottom:20
     

      },
      box : {
    flex:1 ,
    
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
    width: "100%",
    padding:15,
    backgroundColor: '#484848',
    borderRadius: 10,
    marginBottom: 20,
    
  },
      noticeContainer:{
        paddingHorizontal:15, 
          marginTop: 20,
      },
      Container : {
        flex: 1,

      },
       iconLabel: {
    color: '#eee',
    fontSize: 14,
  },
  iconRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  questionMarkIcon : {
    color:"#ffff",
    
    marginLeft:-6
  },
  matchedMark : {
    justifyContent:"flex-start",
    alignItems:"flex-start",
    marginLeft:-8
  },
  checkBox : {
    color:"#fe9267",
    marginTop:15,
     transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
    
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },

  button:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    
  },
   buttonbox: {
    paddingVertical: 20,
    paddingHorizontal: 120,
    borderRadius: 25, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  text5:{
  fontWeight:900,
  color:"#ffff",
  fontSize:18
  },

  signupText:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    
  },
  buttonbox1: {
    paddingVertical: 20,
    paddingHorizontal: 65,
    borderRadius: 25, 
    alignItems: 'center',
    justifyContent: 'center',
   backgroundColor: '#484848',
   marginBottom:20
  },
  AccountText :{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    marginBottom:60
  },

})