import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Tokens } from '../theme/theme';

import authService from '../services/authService'; 
import { useAlertModal } from '../component/modal'; 
const { width } = Dimensions.get('window');
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const TOTAL_PADDINGS = Tokens.layout.paddingHorizontal * 2;
const RECOMMENDATION_CARD_WIDTH = (width - TOTAL_PADDINGS - Tokens.gaps.small * 2) / 3;

const CartScreen = ({ navigation }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showModal } = useAlertModal(); 

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCartData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchCartData = async () => {
    setLoading(true);
    try {
      const token = await authService.getAccessToken();
      const url = `https://fitmatters-backend.onrender.com/cart/getCartItem`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await response.json();
      console.log("Raw API Response JSON:", json);

      if (json && json.status && json.data && json.data.items) {
        setAllProducts(json.data.items);
      }
    } catch (error) {
      console.error("Fetch failure:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId, size) => {
    if (!productId || !size) {
      showModal({
        title: 'Error',
        message: 'Invalid Product ID or Size Reference.',
        variant: 'error',
        confirmText: 'OK'
      });
      return;
    }

    try {
      setLoading(true);
      const token = await authService.getAccessToken();
      const url = `https://fitmatters-backend.onrender.com/cart/removeItem`;

      console.log(`Sending Delete Request for Product ID: ${productId}, Size: ${size}`);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          productId: String(productId),
          size: String(size)
        })
      });

      const json = await response.json();
      console.log("Remove Item Response Data:", json);
      
      if (response.ok) {
        if (json.data && json.data.items) {
          setAllProducts(json.data.items);
        } else {
          setAllProducts(prev => prev.filter(item => {
            const idToCompare = typeof item.productId === 'object' ? item.productId.id : item.productId;
            return !(Number(idToCompare) === Number(productId) && item.size === size);
          }));
        }
        showModal({
          title: 'Success',
          message: 'Item variant removed from your cart.',
          variant: 'success',
          confirmText: 'Awesome'
        });
      } else {
        showModal({
          title: 'Failed to Remove',
          message: json.msg || `Server error code: ${response.status}`,
          variant: 'error',
          confirmText: 'Try Again'
        });
      }
    } catch (error) {
      console.error("Remove item error:", error);
      showModal({
        title: 'Network Error',
        message: 'Network connection error. Check your backend server logs.',
        variant: 'error',
        confirmText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (item) => {
    const rawProduct = item.productId;
    if (!rawProduct) return;

    navigation.navigate('ProductDetailScreen', {
      product: rawProduct,            
      isUpdating: true,               
      initialQty: item.quantity,       
      itemSize: item.size              
    });
  };




  const handleEmptyCart = async () => {
    showModal({
      title: 'Empty Cart',
      message: 'Are you sure you want to remove all items from your cart?',
      variant: 'warning',
      cancelText: 'Cancel',
      confirmText: 'Clear All',
      onConfirm: async () => {
        try {
          setLoading(true);
          const token = await authService.getAccessToken();
          const url = `https://fitmatters-backend.onrender.com/cart/empty-cart`;

          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          const json = await response.json();
          if (response.ok) {
            setAllProducts([]);
            showModal({
              title: 'Cleared',
              message: 'Your shopping cart is now empty.',
              variant: 'success',
              confirmText: 'OK'
            });
          } else {
            showModal({
              title: 'Error',
              message: json.msg || 'Failed to empty cart.',
              variant: 'error',
              confirmText: 'Back'
            });
          }
        } catch (error) {
          console.error("Empty cart failure:", error);
          showModal({
            title: 'Error',
            message: 'Could not complete operation.',
            variant: 'error',
            confirmText: 'OK'
          });
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => console.log('Emptying cart cancelled')
    });
  };

  const renderCartItem = ({ item }) => {
    const productInfo = item.productId || {};
    const targetId = productInfo.id || item.productId;

    return (
      <View style={styles.mainOrderCard}>
        <View style={styles.orderIdView}>
          <Text style={styles.orderIdText} numberOfLines={1}>Item ID: {item._id}</Text>
          
          <TouchableOpacity style={styles.orderDetailButton}>
            <LinearGradient
              colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientOuterBorder}
            >
              <LinearGradient
                colors={['#322C28', '#2B1C19', '#2B2220']}
                locations={[0.2, 0.5, 0.8]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.chipInnerContentContainerActive}
              >
                <Text style={styles.detailsBtnText}>Details</Text>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        <View style={styles.orderDateView}>
          <Text style={styles.orderplacedDateText}></Text>
        </View>

        <View style={styles.imageAndDetailView}>
          <View style={styles.recommendationItem}>
            <Image
              source={{ uri: productInfo.images?.[0] || productInfo.thumbnail || 'https://via.placeholder.com/150' }}
              style={styles.recommendationImage}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.productDetailView}>
            <Text style={styles.PrdouctDetailText} numberOfLines={1}>
              {productInfo.title || "Unknown Product"}
            </Text>
            <Text style={styles.PrdouctDetailsubText1} numberOfLines={3}>
              {productInfo.description || "No description provided"}
            </Text>
            <Text style={styles.PrdouctDetailsubText}>
              Total: ₹{item.total}
            </Text>
          </View>
        </View>

        <View style={styles.statusDetailView}>
          <Text style={styles.PrdouctDetailText}>Price: ₹{item.price}</Text>
          <Text style={styles.PrdouctDetailText}>Qty: {item.quantity}</Text>
        </View>

        <View style={styles.lineDivider} />
        
        <View style={styles.updateButtonView}>
         <TouchableOpacity 
  style={styles.actionTouch} 
  onPress={() => handleRemoveItem(targetId, item.size)}
>
  <LinearGradient
    colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
    start={{ x: 0.2, y: 0 }}
    end={{ x: 0.9, y: 0 }}
    style={styles.modalButtonGradient}
  >
    <Text style={styles.actionBtnText}>Delete</Text>
  </LinearGradient>
</TouchableOpacity>

          <TouchableOpacity 
  style={styles.actionTouch} 
  onPress={() => {
    if (navigation) {
      navigation.navigate('ProductDisplay', { 
        product: productInfo,
        isUpdating: true,
        initialQty: item.quantity, 
        itemSize: item.size         
      });
    } else {
      showModal({
        title: 'Navigation Error',
        message: 'Navigation instance reference error.',
        variant: 'error',
        confirmText: 'OK'
      });
    }
  }}
>
  <LinearGradient
    colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
    start={{ x: 0.2, y: 0 }}
    end={{ x: 0.9, y: 0 }}
    style={styles.modalButtonGradient}
  >
    <Text style={styles.actionBtnText}>Update</Text>
  </LinearGradient>
</TouchableOpacity>

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
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          
          <View style={styles.backHeaderView}>
            <Text style={styles.backButtonText}>Cart</Text>
            
            {allProducts.length > 0 && (
              <TouchableOpacity style={styles.emptyCartTouch} onPress={handleEmptyCart} activeOpacity={0.7}>
                <Text style={styles.emptyCartText}>Empty Cart</Text>
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#F16646" style={{ flex: 1, justifyContent: 'center' }} />
          ) : (
            <FlatList
              data={allProducts}
              renderItem={renderCartItem}
              keyExtractor={(item) => item._id || item.productId?.toString()}
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={[styles.PrdouctDetailText, { textAlign: 'center', marginTop: 40 }]}>
                  Your cart is empty.
                </Text>
              }
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screenContainer: {  
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    paddingBottom: 30,
  },
  backHeaderView: {
    width: '100%',
    height: 60,
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.title || 20,
    color: '#E5E5E5',
  },
  emptyCartTouch: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#E5E5E530',
  },
  emptyCartText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 12,
    color: '#FF6B6B',
  },
  mainOrderCard: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#585757',
    backgroundColor: '#000000',
    marginTop: Tokens.gaps.section,
    padding: 12,
  },
  orderIdView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  orderIdText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.small || 12,
    color: '#E5E5E5',
    flex: 1,
    marginRight: 8,
  },
  detailsBtnText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 12,
    color: '#E5E5E5',
  },
  orderDetailButton: {
    width: 80,
    height: 32,
    borderRadius: 18,
    overflow: 'hidden',
  },
  orderplacedDateText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 11,
    color: '#A3A3A3',
  },
  orderDateView: {
    marginTop: 4,
    marginBottom: 12,
  },
  recommendationItem: {
    width: RECOMMENDATION_CARD_WIDTH,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#1E1E20',
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
  imageAndDetailView: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  productDetailView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  PrdouctDetailText: {
    fontFamily: Tokens.typography.families.semiBold || 'System',
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 4,
  },
  PrdouctDetailsubText1: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 13,
    color: '#A3A3A3',
    lineHeight: 18,
    marginBottom: 6,
  },
  PrdouctDetailsubText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    color: '#F8876C',
  },
  statusDetailView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#141415',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  lineDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#333335',
    marginVertical: 14,
  },
  updateButtonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionTouch: {
    flex: 1,
    height: 40,
  },
  actionBtnText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    color: '#ffffff',
  },
  modalButtonGradient: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOuterBorder: {
    flex: 1,
    borderRadius: 18,
    padding: 1,
  },
  chipInnerContentContainerActive: {
    flex: 1,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;