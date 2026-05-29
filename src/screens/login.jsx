import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Info, 
  Mail,
  Apple 
} from 'lucide-react-native';
import { Tokens } from '../theme/theme'; 

export default function SignUpScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const iconSize = Tokens.scaleAsset(18);
  const feedbackIconSize = Tokens.scaleAsset(14);
  const socialIconSize = Tokens.scaleAsset(20);

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
            
            <View style={styles.headerFrame}>
              <Text style={styles.titleText}>Create Your Account</Text>
              <Text style={styles.subtitleText}>
                Join Out.Fit.Find to discover curated looks tailored to your style and budget.
              </Text>
            </View>

            <View style={styles.inputFieldsContainer}>
              
              <View style={styles.inputOuterWrapper}>
                <LinearGradient
                  colors={['#333637', '#242426']}
                  start={{ x: 0.01, y: 0.5 }}
                  end={{ x: 0.99, y: 0.5 }}
                  style={styles.inputGradientBackground}
                >
                  <TextInput
                    style={styles.inputText}
                    placeholder="Enter your email Or Phone Number"
                    placeholderTextColor="#E5E5E5"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </LinearGradient>
              </View>

              <View style={styles.frame510}>
                <View style={styles.inputOuterWrapper}>
                  <LinearGradient
                    colors={['#333637', '#242426']}
                    start={{ x: 0.01, y: 0.5 }}
                    end={{ x: 0.99, y: 0.5 }}
                    style={styles.inputGradientBackground}
                  >
                    <TextInput
                      style={[styles.inputText, { flex: 1 }]}
                      placeholder="Password creation"
                      placeholderTextColor="#E5E5E5"
                      secureTextEntry={!passwordVisible}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity 
                      onPress={() => setPasswordVisible(!passwordVisible)} 
                      style={styles.eyeButton}
                      activeOpacity={0.7}
                    >
                      {passwordVisible ? (
                        <EyeOff size={iconSize} color="#E5E5E5" />
                      ) : (
                        <Eye size={iconSize} color="#E5E5E5" />
                      )}
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

                <View style={styles.frame169}>
                  <View style={styles.strengthTextRow}>
                    <Text style={styles.passwordStrengthLabel}>Password Strength</Text>
                    <Text style={styles.strongValueLabel}>Strong</Text>
                  </View>

                  <View style={styles.navigationMeterRow}>
                    <View style={[styles.meterBar, { backgroundColor: '#2BBA52' }]} />
                    <View style={[styles.meterBar, { backgroundColor: '#2BBA52' }]} />
                    <View style={[styles.meterBar, { backgroundColor: '#2BBA52' }]} />
                    <View style={[styles.meterBar, { backgroundColor: '#E5E5E5' }]} />
                  </View>

                  <View style={styles.passwordRequirementContainer}>
                    <Text style={styles.requirementHeader}>Password must include</Text>
                    <View style={styles.frame165}>
                      <View style={styles.indicationRow}>
                        <View style={styles.iconBoxCenter}>
                          <Check size={feedbackIconSize} color="#2BBA52" strokeWidth={3} />
                        </View>
                        <Text style={styles.requirementItemText}>At least 8 characters</Text>
                      </View>
                      <View style={styles.indicationRow}>
                        <View style={styles.iconBoxCenter}>
                          <Check size={feedbackIconSize} color="#2BBA52" strokeWidth={3} />
                        </View>
                        <Text style={styles.requirementItemText}>Capital and lowercase letters</Text>
                      </View>
                      <View style={styles.indicationRow}>
                        <View style={styles.iconBoxCenter}>
                          <Check size={feedbackIconSize} color="#2BBA52" strokeWidth={3} />
                        </View>
                        <Text style={styles.requirementItemText}>A special character - # @ $ % & ! * _ ? ^ -</Text>
                      </View>
                      <View style={styles.indicationRow}>
                        <View style={styles.iconBoxCenter}>
                          <X size={feedbackIconSize} color="#F16646" strokeWidth={3} />
                        </View>
                        <Text style={styles.requirementItemText}>A Number</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.infoBarContainerOuter}>
                  <LinearGradient
                    colors={['#242525', '#1A1C1D']}
                    start={{ x: 0.02, y: 0.5 }}
                    end={{ x: 0.98, y: 0.5 }}
                    style={styles.infoBarContainerInner}
                  >
                    <Info size={iconSize} color="#E5E5E5" style={styles.infoIconSpacing} />
                    <Text style={styles.infoBarText}>
                      Don’t use spaces, your name, email, or previously used passwords.
                    </Text>
                  </LinearGradient>
                </View>
              </View>

              <View style={styles.frame410}>
                <View style={styles.inputOuterWrapper}>
                  <LinearGradient
                    colors={['#333637', '#242426']}
                    start={{ x: 0.01, y: 0.5 }}
                    end={{ x: 0.99, y: 0.5 }}
                    style={styles.inputGradientBackground}
                  >
                    <TextInput
                      style={[styles.inputText, { flex: 1 }]}
                      placeholder="Confirm Password"
                      placeholderTextColor="#E5E5E5"
                      secureTextEntry={!confirmPasswordVisible}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity 
                      onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
                      style={styles.eyeButton}
                      activeOpacity={0.7}
                    >
                      {confirmPasswordVisible ? (
                        <EyeOff size={iconSize} color="#E5E5E5" />
                      ) : (
                        <Eye size={iconSize} color="#E5E5E5" />
                      )}
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

                <View style={styles.passwordMatchedRow}>
                  <Text style={styles.passwordMatchedText}>Your password matched</Text>
                  <Check size={Tokens.scaleAsset(16)} color="#2BBA52" strokeWidth={3} />
                </View>
              </View>

              <TouchableOpacity 
                style={styles.checkboxContainer} 
                onPress={() => setTermsAccepted(!termsAccepted)}
                activeOpacity={0.8}
              >
                {termsAccepted ? (
                  <LinearGradient
                    colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                    start={{ x: 0.01, y: 0.5 }}
                    end={{ x: 0.99, y: 0.5 }}
                    style={styles.checkmarkBoxActive}
                  >
                    <Check size={feedbackIconSize} color="#FFFFFF" strokeWidth={3} />
                  </LinearGradient>
                ) : (
                  <View style={styles.checkmarkBoxInactive} />
                )}
                <Text style={styles.checkboxLabel}>Terms & privacy consent checkbox</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.frame8Buttons}>
              <TouchableOpacity activeOpacity={0.85} style={styles.primaryButtonWrapper}
              onPress={() => navigation.replace('Home')}
              >
                <LinearGradient
                  colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                  start={{ x: 0.01, y: 0.5 }}
                  end={{ x: 0.99, y: 0.5 }}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.frame10Socials}>
                <Text style={styles.orSignUpWithText}>— or sign up with —</Text>

                <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                  <Mail size={socialIconSize} color="#FFFFFF" style={styles.socialIconLayout} />
                  <Text style={styles.socialButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                  <Apple size={socialIconSize} color="#FFFFFF" style={styles.socialIconLayout} />
                  <Text style={styles.socialButtonText}>Continue with Apple</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.frame6Footer}>
                <Text style={styles.footerText}>
                  Already have an account? <Text style={styles.loginLink}>Log In</Text>
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
  headerFrame: {
    width: '100%',
    marginBottom: Tokens.gaps.separator,
    gap: Tokens.gaps.large,
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
    gap: Tokens.gaps.xlarge,
    marginBottom: Tokens.gaps.section,
  },
  inputOuterWrapper: {
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
  frame510: {
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
  frame169: {
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
  passwordStrengthLabel: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#FFFFFF',
  },
  strongValueLabel: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.small,
    lineHeight: Tokens.typography.lineHeights.small,
    color: '#B3B3B3',
  },
  navigationMeterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 16,
    gap: 6,
  },
  meterBar: {
    flex: 1,
    height: Tokens.components.barMetricHeight,
    borderRadius: Tokens.components.radiusBar,
  },
  passwordRequirementContainer: {
    width: '100%',
    gap: Tokens.gaps.medium,
    marginTop: Tokens.gaps.small,
  },
  requirementHeader: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.small,
    lineHeight: Tokens.typography.lineHeights.small,
    color: '#E5E5E5',
  },
  frame165: {
    width: '100%',
    gap: Tokens.gaps.small,
  },
  indicationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    height: 20,
  },
  iconBoxCenter: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requirementItemText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.small,
    lineHeight: Tokens.typography.lineHeights.small,
    color: '#E5E5E5',
  }, 
  infoBarContainerOuter: {
    width: '100%',
    minHeight: Tokens.components.infoMinHeight,
    borderRadius: Tokens.components.radiusInput,
    overflow: 'hidden',
  },
  infoBarContainerInner: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#323537',
    borderRadius: Tokens.components.radiusInput,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconSpacing: {
    marginRight: Tokens.gaps.medium,
  },
  infoBarText: {
    flex: 1,
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.small,
    lineHeight: Tokens.typography.lineHeights.small,
    color: '#E5E5E5',
  },
  frame410: {
    width: '100%',
    gap: Tokens.gaps.small,
  },
  passwordMatchedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '100%',
    height: 20,
    paddingHorizontal: 4,
  },
  passwordMatchedText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.small,
    lineHeight: Tokens.typography.lineHeights.small,
    color: '#E5E5E5',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    width: '100%',
    height: 24,
    marginTop: Tokens.gaps.small,
  },
  checkmarkBoxActive: {
    width: 24,
    height: 24,
    borderRadius: Tokens.components.radiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(251, 147, 96, 0.64)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  checkmarkBoxInactive: {
    width: 24,
    height: 24,
    borderRadius: Tokens.components.radiusSmall,
    backgroundColor: '#323537',
    borderWidth: 1,
    borderColor: '#818181',
  },
  checkboxLabel: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#E5E5E5',
  },
  frame8Buttons: {
    width: '100%',
    gap: Tokens.gaps.large,
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
    fontSize: Tokens.typography.sizes.button,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  frame10Socials: {
    width: '100%',
    gap: Tokens.gaps.large,
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
    marginRight: 10,
  },
  socialButtonText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.button,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  frame6Footer: {
    width: '100%',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Tokens.gaps.small,
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
});