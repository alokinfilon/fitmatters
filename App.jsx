import React from 'react';
import { ScrollView, Image, Text, View, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient'
const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 50) ;
export default function App() {
   const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <ScrollView style={styles.container}>
    <View style={styles.container}>

      <View style={styles.alignRow}>
     <View style={styles.header}>
  <TouchableOpacity style={styles.button}>
    <FontAwesomeIcon icon={faLessThan} color="#ffffff" size={18} />
 
    <Text style={styles.text}>Back</Text>
  </TouchableOpacity>
</View>
  </View>
  <View style={styles.header1}>
    <Text style = {styles.headerText}>streetwear Set - urban Chill</Text>
     <Text style = {styles.headerText1}>Outfit curated from 3 brands.</Text>
  </View>
  <View style={styles.cardView}>
    <View style={styles.card}>
      <Image 
          source={require('./src/assets/images/dress.png')} 
          style={styles.image} 
        />
    </View>
    <View style = {styles.priceView}>
      <Text style = {styles.priceText}>
        ₹3,499 (Excluding extras)
      </Text>
    </View>
   <View style = {styles.checkboxView}>
     <View style={styles.iconRow}>
            <CheckBox
      disabled={false}
      value={toggleCheckBox}
      onValueChange={(newValue) => setToggleCheckBox(newValue)}
     style={styles.checkBox}
        tintColors={{ true: '#fe9267', false: '#ffffff' }}
 />
     <Text style={styles.text4}>Buy the Whole look(Including extras). </Text>
     
</View>
<View style={styles.allPriceView}>
    <Text style={styles.text1}>₹5,499 (all items combined) </Text>
     <Text style={styles.text2}>curated look for causual weekends  includes top, denim, and Sneakers. </Text>
</View>
   </View>
   <View style = {styles.iconRow1}>
    <Text style = {styles.text}>Brands </Text>
    <View style={styles.nikeView}>
      <Image 
          source={require('./src/assets/images/nike.png')} 
          style={styles.image} 
        />
    </View>
     <View style={styles.hmView}>
      <Image 
          source={require('./src/assets/images/h&m.png')} 
          style={styles.image} 
        />
    </View>
    
   </View>
   
  </View>
       <View style={{ width:"90%", height:1, backgroundColor:"#5c5c5c", justifyContent:"center", alignItems:"center", marginBottom:10, marginLeft:20  }}></View>
        <View style={styles.selectionView}>
          <Text style = {styles.selectionText}>
            Size Selection
          </Text>
          
        </View>
        <View style = {styles.iconRow2}>
    <Text style = {styles.text}>Top Wear </Text>
    
     <View style={styles.hmView}>
      <Image 
          source={require('./src/assets/images/h&m.png')} 
          style={styles.image} 
        />
       </View>
    
   </View>
   <View>
     <Text style = {styles.text3}>100% cotton, soft-touch finish. </Text>
   </View>
   <View style = {styles.iconRow3}>
    <Text style = {styles.text4}>Size</Text>
    
     <View style={styles.sizeView}>
      <Image 
          source={require('./src/assets/images/size.png')} 
          style={styles.image} 
        />
       </View>
       
    
   </View>
   <View style={styles.sizeBoxView}>
       <TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>XS</Text></View>
        </TouchableOpacity>
        <TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>S</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>M</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>L</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>XL</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>XXL</Text></View>
        </TouchableOpacity>
       </View>
   <View style = {styles.iconRow3}>
    <Text style = {styles.quantityText}>quantity</Text>
        <TouchableOpacity>
              <Text style = {styles.quantityText}>—</Text>
              

        </TouchableOpacity>
        <TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>1</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityText}>
              <Text style = {styles.quantityText}>+</Text>
              

        </TouchableOpacity>

   </View>
   <View style = {styles.iconRow2}>
    <Text style = {styles.text}>Bottom Wear </Text>
    
     <View style={styles.hmView}>
      <Image 
          source={require('./src/assets/images/h&m.png')} 
          style={styles.image} 
        />
       </View>
    
   </View>
   <View>
     <Text style = {styles.text3}>Slim fit, stretchable denim.</Text>
   </View>
   <View style = {styles.iconRow3}>
    <Text style = {styles.text4}>Size</Text>
    
     <View style={styles.sizeView}>
      <Image 
          source={require('./src/assets/images/size.png')} 
          style={styles.image} 
        />
       </View>
       
    
   </View>
   <View style={styles.sizeBoxView}>
       <TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>XS</Text></View>
        </TouchableOpacity>
        <TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>S</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>M</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>L</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>XL</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>XXL</Text></View>
        </TouchableOpacity>
       </View>
   <View style = {styles.iconRow3}>
    <Text style = {styles.quantityText}>quantity</Text>
        <TouchableOpacity>
              <Text style = {styles.quantityText}>—</Text>
              

        </TouchableOpacity>
        <TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>1</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityText}>
              <Text style = {styles.quantityText}>+</Text>
              

        </TouchableOpacity>

   </View>
   <View style = {styles.iconRow2}>
    <Text style = {styles.text}>Foot Wear </Text>
    
     <View style={styles.nikeView}>
      <Image 
          source={require('./src/assets/images/nike.png')} 
          style={styles.image} 
        />
    </View>
    
   </View>
   <View>
     <Text style = {styles.text3}>Breathable sole, regular fit. </Text>
   </View>
   <View style = {styles.iconRow3}>
    <Text style = {styles.text4}>Size</Text>
    
     <View style={styles.sizeView}>
      <Image 
          source={require('./src/assets/images/size.png')} 
          style={styles.image} 
        />
       </View>
       
    
   </View>
   <View style={styles.sizeBoxView}>
       <TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>XS</Text></View>
        </TouchableOpacity>
        <TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>S</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>M</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>L</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>XL</Text></View>
        </TouchableOpacity><TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>XXL</Text></View>
        </TouchableOpacity>
       </View>
   <View style = {styles.iconRow3}>
    <Text style = {styles.quantityText}>quantity</Text>
        <TouchableOpacity>
              <Text style = {styles.quantityText}>—</Text>
              

        </TouchableOpacity>
        <TouchableOpacity> 
       <View style={styles.boxsizeView}> <Text style={styles.text5}>1</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityText}>
              <Text style = {styles.quantityText}>+</Text>
              

        </TouchableOpacity>

   </View>
    <View style = {styles.iconRow3}>
