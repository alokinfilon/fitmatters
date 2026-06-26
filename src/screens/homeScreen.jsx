import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';

import { Tokens } from '../theme/theme'; 


const TOTAL_SIDE_PADDING = Tokens.layout.paddingHorizontal * 2;
const DYNAMIC_FEED_CARD_WIDTH = (Tokens.layout.width - TOTAL_SIDE_PADDING - Tokens.gaps.small) / 2;

const OutfitFeed = ({ navigation }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = () => {
    setLoading(true);
    const url = `https://fitmatters-backend.onrender.com/products`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json && json.products) {
          setAllProducts(json.products);
        }
      })
      .catch(error => console.error("Fetch failure:", error))
      .finally(() => setLoading(false));
  };

  const toggleCategory = (category) => {
    setActiveCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const displayedProducts = allProducts.filter(product => {
    if (activeCategories.length === 0) return true;
    return activeCategories.includes(product.category);
  });

  const openProductDisplay = item => {
    if (navigation) {
      navigation.push('ProductDisplay', { product: item });
      console.log(item)
    }
  };

  const renderCircleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.circleItemContainer}
      activeOpacity={0.85}
      onPress={() => openProductDisplay(item)}
    >
      <Shadow
        distance={6}              
        startColor="rgba(253, 190, 159, 0.45)"      
        endColor="rgba(0, 0, 0, 0)"                 
        offset={[6, 6]}
        radius={Tokens.scaleAsset(50)}              
        paintInside={false}
      >
        <LinearGradient
          colors={['#FDABAC', '#FDEABF']}
          start={{ x: 0.01, y: 0.5 }}
          end={{ x: 0.99, y: 0.5 }}
          style={styles.circleGradientRing}
        >
          <View style={styles.circleWrapperInner}>
            <Image
              source={{ uri: item.images?.[0] || item.thumbnail }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
        </LinearGradient>
      </Shadow>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.chipGridContainer}>
        
        {/* ROW 1 */}
        <View style={styles.chipRow}>
          
          
          <TouchableOpacity 
            onPress={() => toggleCategory('everyday-dress')} 
            activeOpacity={0.85}
            style={{ width: Tokens.scaleAsset(150) }}
            keyboardShouldPersistTaps="handled"
            accessible={true}
          >
            {activeCategories.includes('everyday-dress') ? (
              <Shadow
                distance={10}
                startColor="rgba(248, 135, 108, 0.32)"
                endColor="rgba(0, 0, 0, 0)"
                offset={[0, 0]}
                paintInside={false}
                containerStyle={styles.shadowContainerFluid}
                style={styles.shadowStyleFluid}
                stretch={true}     
              >
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
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextActive} >👟 Everyday Fit</Text>
                  </LinearGradient>
                </LinearGradient>
              </Shadow>
            ) : (
              <LinearGradient 
                colors={[ '#373737','#242426']}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }}   
                style={styles.inactiveChipContainer}
              >
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextInactive}> 👟 Everyday Fit</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
           keyboardShouldPersistTaps="handled"
            accessible={true}
            onPress={() => toggleCategory('work-dress')} 
            activeOpacity={0.85}
            style={{ width: Tokens.scaleAsset(120) }}
          >
            {activeCategories.includes('work-dress') ? (
              <Shadow
                distance={10}
                startColor="rgba(248, 135, 108, 0.32)"
                endColor="rgba(0, 0, 0, 0)"
                offset={[0, 0]}
                paintInside={false}
                containerStyle={styles.shadowContainerFluid}
                style={styles.shadowStyleFluid}
                stretch={true}     
              >
                <LinearGradient
                  colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                  start={{ x: 0, y: 0 }}
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
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextActive}>💼 Work Fit</Text>
                  </LinearGradient>
                </LinearGradient>
              </Shadow>
            ) : (
              <LinearGradient 
                colors={[ '#373737','#242426']}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }}   
                style={styles.inactiveChipContainer}
              >
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextInactive}> 💼 Work Fit</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.chipRow}>
          <TouchableOpacity 
            onPress={() => toggleCategory('winter-dress')} 
             keyboardShouldPersistTaps="handled"
            accessible={true}
            activeOpacity={0.85}
            style={{ width: Tokens.scaleAsset(200) }}
          >
            {activeCategories.includes('winter-dress') ? (
              <Shadow
                distance={10}
                startColor="rgba(248, 135, 108, 0.32)"
                endColor="rgba(0, 0, 0, 0)"
                offset={[0, 0]}
                paintInside={false}
                containerStyle={styles.shadowContainerFluid}
                style={styles.shadowStyleFluid}
                stretch={true}     
              >
                <LinearGradient
                  colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                  start={{ x: 0, y: 0 }}
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
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextActive}>❄️ Winter Vacation Fit</Text>
                  </LinearGradient>
                </LinearGradient>
              </Shadow>
            ) : (
              <LinearGradient 
                colors={[ '#373737','#242426']}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }}   
                style={styles.inactiveChipContainer}
              >
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextInactive}>❄️ Winter Vacation Fit</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleCategory('date-dress')} 
             keyboardShouldPersistTaps="handled"
            accessible={true}
            activeOpacity={0.85}
            style={{ width: Tokens.scaleAsset(160) }}
          >
            {activeCategories.includes('date-dress') ? (
              <Shadow
                distance={10}
                startColor="rgba(248, 135, 108, 0.32)"
                endColor="rgba(0, 0, 0, 0)"
                offset={[0, 0]}
                paintInside={false}
                containerStyle={styles.shadowContainerFluid}
                style={styles.shadowStyleFluid}
                stretch={true}     
              >
                <LinearGradient
                  colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                  start={{ x: 0, y: 0 }}
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
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextActive}>💃 Date Night Fit</Text>
                  </LinearGradient>
                </LinearGradient>
              </Shadow>
            ) : (
              <LinearGradient 
                colors={[ '#373737','#242426']}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }}   
                style={styles.inactiveChipContainer}
              >
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextInactive}>💃 Date Night Fit</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>

        {/* ROW 3 */}
        <View style={styles.chipRow}>
          <TouchableOpacity 
            onPress={() => toggleCategory('summer-dress')} 
             keyboardShouldPersistTaps="handled"
            accessible={true}
            activeOpacity={0.85}
            style={{ width: Tokens.scaleAsset(202) }}
          >
            {activeCategories.includes('summer-dress') ? (
              <Shadow
                distance={10}
                startColor="rgba(248, 135, 108, 0.32)"
                endColor="rgba(0, 0, 0, 0)"
                offset={[0, 0]}
                paintInside={false}
                containerStyle={styles.shadowContainerFluid}
                style={styles.shadowStyleFluid}
                stretch={true}     
              >
                <LinearGradient
                  colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                  start={{ x: 0, y: 0 }}
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
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextActive}>Summer Vacation Fit</Text>
                  </LinearGradient>
                </LinearGradient>
              </Shadow>
            ) : (
              <LinearGradient 
                colors={[ '#373737','#242426']}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }}   
                style={styles.inactiveChipContainer}
              >
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextInactive}> Summer Vacation Fit</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleCategory('night-out-dress')} 
             keyboardShouldPersistTaps="handled"
            accessible={true}
            activeOpacity={0.85}
            style={{ width: Tokens.scaleAsset(154) }}
          >
            {activeCategories.includes('night-out-dress') ? (
              <Shadow
                distance={10}
                startColor="rgba(248, 135, 108, 0.32)"
                endColor="rgba(0, 0, 0, 0)"
                offset={[0, 0]}
                paintInside={false}
                containerStyle={styles.shadowContainerFluid}
                style={styles.shadowStyleFluid}
              >
                <LinearGradient
                  colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                  start={{ x: 0, y: 0 }}
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
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextActive}>✨ Night Out Fit</Text>
                  </LinearGradient>
                </LinearGradient>
              </Shadow>
            ) : (
              <LinearGradient 
                colors={[ '#373737','#242426']}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }}   
                style={styles.inactiveChipContainer}
              >
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chipTextInactive}>✨ Night Out Fit</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.lineDivider} />

      <FlatList
        data={displayedProducts.slice(0, 10)} 
        renderItem={renderCircleItem}
        keyExtractor={item => `circle-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.circleCarouselPadding}
      />
    </View>
  );

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.clothingCard}
      activeOpacity={0.9}
      onPress={() => openProductDisplay(item)}
    >
      <Image
        source={{ uri: item.images?.[0] || item.thumbnail }}
        style={styles.clothingCardImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#0F0F0F', '#0D0D0D']}
        start={{ x: 0.44, y: 0 }}
        end={{ x: 0.54, y: 0.98 }}
        style={styles.screenContainer}
      >
        <StatusBar barStyle="light-content" backgroundColor="#0F0F0F" />
        
        <SafeAreaView style={styles.mainContainer} edges={['top', 'left', 'right']}>
          <FlatList
            data={displayedProducts}
            renderItem={renderGridItem} 
            keyExtractor={item => `grid-${item.id}`}
            numColumns={2}
            columnWrapperStyle={styles.gridRowGap}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.scrollContainerPadding}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>

        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#F8876C" />
          </View>
        )}

      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContainerPadding: {
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    paddingTop: Tokens.layout.paddingVertical,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  chipGridContainer: {
    width: '100%',
    gap: Tokens.gaps.large,
    marginBottom: Tokens.gaps.xlarge,
  },
  chipRow: {
    flexDirection: 'row',
    gap: Tokens.gaps.small,
    width: '100%',
    marginBottom:0
  },
  shadowContainerFluid: {
    width: '100%',
    height: 40,
  },
  shadowStyleFluid: {
    width: '100%',
    height: 40,
    borderRadius: 14,
  },
  gradientOuterBorder: {
    height: 40,
    borderRadius: 10,
    padding: 1.5, 
    width: '100%',
  },
  chipInnerContentContainerActive: {
    height: 37, 
    borderRadius: 9, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveChipContainer: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#323537',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  chipTextActive: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  chipTextInactive: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: '#B3B3B3',
    textAlign: 'center',
  },
  lineDivider: {
    width: '100%',
    height: 0,
    borderTopWidth: 1,
    borderColor: '#323537',
    marginBottom: Tokens.gaps.xlarge,
  },
  circleCarouselPadding: {
    paddingRight: Tokens.layout.paddingHorizontal,
    gap: Tokens.gaps.medium,
    height: Tokens.scaleAsset(100),
    marginBottom: Tokens.gaps.xlarge,
  },
  circleItemContainer: {
    width: Tokens.scaleAsset(100),
    height: Tokens.scaleAsset(100),
  },
  circleGradientRing: {
    width: Tokens.scaleAsset(100),
    height: Tokens.scaleAsset(100),
    borderRadius: Tokens.scaleAsset(50),
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(251, 147, 96, 0.64)',
    marginTop:6,
    marginLeft:6,
  },
  circleWrapperInner: {
    width: '100%',
    height: '100%',
    borderRadius: Tokens.scaleAsset(50),
    backgroundColor: '#EDEDED',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  gridRowGap: {
    justifyContent: 'space-between',
    marginBottom: Tokens.gaps.small,
  },
  clothingCard: {
    width: DYNAMIC_FEED_CARD_WIDTH,
    height: 212,
    borderRadius: Tokens.components.radiusSmall,
    backgroundColor: '#FFF3E8',
    overflow: 'hidden',
  },
  clothingCardImage: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    backgroundColor: 'rgba(15, 15, 15, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OutfitFeed;
