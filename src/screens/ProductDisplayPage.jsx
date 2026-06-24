import React, { useState, useEffect, useContext  }  from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
  Alert,
  ActivityIndicator

} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import NikeIcon from '../component/svg/nikeIcon';
import HMIcon from '../component/svg/h&mIcon';
import PlusIcon1 from '../component/svg/plusGradientIcon'
import CustomButton from '../component/customButton';

import {
  ArrowLeft,
  Home as HomeIcon,
  Image as CommunityIcon,
} from 'lucide-react-native';
import { Tokens } from '../theme/theme';
import CheckMarkl from '../component/svg/checkMarklIcon';
import ScaleInfoIcon from '../component/svg/scaleInfoIcon';
import PlusIcon from '../component/svg/PlusIcon';
import MinusIcon from '../component/svg/minusIcon';
import ArrowLeftIcon from '../component/svg/arrow';
import authService from '../services/authService';
import { useAlertModal } from '../component/modal'; 
import { AuthContext } from '../../App'; 

const feedbackIconSize = Tokens.scaleAsset(12);
const { width } = Dimensions.get('window');
const TOTAL_PADDINGS = Tokens.layout.paddingHorizontal * 2;
  const [selectedSize, setSelectedSize] = useState(initialSizeFromCart || ''); 
const TAB_CONTAINER_WIDTH = Dimensions.get('window').width - (Tokens.layout.paddingHorizontal * 2);
const EXACT_TAB_WIDTH = (TAB_CONTAINER_WIDTH - (4 * 2)) / 3; 
const SINGLE_ROW_CHIP_WIDTH = (width - TOTAL_PADDINGS - Tokens.gaps.small * 5) / 7;
const RECOMMENDATION_CARD_WIDTH = (width - TOTAL_PADDINGS - Tokens.gaps.small * 2) / 3;

const CAROUSEL_WIDTH = width - TOTAL_PADDINGS;

export default function ProductDetails({ route, navigation }) {
  const product = route?.params?.product;
  const isUpdating = route?.params?.isUpdating || false;
  const currentQuantity = route?.params?.currentQuantity || 1;
 const [selectedSize, setSelectedSize] = useState(initialSizeFromCart || ''); 
const initialSize = route.params?.itemSize || '';
  const [activeTab, setActiveTab] = useState('Shipping Info');
  const [wholeLookChecked, setWholeLookChecked] = useState(true);
  const { showModal } = useAlertModal();
  const [topSize, setTopSize] = useState('M');
  const [loading, setLoading] = useState(false);
  const [bottomSize, setBottomSize] = useState('M');
  const [bottomQty, setBottomQty] = useState(1);
  const [footwearSize, setFootwearSize] = useState('M');
  const [footwearQty, setFootwearQty] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setUserIsAuthenticated } = useContext(AuthContext);
const [currentSize, setCurrentSize] = useState(initialSize || 'M');
  const [topQty, setTopQty] = useState(1);

  useEffect(() => {
    if (isUpdating && currentQuantity) {
      setTopQty(currentQuantity);
    }
  }, [isUpdating, currentQuantity]);

  const productImages = product?.images || [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80&sig=back',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80&sig=side'
  ];

  const productTitle = product?.title || 'Streetwear Set – Urban Chill';
  const productDescription = product?.description || 'Outfit curated from 3 brands.';
  const productPrice = product?.price ? `₹${Math.round(product.price * 30)}` : '₹3,499';
  const comboPrice = product?.price ? `₹${Math.round(product.price * 30 + 2000)}` : '₹5,499';
  const availabilityStatus = product?.availabilityStatus || 'In Stock';
  const brandName = product?.tags?.[0]?.toUpperCase() || 'H&M';

  const recImage1 = 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=200&q=80';
  const recImage2 = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=200&q=80';
  const recImage3 = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80';

  const handleGoBack = () => {
    if (navigation) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.replace('HomeTab');
      }
    }
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CAROUSEL_WIDTH);
    setActiveIndex(index);
  };

