import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  Dimensions,
  TouchableOpacity, 
  ScrollView
} from 'react-native';
const CIRCLE_SIZE = 100;

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 40) / 2;

const OutfitFeed = ({ navigation }) => {
  const [data, setData] = useState([]);
 

  useEffect(() => {
    console.log("Hello");
    
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      
      })
      .catch((error) => console.error(error));
      
  }, []);


  const openProductDisplay = (item) => {
    navigation.navigate('ProductDisplay', { product: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => openProductDisplay(item)}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
          resizeMode="contain"
        />
        
      </View>
      
    </TouchableOpacity>
 );

  const renderItem1 = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.85}
      onPress={() => openProductDisplay(item)}>
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

  

  return (
    <ScrollView style={styles.container}>
    <View style={styles.container}>
      <View style = {styles.header}>
        <View style={{ flexDirection: 'row', justifyContent:"flex-start", gap: 10,  marginLeft:-70,marginBottom:10 }}>
   <TouchableOpacity style = {styles.button1}>
    <Text style={styles.text1}>Everyday Fit</Text>
  </TouchableOpacity>

  <TouchableOpacity style = {styles.button1}>
    <Text style = {styles.text1}>Work Fit</Text>
  </TouchableOpacity>
</View>
<View style={{ flexDirection: 'row', justifyContent:"flex-start", gap: 10, marginLeft:-70, marginBottom:10  }}>
   <TouchableOpacity style = {styles.button}>
    <Text style={styles.text1}>Winter Vacation Fit</Text>
  </TouchableOpacity>

  <TouchableOpacity style = {styles.button}>
    <Text style = {styles.text1}>Data Night Fit</Text>
  </TouchableOpacity>
</View>
<View style={{ flexDirection: 'row', justifyContent:"flex-start", gap: 15, marginLeft:-70, marginBottom:10  }}>
   <TouchableOpacity style = {styles.button}>
    <Text style={styles.text1}>Summer Vacation Fit</Text>
  </TouchableOpacity>

  <TouchableOpacity style = {styles.button1}>
    <Text style = {styles.text1}>Night out Fit</Text>
  </TouchableOpacity>
</View>


 

        
      </View>

      <View style={{ width:"90%", height:1, backgroundColor:"#5c5c5c", justifyContent:"center", alignItems:"center", marginBottom:10, marginLeft:20  }}></View>
      <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem1}
        keyExtractor={(item) => item.id.toString()}
        horizontal 
       
       
      />
    </View>
      

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listPadding}
      />
    </View>
    </ScrollView>
  );
};

export default OutfitFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
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
    height: 250, 
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F5EBE0', 
  },
  imageContainer: {
    flex: 1,
  },
  Circlecard: {
    width: COLUMN_WIDTH/1.5,
    height: 160, 
    marginBottom: 15,
    borderRadius: 80,
    overflow: 'hidden',
    backgroundColor: '#F5EBE0', 
  },
  header :{
    paddingVertical:20,
    paddingHorizontal:80,
    backgroundColor:"#121212",
    borderBottomColor:"#ffffff"
  },
  button:{
    paddingVertical:10,
    paddingHorizontal:20,
    backgroundColor:"#4f4f4f",
    borderRadius:10, 
    borderWidth:2,
    
  
  },
  button1:{
    paddingVertical:10,
    paddingHorizontal:20,
    backgroundColor:"#545454",
    borderRadius:10, 
    borderWidth:2,
    borderColor:"#ffa5a5",
   
  
  },
  text1:{
    fontSize:14,
    color:"#ffff"

  },
  listContent: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  circleWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2, 
    overflow: 'hidden', 
    borderWidth: 4,
    backgroundColor: '#f9f9f9',
    borderColor:"#ffc2c2"
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    width: CIRCLE_SIZE,
    textAlign: 'center',
    color: '#333',
  },
    
  
  
 
});
