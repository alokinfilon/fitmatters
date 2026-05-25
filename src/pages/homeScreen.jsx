import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 45) / 2; 
const CIRCLE_SIZE = wp('22%'); 
const OutfitFeed = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const openProductDisplay = item => {
    navigation.push('ProductDisplay', { product: item });
  };

  
  const renderHeader = () => (
    <View style={styles.headerContainer}>
     
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText}>🥾 Everyday Fit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText}>👔 Work Fit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>❄️ Winter Vacation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>💃 Date Night Fit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>⛱️ Summer Vacation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText}>✨ Night out Fit</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.divider} />

    
      <FlatList
        data={data}
        renderItem={renderCircleItem}
        keyExtractor={item => `circle-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListPadding}
      />
    </View>
  );


  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => openProductDisplay(item)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );

  
  const renderCircleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.circleItemContainer}
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
     
    </TouchableOpacity>
  );

  return (
     <SafeAreaProvider>
<SafeAreaView style={styles.mainContainer} edges={['top', 'left', 'right']}>
  
      <FlatList
        data={data}
        renderItem={renderGridItem}
        keyExtractor={item => `grid-${item.id}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
   </SafeAreaView>

     </SafeAreaProvider>
  );
};

export default OutfitFeed;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    paddingVertical: hp('2%'),
    backgroundColor: '#121212',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    marginBottom: hp('1.5%'),
    gap: wp('2%'),
  },
  button: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    backgroundColor: '#4f4f4f',
    borderRadius: 10,
    alignItems: 'center',
  },
  button1: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    backgroundColor: '#545454',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ffa5a5',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp('3.5%'),
    fontWeight: '700',
    color: '#ffffff',
  },
  divider: {
    width: '92%',
    height: 1,
    backgroundColor: '#5c5c5c',
    alignSelf: 'center',
    marginVertical: hp('2%'),
  },
  horizontalListPadding: {
    paddingHorizontal: wp('3%'),
    paddingBottom: hp('2%'),
  },
  circleItemContainer: {
    alignItems: 'center',
    marginHorizontal: wp('2%'),
  },
  circleWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 3,
    backgroundColor: '#f9f9f9',
    borderColor: '#ffc2c2',
  },
  label: {
    marginTop: hp('0.8%'),
    fontSize: wp('3%'),
    width: CIRCLE_SIZE,
    textAlign: 'center',
    color: '#fff',
  },
  listPadding: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: COLUMN_WIDTH,
    height: hp('28%'), 
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F5EBE0',
  },
  imageContainer: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
