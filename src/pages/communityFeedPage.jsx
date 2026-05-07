import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Image
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
//import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHeart } from '@fortawesome/free-regular-svg-icons'; 
import { faComment } from '@fortawesome/free-regular-svg-icons'; 
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { faBookmark } from '@fortawesome/free-regular-svg-icons'; 
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'; 

import LinearGradient from 'react-native-linear-gradient'

const AppLayout = () => {
  return (
    
    <SafeAreaView style={styles.safeArea}>
       <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
    
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Community</Text>
        <View style={styles.iconGroup}>
         <TouchableOpacity> <View style={styles.smallBox}>
          <FontAwesomeIcon icon={faBell} color="#ffffff" size={24} /></View>
         </TouchableOpacity>
          <TouchableOpacity> <View style={styles.smallBox}>
            <FontAwesomeIcon icon={faClone} color="#ffffff" size={24} />
            
            </View>
            </TouchableOpacity>
             <TouchableOpacity>
           <View style={styles.smallBox}><FontAwesomeIcon icon={faPlus} color="#ffffff" size={24} />
           </View>
           </TouchableOpacity>
           
        </View>
        
      </View>

     
      
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Trending</Text>
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText}>Recent</Text>
          </TouchableOpacity>
        </View>

    
        <View style={styles.postCard1}>
         
          <View style={styles.postHeader}>
            <Text style={styles.username}>Brooklyn Simmons</Text>
            <Text style={styles.postRightLabel}>3 days ago</Text>
          </View>

          <View style={styles.postMainBody}>
            
          <Image 
          source={require('./src/assets/images/dress1.png')} 
          style={styles.imageView} 
        />
        
          </View>

      
          <View style={styles.detailsArea}>
            <Text style={styles.description}>Crisp whites, clean cuts, and coffee in hand</Text>
            <Text style={styles.tagsText}>#CollageCasual #OOTD #CasualChic</Text>
          </View>

        
         
            <View style={styles.leftInteraction}>
              <View style={styles.alignRow}>
              <TouchableOpacity>
              <FontAwesomeIcon 
  icon={faHeart} 
  color="#b3b3b3" 
  size={24} 
/> 
            </TouchableOpacity>
            <Text style = {styles.numberText}>213</Text>
              <TouchableOpacity>
              <FontAwesomeIcon 
  icon={faComment} 
  color="#b3b3b3"
  size={24} 
/> 
            </TouchableOpacity>
            <Text style = {styles.numberText}>12</Text>
              <TouchableOpacity>
              <FontAwesomeIcon 
  icon={faArrowUpFromBracket} 
  color="#b3b3b3"
  size={24} 
/> 
            </TouchableOpacity>
            <Text style = {styles.numberText}>213</Text>
            </View>
             <TouchableOpacity>
              <FontAwesomeIcon 
  icon={faBookmark} 
  color="#b3b3b3" 
  size={24} 
/> 
            </TouchableOpacity>
     </View>

      
          <TextInput 
            style={styles.commentBox} 
            placeholder="your Comments " 
             placeholderTextColor="#ffffff"
          />

         
          <View style={styles.footerRow}>
            <FontAwesomeIcon 
  icon={faFaceSmile} 
  color="#b3b3b3" 
  size={24} 
/> 
            <View style={styles.footerButtonsContainer}>
              <TouchableOpacity style={[styles.buttonbox1, styles.cancelBtn]}>
                <Text style={styles.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <LinearGradient 
        colors={['#f0a374', '#e77a37', '#f0a374']} 
        style={styles.buttonbox}
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }}   
      >
      <Text style={styles.submitTxt}>Post</Text>
      </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
        <View style={styles.postCard}>
         
          <View style={styles.postHeader}>
            <Text style={styles.username}>Brooklyn Simmons</Text>
            <Text style={styles.postRightLabel}>3 days ago</Text>
          </View>

          <View style={styles.postMainBody}>
            
          <Image 
          source={require('./src/assets/images/dress3.png')} 
          style={styles.imageView} 
        />
        
          </View>

      
          <View style={styles.detailsArea}>
            <Text style={styles.description}>Crisp whites, clean cuts, and coffee in hand</Text>
            <Text style={styles.tagsText}>#CollageCasual #OOTD #CasualChic</Text>
          </View>

        
         
            <View style={styles.leftInteraction}>
              <View style={styles.alignRow}>
              <TouchableOpacity>
              <FontAwesomeIcon 
  icon={faHeart} 
  color="#b3b3b3" 
  size={24} 
