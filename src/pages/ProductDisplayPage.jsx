import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
const horizontalPadding = 16;

import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SCREEN_WIDTH = width;
const COLUMN_WIDTH = SCREEN_WIDTH * 0.9;
const isSmallDevice = SCREEN_WIDTH < 380;

export default function ProductDisplayPage({ route, navigation }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState('shipping');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderItem1 = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.85}>
      <View style={styles.circleWrapper}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );

  const product = route?.params?.product;

  const productImageSource =
    product?.imageSource ||
    (product?.image
      ? { uri: product.image }
      : require('../assets/images/dress.png'));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.alignRow}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>

              <FontAwesomeIcon
                icon={faLessThan}
                color="#ffffff"
                size={18}
              />

              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TITLE */}
        <View style={styles.header1}>
          <Text style={styles.headerText}>
            {product?.title || 'streetwear Set - urban Chill'}
          </Text>

          <Text style={styles.headerText1}>
            Outfit curated from 3 brands.
          </Text>
        </View>

        {/* PRODUCT CARD */}
        <View style={styles.cardView}>

          <View style={styles.card}>
            <Image
              source={productImageSource}
              style={styles.image}
            />
          </View>

          <View style={styles.priceView}>
            <Text style={styles.priceText}>
              {product?.price
                ? `₹${product.price}`
                : '₹3,499'} (Excluding extras)
            </Text>
          </View>

          {/* CHECKBOX */}
          <View style={styles.checkboxView}>

            <View style={styles.iconRow}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) =>
                  setToggleCheckBox(newValue)
                }
                style={styles.checkBox}
                tintColors={{
                  true: '#e77a37',
                  false: '#ffffff',
                }}
              />

              <Text style={styles.text4}>
                Buy the Whole look(Including extras).
              </Text>
            </View>

            <View style={styles.allPriceView}>
              <Text style={styles.text1}>
                ₹5,499 (all items combined)
              </Text>

              <Text style={styles.text2}>
                curated look for casual weekends includes top,
                denim, and Sneakers.
              </Text>
            </View>
          </View>

          {/* BRANDS */}
          <View style={styles.iconRow1}>

            <Text style={styles.text}>Brands</Text>

            <View style={styles.nikeView}>
              <Image
                source={require('../assets/images/nike.png')}
                style={styles.image}
              />
            </View>

            <View style={styles.hmView}>
              <Image
                source={require('../assets/images/h&m.png')}
                style={styles.image}
              />
            </View>

          </View>
        </View>

        {/* LINE */}
        <View style={styles.line} />

        {/* SIZE SELECTION */}
        <View style={styles.selectionView}>
          <Text style={styles.selectionText}>
            Size Selection
          </Text>
        </View>

        {/* TOP WEAR */}
        <View style={styles.iconRow2}>

          <Text style={styles.text}>Top Wear</Text>

          <View style={styles.hmView}>
            <Image
              source={require('../assets/images/h&m.png')}
              style={styles.image}
            />
          </View>

        </View>

        <Text style={styles.text3}>
          100% cotton, soft-touch finish.
        </Text>

        <View style={styles.iconRow3}>
          <Text style={styles.text4}>Size</Text>

          <View style={styles.sizeView}>
            <Image
              source={require('../assets/images/size.png')}
              style={styles.image1}
            />
          </View>
        </View>

        <View style={styles.sizeBoxView}>
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <TouchableOpacity key={size}>
              <View style={styles.boxsizeView}>
                <Text style={styles.text5}>{size}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* QUANTITY */}
        <View style={styles.iconRow3}>

          <Text style={styles.quantityText}>Quantity</Text>

          <TouchableOpacity>
            <Text style={styles.quantityText}>—</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              <Text style={styles.text5}>1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>

        </View>

        {/* BOTTOM WEAR */}
        <View style={styles.iconRow2}>

          <Text style={styles.text}>Bottom Wear</Text>

          <View style={styles.hmView}>
            <Image
              source={require('../assets/images/h&m.png')}
              style={styles.image}
            />
          </View>

        </View>

        <Text style={styles.text3}>
          Slim fit, stretchable denim.
        </Text>

        <View style={styles.iconRow3}>
          <Text style={styles.text4}>Size</Text>

          <View style={styles.sizeView}>
            <Image
              source={require('../assets/images/size.png')}
              style={styles.image1}
            />
          </View>
        </View>

        <View style={styles.sizeBoxView}>
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <TouchableOpacity key={size}>
              <View style={styles.boxsizeView}>
                <Text style={styles.text5}>{size}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* FOOT WEAR */}
        <View style={styles.iconRow2}>

          <Text style={styles.text}>Foot Wear</Text>

          <View style={styles.nikeView}>
            <Image
              source={require('../assets/images/nike.png')}
              style={styles.image}
            />
          </View>

        </View>

        <Text style={styles.text3}>
          Breathable sole, regular fit.
        </Text>

        <View style={styles.iconRow3}>
          <Text style={styles.text4}>Size</Text>

          <View style={styles.sizeView}>
            <Image
              source={require('../assets/images/size.png')}
              style={styles.image1}
            />
          </View>
        </View>

        <View style={styles.sizeBoxView}>
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <TouchableOpacity key={size}>
              <View style={styles.boxsizeView}>
                <Text style={styles.text5}>{size}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ADD EXTRA */}
        <View style={styles.iconRow3}>
          <TouchableOpacity>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>

          <Text style={styles.text4}>
            Add Extras (belt, cap, scarf)
          </Text>
        </View>

        {/* ADD TO CART */}
        <View style={styles.button2}>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => console.log('Pressed!')}>

            <View style={styles.buttonbox1}>
              <Text style={styles.text6}>Add To Cart</Text>
            </View>

          </TouchableOpacity>
        </View>

        {/* BUY NOW */}
        <View style={styles.button2}>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => console.log('Pressed!')}>

            <LinearGradient
              colors={['#f0a374', '#e77a37', '#f0a374']}
              style={styles.buttonbox}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>

              <Text style={styles.text6}>Buy Now</Text>

            </LinearGradient>

          </TouchableOpacity>
        </View>

        {/* SHIPPING INFO */}
        <View
          style={[
            styles.discrptionView,
            activeInfoTab === 'shipping'
              ? null
              : styles.hiddenInfoSection,
          ]}>

          <View style={styles.alignRowTabs}>

            <TouchableOpacity
              onPress={() => setActiveInfoTab('shipping')}>

              <View style={styles.selectedView}>
                <Text style={styles.text8}>
                  Shipping Info
                </Text>
              </View>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setActiveInfoTab('howItWorks')
              }>

              <Text style={styles.text8}>
                How It Works
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setActiveInfoTab('productInfo')
              }>

              <Text style={styles.text8}>
                Product Info
              </Text>

            </TouchableOpacity>

          </View>

          <Text style={styles.text9}>Delivery Time</Text>
          <Text style={styles.text10}>
            Delivery within 3-5 business days.
          </Text>

          <Text style={styles.text9}>
            Delivery Partner
          </Text>

          <Text style={styles.text10}>
            Shipped directly by H&M / Levis / Nike.
          </Text>
          <Text style={styles.text9}>
            Traking Info
          </Text>

          <Text style={styles.text10}>
            You'll receive tracking updates in your Order Hstory once placed 
          </Text>
          <Text style={styles.text9}>
            Delivery Charge
          </Text>

          <Text style={styles.text10}>
            Free Shipping for orders above ₹1,999.
          </Text>

        </View>

        {/* HOW IT WORKS */}
        <View
          style={[
            styles.discrptionView,
            activeInfoTab === 'howItWorks'
              ? null
              : styles.hiddenInfoSection,
          ]}>

          <View style={styles.alignRowTabs}>

            <TouchableOpacity
              onPress={() => setActiveInfoTab('shipping')}>

              <Text style={styles.text8}>
                Shipping Info
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.selectedView}
              onPress={() =>
                setActiveInfoTab('howItWorks')
              }>

              <Text style={styles.text8}>
                How It Works
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setActiveInfoTab('productInfo')
              }>

              <Text style={styles.text8}>
                Product Info
              </Text>

            </TouchableOpacity>

          </View>

          <Text style={styles.text9}>
            Select Your Look
          </Text>

          <Text style={styles.text10}>
            Choose full outfit or Specific Pieces.
          </Text>
           <Text style={styles.text9}>
            Checkout Securely
          </Text>

          <Text style={styles.text10}>
            Pay via UPI, Card, or Wallet.
          </Text>
           <Text style={styles.text9}>
            Order Confirmed 
          </Text>

          <Text style={styles.text10}>
            We sync order with brand partner.
          </Text>

           <Text style={styles.text9}>
            Shipped by Brand 
          </Text>

          <Text style={styles.text10}>
            Track updates inside the app.
          </Text>
          <Text style={styles.text9}>
            Refund Available (12 hrs) 
          </Text>

          <Text style={styles.text10}>
            Cancel or refund within the first 12 hours.
          </Text>

        </View>

        {/* PRODUCT INFO */}
        <View
          style={[
            styles.discrptionView,
            activeInfoTab === 'productInfo'
              ? null
              : styles.hiddenInfoSection,
          ]}>

          <View style={styles.alignRowTabs}>

            <TouchableOpacity
              onPress={() => setActiveInfoTab('shipping')}>

              <Text style={styles.text8}>
                Shipping Info
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setActiveInfoTab('howItWorks')
              }>

              <Text style={styles.text8}>
                How It Works
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.selectedView}
              onPress={() =>
                setActiveInfoTab('productInfo')
              }>

              <Text style={styles.text8}>
                Product Info
              </Text>

            </TouchableOpacity>

          </View>

          <Text style={styles.text9}>Material</Text>

          <Text style={styles.text10}>
            100% Cotton(T-shirt), Stretch Denim(Jeans), Mesh (Shoes)
          </Text>
          <Text style={styles.text9}>Fit Type</Text>

          <Text style={styles.text10}>
           Regular Fit / Slim Fit / Relaxed
          </Text>

