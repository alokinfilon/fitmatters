import React from 'react';
import { StyleSheet, Text, View , TextInput, ScrollView, TouchableOpacity, useWindowDimensions, KeyboardAvoidingView,  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import {faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion';
import { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';  
import LinearGradient from 'react-native-linear-gradient'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LoginPage  ({ navigation })  {
const [toggleCheckBox, setToggleCheckBox] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const { width, height } = useWindowDimensions();
 const dynamicStyles = {
    heading: { fontSize: width * 0.07,  fontWeight: '900' },
    body: { fontSize: width * 0.058 },
    subHeading: { fontSize: width * 0.06, fontWeight: '900' },
    subBody: { fontSize: width * 0.04 },
    subBody1: { fontSize: width * 0.049, fontWeight: '900' },
    subBody2: { fontSize: width * 0.046, fontWeight: '600' },
     subBody3: { fontSize: width * 0.04, fontWeight: '900' },
     subBody4: { fontSize: width * 0.038, fontWeight: '900' },
  };
  return (
    <SafeAreaView  style={styles.Container}>
   
    <ScrollView>
    <View style={styles.mainContainer} >
      <View style={styles.upperTextContainer}>
        <Text style={[styles.text1, dynamicStyles.heading]}>
        Create your Account
      </Text>
       <Text style={[styles.text1, dynamicStyles.subBody]}>
        Join Out.Fit.Find to Discover curated looks tailored to Your style and budget.
      </Text>
      </View>
      <View  style = {styles.inputContainer}>
     
      <TextInput
          style={styles.input}
          placeholder="Enter your email or Phone Number"
          placeholderTextColor="#ffffff"
         
          
        />
           <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password Creation"
                  placeholderTextColor="#ffffff"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                    color="#bdbdbd"
                    size={24}
                  />
                </TouchableOpacity>
              </View>


      </View>
      <View style = {styles.passwordView}>
        <Text style={[styles.text1, dynamicStyles.subBody1]}>Password Strength</Text>
        <View style = {styles.statusView}>
        <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={[styles.box, { backgroundColor: '#fff',borderRadius: 8,  }]} />
        </View>
        <Text style={[styles.text1, dynamicStyles.subBody4]}>Password must include</Text>
      </View>
     <View style={styles.iconView}>
            <View style={styles.iconRow}>
               <FontAwesomeIcon icon={faCircleCheck} color="#42b842" size={18} />
               <Text style={[styles.text1, dynamicStyles.subBody4]}>At least 8 characters</Text>
            </View>
            <View style={styles.iconRow}>
               <FontAwesomeIcon icon={faCircleCheck} color="#42b842" size={18} />
               <Text style={[styles.text1, dynamicStyles.subBody4]}>Capital and lowercase letters </Text>
            </View>
            <View style={styles.iconRow}>
               <FontAwesomeIcon icon={faCircleCheck} color="#42b842" size={18} />
               <Text style={[styles.text1, dynamicStyles.subBody4]}>A special character ~ # @ $ % & ! * _ ? ^ -</Text>
            </View>
            <View style={styles.iconRow}>
               <FontAwesomeIcon icon={faXmark} color="#ff4d4d" size={18} />
               <Text style={[styles.text1, dynamicStyles.subBody4]}>Uppercase letter</Text>
            </View>
          </View>
     <View style= {styles.noticeContainer} >
        <View style={styles.noticeBox}>
         <View style={styles.iconRow1}>
          <FontAwesomeIcon icon={faCircleQuestion} style= {styles.questionMarkIcon} size={32} />
           <Text style={[styles.text1, dynamicStyles.subBody4]}>Dont use Spaces, your name , email , or previously used passwords </Text>
         </View>
         
        </View>

 <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm Password"
                  placeholderTextColor="#ffffff"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                    color="#bdbdbd"
                    size={24}
                  />
                </TouchableOpacity>
              </View>

                  

        
        <View style={styles.iconRow}>
          
          <Text style={[styles.text1, dynamicStyles.subBody4]}>Your password matched </Text>
               <FontAwesomeIcon icon={faCircleCheck} color="#42b842" size={18} style={styles.matchedMark}/>
               
            </View>
             <View style={styles.iconRow}>
            <CheckBox
      disabled={false}
      value={toggleCheckBox}
      onValueChange={(newValue) => setToggleCheckBox(newValue)}
     style={styles.checkboxWrapper}
        tintColors={{ true: '#fe9267', false: '#ffffff' }}
 />

     <Text style={[styles.text1, dynamicStyles.subBody4]}>Terms & privacy consent checkbox </Text>
</View>
      
     </View>

     <View style={styles.button}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
     
      <LinearGradient 
        colors={['#f0a374', '#e77a37', '#f0a374']} 
        style={styles.buttonbox}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }}   
      >
       <Text style={[styles.text1, dynamicStyles.subBody1]}>Continue</Text>
      </LinearGradient>
    </TouchableOpacity>
     </View>
     <View style = {styles.signupText}>
      <Text style={[styles.text1, dynamicStyles.subBody]}>— or sign up with —</Text>
     </View>
     <View style={styles.button}>
      <TouchableOpacity onPress={() => console.log('Pressed!')}>
     
      
    <View style= {styles.buttonbox1}>
        <Text style={[styles.text1, dynamicStyles.subBody1]}>Continue with google </Text>
      </View>
      
    </TouchableOpacity>
     <TouchableOpacity onPress={() => console.log('Pressed!')}>
     
       <View style= {styles.buttonbox1} >
        <Text style={[styles.text1, dynamicStyles.subBody1]}>Continue with apple </Text>
      </View>
       
      
    </TouchableOpacity>
     </View>
     <View style = {styles.AccountText}>
      <Text style={[styles.text1, dynamicStyles.subBody]}>already have an account ? log in</Text>
     </View>
     
  

      </View>
      </ScrollView>
      </SafeAreaView>
      
  );
}



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#171717",
  },
  text1: {
    color: "#fff",
  },
  upperTextContainer: {
    padding: wp('5%'),
    alignItems: "flex-start",
    gap: wp('5%'),
  },
  inputContainer: {
    paddingHorizontal: wp('5%'),
    gap: wp('3%'),
    marginTop: wp('5%'),
  },
  input: {
    height: hp('8%'),
    backgroundColor: '#484848',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    color: '#fff',
    fontSize: 16,
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#333',
    fontWeight: "900",
  },
 
 
  passwordView: {
    paddingHorizontal: wp('6%'),
  },
  statusView: {
    flexDirection: 'row',
    gap: wp('1.5%'), 
    marginTop: hp('1.5%'),
    marginBottom: hp('2%'),
  },
  box: {
    flex: 1,
    height: 10,
    backgroundColor: "#42b842",
    borderRadius: wp('2%'),
  },
  iconView: {
    gap: wp('2%'),
    marginLeft: wp('4.5%'),
    marginTop: wp('4.5%'),
  },
  noticeBox: {
    width: "100%",
    padding: hp('2%'),
    backgroundColor: '#484848',
    borderRadius: wp('4%'),
    marginBottom: hp('2.5%'), 
  },
  noticeContainer: {
    paddingHorizontal: wp('4%'),
    marginTop: hp('3%'),
  },
  Container: {
    flex: 1,
  },
  iconLabel: {
    color: '#eee',
    fontSize: 14,
  },
  iconRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  questionMarkIcon: {
    color: "#ffff",
  },
  matchedMark: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  checkBox: {
    color: "#fe9267",
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], 
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('3%'),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  buttonbox: {
    width: wp('90%'),
    paddingVertical: hp('2%'),
    borderRadius: wp('4%'), 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1.5%'),
  },
  buttonbox1: {
    width: wp('90%'), 
    paddingVertical: hp('2%'),
    borderRadius: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#484848',
    marginBottom: hp('2.5%'),
  },
  AccountText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1.5%'),
    marginBottom: hp('2.5%'),
  },
 
   passwordInputWrapper: {
    height: hp('8%'), 
    backgroundColor: '#484848',
    borderRadius: wp('3%'),
    borderWidth: 1,
    borderColor: '#262626',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'), 
    marginBottom: hp('2.5%'), 
  },
  passwordInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16, 
    paddingVertical: 0, 
    fontWeight: "900",
  },

 
 
});
