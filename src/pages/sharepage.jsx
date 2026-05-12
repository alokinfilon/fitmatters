import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Check, Link2, X } from 'lucide-react-native';

const ShareInvitePage = ({ navigation }) => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Share your Invite</Text>
        <Text style={styles.subHeading}>Earn rewards When your friend joins using your code.</Text>

        <TouchableOpacity style={styles.box1} onPress={() => setActiveModal('email')}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Invite via Email</Text>
          </View>
          <Text style={styles.subHeading1}>Opens email invite modal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box1} onPress={() => setActiveModal('link')}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Share Link</Text>
          </View>
          <Text style={styles.subHeading1}>Copies referral link + opens share sheet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box1} onPress={() => setActiveModal('success')}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Invite via WhatsApp / SMS</Text>
          </View>
          <Text style={styles.subHeading1}>Send your invite through messages</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={activeModal !== null}
        onRequestClose={() => setActiveModal(null)}>
        <View style={styles.modalOverlay}>
          {activeModal === 'email' && (
            <View style={[styles.modalCard, styles.emailCard]}>
              <TouchableOpacity style={styles.closeIcon} onPress={() => setActiveModal(null)}>
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
              />
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Personal Message"
                placeholderTextColor="#ffffff"
                multiline={true}
              />

              <Text style={styles.inviteCopy}>
                Hey! I've been using Out.Fit.Find to get curated outfit looks that match my vibe.
                Use my code OFFERIEND50 and get Rs 50 off your first month!
              </Text>

              <TouchableOpacity style={styles.primaryButton} onPress={() => setActiveModal('success')}>
                <Text style={styles.primaryButtonText}>Send Invite</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeModal === 'success' && (
            <View style={[styles.modalCard, styles.statusCard]}>
              <TouchableOpacity style={styles.closeIcon} onPress={() => setActiveModal(null)}>
                <X color="#ffffff" size={22} />
              </TouchableOpacity>

              <View style={styles.centerIcon}>
                <Check color="#ffffff" size={82} />
              </View>

              <Text style={styles.successText}>
                Invite sent successfully! You'll earn Rs 50 once your friend subscribes.
              </Text>

              <TouchableOpacity style={styles.primaryButton} onPress={() => setActiveModal(null)}>
                <Text style={styles.primaryButtonText}>My Referrals</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeModal === 'link' && (
            <View style={[styles.modalCard, styles.statusCard]}>
              <TouchableOpacity style={styles.closeIcon} onPress={() => setActiveModal(null)}>
                <X color="#ffffff" size={22} />
              </TouchableOpacity>

              <View style={styles.centerIcon}>
                <Link2 color="#ffffff" size={82} />
              </View>

              <Text style={styles.modalTitle}>Share via Link</Text>
              <Text style={styles.linkText}>https://outfitfind.in/invite/OFFFRIEND50</Text>

              <TouchableOpacity style={styles.primaryButton} onPress={() => setActiveModal(null)}>
                <Text style={styles.primaryButtonText}>Copy</Text>
              </TouchableOpacity>
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
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 40,
    fontWeight: '900',
  },
  subHeading1: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: '900',
    marginLeft: 25,
  },
  box: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#2d2c2c',
  },
  box1: {
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#2d2c2c',
    marginTop: 10,
  },
  boxText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 15,
    fontWeight: '900',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    padding: 22,
  },
  emailCard: {
    minHeight: 455,
  },
  statusCard: {
    minHeight: 272,
    justifyContent: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 14,
    right: 12,
    zIndex: 1,
    padding: 4,
  },
  centerIcon: {
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 22,
  },
  input: {
    height: 56,
    borderRadius: 10,
    borderColor: '#3c3c3f',
    borderWidth: 1,
    backgroundColor: '#28292b',
    color: '#ffffff',
    paddingHorizontal: 18,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },
  messageInput: {
    height: 86,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  inviteCopy: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 20,
  },
  primaryButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#ff7d63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
  successText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 26,
    marginBottom: 28,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 28,
  },


  
})
export default ShareInvitePage;
