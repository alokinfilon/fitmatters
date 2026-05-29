import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { Check, Link2, X } from 'lucide-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const ShareInvitePage = ({ navigation }) => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Share your Invite</Text>
        <Text style={styles.subHeading}>
          Earn rewards When your friend joins using your code.
        </Text>

        {/* Option 1: Email */}
        <TouchableOpacity
          style={styles.box1}
          onPress={() => setActiveModal('email')}
          activeOpacity={0.75}
        >
          <Text style={styles.boxText}>Invite via Email</Text>
          <Text style={styles.subHeading1}>Opens email invite modal</Text>
        </TouchableOpacity>

        {/* Option 2: Link Share */}
        <TouchableOpacity
          style={styles.box1}
          onPress={() => setActiveModal('link')}
          activeOpacity={0.75}
        >
          <Text style={styles.boxText}>Share Link</Text>
          <Text style={styles.subHeading1}>
            Copies referral link + opens share sheet
          </Text>
        </TouchableOpacity>

        {/* Option 3: WhatsApp / SMS */}
        <TouchableOpacity
          style={styles.box1}
          onPress={() => setActiveModal('success')}
          activeOpacity={0.75}
        >
          <Text style={styles.boxText}>Invite via WhatsApp / SMS</Text>
          <Text style={styles.subHeading1}>
            Send your invite through messages
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={activeModal !== null}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          {activeModal === 'email' && (
            <View style={[styles.modalCard, styles.emailCard]}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setActiveModal(null)}
              >
                <X color="#ffffff" size={22} />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Send Invite via Email</Text>

              <TextInput
                style={styles.input}
                placeholder="Friend's Name (optional)"
                placeholderTextColor="#ffffff"
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address (required)"
                placeholderTextColor="#ffffff"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Personal Message"
                placeholderTextColor="#ffffff"
                multiline={true}
              />

              <Text style={styles.inviteCopy}>
                Hey! I've been using Out.Fit.Find to get curated outfit looks
                that match my vibe. Use my code OFFERIEND50 and get Rs 50 off
                your first month!
              </Text>

              <LinearGradient
                colors={['#f0a374', '#e77a37', '#f0a374']}
                style={styles.primaryButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Send Invite</Text>
              </LinearGradient>
            </View>
          )}

          {activeModal === 'success' && (
            <View style={[styles.modalCard, styles.statusCard]}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setActiveModal(null)}
              >
                <X color="#ffffff" size={22} />
              </TouchableOpacity>

              <View style={styles.centerIcon}>
                <Check color="#ffffff" size={64} />
              </View>

              <Text style={styles.successText}>
                Invite sent successfully! You'll earn Rs 50 once your friend
                subscribes.
              </Text>

              <LinearGradient
                colors={['#f0a374', '#e77a37', '#f0a374']}
                style={styles.primaryButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>My Referrals</Text>
              </LinearGradient>
            </View>
          )}

          {activeModal === 'link' && (
            <View style={[styles.modalCard, styles.statusCard]}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setActiveModal(null)}
              >
                <X color="#ffffff" size={22} />
              </TouchableOpacity>

              <View style={styles.centerIcon}>
                <Link2 color="#ffffff" size={64} />
              </View>

              <Text style={styles.modalTitle}>Share via Link</Text>
              <Text style={styles.linkText}>
                https://outfitfind.in/invite/OFFFRIEND50
              </Text>

              <LinearGradient
                colors={['#f0a374', '#e77a37', '#f0a374']}
                style={styles.primaryButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Copy</Text>
              </LinearGradient>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    height: hp('7%'),
    justifyContent: 'center',
    paddingHorizontal: wp('4%'),
  },
  backButton: {
    padding: wp('2%'),
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  content: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  heading: {
    fontSize: wp('7%'),
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: hp('1%'),
  },
  subHeading: {
    fontSize: wp('3.8%'),
    color: '#ffffff',
    marginBottom: hp('4%'),
    fontWeight: '900',
  },
  subHeading1: {
    fontSize: wp('3.8%'),
    color: '#ffffff',
    fontWeight: '500',
    marginTop: hp('0.5%'),
  },
  box1: {
    borderRadius: 12,
    padding: wp('6%'),
    backgroundColor: '#292929',
    marginTop: hp('1.5%'),
    width: '100%',
  },
  boxText: {
    fontSize: wp('5%'),
    color: '#ffffff',
    fontWeight: '900',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#242426',
    borderColor: '#ff9e98',
    borderRightColor: '#f5d68f',
    borderBottomColor: '#f5d68f',
    borderWidth: 1,
    borderRadius: 18,
    padding: wp('5%'),
  },
  emailCard: {
    minHeight: hp('52%'),
  },
  statusCard: {
    minHeight: hp('32%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: hp('1.8%'),
    right: wp('4%'),
    zIndex: 1,
    padding: wp('1%'),
  },
  centerIcon: {
    alignItems: 'center',
    width: '100%',
    marginBottom: hp('2%'),
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: wp('5%'),
    fontWeight: '900',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  input: {
    height: hp('6%'),
    borderRadius: 10,
    borderColor: '#3c3c3f',
    borderWidth: 1,
    backgroundColor: '#28292b',
    color: '#ffffff',
    paddingHorizontal: wp('4%'),
    fontSize: wp('3.8%'),
    fontWeight: '900',
    marginBottom: hp('1.5%'),
  },
  messageInput: {
    height: hp('10%'),
    paddingTop: hp('1.5%'),
    textAlignVertical: 'top',
  },
  inviteCopy: {
    color: '#ffffff',
    fontSize: wp('3.8%'),
    lineHeight: wp('5%'),
    fontWeight: '800',
    marginTop: hp('0.5%'),
    marginBottom: hp('2.5%'),
  },
  primaryButton: {
    height: hp('6%'),
    borderRadius: 8,
    backgroundColor: '#ff7d63',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: hp('1%'),
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: wp('3.8%'),
    fontWeight: '900',
  },
  successText: {
    color: '#ffffff',
    fontSize: wp('3.8%'),
    lineHeight: wp('5.2%'),
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  linkText: {
    color: '#ffffff',
    fontSize: wp('3.8%'),
    lineHeight: wp('5%'),
    marginBottom: hp('3%'),
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default ShareInvitePage;
