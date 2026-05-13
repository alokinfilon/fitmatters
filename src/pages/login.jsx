import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import LinearGradient from 'react-native-linear-gradient'
import { faEye } from '@fortawesome/free-regular-svg-icons';
const passwordRules = [
  { label: 'At least 8 characters', passed: true },
  { label: 'Capital and lowercase letters', passed: true },
  { label: 'A special character - # @ $ % & ! * _ ? ^ -', passed: true },
  { label: 'A Number', passed: false },
];

const SmallStatusIcon = ({ passed }) => (
  <View style={[styles.smallStatusIcon, passed ? styles.passIcon : styles.failIcon]}>
    <Text style={styles.smallStatusText}>{passed ? '✓' : '✖'}</Text>
  </View>
);

export default function LoginPage({ navigation }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>
                Join Out.Fit.Find to discover curated looks tailored to your
                style and budget.
              </Text>
            </View>

            <View style={styles.fieldStack}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email Or Phone Number"
                placeholderTextColor="#f3f3f3"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <View style={styles.passwordField}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password creation"
                  placeholderTextColor="#f3f3f3"
                  secureTextEntry
                  autoCapitalize="none"
                />
                <Text style={styles.eyeIcon}> <FontAwesomeIcon 
  icon={faEye} 
  color="#f10a0a" 
  size={60} 
  
/> </Text>
              </View>
            </View>

            <View style={styles.strengthHeader}>
              <Text style={styles.sectionTitle}>Password Strength</Text>
              <Text style={styles.strengthText}>Strong</Text>
            </View>

            <View style={styles.strengthBar}>
              <View style={[styles.strengthSegment, styles.segmentActive]} />
              <View style={[styles.strengthSegment, styles.segmentActive]} />
              <View style={[styles.strengthSegment, styles.segmentActive]} />
              <View style={styles.strengthSegment} />
            </View>

            <Text style={styles.rulesTitle}>Password must include</Text>

            <View style={styles.rulesList}>
              {passwordRules.map(rule => {
                return (
                  <View key={rule.label} style={styles.ruleRow}>
                    <SmallStatusIcon passed={rule.passed} />
                    <Text style={styles.ruleText}>{rule.label}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.noticeBox}>
              <View style={styles.noticeIcon}>
                <Text style={styles.noticeIconText}>i</Text>
              </View>
              <Text style={styles.noticeText}>
                Don't use spaces, your name, email, or previously used
                passwords.
              </Text>
            </View>

            <View style={styles.passwordField}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                placeholderTextColor="#f3f3f3"
                secureTextEntry
                autoCapitalize="none"
              />
              
               <FontAwesomeIcon 
  icon={faEye} 
  color="#f10a0a" 
  size={24} 
/> 
            </View>
            

            <View style={styles.matchRow}>
              <Text style={styles.matchText}>Your password matched</Text>
              <SmallStatusIcon passed />
            </View>

             <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setToggleCheckBox(!toggleCheckBox)}
      style={styles.consentRow}
    >
      {/* Dynamic toggle condition to inject the gradient element */}
      {toggleCheckBox ? (
        <LinearGradient
          colors={['#f0a374', '#f37527', '#f0a374']} 
          start={{ x: 0, y: 0 }}          // Diagonal or linear distribution origin
          end={{ x: 1, y: 0 }}
          style={[styles.checkbox, styles.checkboxChecked]}
        >
          <Text style={styles.checkboxMark}>✓</Text>
        </LinearGradient>
      ) : (
        <View style={styles.checkbox} />
      )}
      
      <Text style={styles.consentText}>
        Terms & privacy consent checkbox
      </Text>
    </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.86}
              onPress={() => navigation.navigate('Home')}
              style={styles.fullWidthButton}
            >
              <View style={styles.primaryButton}>
               
                 <LinearGradient 
        colors={['#f0a374', '#e77a37', '#f0a374']} 
        style={styles.buttonbox}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }}   
      >
        <Text style={styles.primaryButtonText}>Continue</Text>
      </LinearGradient>
              </View>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or sign up with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialStack}>
              <TouchableOpacity activeOpacity={0.82} style={styles.socialButton}>
                  
                <Text style={styles.socialText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.82} style={styles.socialButton}>
                <Text style={styles.socialIcon}>A</Text>
                <Text style={styles.socialText}>Continue with Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity activeOpacity={0.75}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#080808',
  },
  buttonbox: {
    paddingVertical: 20,
     width: '100%',
    borderRadius: 16, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 36,
  },
  form: {
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '900',
  },
  subtitle: {
    color: '#eeeeee',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 22,
    maxWidth: 360,
  },
  fieldStack: {
    gap: 14,
    marginBottom: 18,
  },
  input: {
    width: '100%',
    minHeight: 56,
    backgroundColor: '#2d2f31',
    borderRadius: 8,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    paddingHorizontal: 16,
  },
  passwordField: {
    width: '100%',
    minHeight: 56,
    backgroundColor: '#2d2f31',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    paddingVertical: 0,
    paddingRight: 12,
  },
  eyeIcon: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  strengthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  strengthText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  strengthBar: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 18,
  },
  strengthSegment: {
    flex: 1,
    height: 9,
    borderRadius: 8,
    backgroundColor: '#e7e7e7',
  },
  segmentActive: {
    backgroundColor: '#30d764',
  },
  rulesTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 12,
  },
  rulesList: {
    gap: 10,
    marginBottom: 18,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  smallStatusIcon: {
    width: 18,
    height: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  passIcon: {
    borderWidth: 1,
    borderColor: '#36d671',
  },
  failIcon: {
    backgroundColor: 'transparent',
  },
  smallStatusText: {
    color: '#36d671',
    fontSize: 10,
    fontWeight: '900',
    lineHeight: 11,
  },
  ruleText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 15,
  },
  noticeBox: {
    width: '100%',
    minHeight: 68,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#3a3d3f',
    backgroundColor: '#242628',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  noticeIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeIconText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  noticeText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 16,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 12,
    marginBottom: 18,
  },
  matchText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 28,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: '#ff8069',
    backgroundColor: '#ff8069',
  },
  checkboxMark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 17,
  },
  consentText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  fullWidthButton: {
    width: '100%',
    marginBottom: 17,
    backgroundColor:"#0000"
  },
  primaryButton: {
    width: '100%',
    minHeight: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fb765f',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dividerLine: {
    width: 36,
    height: 1,
    backgroundColor: '#787878',
  },
  dividerText: {
    color: '#d8d8d8',
    fontSize: 13,
    fontWeight: '800',
  },
  socialStack: {
    gap: 12,
    marginBottom: 34,
  },
  socialButton: {
    width: '100%',
    minHeight: 58,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#55585b',
    backgroundColor: '#313436',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  socialText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    flexShrink: 1,
  },
  socialIcon: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    width: 18,
    textAlign: 'center',
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
    paddingBottom: 8,
  },
  loginText: {
    color: '#dddddd',
    fontSize: 12,
    fontWeight: '400',
  },
  loginLink: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});
