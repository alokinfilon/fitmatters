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
import { 
  ArrowLeft,
  Mail,
  Link2,
  MessageCircle,
  X,
  Check,
  Home as HomeIcon, 
  Search, 
  Image as CommunityIcon, 
  ShoppingBag, 
  MoreHorizontal
} from 'lucide-react-native';
import { Tokens } from '../theme/theme'; 

const { width } = Dimensions.get('window');
const REFERRAL_LINK = "https://outfitfind.in/invite/OFFFRIEND50";

export default function ShareYourInvite({ navigation }) {
 
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [linkModalVisible, setLinkModalVisible] = useState(false);

  // Form input field state managers
  const [friendName, setFriendName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
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
    // Mimic API delay before triggering the custom checklist checkmark success state
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
        <SafeAreaView style={styles.mainContainer} edges={['top', 'left', 'right']}>
          
          {/* Back Layout Navigation Row */}
          <View style={styles.backHeaderRow}>
            <TouchableOpacity style={styles.backButtonTouchTarget} onPress={handleGoBack} activeOpacity={0.7}>
              <ArrowLeft size={Tokens.scaleAsset(20)} color="#E5E5E5" />
              <Text style={styles.backButtonTextLabel}>Back</Text>
        </TouchableOpacity>
      </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
            
            {/* Title Block Header Section */}
            <View style={styles.headerMetaBlockFrame}>
              <Text style={styles.screenTitleHeadingText}>Share your invite</Text>
              <Text style={styles.screenSubtitleLabelDescription}>Earn rewards when your friend joins using your code.</Text>
            </View>

            {/* Sharing Methods List Array Stack */}
            <View style={styles.sharingMethodsOuterStackPanel}>

              {/* Option 1: Invite via Email Button Container */}
        <TouchableOpacity
                activeOpacity={0.85} 
                onPress={() => setEmailModalVisible(true)}
                style={styles.sharingMethodClickTarget}
              >
                <View style={styles.sharingMethodInnerContentLayoutRow}>
                  <Mail size={Tokens.scaleAsset(20)} color="#E5E5E5" style={styles.methodIconRightSpacing} />
                  <View style={styles.sharingMethodTextColumnLabelsGroup}>
                    <Text style={styles.methodTitleHeadingText}>Invite via Email</Text>
                    <Text style={styles.methodSubtitleDescriptionText}>Opens email input modal</Text>
                  </View>
                </View>
        </TouchableOpacity>

              {/* Option 2: Share Link Button Container */}
        <TouchableOpacity
                activeOpacity={0.85} 
                onPress={() => setLinkModalVisible(true)}
                style={styles.sharingMethodClickTarget}
              >
                <View style={styles.sharingMethodInnerContentLayoutRow}>
                  <Link2 size={Tokens.scaleAsset(20)} color="#E5E5E5" style={styles.methodIconRightSpacing} />
                  <View style={styles.sharingMethodTextColumnLabelsGroup}>
                    <Text style={styles.methodTitleHeadingText}>Share Link</Text>
                    <Text style={styles.methodSubtitleDescriptionText}>Copies referral link + opens share sheet (WhatsApp, Messages, etc.)</Text>
                  </View>
                </View>
        </TouchableOpacity>

              {/* Option 3: Invite via WhatsApp / SMS */}
              <TouchableOpacity activeOpacity={0.85} style={styles.sharingMethodClickTarget}
              
                onPress={() => setSuccessModalVisible(true)}
              
              >
                <View style={styles.sharingMethodInnerContentLayoutRow}>
                  <MessageCircle size={Tokens.scaleAsset(20)} color="#E5E5E5" style={styles.methodIconRightSpacing} />
                  <View style={styles.sharingMethodTextColumnLabelsGroup}>
                    <Text style={styles.methodTitleHeadingText}>Invite via WhatsApp / SMS</Text>
                  </View>
                </View>
        </TouchableOpacity>

      </View>

          </ScrollView>
        </SafeAreaView>

        {/* ========================================================================
            MODAL OVERLAY SHEET 1: SEND INVITE VIA EMAIL (WITH AMBIENT GLOW)
            ======================================================================== */}
      <Modal
        animationType="fade"
        transparent={true}
          visible={emailModalVisible}
          onRequestClose={() => setEmailModalVisible(false)}
      >
          
          <View style={styles.modalOverlayScrimBackdropBlurContainer}>
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
                      end={{ x: 1, y: 0 }}
                      style={[styles.modalCardWindowContainerBodyFrame, { height: 312, justifyContent: 'center' }]}
              ></LinearGradient>
              <View style={styles.modalCardWindowContainerBodyFrame}>
              <TouchableOpacity
                  style={styles.modalCloseButtonAnchorTarget}
                  onPress={() => setEmailModalVisible(false)}
                  activeOpacity={0.7}
              >
                  <X size={Tokens.scaleAsset(20)} color="#FFFFFF" />
              </TouchableOpacity>

                <Text style={styles.modalHeadingTitleText}>Send Invite via Email</Text>

                <View style={styles.modalInputFieldsFormStackWrapper}>
                  <View >
                    <LinearGradient  
                     colors={['#333637', '#242426']}
                  start={{ x: 0.1, y: 0.5 }}
                  end={{ x: 0.9, y: 0.6 }}
                   style={styles.inputFieldGradientOutlineWrapperBox}>
              <TextInput
                      style={styles.inputFieldNativeComponentElement}
                      placeholder="Friend’s Name (optional)"
                      placeholderTextColor="#818181"
                      value={friendName}
                      onChangeText={setFriendName}
                    />
                    </LinearGradient>
                  </View>

                  <View >
                    <LinearGradient  
                     colors={['#333637', '#242426']}
                  start={{ x: 0.1, y: 0.5 }}
                  end={{ x: 0.9, y: 0.6 }}
                   style={styles.inputFieldGradientOutlineWrapperBox}>
              <TextInput
                      style={styles.inputFieldNativeComponentElement}
                placeholder="Email Address (required)"
                      placeholderTextColor="#818181"
                keyboardType="email-address"
                autoCapitalize="none"
                      value={emailAddress}
                      onChangeText={setEmailAddress}
                    />
                    </LinearGradient>
                  </View>

                  <View >
                    <LinearGradient  
                     colors={['#333637', '#242426']}
                  start={{ x: 0.1, y: 0.5 }}
                  end={{ x: 0.9, y: 0.6 }}
                   style={[styles.inputFieldGradientOutlineWrapperBox, { height: 96, paddingVertical: 12 }]}>
              <TextInput
                      style={[styles.inputFieldNativeComponentElement, { textAlignVertical: 'top', height: '100%' }]}
                placeholder="Personal Message"
                      placeholderTextColor="#818181"
                multiline={true}
                      value={personalMessage}
                      onChangeText={setPersonalMessage}
                    />
                    </LinearGradient>
                  </View>

                  <Text style={styles.modalDynamicReferralContextParagraphText}>
                    Hey! I’ve been using Out.Fit.Find to get curated outfit looks that match my vibe. Use my code <Text style={styles.  referralCodeHighlightInlineText}>OFFFRIEND50</Text> and get ₹50 off your first month! 💃🔥
              </Text>

                  <TouchableOpacity activeOpacity={0.85} onPress={handleSendInvite}>
                    <LinearGradient
                      colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                      start={{ x: 0.2, y: 0 }}
                      end={{ x: 0.9, y: 0 }}
                      style={styles.modalCtaActionButtonGradientFillInnerBox}
                    >
                      <Text style={styles.modalCtaActionButtonStringLabelLabel}>Send Invite</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                </View>
              </View>
            </Shadow>
          </View>
        </Modal>

        {/* ========================================================================
            MODAL OVERLAY SHEET 2: INVITE SENT SUCCESS STATE CONFIRMATION
            ======================================================================== */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={successModalVisible}
          onRequestClose={() => setSuccessModalVisible(false)}
        >
          <View style={styles.modalOverlayScrimBackdropBlurContainer}>
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
                end={{ x: 1, y: 0 }}
                      style={[styles.modalCardWindowContainerBodyFrame, { height: 312, justifyContent: 'center' }]}
              >
              <View >
              <TouchableOpacity
                  style={styles.modalCloseButtonAnchorTarget}
                  onPress={() => setSuccessModalVisible(false)}
                  activeOpacity={0.7}
              >
                  <X size={Tokens.scaleAsset(20)} color="#FFFFFF" />
              </TouchableOpacity>

                <View style={styles.successIconLayoutCenterGroup}>
                  <View style={styles.successCheckmarkGreenCircleVectorHolder}>
                    <Check size={Tokens.scaleAsset(80)} color="#FFFFFF" strokeWidth={2} />
              </View>

                  <Text style={styles.successStateCentralDescriptionText}>
                    Invite sent successfully! You’ll earn ₹50 once your friend subscribes.
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
                      style={styles.modalCtaActionButtonGradientFillInnerBox}
              >
                      <Text style={styles.modalCtaActionButtonStringLabelLabel}>My Referrals</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
              </LinearGradient>
            </Shadow>
            </View>
        </Modal>

        {/* ========================================================================
            MODAL OVERLAY SHEET 3: SHARE VIA LINK EXTRACTOR COMPONENT
            ======================================================================== */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={linkModalVisible}
          onRequestClose={() => setLinkModalVisible(false)}
        >
          <View style={styles.modalOverlayScrimBackdropBlurContainer}>
            <Shadow
              distance={1}
              startColor="#FDABAC"
              endColor="#FDEABF"
              offset={[0, 0]}
              containerStyle={styles.shadowModalFluidContainer}
              style={styles.shadowModalFluidStyle}
            >
              <View style={[styles.modalCardWindowContainerBodyFrame, { height: 340, justifyContent: 'center' }]}>
              <TouchableOpacity
                  style={styles.modalCloseButtonAnchorTarget}
                  onPress={() => setLinkModalVisible(false)}
                  activeOpacity={0.7}
              >
                  <X size={Tokens.scaleAsset(20)} color="#FFFFFF" />
              </TouchableOpacity>

                <View style={styles.successIconLayoutCenterGroup}>
                  <Link2 size={Tokens.scaleAsset(64)} color="#FFFFFF" strokeWidth={1.5} />

                  <Text style={styles.shareViaLinkHeadingTitleText}>Share via Link</Text>
                  <Text style={styles.referralLinkDisplayStringFieldText}>{REFERRAL_LINK}</Text>

                  <TouchableOpacity 
                    activeOpacity={0.85} 
                    style={{ width: '100%' }}
                    onPress={handleCopyLink}
                  >
              <LinearGradient
                      colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                      style={styles.modalCtaActionButtonGradientFillInnerBox}
              >
                      <Text style={styles.modalCtaActionButtonStringLabelLabel}>
                        {isCopied ? "Copied! ✓" : "Copy"}
                      </Text>
              </LinearGradient>
                  </TouchableOpacity>
            </View>
              </View>
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
    paddingBottom: 140, 
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
  backButtonTextLabel: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: '#E5E5E5',
  },
  headerMetaBlockFrame: {
    width: '100%',
    gap: Tokens.gaps.small,
    marginBottom: Tokens.gaps.xlarge,
  },
  screenTitleHeadingText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.title,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  screenSubtitleLabelDescription: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#E5E5E5',
  },
  sharingMethodsOuterStackPanel: {
    width: '100%',
    gap: Tokens.gaps.large,
  },
  sharingMethodClickTarget: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#1E1E20', // Matches exact landing state cell properties from dashboard
    justifyContent: 'center',
  },
  sharingMethodInnerContentLayoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  methodIconRightSpacing: {
    marginRight: 16,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  sharingMethodTextColumnLabelsGroup: {
    flex: 1,
    gap: 6,
  },
  methodTitleHeadingText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  methodSubtitleDescriptionText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#B3B3B3',
  },

 
  modalOverlayScrimBackdropBlurContainer: {
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
  modalCardWindowContainerBodyFrame: {
    width: '100%',
    backgroundColor: '#1E1E20', 
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#323537',
  },
  modalCloseButtonAnchorTarget: {
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
  modalInputFieldsFormStackWrapper: {
    width: '100%',
    gap: Tokens.gaps.large,
  },
  inputFieldGradientOutlineWrapperBox: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#323537',
    backgroundColor: '#131315',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputFieldNativeComponentElement: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    color: '#FFFFFF',
    padding: 0,
    width: '100%',
  },
  modalDynamicReferralContextParagraphText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    lineHeight: 24,
    color: '#E5E5E5',
    marginVertical: 4,
  },
  referralCodeHighlightInlineText: {
    fontFamily: Tokens.typography.families.regular,
     color: '#E5E5E5',
  },
  modalCtaActionButtonGradientFillInnerBox: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  modalCtaActionButtonStringLabelLabel: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Success Confirmation State Configurations
  successIconLayoutCenterGroup: {
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

  // Share Via Link Specifications
  shareViaLinkHeadingTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#FFFFFF', 
    marginTop: -4,
  },
  referralLinkDisplayStringFieldText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    color: '#B3B3B3',
    backgroundColor: '#131315',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#323537',
    width: '100%',
    textAlign: 'center',
  },

});