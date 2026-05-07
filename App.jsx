import React,  { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView,  Modal } from 'react-native';

const ShareInvitePage = ({ navigation }) => {
  const [activeModal, setActiveModal] = useState(null);
  const ProductModal = ({ Visible, onClose }) => {
  return (
    
        <Modal
        animationType="fade"
        transparent={true}
        visible={activeModal}
        onRequestClose={() => setModalVisible(false)}
      >
        
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
             <Text style={styles.heading}>Send Invite via Email</Text>
           <TouchableOpacity style={styles.box1}
        onPress={() => setModalVisible(true)}
        >
          
          <View style={styles.box2}>
          <Text style={styles.boxText1}>Friend's Name (optional)</Text>
          </View>
        
        </TouchableOpacity>


        <TouchableOpacity style={styles.box1} >
          
          <View style={styles.box2}>
          <Text style={styles.boxText1}>Email Address (required)</Text>
          </View>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.box3}>
          
          <View >
          <Text style={styles.boxText1}>Personal Message</Text>
          </View>
           <TouchableOpacity style={styles.box1} >
          
          
          
        </TouchableOpacity>

        </TouchableOpacity>

        <Text style = {styles.subHeading}>Hey! I've been using Out.Fit.Find to get curated outfit looks that match my vibe. Use my code OFFERIEND50 and get 50 off your first month!</Text>
            
          
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View></View>
      </Modal>

  );
};
  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
         
        </TouchableOpacity>
      </View>

     
      <View style={styles.content}>
        <Text style={styles.heading}>Share your Invite</Text>
        <Text style={styles.subHeading}>Earn rewards When your friend joins using your code.</Text>

       
        <TouchableOpacity style={styles.box1}
        onPress={() => setActiveModal('product')}
        >
          
          <View style={styles.box}>
          <Text style={styles.boxText}>Invite via Email</Text>
          </View>
           <Text style={styles.subHeading1}>Opens emails input modal</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.box1} 
        onPress={() => setActiveModal('bookmark')}
        >
          
          <View style={styles.box}>
          <Text style={styles.boxText}>Share Link</Text>
          </View>
           <Text style={styles.subHeading1}>Copies referral link + opens share sheet (WhatsApp, Messages, etc.)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box1} 
        onPress={() => setActiveModal('notification')}
        >
          
          <View style={styles.box}>
          <Text style={styles.boxText}>Invite via WhatsApp / SMS</Text>
          </View>
           <TouchableOpacity style={styles.box1} >
          
          
          
        </TouchableOpacity>

        </TouchableOpacity>

        <Modal
        animationType="fade"
        transparent={true}
        visible={activeModal}
        onRequestClose={() => setModalVisible(false)}
      >
        
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
             <Text style={styles.heading}>Send Invite via Email</Text>
           <TouchableOpacity style={styles.box1}
        onPress={() => setModalVisible(true)}
        >
          
          <View style={styles.box2}>
          <Text style={styles.boxText1}>Friend's Name (optional)</Text>
          </View>
        
        </TouchableOpacity>


        <TouchableOpacity style={styles.box1} >
          
          <View style={styles.box2}>
          <Text style={styles.boxText1}>Email Address (required)</Text>
          </View>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.box3}>
          
          <View >
          <Text style={styles.boxText1}>Personal Message</Text>
          </View>
           <TouchableOpacity style={styles.box1} >
          
          
          
        </TouchableOpacity>

        </TouchableOpacity>

        <Text style = {styles.subHeading}>Hey! I've been using Out.Fit.Find to get curated outfit looks that match my vibe. Use my code OFFERIEND50 and get 50 off your first month!</Text>
            
          
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View></View>
      </Modal>

      </View>
      {/* Modal Logic */}
{activeModal === 'product' && (
  <ProductModal Visible={true} onClose={() => setActiveModal(null)} />
)}

{activeModal === 'bookmark' && (
  <BookmarkModal Visible={true} onClose={() => setActiveModal(null)} />
)}

{activeModal === 'notification' && (
  <NotificationModal Visible={true} onClose={() => setActiveModal(null)} />
)}

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
    marginLeft:25
  },
  box: {
    
    
    
  borderRadius: 12,
  padding:10,
    
    backgroundColor: '#2d2c2c',
  },
  box1: {
    borderRadius: 12,
    
    marginBottom: 8,
    backgroundColor: '#2d2c2c',
    marginTop:10
  },
  box2: {
    borderRadius: 12,
    
    justifyContent:"center",
    marginBottom: 8,
    backgroundColor: '#2d2c2c',
    marginTop:10,
    width:280,
    height:60,
    
  },
  box3: {
    borderRadius: 12,
    
    justifyContent:"center",
    marginBottom: 8,
    backgroundColor: '#2d2c2c',
    marginTop:10,
    width:280,
    height:80,
    
  },
  boxText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 15,
    fontWeight: '900',
  },
  boxText1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 15,
    fontWeight: '900',
    marginTop:-15
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    width:318,
    height:520,
    marginTop:120

    
  },
  buttonText :{
    color:"#fff"
  }
});

export default ShareInvitePage;
