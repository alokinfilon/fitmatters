import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  FlatList,
  StatusBar,
    ActivityIndicator,
} from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faComment } from '@fortawesome/free-regular-svg-icons/faComment';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowUpFromBracket';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons/faFaceSmile';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import LinearGradient from 'react-native-linear-gradient';
import { Images, BookmarkPlus } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const CommunityFeedPage = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const openProductDisplay = (item) => {
    if (navigation) {
      navigation.push('ProductDisplay', { product: item });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      {/* Feed User Card Header Row */}
      <View style={styles.postHeader}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.username}>Brooklyn Simmons</Text>
          </View>
        </View>
        <Text style={styles.postRightLabel}>3 days ago</Text>
      </View>

     
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={() => openProductDisplay(item)}
        style={styles.postMainBody}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.imageView}
          resizeMode="contain"
        />
      </TouchableOpacity>

      
      <View style={styles.detailsArea}>
        <View style={styles.descriptionLayoutRow}>
          <Text style={styles.description}>
            Crisp whites, clean cuts, and coffee in hand
          </Text>
          <TouchableOpacity style={styles.cartFloatingIconContainer}>
           <ShoppingBag color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.tagsText}>#CollageCasual #OOTD #CasualChic</Text>
      </View>

    
      <View style={styles.leftInteraction}>
        <View style={styles.interactionGroup}>
          <TouchableOpacity style={styles.interactionButton}>
            <FontAwesomeIcon icon={faHeart} color="#ffffff" size={26} />
            <Text style={styles.numberText}>213</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.interactionButton}>
            <FontAwesomeIcon icon={faComment} color="#ffffff" size={26} />
            <Text style={styles.numberText}>12</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.interactionButton}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} color="#ffffff" size={26} />
            <Text style={styles.numberText}>213</Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <BookmarkPlus size={26} color="#ffffff" />
        </TouchableOpacity>
        </View>

        
      </View>

    
      <TextInput
        style={styles.commentBox}
        placeholder="your comments..."
        placeholderTextColor="#cecece"
        multiline
      />

    
      <View style={styles.footerRow}>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faFaceSmile} color="#ffffff" size={26} />
        </TouchableOpacity>

        <View style={styles.footerButtonsContainer}>
          <TouchableOpacity style={[styles.buttonbox1, styles.cancelBtn]}>
            <Text style={styles.cancelTxt}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#fea26d', '#ff785d']}
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
  );

  const HeaderComponent = () => (
    <View style={styles.headerControlWrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Community</Text>

        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.smallBox}>
            <FontAwesomeIcon icon={faBell} color="#ffffff" size={26} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallBox}>
            <Images size={26} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallBox}>
            <FontAwesomeIcon icon={faPlus} color="#ffffff" size={26} />
          </TouchableOpacity>
        </View>
      </View>

      
      <View style={styles.buttonRow}>
       

        <TouchableOpacity style={styles.buttonInactive}>
          <Text style={styles.buttonTextMuted}>🔥 Trending</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.buttonActive}>
          <LinearGradient
            colors={['#707070', '#1d1d1d']}
            style={styles.gradientTab}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Recent 🆕</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  
 
  const [nextCursor, setNextCursor] = useState(5); 
  const [isListLoading, setIsListLoading] = useState(false); 
  const [hasMoreData, setHasMoreData] = useState(true); 

  const fetchNextCursorPage = () => {
    if (isListLoading || !hasMoreData) return;

    setIsListLoading(true);

   
    fetch(`https://fakestoreapi.com{nextCursor + 5}`)
      .then(response => response.json())
      .then(json => {
        if (json.length === data.length) {
          setHasMoreData(false); 
        } else {
          setData(json);
          setNextCursor(prevCursor => prevCursor + 5);
        }
        setIsListLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsListLoading(false);
      });
  };

  const renderFooterLoader = () => {
    if (!isListLoading) return null;
    return (
      <View style={{ paddingVertical: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#fea26d" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
    
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => `community-post-${item.id}`}
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextCursorPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooterLoader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerControlWrapper: {
    backgroundColor: '#000000',
    paddingBottom: hp('1%'),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'), 
    paddingVertical: hp('1.8%'), 
  },
  headerText: {
    fontSize: wp('6%'),
    fontWeight: '900',
    color: '#ffffff',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallBox: {
    width: wp('12.5%'),
    height: wp('12.5%'), 
    backgroundColor: '#363636',
    marginLeft: wp('2.5%'), 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222222',
  },
  buttonRow: {
    flexDirection: 'row',
    backgroundColor: '#353535',
    marginHorizontal: wp('4%'), 
    marginTop: hp('0.8%'),
    borderRadius: 14,
    padding: wp('1%'), 
    gap: wp('1.5%'), 
  },
  buttonActive: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ff9a7e',
  },
  gradientTab: {
    paddingVertical: hp('1.2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInactive: {
    flex: 1,
    paddingVertical: hp('1.2%'), 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: wp('4%'), 
  },
  buttonTextMuted: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: wp('4%'), 
  },
  listPadding: {
    paddingBottom: hp('4%'), 
  },
  postCard: {
    backgroundColor: '#363636',
    marginHorizontal: wp('4%'),
    borderRadius: 18,
    padding: wp('4%'), 
    marginTop: hp('2%'), 
    borderWidth: 1,
    borderColor: '#161616',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'), 
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: wp('9.5%'), 
    height: wp('9.5%'),
    borderRadius: wp('4.75%'), 
    marginRight: wp('2.5%'), 
    borderWidth: 1,
    borderColor: '#f06449',
  },
  username: {
    fontWeight: '900',
    fontSize: wp('3.8%'), 
    color: '#ffffff',
  },
  postRightLabel: {
    fontSize: wp('3%'), 
    color: '#ffffff',
  },
  postMainBody: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  imageView: {
    width: '100%',
    aspectRatio: 1 / 0.95, 
  },
  detailsArea: {
    marginTop: hp('1.5%'), 
    marginBottom: hp('1.5%'), 
  },
  descriptionLayoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: wp('3%'), 
  },
  description: {
    fontSize: wp('4.5%'), 
    color: '#ffffff',
    fontWeight: '900',
    lineHeight: wp('5%'), 
    flex: 1,
    padding: wp('2.5%'),
  },
  cartFloatingIconContainer: {
    padding: wp('2.5%'), 
    backgroundColor: '#363636',
  },
  cartIcon: {
    width: wp('6.5%'), 
    height: wp('6.5%'), 
  },
  tagsText: {
    color: '#ffffff',
    marginTop: hp('0.8%'),
    fontWeight: '500',
    fontSize: wp('3.8%'), 
    marginLeft: wp('1.5%'), 
  },
  leftInteraction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('0.3%'), 
    paddingTop: hp('1.5%'), 
  },
  interactionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('9%'), 
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.5%'), 
  },
  numberText: {
    color: '#ffffff',
    fontSize: wp('3.2%'), 
    fontWeight: '600',
  },
  commentBox: {
    backgroundColor: '#3d3d3d',
    borderRadius: 10,
    paddingHorizontal: wp('3%'), 
    paddingTop: hp('1.2%'),
    paddingBottom: hp('1.2%'), 
    minHeight: hp('10%'), 
    marginTop: hp('1.8%'), 
    color: '#ffffff',
    fontSize: wp('3.8%'),
    borderWidth: 1,
    borderColor: '#9d9d9d',
    fontWeight: '900',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1.5%'), 
  },
  footerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'), 
  },
  buttonbox1: {
    paddingVertical: hp('1.5%'), 
    paddingHorizontal: wp('6%'), 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: '#292929',
  },
  cancelTxt: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: wp('4%'), 
  },
  buttonbox: {
    paddingVertical: hp('1.5%'), 
    paddingHorizontal: wp('6.5%'), 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitTxt: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: wp('4%'),
  },
});



export default CommunityFeedPage;