import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';

import { Check, Link2, X } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const ShareInvitePage = ({ navigation }) => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.heading}>Share your Invite</Text>

          <Text style={styles.subHeading}>
            Earn rewards when your friend joins using your code.
          </Text>

          {/* Email */}
          <TouchableOpacity
            style={styles.box1}
            onPress={() => setActiveModal('email')}
          >
            <View style={styles.box}>
              <Text style={styles.boxText}>Invite via Email</Text>
            </View>

            <Text style={styles.subHeading1}>
              Opens email invite modal
            </Text>
          </TouchableOpacity>

          {/* Link */}
          <TouchableOpacity
            style={styles.box1}
            onPress={() => setActiveModal('link')}
          >
            <View style={styles.box}>
              <Text style={styles.boxText}>Share Link</Text>
            </View>

            <Text style={styles.subHeading1}>
              Copies referral link + opens share sheet
            </Text>
          </TouchableOpacity>

          {/* WhatsApp */}
          <TouchableOpacity
            style={styles.box1}
            onPress={() => setActiveModal('success')}
          >
            <View style={styles.box}>
              <Text style={styles.boxText}>
                Invite via WhatsApp / SMS
              </Text>
            </View>

            <Text style={styles.subHeading1}>
              Send your invite through messages
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={activeModal !== null}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          {/* EMAIL MODAL */}
          {activeModal === 'email' && (
            <View style={[styles.modalCard, styles.emailCard]}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setActiveModal(null)}
              >
                <X color="#ffffff" size={22} />
              </TouchableOpacity>

              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.modalTitle}>
                  Send Invite via Email
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Friend's Name (optional)"
                  placeholderTextColor="#bbbbbb"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Email Address (required)"
                  placeholderTextColor="#bbbbbb"
                />

                <TextInput
                  style={[styles.input, styles.messageInput]}
                  placeholder="Personal Message"
                  placeholderTextColor="#bbbbbb"
                  multiline={true}
                />

                <Text style={styles.inviteCopy}>
                  Hey! I've been using Out.Fit.Find to get
                  curated outfit looks that match my vibe.
                  Use my code OFFERIEND50 and get Rs 50 off
                  your first month!
                </Text>

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() =>
                    setActiveModal('success')
                  }
                >
                  <Text style={styles.primaryButtonText}>
                    Send Invite
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* SUCCESS MODAL */}
          {activeModal === 'success' && (
            <View style={[styles.modalCard, styles.statusCard]}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setActiveModal(null)}
              >
                <X color="#ffffff" size={22} />
              </TouchableOpacity>

              <View style={styles.centerIcon}>
                <Check color="#ffffff" size={72} />
              </View>

              <Text style={styles.successText}>
                Invite sent successfully! You'll earn Rs 50
                once your friend subscribes.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setActiveModal(null)}
              >
                <Text style={styles.primaryButtonText}>
                  My Referrals
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* LINK MODAL */}
          {activeModal === 'link' && (
            <View style={[styles.modalCard, styles.statusCard]}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setActiveModal(null)}
              >
                <X color="#ffffff" size={22} />
              </TouchableOpacity>

              <View style={styles.centerIcon}>
                <Link2 color="#ffffff" size={72} />
              </View>

              <Text style={styles.modalTitle}>
                Share via Link
              </Text>

              <Text style={styles.linkText}>
                https://outfitfind.in/invite/OFFFRIEND50
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setActiveModal(null)}
              >
                <Text style={styles.primaryButtonText}>
                  Copy
                </Text>
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
    paddingHorizontal: 18,
    marginTop: 10,
  },

  backButton: {
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },

  backText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: width * 0.04,
  },

  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  heading: {
    fontSize: width * 0.07,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 10,
  },

  subHeading: {
    fontSize: width * 0.038,
    color: '#ffffff',
    marginBottom: 30,
    fontWeight: '600',
    lineHeight: 22,
  },

  box1: {
    borderRadius: 16,
    marginBottom: 14,
    backgroundColor: '#2d2c2c',
    overflow: 'hidden',
  },

  box: {
    padding: 16,
    backgroundColor: '#2d2c2c',
  },

  boxText: {
    fontSize: width * 0.042,
    color: '#ffffff',
    fontWeight: '900',
  },

  subHeading1: {
    fontSize: width * 0.035,
    color: '#d9d9d9',
    paddingHorizontal: 16,
    paddingBottom: 16,
    lineHeight: 20,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  modalCard: {
    width: '100%',
    maxWidth: 420,
    maxHeight: height * 0.85,
    backgroundColor: '#242426',
    borderColor: '#ff9e98',
    borderRightColor: '#f5d68f',
    borderBottomColor: '#f5d68f',
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
  },

  emailCard: {
    minHeight: 420,
  },

  statusCard: {
    minHeight: 260,
    justifyContent: 'center',
  },

  closeIcon: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
    padding: 4,
  },

  centerIcon: {
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    color: '#ffffff',
    fontSize: width * 0.05,
    fontWeight: '900',
    marginBottom: 22,
    textAlign: 'center',
  },

  input: {
    minHeight: 54,
    borderRadius: 12,
    borderColor: '#3c3c3f',
    borderWidth: 1,
    backgroundColor: '#28292b',
    color: '#ffffff',
    paddingHorizontal: 18,
    fontSize: width * 0.036,
    fontWeight: '700',
    marginBottom: 14,
  },

  messageInput: {
    height: 100,
    paddingTop: 16,
    textAlignVertical: 'top',
  },

  inviteCopy: {
    color: '#ffffff',
    fontSize: width * 0.035,
    lineHeight: 22,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 24,
  },

  primaryButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: '#ff7d63',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#ffffff',
    fontSize: width * 0.04,
    fontWeight: '900',
  },

  successText: {
    color: '#ffffff',
    fontSize: width * 0.038,
    lineHeight: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 28,
  },

  linkText: {
    color: '#ffffff',
    fontSize: width * 0.034,
    lineHeight: 22,
    marginBottom: 28,
    textAlign: 'center',
  },
});

export default ShareInvitePage;