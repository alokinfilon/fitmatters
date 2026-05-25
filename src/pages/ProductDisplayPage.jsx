import React from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import CheckBox from '@react-native-community/checkbox';
import { useState, useEffect } from 'react';
import { RulerDimensionLine } from 'lucide-react-native';

import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width - 50;
const CIRCLE_SIZE = 100;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function ProductDisplayPage({ route, navigation }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState('shipping');

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Hello');

    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => console.error(error));
  }, []);

  const renderItem1 = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.85}
      onPress={() => openProductDisplay(item)}
    >
      <View style={styles.circleWrapper}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text numberOfLines={1} style={styles.label}></Text>
    </TouchableOpacity>
  );

  const product = route?.params?.product;
  const productImageSource = product?.image
    ? { uri: product.image }
    : require('../assets/images/dress.png');
  return (
     <SafeAreaProvider>
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.alignRow}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>navigation.pop()}
            >
              <FontAwesomeIcon icon={faLessThan} color="#ffffff" size={18} />

              <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.header1}>
          <Text style={styles.headerText}>
            {product?.title || 'streetwear Set - urban Chill'}
          </Text>
          <Text style={styles.headerText1}>Outfit curated from 3 brands.</Text>
        </View>
        <View style={styles.cardView}>
          <View style={styles.card}>
            <Image source={productImageSource} style={styles.image} />
          </View>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>
              {product?.price ? `₹${product.price}` : '₹3,499'} (Excluding
              extras)
            </Text>
          </View>
          <View style={styles.checkboxView}>
            <View style={styles.iconRow}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
                style={styles.checkBox}
                tintColors={{ true: '#fe9267', false: '#ffffff' }}
              />
              <Text style={styles.text4}>
                Buy the Whole look(Including extras).{' '}
              </Text>
            </View>
            <View style={styles.allPriceView}>
              <Text style={styles.text1}>₹5,499 (all items combined) </Text>
              <Text style={styles.text2}>
                curated look for causual weekends includes top, denim, and
                Sneakers.{' '}
              </Text>
            </View>
          </View>
          <View style={styles.iconRow1}>
            <Text style={styles.text}>Brands </Text>
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
        <View
          style={{
            width: '90%',
            height: 1,
            backgroundColor: '#5c5c5c',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            marginLeft: 20,
          }}
        ></View>
        <View style={styles.selectionView}>
          <Text style={styles.selectionText}>Size Selection</Text>
        </View>
        <View style={styles.iconRow2}>
          <Text style={styles.text}>Top Wear </Text>

          <View style={styles.hmView}>
            <Image
              source={require('../assets/images/h&m.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text3}>100% cotton, soft-touch finish. </Text>
        </View>
        <View style={styles.iconRow3}>
          <Text style={styles.text4}>Size</Text>

          <RulerDimensionLine size={20} color="#fea26d" />
        </View>
        <View style={styles.sizeBoxView}>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>XS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>S</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>M</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>L</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>XL</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>XXL</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow3}>
          <Text style={styles.quantityText}>quantity</Text>
          <TouchableOpacity>
            <Text style={styles.quantityText}>—</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quantityText}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow2}>
          <Text style={styles.text}>Bottom Wear </Text>

          <View style={styles.hmView}>
            <Image
              source={require('../assets/images/h&m.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text3}>Slim fit, stretchable denim.</Text>
        </View>
        <View style={styles.iconRow3}>
          <Text style={styles.text4}>Size</Text>

          <RulerDimensionLine size={20} color="#fea26d" />
        </View>
        <View style={styles.sizeBoxView}>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>XS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>S</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>M</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>L</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>XL</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>XXL</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow3}>
          <Text style={styles.quantityText}>quantity</Text>
          <TouchableOpacity>
            <Text style={styles.quantityText}>—</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quantityText}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow2}>
          <Text style={styles.text}>Foot Wear </Text>

          <View style={styles.nikeView}>
            <Image
              source={require('../assets/images/nike.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View>
          <Text style={styles.text3}>Breathable sole, regular fit. </Text>
        </View>
        <View style={styles.iconRow3}>
          <Text style={styles.text4}>Size</Text>

          <RulerDimensionLine size={20} color="#fea26d" />
        </View>
        <View style={styles.sizeBoxView}>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>XS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>S</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>M</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>L</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>XL</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>XXL</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow3}>
          <Text style={styles.quantityText}>quantity</Text>
          <TouchableOpacity>
            <Text style={styles.quantityText}>—</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.boxsizeView}>
              {' '}
              <Text style={styles.text5}>1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quantityText}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow3}>
          <TouchableOpacity style={styles.quantityText}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.text4}>Add Extras (belt, cap, scraf)</Text>
        </View>
        <View style={styles.button2}>
          <TouchableOpacity onPress={() => console.log('Pressed!')}>
            <View style={styles.buttonbox1}>
              <Text style={styles.text6}>Add To CaRT </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.button2}>
          <TouchableOpacity onPress={() => console.log('Pressed!')}>
            <LinearGradient
              colors={['#f0a374', '#e77a37', '#f0a374']}
              style={styles.buttonbox}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.text6}>Buy Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.discrptionView,
            activeInfoTab === 'shipping' ? null : styles.hiddenInfoSection,
          ]}
        >
          <View style={styles.alignRow}>
            <TouchableOpacity onPress={() => setActiveInfoTab('shipping')}>
              <View style={styles.selectedView}>
                <Text style={styles.text8}>Shipping Info</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveInfoTab('howItWorks')}>
              <Text style={styles.text8}>How It Works</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveInfoTab('productInfo')}>
              <Text style={styles.text8}>Product Info</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text9}>Delivery Time </Text>
          <Text style={styles.text10}>
            Delivery within 3-5 business days by partner.
          </Text>
          <Text style={styles.text9}>Delivery partner</Text>
          <Text style={styles.text10}>
            Shipped directly by H&M / Levis / nike.{' '}
          </Text>
          <Text style={styles.text9}>Tracking Info </Text>
          <Text style={styles.text10}>
            You'll recive tracking updates in your order History once placed.
          </Text>
          <Text style={styles.text9}>Delivery Charge</Text>
          <Text style={styles.text10}>
            free Shipping for orders above ₹1,999.
          </Text>
        </View>
        <View
          style={[
            styles.discrptionView,
            activeInfoTab === 'howItWorks' ? null : styles.hiddenInfoSection,
          ]}
        >
          <View style={styles.alignRow}>
            <TouchableOpacity onPress={() => setActiveInfoTab('shipping')}>
              <View>
                <Text style={styles.text8}>Shipping Info</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectedView}
              onPress={() => setActiveInfoTab('howItWorks')}
            >
              <Text style={styles.text8}>How It Works</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveInfoTab('productInfo')}>
              <Text style={styles.text8}>Product Info</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text9}>Select Your Look </Text>
          <Text style={styles.text10}>
            Choose full outfit or Specific Pieces.
          </Text>
          <Text style={styles.text9}>Checkout Securely</Text>
          <Text style={styles.text10}>Pay via UPI, Card, or Wallet. </Text>
          <Text style={styles.text9}>Order Confirmed </Text>
          <Text style={styles.text10}>we sync order with brand partner</Text>
          <Text style={styles.text9}>Shipped by Brand</Text>
          <Text style={styles.text10}>Track updates inside the app.</Text>
          <Text style={styles.text9}>Refund Available (12 hrs)</Text>
          <Text style={styles.text10}>
            Cancel or refund within the first 12 hours.
          </Text>
        </View>
        <View
          style={[
            styles.discrptionView,
            activeInfoTab === 'productInfo' ? null : styles.hiddenInfoSection,
          ]}
        >
          <View style={styles.alignRow}>
            <TouchableOpacity onPress={() => setActiveInfoTab('shipping')}>
              <View>
                <Text style={styles.text8}>Shipping Info</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveInfoTab('howItWorks')}>
              <Text style={styles.text8}>How It Works</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.selectedView}
              onPress={() => setActiveInfoTab('productInfo')}
            >
              <Text style={styles.text8}>Product Info</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text9}>Material</Text>
          <Text style={styles.text10}>
            100% Cotton (T-shirt), Stretch Denim(Jeans), Mesh(Shoes)
          </Text>
          <Text style={styles.text9}>Fit Type</Text>
          <Text style={styles.text10}>Regular Fit / Slim Fit / Relaxed. </Text>
          <Text style={styles.text9}>Care INstructions </Text>
          <Text style={styles.text10}>Machine Wash cold, tunmble dry low</Text>
          <Text style={styles.text9}>Color Options</Text>
          <Text style={styles.text10}>Black, Navy, olive.</Text>
          <Text style={styles.text9}>Made In</Text>
          <Text style={styles.text10}>Made in India / Imported.</Text>
          <Text style={styles.text9}>Sustainability Note</Text>
          <Text style={styles.text10}>Eco-certified fabric used.</Text>
          <Text style={styles.text9}>Refund and Returns </Text>
          <Text style={styles.text10}>
            After 12 hours, returns are managed by the brand. Initiate returns
            from your Order page.
          </Text>
        </View>
         <View style={styles.policyOuterContainer}>
          <Text style={styles.policyHeaderTitle}>Refund & Return Policy</Text>
          <View style={styles.policyMessageContent}>
            <Text style={styles.policyContentBody}>
              After 12 hours, returns are managed by the brand. Initiate returns directly from your Order page.
            </Text>
            <TouchableOpacity><Text style={styles.policyLinkText}>View Brand's Refund Policy</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.recommandView}>
          <Text style={styles.recommendText}>Recommend Products</Text>
        </View>
        <View style={styles.recommandView}></View>
      </View>
      <View
        
      >
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={renderItem1}
            keyExtractor={item => item.id.toString()}
            horizontal
          />
        </View>
      </View>
    </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: wp('1.5%'),
  },
   text: {
    fontSize: wp('4%'),
    color: '#fff',
    fontWeight: '900', 
    marginLeft: wp('2%'),
  },
   header: {
    marginTop: hp('1.2%'),
    paddingLeft: wp('5%'),
  },
   alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2.5%'),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('2%'),
  },
  imageContainer: {
    flex: 1,
  },
  circleWrapper: {
    width: wp('24%'),
    height: hp('18%'),
    overflow: 'hidden',
    borderWidth: 4,
    backgroundColor: '#f9f9f9',
    borderColor: '#000000',
    borderRadius: 15,
  },
  Circlecard: {
    width: COLUMN_WIDTH / 1.5,
    height: hp('18%'),
    marginBottom: hp('1.8%'),
    borderRadius: 80,
    overflow: 'hidden',
    backgroundColor: '#F5EBE0',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  header1: {
    marginTop: hp('1.2%'),
    paddingLeft: wp('5%'),
  },
  headerText: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: '#fff',
    marginTop: hp('1.2%'),
  },

   headerText1: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#fff',
    marginTop: hp('2.5%'),
  },
  cardView: {
    marginTop: hp('2.5%'),
    paddingLeft: wp('5%'),
    flex: 1,
  },
   card: {
    width: COLUMN_WIDTH,
    height: hp('45%'),
    marginBottom: hp('1.8%'),
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F5EBE0',
    borderColor: '#000',
  },
  Image: { 
    width: '100%',
    height: '100%',
    
  },
 
  priceView: {
    marginTop: hp('0.6%'),
  },
  priceText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '900',
  },
   iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1%'),
  },
  checkBox: {
    color: '#fe9267',
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
 text4: {
    color: '#f1f0f0',
    fontSize: wp('4%'),
    fontWeight: '900',
  },
  checkboxView: {
    marginTop: hp('4%'),
  },
  text1: {
    color: '#f1f0f0',
    fontSize: wp('4%'),
    fontWeight: '900',
    marginTop: hp('2.5%'),
    paddingLeft: wp('7.5%'),
  },
  text2: {
    color: '#b6b6b6',
    fontSize: wp('4%'),
    fontWeight: '600',
    marginTop: hp('2.5%'),
    paddingLeft: wp('7.5%'),
  },
  allPriceView: {
    marginLeft: wp('2%'),
  },
  nikeView: {
    width: wp('20%'),
    height: hp('6.5%'),
    backgroundColor: '#F5EBE0',
    borderColor: '#000000',
    borderWidth: 2,
  },
  hmView: {
    width: wp('20%'),
    height: hp('5.5%'),
    backgroundColor: '#F5EBE0',
  },
 iconRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('0.5%'),
    marginLeft: wp('7.5%'),
    padding: wp('5%'),
  },
   selectionText: {
    color: '#ffff',
    fontSize: wp('4.5%'),
    fontWeight: '900',
  },
  selectionView: {
    padding: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('0.5%'),
    marginLeft: wp('6%'),
  },
  text3: {
    color: '#b6b6b6',
    fontSize: wp('4%'),
    fontWeight: '600',
    paddingLeft: wp('8%'),
    marginTop: hp('0.6%'),
  },
  iconRow3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2.5%'),
    marginLeft: wp('3%'),
    padding: wp('5%'),
  },
  sizeView: {
    width: wp('7.5%'),
    height: wp('7.5%'),
    backgroundColor: '#ffffff',
  },

   sizeBoxView: {
    flexDirection: 'row',
    marginLeft: wp('7.5%'),
    gap: wp('2%'),
  },
  boxsizeView: {
    width: wp('11%'),
    height: hp('5.5%'),
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  text5: {
    fontSize: wp('4%'),
    color: '#fff',
    fontWeight: '900',
  },

  quantityView: {},

  quantityText: {
    color: '#ffff',

    fontWeight: '900',
  },
  button2: {
    width: '100%',
    paddingHorizontal: wp('3.5%'), 
    alignItems: 'center',
    marginTop: hp('2.5%'),
  },
  buttonbox1: {
    paddingVertical: 20,
    paddingHorizontal: 110,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#484848',
  },
  buttonbox: {
    paddingVertical: 20,
    paddingHorizontal: 130,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

    text6: {
    fontSize: wp('4%'),
    fontWeight: '900',
    color: '#ffff',
  },

  discrptionView: {
    backgroundColor: '#000000',
    padding: wp('8%'),
  },
  hiddenInfoSection: {
    display: 'none',
  },
  text8: {
    color: '#fffdfd',
    fontSize: wp('4%'),
    fontWeight: '900',
  },

  selectedView: {
    paddingVertical: hp('0.6%'),
    paddingHorizontal: wp('1.2%'),
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fea26d',
    backgroundColor: '#2e2e2e',
  },
  text9: {
    color: '#fff',
    marginTop: hp('1.8%'),
    padding: wp('2.5%'),
    fontWeight: '900',
    fontSize: wp('4%'),
  },
  text10: {
    color: '#d8d8d8',
    marginLeft: wp('3%'),
  },
  recommendText: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: '#ffff',
  },
  recommandView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2.5%'),
    padding: wp('2.5%'),
  },
  imageView: {
    backgroundColor: '#ffff',
    flexDirection: 'row',
    gap: wp('1%'),
  },
  policyOuterContainer: {
    paddingHorizontal: wp('6%'), 
    marginTop: hp('2.5%'),       
  },
  policyHeaderTitle: {
    fontSize: wp('4%'),         
    color: '#ffffff',
    fontWeight: '900',
    marginLeft:wp('4%'),
  },
  policyMessageContent: {
    marginTop: hp('1%'),
    backgroundColor: '#000000',
    padding: wp('4%'),           
    
   
  },
  policyContentBody: {
    fontSize: wp('3.8%'),
    color: '#ffffff',
    lineHeight: wp('5.2%'),      
  },
  policyLinkText: {
    fontWeight: '600',
    color: '#fea26d',
    marginTop: hp('1.2%'),
    fontSize: wp('3.8%'),
  },
});