<Text style={styles.text9}>Color Options</Text>

          <Text style={styles.text10}>
            Black, Navy, Olive 
          </Text>

<Text style={styles.text9}>Made In </Text>

          <Text style={styles.text10}>
           Made in India / Imported 
          </Text>
<Text style={styles.text9}>Sustainability</Text>

          <Text style={styles.text10}>
            Eco-certified fabric used.
          </Text>


        </View>
 <View style={styles.divider} /> 

 <Text style={styles.heading1}>
           Refund & Return Policy
         </Text>
 
         <View style={styles.alignRow}>
          <View style = {styles.msgConatiner}>
           <Text style={styles.subHeading1}>
             After 12 hours, returns are managed by the brand. Initiate returns from your Orderpage.
            
           </Text>
            <Text style={styles.policyLink}>
               {' '}
               View Brand's Refund Policy
             </Text>
           </View>
         </View>
        {/* RECOMMEND */}
        <View style={styles.recommandView}>
          <Text style={styles.recommendText}>
            Recommend Products
          </Text>
        </View>

        {/* FLATLIST */}
        <View style={styles.flatListContainer}>

          <FlatList
            data={data}
            renderItem={renderItem1}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
 
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 40,
  },

  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
   heading1: {
    fontSize: width * 0.04,
    color: '#fff',
    
    fontWeight: '900',
    marginHorizontal: 20,
    marginTop: 10,
  },
  subHeading1: {
    fontSize: width * 0.036,
    color: '#fff',
   
    fontWeight: '600',
    lineHeight: 24,
    flex: 1,
  },

  policyLink: {
    fontWeight: '900',
    textDecorationLine: 'underline',
    color:"#eaa0a0",
    marginTop:10,
    marginBottom:10
  },
