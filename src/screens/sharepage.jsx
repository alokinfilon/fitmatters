import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
  Modal,
  Clipboard,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import ArrowLeftIcon from '../component/svg/arrow';
const feedbackIconSize = Tokens.scaleAsset(12);
import {
  Link2,
  X,
  Check,
  Home as HomeIcon,
  Image as CommunityIcon,
} from 'lucide-react-native';
import { Tokens } from '../theme/theme';

const { width } = Dimensions.get('window');
const REFERRAL_LINK = 'https://outfitfind.in/invite/OFFFRIEND50';

export default function ShareYourInvite({ navigation }) {
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [linkModalVisible, setLinkModalVisible] = useState(false);

  const [friendName, setFriendName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.replace('MainTabs');
    }
  };

  const handleCopyLink = () => {
    Clipboard.setString(REFERRAL_LINK);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      setLinkModalVisible(false);
    }, 1200);
  };

  const handleSendInvite = () => {
    setEmailModalVisible(false);
    setTimeout(() => {
      setSuccessModalVisible(true);
    }, 300);
  };

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#0F0F0F', '#0D0D0D']}
        start={{ x: 0.44, y: 0 }}
        end={{ x: 0.54, y: 0.98 }}
        style={styles.screenContainer}
      >
        <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
        <SafeAreaView
          style={styles.mainContainer}
          edges={['top', 'left', 'right']}
        >
          <View style={styles.backHeaderRow}>
            <TouchableOpacity
              style={styles.backButtonTouchTarget}
              onPress={handleGoBack}
              activeOpacity={0.7}
            >
              <ArrowLeftIcon
                size={Tokens.scaleAsset(24)}
                color="#E5E5E5"
                strokeWidth={1.5}
              />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={styles.headerBlock}>
              <Text style={styles.headingText}>
                Share your invite
              </Text>
              <Text style={styles.descriptionText}>
                Earn rewards when your friend joins using your code.
              </Text>
            </View>

            <View style={styles.sharingOuterView}>
              <LinearGradient
                colors={['#262627', '#242426', '#1B1C1D']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.sharingClickView}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setEmailModalVisible(true)}
                >
                  <View style={styles.sharingInnerView}>
                    <View style={styles.sharingTextGroup}>
                      <Text style={styles.methodHeadingText}>
                        📩 Invite via Email
                      </Text>
                      <Text style={styles.methodDescriptionText}>
                        Opens email input modal
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>


              <LinearGradient
                colors={['#262627', '#242426', '#1B1C1D']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.sharingClickView}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setLinkModalVisible(true)}
                >
                  <View style={styles.sharingInnerView}>
                    <View style={styles.sharingTextGroup}>
                      <Text style={styles.methodHeadingText}>
                        🔗 Share Link
                      </Text>
                      <Text style={styles.methodDescriptionText}>
                        Copies referral link + opens share sheet (WhatsApp,
                        Messages, etc.)
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>

              <LinearGradient
                colors={['#262627', '#242426', '#1B1C1D']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.sharingClickView}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setSuccessModalVisible(true)}
                >
                  <View style={styles.sharingInnerView}>
                    <View style={styles.sharingTextGroup}>
                      <Text style={styles.methodHeadingText}>
                        💬 Invite via WhatsApp / SMS
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </SafeAreaView>

        
        <Modal
          animationType="fade"
          transparent={true}
          visible={emailModalVisible}
          onRequestClose={() => setEmailModalVisible(false)}
        >
          <View style={styles.modalOverlayBlurContainer}>
            <Shadow
              distance={1}
              startColor="#FDABAC"
              endColor="#FDEABF"
              offset={[0, 0]}
              containerStyle={styles.shadowModalFluidContainer}
              style={styles.shadowModalFluidStyle}
            >
              <LinearGradient
                colors={['#262627', '#242426', '#1B1C1D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.98 }}
                style={styles.modalCardBodyView}
              >
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setEmailModalVisible(false)}
                  activeOpacity={0.7}
                >
                  <X size={Tokens.scaleAsset(20)} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.modalHeadingTitleText}>
                  Send Invite via Email
                </Text>

                <View style={styles.modalInputFieldsView}>
                  <View>
                    <LinearGradient
                      colors={['#333637', '#242426']}
                      start={{ x: 0.1, y: 0.5 }}
                      end={{ x: 0.9, y: 0.6 }}
                      style={styles.inputFieldGradientView}
                    >
                      <TextInput
                        style={styles.inputFieldComponentView}
                        placeholder="Friend’s Name (optional)"
                        placeholderTextColor="#818181"
                        value={friendName}
                        onChangeText={setFriendName}
                      />
                    </LinearGradient>
                  </View>

                  <View>
                    <LinearGradient
                      colors={['#333637', '#242426']}
                      start={{ x: 0.1, y: 0.5 }}
                      end={{ x: 0.9, y: 0.6 }}
                      style={styles.inputFieldGradientView}
                    >
                      <TextInput
                        style={styles.inputFieldComponentView}
                        placeholder="Email Address (required)"
                        placeholderTextColor="#818181"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={emailAddress}
                        onChangeText={setEmailAddress}
                      />
                    </LinearGradient>
                  </View>

                  <View>
                    <LinearGradient
                      colors={['#333637', '#242426']}
                      start={{ x: 0.1, y: 0.5 }}
                      end={{ x: 0.9, y: 0.6 }}
                      style={[
                        styles.inputFieldGradientView,
                        { height: 96, paddingVertical: 12 },
                      ]}
                    >
                      <TextInput
                        style={[
                          styles.inputFieldComponentView,
                          { textAlignVertical: 'top', height: '100%' },
                        ]}
                        placeholder="Personal Message"
                        placeholderTextColor="#818181"
                        multiline={true}
                        value={personalMessage}
                        onChangeText={setPersonalMessage}
                      />
                    </LinearGradient>
                  </View>

                  <Text style={styles.modalReferralText}>
                    Hey! I’ve been using Out.Fit.Find to get curated outfit
                    looks that match my vibe. Use my code{' '}
                    <Text style={styles.referralCodeText}>
                      OFFFRIEND50
                    </Text>{' '}
                    and get ₹50 off your first month! 💃🔥
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleSendInvite}
                  >
                    <LinearGradient
                      colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                      start={{ x: 0.2, y: 0 }}
                      end={{ x: 0.9, y: 0 }}
                      style={styles.modalButtonGradient}
                    >
                      <Text style={styles.modalButtonText}>
                        Send Invite
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Shadow>
          </View>
        </Modal>

        
        <Modal
          animationType="fade"
          transparent={true}
          visible={successModalVisible}
          onRequestClose={() => setSuccessModalVisible(false)}
        >
          <View style={styles.modalOverlayBlurContainer}>
            <Shadow
              distance={1}
              startColor="#FDABAC"
              endColor="#FDEABF"
              offset={[0, 0]}
              containerStyle={styles.shadowModalFluidContainer}
              style={styles.shadowModalFluidStyle}
            >
              <LinearGradient
                colors={['#262627', '#242426', '#1B1C1D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.98 }}
                style={[
                  styles.modalCardBodyView,
                  { height: 312, justifyContent: 'center' },
                ]}
              >
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setSuccessModalVisible(false)}
                  activeOpacity={0.7}
                >
                  <X size={Tokens.scaleAsset(26)} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.successIconView}>
                  <View style={styles.successCheckmarkGreenCircleVectorHolder}>
                    <Check
                      size={Tokens.scaleAsset(80)}
                      color="#FFFFFF"
                      strokeWidth={2}
                    />
                  </View>

                  <Text style={styles.successStateCentralDescriptionText}>
                    Invite sent successfully! You’ll earn ₹50 once your friend
                    subscribes.
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={{ width: '100%' }}
                    onPress={() => setSuccessModalVisible(false)}
                  >
                    <LinearGradient
                      colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                      start={{ x: 0, y: 2 }}
                      end={{ x: 0.9, y: 1 }}
                      style={styles.modalButtonGradient}
                    >
                      <Text style={styles.modalButtonText}>
                        My Referrals
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Shadow>
          </View>
        </Modal>

        
        <Modal
          animationType="fade"
          transparent={true}
          visible={linkModalVisible}
          onRequestClose={() => setLinkModalVisible(false)}
        >
          <View style={styles.modalOverlayBlurContainer}>
            <Shadow
              distance={1}
              startColor="#FDABAC"
              endColor="#FDEABF"
              offset={[0, 0]}
              containerStyle={styles.shadowModalFluidContainer}
              style={styles.shadowModalFluidStyle}
            >
              <LinearGradient
                colors={['#262627', '#242426', '#1B1C1D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.98 }}
                style={[
                  styles.modalCardBodyView,
                  { height: 340, justifyContent: 'center' },
                ]}
              >
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setLinkModalVisible(false)}
                  activeOpacity={0.7}
                >
                  <X size={Tokens.scaleAsset(20)} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.successIconView}>
                  <Link2
                    size={Tokens.scaleAsset(80)}
                    color="#FFFFFF"
                    strokeWidth={1.5}
                  />
                  <View style={styles.textCenter}>
                    <Text style={styles.shareViaText}>
                      Share via Link
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={styles.referralLinkText}
                  >
                    {REFERRAL_LINK}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={{ width: '100%' }}
                    onPress={handleCopyLink}
                  >
                    <LinearGradient
                      colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.modalButtonGradient}
                    >
                      <Text style={styles.modalButtonText}>
                        {isCopied ? 'Copied! ✓' : 'Copy'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </Shadow>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContentContainer: {
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    paddingTop: Tokens.gaps.medium,
    //paddingBottom: 140,
  },
  backHeaderRow: {
    width: '100%',
    height: 40,
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Tokens.gaps.small,
  },
  backButtonTouchTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    height: '100%',
  },
  backButtonText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: '#E5E5E5',
  },
  headerBlock: {
    width: '100%',
    gap: Tokens.gaps.small,
    marginBottom: Tokens.gaps.xlarge,
  },
  headingText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.title,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  descriptionText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#E5E5E5',
  },
  sharingOuterView: {
    width: '100%',
    gap: Tokens.gaps.large,
  },
  sharingClickView: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#1E1E20', 
    justifyContent: 'center',
  },
  sharingInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  methodIconRightSpacing: {
    marginRight: 16,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  sharingTextGroup: {
    flex: 1,
    gap: 6,
  },
  methodHeadingText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  methodDescriptionText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#B3B3B3',
  },

  modalOverlayBlurContainer: {
    flex: 1,
    backgroundColor: 'rgba(18, 18, 19, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  shadowModalFluidContainer: {
    width: '100%',
    maxWidth: 364,
  },
  shadowModalFluidStyle: {
    width: '100%',
    borderRadius: 20,
  },
  modalCardBodyView: {
    width: '100%',
    backgroundColor: '#1E1E20',
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#323537',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalHeadingTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 18,
    lineHeight: 28,
    color: '#FFFFFF',
    marginBottom: Tokens.gaps.xlarge,
  },
  modalInputFieldsView: {
    width: '100%',
    gap: Tokens.gaps.large,
  },
  inputFieldGradientView: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#323537',
    backgroundColor: '#131315',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputFieldComponentView: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    color: '#FFFFFF',
    padding: 0,
    width: '100%',
  },
  modalReferralText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    lineHeight: 24,
    color: '#E5E5E5',
    marginVertical: 4,
  },
  referralCodeText: {
    fontFamily: Tokens.typography.families.regular,
    color: '#E5E5E5',
  },
  modalButtonGradient: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  modalButtonText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
successIconView: {
    width: '100%',
    alignItems: 'center',
    gap: Tokens.gaps.xlarge,
    paddingVertical: 8,
  },

  successStateCentralDescriptionText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    //paddingHorizontal: 12,
  },

  
  shareViaText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: -4,
    textAlign: 'left',
  },
  referralLinkText: {
    fontFamily: Tokens.typography.families.light,
    fontSize: 12,
    color: '#B3B3B3',

    width: '100%',
  },
  textCenter: {
    alignItems: 'flex-start',
  },
});
