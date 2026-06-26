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
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Eye, EyeOff, Check, X, Info } from 'lucide-react-native';
import { Tokens } from '../theme/theme';
import CheckMarkl from '../component/svg/checkMarklIcon';
import GoogleIcon from '../component/svg/GoogleIcon';
import AppleIcon from '../component/svg/appleIcon';
import authService from '../services/authService';
import { useAlertModal } from '../component/modal';

import CustomButton from '../component/customButton';

export default function SignUpScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showModal } = useAlertModal();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const iconSize = Tokens.scaleAsset(24);
  const feedbackIconSize = Tokens.scaleAsset(12);

  const openLoginDisplay = () => {
    if (navigation) {
      navigation.replace('LoginScreen');
    }
  };

  const isNumericInput = /^\+?\d*$/.test(identifier) && identifier.length > 0;

  const hasMinLength = password.length >= 8;
  const hasCaseLetters = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasSpecialChar = /[#@$%&!*_?^]/.test(password);
  const hasNumber = /\d/.test(password);

  const strengthScore = [
    hasMinLength,
    hasCaseLetters,
    hasSpecialChar,
    hasNumber,
  ].filter(Boolean).length;

  const handleSignUp = async () => {
    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();
    const cleanConfirmPassword = confirmPassword.trim();

    if (!cleanIdentifier || !cleanPassword || !cleanConfirmPassword) {
      showModal({
        title: 'Validation Error',
        message: 'Please fill in all fields.',
        variant: 'error',
      });
      return;
    }

    if (strengthScore < 4) {
      let missingRequirements = [];
      if (!hasMinLength) missingRequirements.push('At least 8 characters');
      if (!hasCaseLetters)
        missingRequirements.push('Capital and lowercase letters');
      if (!hasSpecialChar)
        missingRequirements.push('A special character (#@$%&!*_?^)');
      if (!hasNumber) missingRequirements.push('A number');

      showModal({
        title: 'Weak Password',
        message: `Your password must satisfy all security requirements:\n\n• ${missingRequirements.join(
          '\n• ',
        )}`,
        variant: 'error',
      });
      return;
    }

    if (cleanPassword !== cleanConfirmPassword) {
      showModal({
        title: 'Password Mismatch',
        message: 'Passwords do not match.',
        variant: 'error',
      });
      return;
    }

    if (!termsAccepted) {
      showModal({
        title: 'Consent Required',
        message: 'You must accept the terms and privacy consent.',
        variant: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      await authService.signup(
        cleanIdentifier,
        cleanPassword,
        cleanConfirmPassword,
      );

      showModal({
        title: 'Account Created',
        message: 'Your account has been created successfully!',
        variant: 'success',
        confirmText: 'Continue',
        onConfirm: openLoginDisplay,
      });
    } catch (error) {
      showModal({
        title: 'Signup Failed',
        message:
          error.message || 'Something went wrong. Please try again later.',
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  let strengthLabel = 'Very Weak';
  let activeBarColor = '#F16646';

  if (password.length === 0) {
    strengthLabel = 'Empty';
    activeBarColor = '#2BBA52';
  } else if (strengthScore === 1) {
    strengthLabel = 'Weak';
    activeBarColor = '#2BBA52';
  } else if (strengthScore === 2) {
    strengthLabel = 'Fair';
    activeBarColor = '#2BBA52';
  } else if (strengthScore === 3) {
    strengthLabel = 'Good';
    activeBarColor = '#2BBA52';
  } else if (strengthScore === 4) {
    strengthLabel = 'Strong';
    activeBarColor = '#2BBA52';
  }

  const isPasswordMatched = password.length > 0 && password === confirmPassword;

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
              <Text style={styles.titleText}>Create Your Account</Text>
              <Text style={styles.subtitleText}>
                Join Out.Fit.Find to discover curated looks tailored to your
                style and budget.
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
                    keyboardType="default"
                    autoCapitalize="none"
                    value={identifier}
                    onChangeText={setIdentifier}
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
                      placeholder="Password creation"
                      placeholderTextColor="#E5E5E5"
                      secureTextEntry={!passwordVisible}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
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
                 {isPasswordFocused && (
                <View style={styles.strengthView}>
                  <View style={styles.strengthTextRow}>
                    <Text style={styles.passwordStrengthText}>
                      Password Strength
                    </Text>
                    <Text
                      style={[
                        styles.strongValueText,
                        password.length > 0 && { color: activeBarColor },
                      ]}
                    >
                      {strengthLabel}
                    </Text>
                  </View>

                  <View style={styles.navigationMeterRow}>
                    <View
                      style={[
                        styles.meterBar,
                        {
                          backgroundColor:
                            strengthScore >= 1 ? activeBarColor : '#E5E5E5',
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.meterBar,
                        {
                          backgroundColor:
                            strengthScore >= 2 ? activeBarColor : '#E5E5E5',
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.meterBar,
                        {
                          backgroundColor:
                            strengthScore >= 3 ? activeBarColor : '#E5E5E5',
                        },
                      ]}
                    />
                    <View
                      style={[
                        styles.meterBar,
                        {
                          backgroundColor:
                            strengthScore >= 4 ? activeBarColor : '#E5E5E5',
                        },
                      ]}
                    />
                  </View>
                 
                    <View style={styles.requirementView}>
                      <Text style={styles.requirementText}>
                        Password must include
                      </Text>
                      <View style={styles.indicationView}>
                        <View style={styles.indicationRow}>
                          <View style={styles.iconBoxCenter}>
                            {hasMinLength ? (
                              <View
                                style={[
                                  styles.checkmarkCircleWrapper,
                                  {
                                    width: feedbackIconSize * 1.6,
                                    height: feedbackIconSize * 1.6,
                                    borderRadius: (feedbackIconSize * 1.8) / 2,
                                    borderColor: '#2BBA52',
                                    backgroundColor: '#2BBA521A',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#2BBA52"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#F16646"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasMinLength && { color: '#2BBA52' },
                            ]}
                          >
                            At least 8 characters
                          </Text>
                        </View>
                        <View style={styles.indicationRow}>
                          <View style={styles.iconBoxCenter}>
                            {hasCaseLetters ? (
                              <View
                                style={[
                                  styles.checkmarkCircleWrapper,
                                  {
                                    width: feedbackIconSize * 1.6,
                                    height: feedbackIconSize * 1.6,
                                    borderRadius: (feedbackIconSize * 1.8) / 2,
                                    borderColor: '#2BBA52',
                                    backgroundColor: '#2BBA521A',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#2BBA52"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#F16646"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasCaseLetters && { color: '#2BBA52' },
                            ]}
                          >
                            Capital and lowercase letters
                          </Text>
                        </View>
                        <View style={styles.indicationRow}>
                          <View style={styles.iconBoxCenter}>
                            {hasSpecialChar ? (
                              <View
                                style={[
                                  styles.checkmarkCircleWrapper,
                                  {
                                    width: feedbackIconSize * 1.6,
                                    height: feedbackIconSize * 1.6,
                                    borderRadius: (feedbackIconSize * 1.8) / 2,
                                    borderColor: '#2BBA52',
                                    backgroundColor: '#2BBA521A',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#2BBA52"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#F16646"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasSpecialChar && { color: '#2BBA52' },
                            ]}
                          >
                            A special character - # @ $ % & ! * _ ? ^ -
                          </Text>
                        </View>
                        <View style={styles.indicationRow}>
                          <View style={styles.iconBoxCenter}>
                            {hasNumber ? (
                              <View
                                style={[
                                  styles.checkmarkCircleWrapper,
                                  {
                                    width: feedbackIconSize * 1.6,
                                    height: feedbackIconSize * 1.6,
                                    borderRadius: (feedbackIconSize * 1.8) / 2,
                                    borderColor: '#2BBA52',
                                    backgroundColor: '#2BBA521A',
                                  },
                                ]}
                              >
                                <CheckMarkl
                                  size={feedbackIconSize - 2}
                                  color="#2BBA52"
                                  strokeWidth={4}
                                />
                              </View>
                            ) : (
                              <X
                                size={feedbackIconSize + 4}
                                color="#F16646"
                                strokeWidth={3}
                              />
                            )}
                          </View>
                          <Text
                            style={[
                              styles.requirementItemText,
                              hasNumber && { color: '#2BBA52' },
                            ]}
                          >
                            A Number
                          </Text>
                        </View>
                      </View>
                    </View>
                 
                </View>
 )}
                <View style={styles.infoBarView}>
                  <LinearGradient
                    colors={['#242525', '#1A1C1D']}
                    start={{ x: 0.02, y: 0.5 }}
                    end={{ x: 0.98, y: 0.5 }}
                    style={styles.infoBarInnerView}
                  >
                    <Info
                      size={34}
                      color="#E5E5E5"
                      style={styles.infoIconSpacing}
                    />
                    <Text style={styles.infoBarText}>
                      Don’t use spaces, your name, email, or previously used
                      passwords.
                    </Text>
                  </LinearGradient>
                </View>
                
              </View>
              
   
              <View style={styles.inputView}>
                <View style={styles.inputOuterView}>
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
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      onFocus={() => setIsConfirmPasswordFocused(true)}
                      onBlur={() => setIsConfirmPasswordFocused(false)}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                      style={styles.eyeButton}
                      activeOpacity={0.7}
                      keyboardShouldPersistTaps="handled"
                    >
                      {confirmPasswordVisible ? (
                        <EyeOff size={iconSize} color="#E5E5E5" />
                      ) : (
                        <Eye size={iconSize} color="#E5E5E5" />
                      )}
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                
                  {isConfirmPasswordFocused && confirmPassword.length > 0 && (

                <View style={styles.passwordMatchedRow}>
                  <Text
                    style={[
                      styles.passwordMatchedText,
                      isPasswordMatched && { color: '#2BBA52' },
                    ]}
                  >
                    {isPasswordMatched
                      ? 'Your password matched'
                      : 'Passwords do not match'}
                  </Text>
                  <View
                    style={[
                      styles.checkmarkCircleWrapper,
                      {
                        width: feedbackIconSize * 1.6,
                        height: feedbackIconSize * 1.6,
                        borderRadius: (feedbackIconSize * 1.8) / 2,
                        borderColor: isPasswordMatched ? '#2BBA52' : '#F16646',
                        backgroundColor: isPasswordMatched
                          ? '#2BBA521A'
                          : '#F166461A',
                      },
                    ]}
                  >
                    {isPasswordMatched ? (
                      <CheckMarkl
                        size={feedbackIconSize - 2}
                        color="#2BBA52"
                        strokeWidth={4}
                      />
                    ) : (
                      <X
                        size={feedbackIconSize - 2}
                        color="#F16646"
                        strokeWidth={3}
                      />
                    )}
                  </View>
                </View>
                  )}
              </View>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setTermsAccepted(!termsAccepted)}
                activeOpacity={0.8}
              >
                {termsAccepted ? (
                  <LinearGradient
                    colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                    start={{ x: 0.1, y: 0.5 }}
                    end={{ x: 0.7, y: 0.5 }}
                    style={styles.checkmarkBoxActive}
                  >
                    <Check
                      size={feedbackIconSize}
                      color="#FFFFFF"
                      strokeWidth={3}
                    />
                  </LinearGradient>
                ) : (
                  <View style={styles.checkmarkBoxInactive} />
                )}
                <Text style={styles.checkboxLabel}>
                  Terms & privacy consent checkbox
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.continueButtonView}>
              {loading ? (
                <ActivityIndicator size="large" color="#F16646" />
              ) : (
                <CustomButton
                  colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                  onPress={handleSignUp}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  title={'Continue'}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                />
              )}

              <View style={styles.socialsView}>
                <Text style={styles.orSignUpWithText}>— or sign up with —</Text>

                <CustomButton
                  title="Continue with Google"
                  Icon={GoogleIcon}
                  iconColor="#ffffff"
                  colors={['#323537', '#323537']}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                  onPress={() => {
                    /* Implement Google Sign Up here */
                  }}
                />

                <CustomButton
                  title="Continue with Apple"
                  Icon={AppleIcon}
                  iconColor="#ffffff"
                  colors={['#323537', '#323537']}
                  fontFamily={Tokens.typography.families.semiBold}
                  fontSize={Tokens.typography.sizes.subButton}
                  buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
                  onPress={() => {
                    /* Implement Apple Sign Up here */
                  }}
                />
              </View>

              <View style={styles.footerView}>
                <Text style={styles.footerText}>
                  Already have an account?{' '}
                  <TouchableOpacity
                    onPress={openLoginDisplay}
                    style={styles.loginText}
                  >
                    <Text style={styles.loginLink}>Log In</Text>
                  </TouchableOpacity>
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
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#FFFFFF',
  },
  strongValueText: {
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
  requirementView: {
    width: '100%',
    gap: Tokens.gaps.medium,
    marginTop: Tokens.gaps.small,
  },
  requirementText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.small,
    lineHeight: Tokens.typography.lineHeights.small,
    color: '#E5E5E5',
  },
  indicationView: {
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
  infoBarView: {
    width: '100%',
    minHeight: Tokens.components.infoMinHeight,
    borderRadius: Tokens.components.radiusInput,
    overflow: 'hidden',
  },
  infoBarInnerView: {
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
  inputView: {
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
  continueButtonView: {
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
    fontSize: Tokens.typography.sizes.subButton,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  socialsView: {
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
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    flexDirection: 'row',
  },
  loginText: {
    marginTop: 7,
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
});