msgConatiner :{
marginLeft:20,
marginTop:10
},

  header: {
    marginTop: 10,
    paddingHorizontal: 16,
  },

  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '900',
    marginLeft: 8,
  },

  header1: {
    marginTop: 10,
    paddingHorizontal: 16,
  },

  headerText: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: '900',
    color: '#fff',
    marginTop: 10,
  },

  headerText1: {
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
    marginTop: 15,
  },

  cardView: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  card: {
    width: '100%',
    height: SCREEN_WIDTH * 1.05,
    maxHeight: 420,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#F5EBE0',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
   
  },
  image1: {
    width: '120%',
    height: '120%',
    resizeMode: 'contain',
    
    backgroundColor:"#000000",
    tintColor:"#ffbebe",
    
  },

  priceView: {
    marginTop: 10,
  },

  priceText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },

  checkboxView: {
    marginTop: 30,
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkBox: {
    transform: [
      {
        scaleX: Platform.OS === 'ios' ? 0.9 : 1.1,
      },
      {
        scaleY: Platform.OS === 'ios' ? 0.9 : 1.1,
      },
    ],
  },

  text4: {
    color: '#f1f0f0',
    fontSize: 14,
    fontWeight: '900',
  },

  text1: {
    color: '#f1f0f0',
    fontSize: 14,
    fontWeight: '900',
    marginTop: 10,
  },

  text2: {
    color: '#b6b6b6',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
  },

  allPriceView: {
    marginLeft: 10,
  },

  iconRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 25,
  },

  nikeView: {
    width: SCREEN_WIDTH * 0.18,
    height: SCREEN_WIDTH * 0.12,
    minWidth: 65,
    minHeight: 45,
    backgroundColor: '#000000',
    tintColor:"#ff0000"
  },

  hmView: {
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_WIDTH * 0.1,
    minWidth: 48,
    minHeight: 48,
    backgroundColor: '#000000',
  },

  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#5c5c5c',
    alignSelf: 'center',
    marginVertical: 20,
  },

  selectionView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },

  iconRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },

  text3: {
    color: '#b6b6b6',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 8,
  },

  iconRow3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },

  sizeView: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
  },

  sizeBoxView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    gap: 8,
    marginTop: 10,
  },

  boxsizeView: {
    width: 38,
    height: 32,
    backgroundColor: '#4b4b4b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  text5: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '900',
  },

  quantityText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },

  button2: {
    alignItems: 'center',
    marginTop: 20,
  },

  fullButton: {
    width: '90%',
  },

  buttonbox1: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: '#484848',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonbox: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text6: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
  },

  discrptionView: {
    backgroundColor: '#000',
    padding: 16,
    marginTop: 20,
  },

  hiddenInfoSection: {
    display: 'none',
  },

  alignRowTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },

  text8: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },

  selectedView: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fea26d',
    backgroundColor: '#2e2e2e',
  },

  text9: {
    color: '#fff',
    marginTop: 15,
    fontWeight: '900',
    fontSize: 14,
  },

  text10: {
    color: '#d8d8d8',
    marginTop: 5,
    lineHeight: 22,
    fontSize: 14,
     fontWeight: '700',
  },

  recommendText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },

  recommandView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  flatListContainer: {
    width: '92%',
    minHeight: 180,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 20,
    marginLeft:-25
  },

  circleWrapper: {
    width: 110,
    height: 160,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 10,
  },

});