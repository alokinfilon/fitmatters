import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window');

const AppLayout = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Community</Text>

          <View style={styles.iconGroup}>
            <TouchableOpacity activeOpacity={0.7}>
      <LinearGradient
        // Dark metallic gradient spectrum
        colors={['#515151', '#171717']} 
        start={{ x: 0, y: 0 }} // Start top-left
        end={{ x: 1, y: 1 }}   // End bottom-right
        style={styles.smallBox}
      >
        <FontAwesomeIcon
          icon={faBell}
          color="#ffffff"
          size={20}
        />
      </LinearGradient>
    </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}>
      <LinearGradient
        // Dark metallic gradient spectrum
        colors={['#515151', '#1c1c1c']} 
        start={{ x: 0, y: 0 }} // Start top-left
        end={{ x: 1, y: 1 }}   // End bottom-right
        style={styles.smallBox}
      >
        <Image 
        source={require('../assets/images/gallery.png')} 
        style={styles.icon1} 
      />
      </LinearGradient>
    </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}>
      <LinearGradient
        // Dark metallic gradient spectrum
        colors={['#515151', '#1c1c1c']} 
        start={{ x: 0, y: 0 }} // Start top-left
        end={{ x: 1, y: 1 }}   // End bottom-right
        style={styles.smallBox}
      >
        <FontAwesomeIcon
          icon={faPlus}
          color="#ffffff"
          size={20}
        />
      </LinearGradient>
    </TouchableOpacity>
          </View>
        </View>

        {/* FILTER BUTTONS */}
        <View style={styles.buttonRow}>

          
          <TouchableOpacity style={styles.button}>
      <View style= {styles.alignRow1}>
      
      <Text style={styles.buttonText}>Trending </Text>
      <Image 
        source={require('../assets/images/flame.png')} 
        style={styles.icon} 
      />
      </View>
    </TouchableOpacity>

          <TouchableOpacity style={styles.button1}>
             <View style= {styles.alignRow1}>
            <Text style={styles.buttonText}>Recent  </Text>
            <Image 
        source={require('../assets/images/new.png')} 
        style={styles.icon} 
      />
      </View>
          </TouchableOpacity>
        </View>

        {/* POST 1 */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Text style={styles.username}>
              Brooklyn Simmons
            </Text>

            <Text style={styles.postRightLabel}>
              3 days ago
            </Text>
          </View>

          <View style={styles.postMainBody}>
            <Image
              source={require('../assets/images/dress1.png')}
              style={styles.imageView}
              resizeMode="cover"
            />
          </View>

          <View style={styles.detailsArea}>
            <Text style={styles.description}>
              Crisp whites, clean cuts, and coffee in hand
            </Text>

            <Text style={styles.tagsText}>
              #CollegeCasual #OOTD #CasualChic
            </Text>
          </View>

          {/* INTERACTION */}
          <View style={styles.leftInteraction}>
            <View style={styles.alignRow}>
              <TouchableOpacity style={styles.iconItem}>
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#b3b3b3"
                  size={22}
                />

                <Text style={styles.numberText}>
                  213
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconItem}>
                <FontAwesomeIcon
                  icon={faComment}
                  color="#b3b3b3"
                  size={22}
                />

                <Text style={styles.numberText}>
                  12
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconItem}>
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  color="#b3b3b3"
                  size={22}
                />

                <Text style={styles.numberText}>
                  213
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <FontAwesomeIcon
                icon={faBookmark}
                color="#b3b3b3"
                size={22}
              />
            </TouchableOpacity>
          </View>

          {/* COMMENT */}
          <TextInput
            style={styles.commentBox}
            placeholder="Your comments..."
            placeholderTextColor="#cfcfcf"
            multiline
          />

          {/* FOOTER */}
          <View style={styles.footerRow}>
            <FontAwesomeIcon
              icon={faFaceSmile}
              color="#b3b3b3"
              size={22}
            />

            <View style={styles.footerButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonbox1,
                  styles.cancelBtn,
                ]}
              >
                <Text style={styles.cancelTxt}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <LinearGradient
                  colors={[
                    '#f0a374',
                    '#e77a37',
                    '#f0a374',
                  ]}
                  style={styles.buttonbox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.submitTxt}>
                    Post
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* POST 2 */}
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Text style={styles.username}>
              Brooklyn Simmons
            </Text>

            <Text style={styles.postRightLabel}>
              3 days ago
            </Text>
          </View>

          <View style={styles.postMainBody}>
            <Image
              source={require('../assets/images/dress3.png')}
              style={styles.imageView}
              resizeMode="cover"
            />
          </View>

          <View style={styles.detailsArea}>
            <Text style={styles.description}>
              Crisp whites, clean cuts, and coffee in hand
            </Text>

            <Text style={styles.tagsText}>
              #CollegeCasual #OOTD #CasualChic
            </Text>
          </View>

          <View style={styles.leftInteraction}>
            <View style={styles.alignRow}>
              <TouchableOpacity style={styles.iconItem}>
                <FontAwesomeIcon
                  icon={faHeart}
                  color="#b3b3b3"
                  size={22}
                />

                <Text style={styles.numberText}>
                  213
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconItem}>
                <FontAwesomeIcon
                  icon={faComment}
                  color="#b3b3b3"
                  size={22}
                />

                <Text style={styles.numberText}>
                  12
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconItem}>
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  color="#b3b3b3"
                  size={22}
                />

                <Text style={styles.numberText}>
                  213
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <FontAwesomeIcon
                icon={faBookmark}
                color="#b3b3b3"
                size={22}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },

  headerText: {
    fontSize: width * 0.055,
    fontWeight: '900',
    color: '#ffffff',
    
  },

  iconGroup: {
    flexDirection: 'row',
  },

  smallBox: {
    width: width * 0.11,
    height: width * 0.11,
    backgroundColor: '#272727',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    backgroundColor: '#272727',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 6,
    marginBottom: 15,
  },

  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  button1: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#e77a37',
    borderWidth: 2,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: width * 0.038,
  },

  postCard: {
    backgroundColor: '#272727',
    marginHorizontal: 15,
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
  },

  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    alignItems: 'center',
  },

  username: {
    fontWeight: '900',
    fontSize: width * 0.042,
    color: '#fff',
  },

  postRightLabel: {
    fontSize: width * 0.03,
    color: '#dddddd',
  },

  postMainBody: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  imageView: {
    width: '100%',
    height: width * 1.1,
    borderRadius: 12,
  },

  detailsArea: {
    marginTop: 18,
    marginBottom: 20,
  },

  description: {
    fontSize: width * 0.04,
    color: '#fff',
    fontWeight: '900',
    lineHeight: 24,
  },

  tagsText: {
    color: '#ffffff',
    marginTop: 12,
    fontWeight: '500',
    fontSize: width * 0.035,
  },

  leftInteraction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 22,
  },

  numberText: {
    color: '#fff',
    fontSize: width * 0.034,
    marginLeft: 8,
    fontWeight: '700',
  },

  commentBox: {
    backgroundColor: '#4d4d4d',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    minHeight: 80,
    marginTop: 18,
    color: '#fff',
    textAlignVertical: 'top',
    fontSize: width * 0.036,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },

  footerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cancelBtn: {
    backgroundColor: '#535353',
  },

  cancelTxt: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: width * 0.034,
  },

  submitTxt: {
    color: '#fff',
    fontWeight: '900',
    fontSize: width * 0.034,
  },

  buttonbox1: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  buttonbox: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
   icon: {
    width: 20,                // Set an explicit width for local images
    height: 20,               // Set an explicit height for local images
    marginRight: 8,           // Pushes the text away from the icon
    resizeMode: 'contain',    // Ensures the image scales proportionally
  },
  icon1: {
    width: 30,                // Set an explicit width for local images
    height: 30,               // Set an explicit height for local images
    marginRight: 8,           // Pushes the text away from the icon
    resizeMode: 'contain',    // Ensures the image scales proportionally
    tintColor:"#ffff"
  },

  alignRow1:{
    flexDirection:"row"
  }
});

export default AppLayout;