<TouchableOpacity style={styles.quantityText}>
              <Text style = {styles.quantityText}>+</Text>
              

        </TouchableOpacity>
        <Text style={styles.text4}>Add Extras (belt, cap, scraf)</Text>

    </View>
    <View style={styles.button2}>
      <TouchableOpacity onPress={() => console.log('Pressed!')}>
     
      
    <View style= {styles.buttonbox1}>
        <Text style = {styles.text6}>Add To CaRT </Text>
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
       <Text style = {styles.text6}>Buy Now</Text>
      </LinearGradient>
    </TouchableOpacity>
     </View>
     <View style={styles.discrptionView}>
<View style={styles.alignRow}>
<TouchableOpacity>
  <View style={styles.selectedView}>
  <Text style={styles.text8}>Shipping Info</Text>
 </View>
</TouchableOpacity>
<TouchableOpacity>
  <Text style={styles.text8} >How It Works</Text>
 
</TouchableOpacity>

<TouchableOpacity>
  <Text style={styles.text8} >Product Info</Text>
 
</TouchableOpacity>



</View>
<Text style= {styles.text9} >Delivery Time </Text>
<Text style= {styles.text10} >Delivery within 3-5 business days by partner.</Text>
<Text style= {styles.text9} >Delivery partner</Text>
<Text style= {styles.text10} >Shipped directly by H&M / Levis / nike. </Text>
<Text style= {styles.text9} >Tracking Info </Text>
<Text style= {styles.text10} >You'll recive tracking updates in your order History once placed.</Text>
<Text style= {styles.text9} >Delivery Charge</Text>
<Text style= {styles.text10} >free Shipping for orders above ₹1,999.</Text>
     </View>
     <View style={styles.discrptionView}>
<View style={styles.alignRow}>
<TouchableOpacity>
  <View >
  <Text style={styles.text8}>Shipping Info</Text>
 </View>
</TouchableOpacity>
<TouchableOpacity style={styles.selectedView}>
  <Text style={styles.text8} >How It Works</Text>
 
</TouchableOpacity>

<TouchableOpacity>
  <Text style={styles.text8} >Product Info</Text>
 
</TouchableOpacity>



</View>
<Text style= {styles.text9} >Select Your Look </Text>
<Text style= {styles.text10} >Choose full outfit or Specific Pieces.</Text>
<Text style= {styles.text9} >Checkout Securely</Text>
<Text style= {styles.text10} >Pay via UPI, Card, or Wallet. </Text>
<Text style= {styles.text9} >Order Confirmed </Text>
<Text style= {styles.text10} >we sync order with brand partner</Text>
<Text style= {styles.text9} >Shipped by Brand</Text>
<Text style= {styles.text10} >Track updates inside the app.</Text>
<Text style= {styles.text9} >Refund Available (12 hrs)</Text>
<Text style= {styles.text10} >Cancel or refund within the first 12 hours.</Text>
     </View>
     <View style={styles.discrptionView}>
<View style={styles.alignRow}>
<TouchableOpacity>
  <View >
  <Text style={styles.text8}>Shipping Info</Text>
 </View>
</TouchableOpacity>
<TouchableOpacity>
  <Text style={styles.text8} >How It Works</Text>
 
</TouchableOpacity>

<TouchableOpacity style={styles.selectedView}>
  <Text style={styles.text8} >Product Info</Text>
 
</TouchableOpacity>