/> 
            </TouchableOpacity>
            <Text style = {styles.numberText}>213</Text>
              <TouchableOpacity>
              <FontAwesomeIcon 
  icon={faComment} 
  color="#b3b3b3"
  size={24} 
/> 
            </TouchableOpacity>
            <Text style = {styles.numberText}>12</Text>
              <TouchableOpacity>
              <FontAwesomeIcon 
  icon={faArrowUpFromBracket} 
  color="#b3b3b3"
  size={24} 
/> 
            </TouchableOpacity>
            <Text style = {styles.numberText}>213</Text>
            </View>
             <TouchableOpacity>
              <FontAwesomeIcon 
  icon={faBookmark} 
  color="#b3b3b3" 
  size={24} 
/> 
            </TouchableOpacity>
     </View>

      
          

         
          
            
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000000' },
  

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: '#000000',
   
    borderColor: '#eee',
  },
  headerText: { fontSize: 18, fontWeight: '900', color:"#ffff" },
  iconGroup: { flexDirection: 'row' },
  smallBox: {
    width: 40, height: 40, backgroundColor: '#272727',
    marginLeft: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 8,
  },

  buttonRow: { flexDirection: 'row', backgroundColor:"#272727", margin:15, borderRadius:10, paddingVertical:8, paddingRight:10 },
  button: {
    flex: 1, backgroundColor: '#272727', paddingVertical: 12,
    borderRadius: 8, alignItems: 'center', borderRadius:8, 
  },
  button1: {
    flex: 1, backgroundColor: '#272727', paddingVertical: 12,
    borderRadius: 8, alignItems: 'center', borderRadius:8, borderColor:"#e77a37", borderWidth:2
  },
  buttonText: { color: '#fff', fontWeight: '900' },


  postCard: {
    backgroundColor: '#272727', marginHorizontal: 15, borderRadius: 12,
    padding: 15, marginTop:20 
   
  },
  postCard1: {
    backgroundColor: '#272727', marginHorizontal: 15, borderRadius: 12,
    padding: 15,  
   
  },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  username: { fontWeight: '900', fontSize: 16, color:"#fff" },
  postRightLabel: { color: 'gray', fontSize: 12, color:"#dddddd" },
  postMainBody: {
    backgroundColor: '#000000', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  detailsArea: { marginVertical: 12, marginTop:20, marginBottom:20 },
  description: { fontSize: 16 , color:"#fff", fontWeight:"900" },
  tagsText: { color: '#ffffff', marginTop: 20, fontWeight: '500' },
  
  
  interactionBar: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#f0f0f0',
  },
  leftInteraction: { flexDirection: 'row', gap: 35 },
  iconSm: { fontSize: 18 },

 
  commentBox: {
    backgroundColor: '#4d4d4d', borderRadius: 20, paddingHorizontal: 15,
    height: 80, marginTop: 15, color:"#fff"
  },


  footerRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 15,
  },
  footerLeftIcon: { fontSize: 20 },
  footerButtonsContainer: { flexDirection: 'row', gap: 10 },
  actionBtn: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 6 },
  actionBtn1: { paddingHorizontal: 26, paddingVertical: 12, borderRadius: 6 },
  cancelBtn: { backgroundColor: '#535353' },
  submitBtn: { backgroundColor: '#007AFF' },
  cancelTxt: { color: '#ffffff', fontWeight:900 },
  submitTxt: { color: '#fff', fontWeight:900 },
  imageView:{backgroundColor: '#f9f9f9', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',  height:400, width:300 },

numberText:{
  color:"#ffff",
  fontSize: 14,
  marginLeft:-20
}, 
alignRow :{
  flexDirection:"row",
  gap:30
},
 buttonbox1: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonbox: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15, 
    alignItems: 'center',
    justifyContent: 'center',
  },


});

export default AppLayout;
