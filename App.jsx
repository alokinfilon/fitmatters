import React from 'react';
import {
  Home,
  MoreHorizontal,
  Search,
  ShoppingBag,
  ImagePlus,
} from 'lucide-react-native';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './src/pages/login.jsx';
import OutfitFeed from './src/pages/homeScreen.jsx';
import ProductDisplayPage from './src/pages/ProductDisplayPage.jsx';
import CommunityFeedPage from './src/pages/communityFeedPage.jsx';
import CartPage from './src/pages/cartPage.jsx';
import ShareInvitePage from './src/pages/sharepage.jsx';

const Stack = createNativeStackNavigator();



const bottomNavItems = [
  {
    label: 'Home',
    route: 'Home',
    Icon: Home,
  },

  {
    label: 'Explore',
    route: 'Explore',
    Icon: Search,
  },

  {
    label: 'Community Space',
    route: 'Community',
    Icon: ImagePlus,
  },

  {
    label: 'Cart',
    route: 'Cart',
    Icon: ShoppingBag,
  },

  {
    label: 'More',
    route: 'More',
    Icon: MoreHorizontal,
  },
];


const PlaceholderScreen = ({ title }) => {

  return (
    <View style={styles.placeholderWrapper}>
      <Text style={styles.placeholderText}>
        {title}
      </Text>
    </View>
  );
};



const ScreenContainer = ({
  children,
  navigation,
  activeRoute,
}) => {


  return (
    <View style={styles.appShell}>

      <View style={styles.screenArea}>
        {children}
      </View>

      <SafeAreaView edges={['bottom']} style={styles.bottomNavigation}>

        {bottomNavItems.map((item, index) => {

          const isActive = activeRoute === item.route;
          const IconComp = item.Icon;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.75}
              style={styles.bottomItem}
              onPress={() => {

                
                if (activeRoute !== item.route) {
                  navigation.navigate(item.route);
                }
              }}
            >

              <IconComp
                size={22}
                strokeWidth={1.8}
                color={isActive ? '#ff8f68' : '#b8b8b8'}
              />

              <Text
                numberOfLines={1}
                style={[
                  styles.bottomItemLabel,
                  isActive && styles.activeBottomItemLabel,
                ]}
              >
                {item.label}
              </Text>

            </TouchableOpacity>
          );
        })}

      </SafeAreaView>

    </View>
  );
};


const withBottomNavigation = (Component, currentRoute) => {

  return function WrappedScreen(props) {

    return (
      <ScreenContainer
        navigation={props.navigation}
        activeRoute={currentRoute}
      >
        <Component {...props} />
      </ScreenContainer>
    );
  };
};



const ExploreScreen = () => {
  return <PlaceholderScreen title="Explore" />;
};


const HomeScreenWithNav = withBottomNavigation(
  OutfitFeed,
  'Home'
);

const ProductDisplayWithNav = withBottomNavigation(
  ProductDisplayPage,
  'Home'
);

const ExploreScreenWithNav = withBottomNavigation(
  ExploreScreen,
  'Explore'
);

const CommunityScreenWithNav = withBottomNavigation(
  CommunityFeedPage,
  'Community'
);

const CartScreenWithNav = withBottomNavigation(
  CartPage,
  'Cart'
);

const MoreScreenWithNav = withBottomNavigation(
  ShareInvitePage,
  'More'
);


export default function App() {


  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Login"
          component={LoginPage}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreenWithNav}
        />

        <Stack.Screen
          name="ProductDisplay"
          component={ProductDisplayWithNav}
        />

        <Stack.Screen
          name="Explore"
          component={ExploreScreenWithNav}
        />

        <Stack.Screen
          name="Community"
          component={CommunityScreenWithNav}
        />

        <Stack.Screen
          name="Cart"
          component={CartScreenWithNav}
        />

        <Stack.Screen
          name="More"
          component={MoreScreenWithNav}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({

  appShell: {
    flex: 1,
    backgroundColor: '#121212',
  },

  screenArea: {
    flex: 1,
  },

  bottomNavigation: {

    minHeight: 64,

    paddingTop: 8,
    paddingBottom: 8,

   
    paddingHorizontal: 5,

    backgroundColor: '#151515',

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-around',

    borderTopWidth: 1,
    borderTopColor: '#242424',
  },

  bottomItem: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    gap: 4,
  },

  bottomItemLabel: {
    color: '#b8b8b8',

    fontSize: 11,
    fontWeight: '500',
  },

  activeBottomItemLabel: {
    color: '#ff8f68',
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

});
