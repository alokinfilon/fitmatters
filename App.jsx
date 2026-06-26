import React, { useEffect, useState, createContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { ModalProvider } from './src/component/modal';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash'; // 🌟 1. Import BootSplash API

import { Tokens } from './src/theme/theme'; 
import GradientText from './src/component/GradientText'; 
import authService from './src/services/authService'; 

import SignUpDisplay from './src/screens/login';
import OutfitFeed from './src/screens/homeScreen';
import ProductDisplayPage from './src/screens/ProductDisplayPage';
import CommunityFeedPage from './src/screens/communityFeedPage';
import CartPage from './src/screens/cartPage';
import ShareInvitePage from './src/screens/sharepage';
import CartScreen from './src/screens/cartScreen';
import LoginScreen from './src/screens/loginScreen';
import HomeIcon from './src/component/svg/HomeIcon';
import exploreIcon from './src/component/svg/ExploreIcon';
import CommunityIcon from './src/component/svg/CommunityIcon';
import CartIcon from './src/component/svg/cartIcon'; 
import MoreIcon from './src/component/svg/MoreIcon';
import ShoppingCartIcon from './src/component/svg/ShoppingCartIcon';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthContext = createContext();

const PlaceholderScreen = ({ title }) => (
  <SafeAreaView style={styles.safeAreaWrapper}>
    <View style={styles.placeholderWrapper}>
      <Text style={styles.placeholderText}>{title}</Text>
    </View>
  </SafeAreaView>
);

const ExploreScreen = () => <PlaceholderScreen title="Explore" />;

const SafeOutfitFeed = (props) => (
  <SafeAreaView style={styles.safeAreaWrapper} edges={['top', 'left', 'right']}>
    <OutfitFeed {...props} />
  </SafeAreaView>
);

const SafeCommunityFeed = (props) => (
  <SafeAreaView style={styles.safeAreaWrapper} edges={['top', 'left', 'right']}>
    <CommunityFeedPage {...props} />
  </SafeAreaView>
);

const SafeCartPage = (props) => (
  <SafeAreaView style={styles.safeAreaWrapper} edges={['top', 'left', 'right']}>
    <CartPage {...props} />
  </SafeAreaView>
);

const SafeCartScreen = (props) => (
  <SafeAreaView style={styles.safeAreaWrapper} edges={['top', 'left', 'right']}>
    <CartScreen {...props} />
  </SafeAreaView>
);

const SafeProductDisplayPage = (props) => (
  <SafeAreaView style={styles.safeAreaWrapper}>
    <ProductDisplayPage {...props} />
  </SafeAreaView>
);
const SafeLoginDisplayPage = () => (
  <SafeAreaView style={styles.safeAreaWrapper}>
    <LoginScreen  />
  </SafeAreaView>
);

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomNavigation}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isActive = state.index === index;

        let IconComp;
        if (route.name === 'HomeTab') IconComp = HomeIcon;
        else if (route.name === 'Explore') IconComp = exploreIcon;
        else if (route.name === 'Community') IconComp = CommunityIcon;
        else if (route.name === 'Cart') IconComp = CartIcon;
        else if (route.name === 'CartScreen') IconComp = ShoppingCartIcon;
        else if (route.name === 'More') IconComp = MoreIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, mergeOriginalArgs: true });
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isActive ? { selected: true } : {}}
            activeOpacity={0.75}
            onPress={onPress}
            style={styles.bottomItem}
          >
            {isActive && (
              <View style={styles.topLineContainer}>
                <Svg height="2" width="60%">
                  <Defs>
                    <LinearGradient id="lineGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                      <Stop offset="1.05%" stopColor="#FBB59E" />
                      <Stop offset="32.02%" stopColor="#F8876C" />
                      <Stop offset="56.43%" stopColor="#F16646" />
                      <Stop offset="98.66%" stopColor="#F98F7A" />
                    </LinearGradient>
                  </Defs>
                  <Rect width="100%" height="3" fill="url(#lineGrad)" />
                </Svg>
              </View>
            )}

            {IconComp && (
              <IconComp
                size={22}
                strokeWidth={1.8}
                focused={isActive}
                color={isActive ? '#ffffff' : '#b8b8b8'}
              />
            )}

            {isActive ? (
              <GradientText 
                text={label} 
                style={[styles.bottomItemLabel, styles.activeBottomItemLabel]} 
                numberOfLines={1}
              />
            ) : (
              <Text numberOfLines={1} style={styles.bottomItemLabel}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HomeTab" component={SafeOutfitFeed} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Community" component={SafeCommunityFeed} />
      <Tab.Screen name="Cart" component={SafeCartPage} options={{ tabBarLabel: 'Order' }} />
      <Tab.Screen name="CartScreen" component={SafeCartScreen} options={{ tabBarLabel: 'Cart' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [appIsLoading, setAppIsLoading] = useState(true);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuthStatus = async () => {
      try {
        const loggedIn = await authService.isAuthenticated();
        setUserIsAuthenticated(loggedIn);
      } catch (error) {
        console.error("Storage lookup initialization failed:", error);
      } finally {
        setAppIsLoading(false);
        await BootSplash.hide({ fade: true });
      }
    };
    initializeAuthStatus();
  }, []);

  if (appIsLoading) {
    return null; 
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{ userIsAuthenticated, setUserIsAuthenticated }}>
        <ModalProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {userIsAuthenticated ? (
                <>
                  <Stack.Screen name="MainTab" component={TabNavigator} />
                  <Stack.Screen name="ProductDisplay" component={SafeProductDisplayPage} />
                </>
              ) : (
                <>
                  <Stack.Screen name="SignUpScreen" component={SignUpDisplay} />
                  <Stack.Screen name="LoginScreen" component={SafeLoginDisplayPage} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </ModalProvider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#121212',
  },
  bottomNavigation: {
    height: 78,          
    paddingTop: 8,
    paddingBottom: 16,   
    paddingHorizontal: 5,
    backgroundColor: '#151515',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#242424',
    position: 'relative',
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: '100%',
    position: 'relative',
  },
  topLineContainer: {
    position: 'absolute',
    top: -9,
    left: 0,
    right: 0,
    height: 3,
    alignItems: "center",
  },
  placeholderWrapper: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
  },
  bottomItemLabel: {
    color: '#b8b8b8',
    fontSize: 11.5,
    fontFamily: Tokens.typography.families.light,
    textAlign: 'center',
  },
  activeBottomItemLabel: {
    fontSize: Tokens.typography.sizes.body,
    fontFamily: Tokens.typography.families.light,
  }
});