</View>
<Text style= {styles.text9} >Material</Text>
<Text style= {styles.text10} >100% Cotton (T-shirt), Stretch Denim(Jeans), Mesh(Shoes)</Text>
<Text style= {styles.text9} >Fit Type</Text>
<Text style= {styles.text10} >Regular Fit / Slim Fit / Relaxed. </Text>
<Text style= {styles.text9} >Care INstructions </Text>
<Text style= {styles.text10} >Machine Wash cold, tunmble dry low</Text>
<Text style= {styles.text9} >Color Options</Text>
<Text style= {styles.text10} >Black, Navy, olive.</Text>
<Text style= {styles.text9} >Made In</Text>
<Text style= {styles.text10} >Made in India / Imported.</Text>
<Text style= {styles.text9} >Sustainability Note</Text>
<Text style= {styles.text10} >Eco-certified fabric used.</Text>
<Text style= {styles.text9} >Refund and Returns </Text>
<Text style= {styles.text10} >After 12 hours, returns are managed by the brand. Initiate returns from your Order page.</Text>
     </View>
    </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#fff",
    fontWeight:900,
    marginLeft:8
  },
  header :{
    marginTop:10,
    paddingLeft:20

  },
  alignRow:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
  flexDirection: 'row', 
  alignItems: 'center', 
  marginLeft:8
},

header1:{
 marginTop:10,
  paddingLeft:20

},

headerText :{
 fontSize: 20,
  fontWeight:900,
  color:"#fff",
  marginTop:10,
},


headerText1:{
  fontSize: 16,
  fontWeight:600,
  color:"#fff",
  marginTop:20,
},
cardView :{
  marginTop:20,
  paddingLeft:20,
  flex:1
},

card:{
  width: COLUMN_WIDTH,
    height: 403, 
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F5EBE0',
     borderColor: '#000',
     overflow:"hidden"

},
 image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', },

    priceView:{
      marginTop:5,

    },

    priceText:{
      color:"#fff",
      fontSize:16,
      fontWeight:900,

    },
    iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
   checkBox : {
    color:"#fe9267",
    
     transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
    
  },
      text4:{
        color: "#f1f0f0",
      fontSize:14,
      fontWeight: 900,
      },

      checkboxView:{
        marginTop:35  
      },
      text1:{
        color: "#f1f0f0",
      fontSize:14,
      fontWeight: 900,
      marginTop:20,
      paddingLeft:30

      },
      text2:{
        color: "#b6b6b6",
      fontSize:14,
      fontWeight: 600,
      marginTop:20,
      paddingLeft:30,
      

      },

      allPriceView:{
        marginLeft:8
      }, 

      nikeView :{
        width: 79,
    height: 54, 
    
    backgroundColor: '#F5EBE0',
    
    
     borderColor:"#000000",
     borderWidth:2,
     borderLeftColor:"#000000"
    
      },
      hmView :{
        width: 80,
    height: 45, 
   backgroundColor: '#F5EBE0',
      },
       iconRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft:30,
    padding:20
  },
  selectionText:{
    color:"#ffff",
    fontSize :16,
  fontWeight:900,
  
  },

  selectionView:{
   padding:20,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  iconRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft:25,
   
  },
  text3:{
        color: "#b6b6b6",
      fontSize:14,
      fontWeight: 600,
      
      paddingLeft:32,
      marginTop:5,
},

iconRow3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft:12,
    padding:20
   
  },
  sizeView :{
        width:30,
    height: 30, 
   backgroundColor: '#ffffff',
   borderRadius:0
      },

      sizeBoxView:{
       flexDirection:"row",
       marginLeft:30,
       gap:8,
       

      },
      boxsizeView :{
        width:36,
    height: 30, 
   backgroundColor: '#4b4b4b',
   alignItems: 'center', 
    
    justifyContent: 'center', 
     borderRadius:6
   
      },
      text5: {
    fontSize: 14,
    fontWeight: 'bold',
    color:"#fff",
    fontWeight:900,
   
   
  },

  quantityView :{
  
  },

  quantityText :{
    color:"#ffff",
    
    fontWeight:"900",
    
    
  },
   button2:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    
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

  text6:{
    fontSize:16,
    fontWeight:"900",
    color:"#ffff",
    },
discrptionView : {
  backgroundColor:"#000000",
  padding:15,
  
},
 text8:{
        color: "#fffdfd",
      fontSize:15,
      fontWeight: 900,
      },

      selectedView : {
        paddingVertical:5,
        paddingHorizontal:5,
        borderWidth:2,
        borderColor:"#ffff",
        borderRadius:10,
        borderColor:"#fea26d",
        backgroundColor:"#2e2e2e"
      },

      text9:{
    color:"#fff",
    marginTop:15,
    padding:10, 
    fontWeight:"900",
    fontSize:15

      },

      text10:{
    color:"#d8d8d8",
    marginLeft:10 
    }
});
