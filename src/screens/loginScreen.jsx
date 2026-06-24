import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Eye, EyeOff } from 'lucide-react-native';
import { Tokens } from '../theme/theme';
import GoogleIcon from '../component/svg/GoogleIcon';
import AppleIcon from '../component/svg/appleIcon';
import CustomButton from '../component/customButton';
import { useNavigation } from '@react-navigation/native'; 
import authService from '../services/authService'; 
import { useAlertModal } from '../component/modal'; 
import { AuthContext } from '../../App'; 
export default function LoginScreen() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const { setUserIsAuthenticated } = useContext(AuthContext);

  const navigation = useNavigation(); 
  const { showModal } = useAlertModal();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openSignUpDisplay = () => {
    if (navigation) {
      navigation.replace('SignUpScreen');
      console.log("signup is clicked ");
    }
  };

  const openHomeTabDisplay = () => {
    if (navigation) {
      console.log("hometab is triked ")
      navigation.replace('MainTab');
      console.log("hometab is clicked ")
    }
  };

  const iconSize = Tokens.scaleAsset(24);

  const handleGoogleLogin = () => {
    showModal({
      title: 'Google Auth',
      message: 'Google OAuth integration coming soon.',
      variant: 'info'
    });
  };

  const handleAppleLogin = () => {
    showModal({
      title: 'Apple Auth',
      message: 'Apple Sign-In integration coming soon.',
      variant: 'info'
    });
  };

  const handleLogin = async () => {
  const userInput = emailOrPhone.trim(); 
  const cleanPassword = password.trim();

  if (!userInput || !cleanPassword) {
    showModal({
      title: 'Validation Error',
      message: 'Please fill in all fields.',
      variant: 'error'
    });
    return;
  }
  
  setLoading(true);
  try {
    const isEmail = userInput.includes('@');
    
    const payload = {
      email: isEmail ? userInput : undefined,
      password: cleanPassword,
    }; 

    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    console.log("Sending payload to authService:", payload);

    const data = await authService.login(payload);
    
    console.log("Login Successful! Authenticated User ID:", data.userId);
    setLoading(false);

    showModal({
      title: 'Success',
      message: 'Logged in successfully!',
      variant: 'success',
      confirmText: 'OK',
      onConfirm: () => {
        // ✅ State-Driven Login: Trigger the root App.js layout to switch to MainTab instantly
        setUserIsAuthenticated(true); 
      }
    });
    
  } catch (error) {
    setLoading(false);

    const isNetworkIssue = 
      error.message?.toLowerCase().includes('network') || 
      error.message?.toLowerCase().includes('timeout') ||
      error.message?.toLowerCase().includes('failed to fetch');

    showModal({
      title: isNetworkIssue ? 'Connection Error' : 'Login Failed',
      message: isNetworkIssue 
        ? 'Please check your internet connection and try again.' 
        : (error.message || 'Invalid email or password.'),
      variant: 'error',
      confirmText: isNetworkIssue ? 'Try Again' : 'OK'
    });
  }
};

  return (
    <LinearGradient
      colors={['#0F0F0F', '#0D0D0D']}
      start={{ x: 0.44, y: 0 }}
      end={{ x: 0.54, y: 0.98 }}
      style={styles.screenContainer}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <Text style={styles.titleText}>Welcome Back 👋</Text>
              <Text style={styles.subtitleText}>
                Login in to explore new outfits, trends, and brands picked just for you.
              </Text>
            </View>

            <View style={styles.inputFieldsContainer}>
              <View style={styles.inputOuterView}>
                <LinearGradient
                  colors={['#333637', '#242426']}
                  start={{ x: 0.01, y: 0.5 }}
                  end={{ x: 0.99, y: 0.5 }}
                  style={styles.inputGradientBackground}
                >
                  <TextInput
                     style={[styles.inputText, { flex: 1 }]}
                    placeholder="Enter your email Or Phone Number"
                    placeholderTextColor="#E5E5E5"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={emailOrPhone}
                    onChangeText={setEmailOrPhone}
                  />
                </LinearGradient>
              </View>

              <View style={styles.passwordView}>
                <View style={styles.inputOuterView}>
                  <LinearGradient
                    colors={['#333637', '#242426']}
                    start={{ x: 0.01, y: 0.5 }}
                    end={{ x: 0.99, y: 0.5 }}
                    style={styles.inputGradientBackground}
                  >
                    <TextInput
                      style={[styles.inputText, { flex: 1 }]}
                      placeholder="Enter your password"
                      placeholderTextColor="#E5E5E5"
                      secureTextEntry={!passwordVisible}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      style={styles.eyeButton}
                      activeOpacity={0.7}
                      keyboardShouldPersistTaps="handled"
                    >
                      {passwordVisible ? (
                        <EyeOff size={iconSize} color="#E5E5E5" />
                      ) : (
                        <Eye size={iconSize} color="#E5E5E5" />
                      )}
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

                <View style={styles.strengthView}>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('ForgotPassword')}
                    activeOpacity={0.7}
                    style={styles.strengthTextRow}
                  >
                    <Text style={styles.passwordStrengthText}>
                      Forgot password? 
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.continueButtonView}>
              {loading ? (
                              <ActivityIndicator size="large" color="#F16646" />
                            ) : (
              <CustomButton
                colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                onPress={handleLogin}
                fontFamily={Tokens.typography.families.semiBold}
                fontSize={Tokens.typography.sizes.subButton}
                title={loading ? 'Logging in...' : 'Login'}
                disabled={loading}
                buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
              />
               )}
              <View style={styles.socialsView}>
                <Text style={styles.orSignUpWithText}>— or sign up with —</Text>
              </View>
              
              <View style={styles.socialsView1}>
                <CustomButton
                  title="Continue with Google"
                  Icon={GoogleIcon}
                  iconColor="#ffffff"
                  colors={['#323537', '#323537']}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                  onPress={handleGoogleLogin}
                />

                <CustomButton
                  title="Continue with Apple"
                  Icon={AppleIcon}
                  iconColor="#ffffff"
                  colors={['#323537', '#323537']}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                  onPress={handleAppleLogin}
                />
              </View>

              <View style={styles.footerView}>
                
                <Text style={styles.footerText}>
                  New here?{' '}
                  <View style = {styles.signupText}>
                  <TouchableOpacity
                  onPress={openSignUpDisplay}>
                  <Text 
                    style={styles.loginLink}
                    
                  >
                    Sign UP
                  </Text>
                  </TouchableOpacity>
                  </View>
                </Text>
              
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  mainContainer: {
    width: '100%',
    maxWidth: Tokens.layout.maxWidth,
    paddingVertical: Tokens.layout.paddingVertical,
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: Tokens.gaps.separator,
    gap: Tokens.gaps.large,
    marginTop:Tokens.gaps.Lsection,
  },
  titleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.title,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  subtitleText: {
    fontFamily: Tokens.typography.families.light,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#E5E5E5',
  },
  inputFieldsContainer: {
    width: '100%',
    gap: Tokens.gaps.medium+5,
    marginBottom: Tokens.gaps.section,
  },
  inputOuterView: {
    width: '100%',
    height: Tokens.components.inputHeight,
    borderRadius: Tokens.components.radiusInput,
    overflow: 'hidden',
  },
  inputGradientBackground: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#323537',
    borderRadius: Tokens.components.radiusInput,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: '#E5E5E5',
    padding: 0,
    height: '100%',
  },
  passwordView: {
    width: '100%',
    gap: Tokens.gaps.large,
  },
  eyeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Tokens.gaps.small,
  },
  strengthView: {
    width: '100%',
    gap: Tokens.gaps.small,
  },
  strengthTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 24,
  },
  passwordStrengthText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#B3B3B3',
  },
  
  continueButtonView: {
    width: '100%',
    gap: Tokens.gaps.medium,
    alignItems: 'center',
  },
  primaryButtonWrapper: {
    width: '100%',
    height: Tokens.components.buttonHeight,
    borderRadius: Tokens.components.radiusButton,
    shadowColor: 'rgba(251, 147, 96, 0.64)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButton: {
    flex: 1,
    borderRadius: Tokens.components.radiusButton,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.subButton,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  socialsView: {
    width: '100%',
    gap: Tokens.gaps.medium,
    alignItems: 'center',
  },
   socialsView1: {
    width: '100%',
    //gap: Tokens.gaps.small,
    alignItems: 'center',
  },
  orSignUpWithText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#B3B3B3',
    marginVertical: 4,
  },
  socialButton: {
    width: '100%',
    height: Tokens.components.buttonHeight,
    backgroundColor: '#323537',
    borderWidth: 0.5,
    borderColor: '#818181',
    borderRadius: Tokens.components.radiusButton,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconLayout: {
    marginRight: 5,
  },
  socialButtonText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.subButton,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  footerView: {
    width: '100%',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  footerText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#E5E5E5',
    textAlign: 'center',
  },
  loginLink: {
    fontFamily: Tokens.typography.families.semiBold,
    textDecorationLine: 'underline',
    color: '#FFFFFF',
  },
  checkmarkCircleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#2BBA52',
    backgroundColor: '#2BBA521A',
  },
  signupText :{
    marginTop:5
  }
});