const handleAddToCart = async () => {
    console.log("Clicked main cart action button");
    
    if (!product) {
      showModal({
        title: 'Selection Error',
        message: 'No product selected to process.',
        variant: 'error'
      });
      return;
    }

    if (!currentSize) {
      showModal({
        title: 'Size Required',
        message: 'Please select a size before adding this product to your cart.',
        variant: 'error'
      });
      return;
    }

    try {
      setLoading(true);
      const token = await authService.getAccessToken();

      const url = isUpdating 
        ? 'https://fitmatters-backend.onrender.com/cart/updateQuantity' 
        : 'https://fitmatters-backend.onrender.com/cart/addItem';
        
      const httpMethod = isUpdating ? 'PUT' : 'POST';

      let payload = {};
      
      if (isUpdating) {
        payload = {
          productId: String(product.id), 
          quantity: topQty,
          oldSize: initialSize, 
          newSize: currentSize 
        };
      } else {
        payload = {
          productId: String(product.id), 
          quantity: topQty,
          size: currentSize     
        };
      }
      
      console.log(`Sending payload to ${url} via ${httpMethod}:`, payload);

      const response = await fetch(url, {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setLoading(false);
      
      if (response.ok) {
        showModal({
          title: isUpdating ? 'Quantity Updated' : 'Added to Cart',
          message: isUpdating 
            ? `The quantity for ${product.title || 'Product'} has been updated successfully!`
            : `${product.title || 'Product'} has been added to your cart successfully!`,
          variant: 'success',
          confirmText: 'View Cart',
          cancelText: 'Keep Shopping',
          onConfirm: () => {
            if (isUpdating) {
              navigation.goBack();
            } else {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'MainTab',
                    state: {
                      routes: [{ name: 'CartScreen' }],
                    },
                  },
                ],
              });
            }
          }
        });
      } else {
        throw new Error(data.msg || data.message || 'Failed to update cart status.');
      }
    } catch (error) {
      setLoading(false);
      showModal({
        title: 'Cart Error',
        message: error.message || 'Something went wrong while updating your cart.',
        variant: 'error'
      });
    }
  };


  const renderItemVariantPicker = (
    title,
    brandLogoText,
    description,
    currentSize,
    setSize,
    currentQty,
    setQty,
  ) => {
    return (
      <View style={styles.ClothingBox}>
        <View style={styles.clothingHeaderView}>
          <Text style={styles.clothTitleText}>Top Wear</Text>
          <HMIcon
            size={Tokens.scaleAsset(60)}
            color="#FFFFFF"
            backgroundColor="transparent"
          />
        </View>
        <Text style={styles.clothDescriptionText}>{description}</Text>

        <View style={styles.sizeHeaderLabelRow}>
          <Text style={styles.sizeSectionTitleText}>Size</Text>
          <ScaleInfoIcon
            size={Tokens.scaleAsset(22)}
            color="#FDABAC"
            strokeWidth={2}
          />
        </View>

       <View style={styles.sizeHorizontalRow}>
  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => {
    const isSelected = currentSize === size;
    return (
      <LinearGradient
        key={size}
        colors={isSelected ? ['#FF6B6B', '#FF8E53'] : ['#333637', '#242426']}
        start={{ x: 0.0105, y: 0.5 }}
        end={{ x: 0.9866, y: 0.5 }}
        style={[
          styles.sizeBoxButton,
          isSelected && styles.sizeBoxButton1,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setCurrentSize(size)} 
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={[
              styles.sizeItemText,
              isSelected && styles.sizeItemTextActive,
            ]}
          >
            {size}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  })}
</View>


        <View style={styles.quantityView}>
          <Text style={styles.quantityText}>Quantity</Text>
          <View style={styles.counterActionLayoutGroup}>
            <TouchableOpacity
              style={styles.counterTouch}
              onPress={() => setQty(Math.max(1, currentQty - 1))}
              activeOpacity={0.6}
            >
              <MinusIcon
                size={Tokens.scaleAsset(24)}
                color="#CCCCCC"
                strokeWidth={3}
              />
            </TouchableOpacity>
            <LinearGradient
              colors={['#333637', '#242426']}
              start={{ x: 0.01, y: 0.5 }}
              end={{ x: 0.99, y: 0.5 }}
              style={styles.counterBox}
            >
              <Text style={styles.counterValueText}>{currentQty}</Text>
            </LinearGradient>
            <TouchableOpacity
              style={styles.counterTouch}
              onPress={() => setQty(currentQty + 1)}
              activeOpacity={0.6}
            >
              <PlusIcon
                size={Tokens.scaleAsset(24)}
                color="#CCCCCC"
                strokeWidth={3}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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
        <SafeAreaView
          style={styles.mainContainer}
          edges={['top', 'left', 'right']}
        >
          <View style={styles.backHeaderView}>
            <TouchableOpacity
              style={styles.backButtonView}
              onPress={handleGoBack}
              activeOpacity={0.7}
            >
              <ArrowLeftIcon
                size={Tokens.scaleAsset(24)}
                color="#E5E5E5"
                strokeWidth={1.5}
              />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={styles.headerView}>
              <Text style={styles.productTitleText}>
                {productTitle}
              </Text>
              <Text style={styles.productSubtitleText}>
                Outfit curated from 3 brands
              </Text>
            </View>

            <View style={styles.postBoxView}>
              <FlatList
                data={productImages}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    style={{ width: CAROUSEL_WIDTH, height: 389 }}
                    resizeMode="cover"
                  />
                )}
              />

              {productImages.length > 1 && (
                <View style={styles.ImageCarousel}>
                  {productImages.map((_, index) => {
                    const isActive = index === activeIndex;
                    return isActive ? (
                      <LinearGradient
                        key={index}
                        colors={['#FEF9BD', '#FA83F2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.indicatorDotActive}
                      />
                    ) : (
                      <View key={index} style={styles.indicatorDotInactive} />
                    );
                  })}
                </View>
              )}
            </View>

            <View style={styles.priceView}>
              <Text style={styles.priceText}>
                {productPrice}{' '}
                <Text style={styles.excludingExtrasLabel}>
                  (Excluding extras)
                </Text>
              </Text>

              <LinearGradient
                colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.gradientBorderOuterView}
              >
                <View style={styles.solidColorBackgroundMaskShield}>
                  <LinearGradient
                    colors={['#312B27', '#2A1C19', '#2A211E']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0.8, y: 0.5 }}
                    style={styles.stockBadge}
                  >
                    <Text style={styles.stockText}>{availabilityStatus}</Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.controlRowView}>
              <TouchableOpacity
                style={[
                  styles.checkmarkToggleView,
                  wholeLookChecked && styles.checkmarkToggleActiveView,
                ]}
                onPress={() => setWholeLookChecked(!wholeLookChecked)}
                activeOpacity={0.8}
              >
                {wholeLookChecked && (
                  <LinearGradient
                    colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                    start={{ x: 0.3, y: 0.5 }}
                    end={{ x: 0.7, y: 0.5 }}
                    style={styles.checkmarkInnerGradientView}
                  >
                    <CheckMarkl
                      size={feedbackIconSize + 8}
                      color="#ffffff"
                      strokeWidth={3}
                    />
                  </LinearGradient>
                )}
              </TouchableOpacity>

              <View style={styles.comboDetailView}>
                <Text style={styles.comboText}>
                  Buy the whole look(including extras).
                </Text>
                <Text style={styles.comboPriceText}>
                  {comboPrice}{' '}
                  <Text style={styles.allCombinedLabel}>
                    (all items combined)
                  </Text>
                </Text>
                <Text style={styles.comboDescriptionText}>
                  Curated look matching your vibe.
                </Text>
                <View style={styles.brandView}>
                  <Text style={styles.brandsText}>Brand: </Text>
                  <NikeIcon size={Tokens.scaleAsset(60)} color="#FFFFFF" />
                  <HMIcon
                    size={Tokens.scaleAsset(60)}
                    color="#FFFFFF"
                    backgroundColor="transparent"
                  />
                </View>
              </View>
            </View>

            <View style={styles.Divider} />
            <View style={styles.SelectionView}>
              <Text style={styles.SelectionText}>Size Selection</Text>
            </View>

            {product ? (
              renderItemVariantPicker(
                productTitle,
                brandName,
                productDescription,
                topSize,
                setTopSize,
                topQty,
                setTopQty,
              )
            ) : (
              <>
                {renderItemVariantPicker(
                  'Top Wear',
                  'H&M',
                  '100% cotton, soft-touch finish.',
                  topSize,
                  setTopSize,
                  topQty,
                  setTopQty,
                )}
                {renderItemVariantPicker(
                  'Bottom Wear',
                  'H&M',
                  'Slim fit, stretchable denim.',
                  bottomSize,
                  setBottomSize,
                  bottomQty,
                  setBottomQty,
                )}
                {renderItemVariantPicker(
                  'Footwear',
                  'NIKE',
                  'Breathable sole, regular fit.',
                  footwearSize,
                  setFootwearSize,
                  footwearQty,
                  setFootwearQty,
                )}
              </>
            )}

            <TouchableOpacity style={styles.addExtrasView} activeOpacity={0.7}>
              <PlusIcon1
                size={Tokens.scaleAsset(24)}
                color="#FDABAC"
                strokeWidth={3}
              />
              <Text style={styles.addExtrasText}>
                {' '}
                Add Extras{' '}
                <Text style={styles.addExtrasSubtext}>(belt, cap, scarf)</Text>
              </Text>
            </TouchableOpacity>

            <View style={styles.buttonGroupBox}>
              <LinearGradient
                colors={['#333637', '#242426']}
                start={{ x: 0.01, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.buttonGroupBox2}
              >
                <Text style={styles.buttonGroupBox1Text}>Add to CaRT</Text>
              </LinearGradient>

              
               {loading ? (
                              <ActivityIndicator size="large" color="#F16646" />
                            ) : (
              <CustomButton
                colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                 onPress={handleAddToCart}
                fontFamily={Tokens.typography.families.semiBold}
                fontSize={Tokens.typography.sizes.subButton}
                title={loading ? 'Adding to cart...' : 'Buy Now'}
                disabled={loading}
                buttonStyle={{ borderRadius: Tokens.components.radiusButton }}
              />
               )}
            </View>

            <View style={styles.Divider1} />

            <View style={styles.tabView}>
              {['Shipping Info', 'How It Works', 'Product Info'].map(tab => {
                const isTabActive = activeTab === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    activeOpacity={0.85}
                    style={styles.buttonWrapper}
                  >
                    {isTabActive ? (
                      <LinearGradient
                        colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.activeBorderGradientView}
                      >
                        <View style={styles.activeSolidBackgroundMaskShield}>
                          <LinearGradient
                            colors={['#FDDBBD26', '#F77D611F', '#FBB49D1F']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.activeGredientView}
                          >
                            <Text style={styles.categoryTabText}>{tab}</Text>
                          </LinearGradient>
                        </View>
                      </LinearGradient>
                    ) : (
                      <View style={styles.activeGredientView1}>
                        <Text style={styles.categoryTabText1}>{tab}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            
            {activeTab === 'Shipping Info' && (
              <View style={styles.tabInfoView}>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Delivery Time</Text>
                  <Text style={styles.tabText2}>
                    Delivered within 3–5 business days by brand partner.
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Delivery Partner</Text>
                  <Text style={styles.tabText2}>
                    Shipped directly by H&M / Levis / Nike.
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Tracking Info</Text>
                  <Text style={styles.tabText2}>
                    You’ll receive tracking updates in your Order History once placed.
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Delivery Charge</Text>
                  <Text style={styles.tabText2}>
                    Free shipping for orders above ₹1,999.
                  </Text>
                </View>
              </View>
            )}

            {activeTab === 'How It Works' && (
              <View style={styles.tabInfoView}>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Select Your Look</Text>
                  <Text style={styles.tabText2}>
                    Choose full outfit or specific pieces.
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Checkout Securely</Text>
                  <Text style={styles.tabText2}>
                    Pay via UPI, Card, or Wallet.
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Order Confirmed</Text>
                  <Text style={styles.tabText2}>
                    We sync order with brand partner.
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Shipped by Brand</Text>
                  <Text style={styles.tabText2}>
                    Track updates inside the app.
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Refund Available (12 hrs)</Text>
                  <Text style={styles.tabText2}>
                    Cancel or refund within the first 12 hours.
                  </Text>
                </View>
              </View>
            )}

            {activeTab === 'Product Info' && (
              <View style={styles.tabInfoView}>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Material</Text>
                  <Text style={styles.tabText2}>
                    100% Cotton (T-shirt), Stretch Denim (Jeans), Mesh (Shoes)
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Fit Type</Text>
                  <Text style={styles.tabText2}>
                    Regular Fit / Slim Fit / Relaxed
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Care Instructions</Text>
                  <Text style={styles.tabText2}>
                    Machine wash cold, tumble dry low.
                  </Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Color Options</Text>
                  <Text style={styles.tabText2}>Black, Navy, Olive</Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Made In</Text>
                  <Text style={styles.tabText2}>Made in India / Imported</Text>
                </View>
                <View style={styles.tabInfoView1}>
                  <Text style={styles.tabText1}>Sustainability Note</Text>
                  <Text style={styles.tabText2}>
                    Eco-certified fabric used.
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.tabInfoView2}>
              <View style={styles.tabInfoView1}>
                <Text style={styles.tabText1}>Refund & Returns</Text>
                <Text style={styles.tabText2}>
                  After 12 hours, returns are managed by the brand. Initiate returns from your Order page.{'\n'}
                  <View style={styles.refundPolicyView}>
                    <Text style={styles.refundPolicyText}>
                      Read Refund Policy
                    </Text>
                  </View>
                </Text>
              </View>
            </View>

            <View style={styles.recommendationView}>
              <View style={styles.recommendationPRoductView}>
                <Text style={styles.recommendationText}>
                  Recommend Products
                </Text>
              </View>
              <View style={styles.recommendationCardsView}>
                <TouchableOpacity style={styles.recommendationItem} activeOpacity={0.9}>
                  <Image source={{ uri: recImage1 }} style={styles.recommendationImage} resizeMode="cover" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.recommendationItem} activeOpacity={0.9}>
                  <Image source={{ uri: recImage2 }} style={styles.recommendationImage} resizeMode="cover" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.recommendationItem} activeOpacity={0.9}>
                  <Image source={{ uri: recImage3 }} style={styles.recommendationImage} resizeMode="cover" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
    paddingBottom: 40,
  },
  backHeaderView: {
    width: '100%',
    height: 40,
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    height: '100%',
  },
  backButtonText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: '#E5E5E5',
  },
  headerView: {
    width: '100%',
    gap: Tokens.gaps.small,
    marginBottom: Tokens.gaps.large,
  },
  productTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.title,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  productSubtitleText: {
    fontFamily: Tokens.typography.families.light,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#E5E5E5',
  },
  postBoxView: {
    width: '100%',
    height: 389,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1E1E20',
    position: 'relative',
    marginBottom: Tokens.gaps.large,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  ImageCarousel: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  indicatorDotInactive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.25,
    borderColor: '#CCCCCC',
  },
  indicatorDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: Tokens.gaps.xlarge,
  },
  priceText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    lineHeight: 26,
    color: '#FFFFFF',
  },
  excludingExtrasLabel: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 16,
    color: '#E5E5E5',
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderBottomColor: 'rgba(248, 45, 0, 0.15)',
  },
  stockText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.small,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  gradientBorderOuterView: {
    padding: 1,
    borderRadius: 7,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 13,
  },
  solidColorBackgroundMaskShield: {
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#242426',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 12,
  },
  controlRowView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Tokens.gaps.large,
    width: '100%',
    paddingVertical: 4,
  },
  checkmarkToggleView: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#818181',
    backgroundColor: '#242426',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkmarkToggleActiveView: {
    borderColor: 'transparent',
  },
  checkmarkInnerGradientView: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkIconSymbol: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  comboDetailView: {
    flex: 1,
    gap: Tokens.gaps.small,
  },
  comboText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.body,
    color: '#FFFFFF',
  },
  comboPriceText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.body,
    color: '#FFFFFF',
  },
  allCombinedLabel: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 12,
    color: '#E5E5E5',
  },
  comboDescriptionText: {
    fontFamily: Tokens.typography.families.light,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#E5E5E5',
  },
  brandsText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 12,
    color: '#ffffff',
    marginTop: 4,
  },
  brandView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Tokens.components.chipHeight,
    gap: Tokens.gaps.medium,
    overflow: 'scroll',
  },
  brandsLogoText: {
    color: '#FFFFFF',
    fontFamily: Tokens.typography.families.semiBold,
  },
  Divider: {
    width: '100%',
    height: 0,
    borderTopWidth: 1,
    borderColor: '#323537',
    marginVertical: Tokens.gaps.large,
  },
  Divider1: {
    width: '100%',
    height: 0,
    borderTopWidth: 0,
    borderColor: '#000000',
    marginVertical: Tokens.gaps.large,
  },
  SelectionView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectionText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: Tokens.gaps.xlarge,
  },
  ClothingBox: {
    width: '100%',
    gap: Tokens.gaps.small,
    marginBottom: Tokens.gaps.xlarge,
  },
  clothingHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
  },
  clothTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  variantBrandLogoPlaceholderText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#B3B3B3',
  },
  clothDescriptionText: {
    fontFamily: Tokens.typography.families.light,
    fontSize: 14,
    color: '#E5E5E5',
    marginBottom: Tokens.gaps.small,
  },
  sizeHeaderLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    marginBottom: 4,
  },
  sizeSectionTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  sizeHorizontalRow: {
    flexDirection: 'row',
    gap: Tokens.gaps.small,
    width: '100%',
    marginBottom: Tokens.gaps.large,
  },
  sizeBoxButton: {
    width: SINGLE_ROW_CHIP_WIDTH,
    height: 38,
    borderRadius: 6,
    backgroundColor: '#242426',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#D3CECE45',
  },
  sizeBoxButton1: {
    borderWidth: 1,
    borderColor: '#F8876C',
  },
  sizeItemText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 12,
    color: '#B3B3B3',
  },
  sizeItemTextActive: {
    color: '#FFFFFF',
  },
  quantityText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  counterValueText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: Tokens.gaps.large,
  },
  counterActionLayoutGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Tokens.gaps.medium,
  },
  counterTouch: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperActionLineIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Tokens.typography.families.medium,
  },
  stepperActionPlusIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: Tokens.typography.families.medium,
  },
  counterBox: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: '#1E1E20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValueDisplayStaticHolderStringText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 12,
    color: '#FFFFFF',
  },
  addExtrasView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 32,
    marginVertical: Tokens.gaps.large,
  },
  addExtrasText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  addExtrasSubtext: {
    fontFamily: Tokens.typography.families.regular,
    color: '#ffffff',
    fontSize: 14,
  },
  buttonGroupBox: {
    width: '100%',
    gap: Tokens.gaps.large,
    marginTop: 8,
  },
  buttonGroupBox2: {
    width: '100%',
    height: Tokens.components.buttonHeight,
    borderRadius: Tokens.components.radiusButton,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroupBox1Text: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  buyNowButtonView: {
    width: '100%',
    height: Tokens.components.buttonHeight,
    borderRadius: Tokens.components.radiusButton,
    shadowColor: 'rgba(251, 147, 96, 0.64)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  buyNowButtonBox: {
    flex: 1,
    borderRadius: Tokens.components.radiusButton,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNowText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 38,
    marginTop: Tokens.gaps.xlarge,
    marginBottom: Tokens.gaps.large,
    gap: 4,
  },
  buttonWrapper: {
    width: EXACT_TAB_WIDTH,
    height: 36,
  },
  activeBorderGradientView: {
    flex: 1,
    padding: 1,
    borderRadius: 9,
    overflow: 'hidden',
  },
  activeSolidBackgroundMaskShield: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#242426',
  },
  activeGredientView: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2, 
  },
  activeGredientView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  categoryTabText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 13, 
    color: '#FFFFFF',
    textAlign: 'center',
  },
  categoryTabText1: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 13, 
    color: '#E5E5E5',
    textAlign: 'center',
  },
  tabInfoView: {
    width: '100%',
    gap: Tokens.gaps.xlarge,
    paddingVertical: 4,
  },
  tabInfoView2: {
    width: '100%',
    gap: Tokens.gaps.large,
    paddingVertical: 4,
  },
  tabInfoView1: {
    width: '100%',
    gap: 6,
  },
  tabText1: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  tabText2: {
    fontFamily: Tokens.typography.families.light,
    fontSize: 13,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#E5E5E5',
  },
  refundPolicyText: {
    textDecorationLine: 'underline',
    color: '#FDABAC',
    fontFamily: Tokens.typography.families.medium,
    fontSize: 13,
  },
  recommendationView: {
    width: '100%',
    gap: Tokens.gaps.large,
    marginTop: Tokens.gaps.section,
  },
  recommendationText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 20,
    lineHeight: 25,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationPRoductView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendationCardsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendationItem: {
    width: RECOMMENDATION_CARD_WIDTH,
    height: 138,
    borderRadius: 12,
    backgroundColor: '#FFF3E8',
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
});