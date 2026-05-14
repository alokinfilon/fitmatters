
import React   from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import { useState } from 'react';
import { Check, ChevronLeft } from 'lucide-react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const HelloWorldApp = () => {
     const [activeInfoTab, setActiveInfoTab] = useState('shipping');
     
const orderSteps = [
  {
    title: 'Order Placed',
    detail: 'Your order has been received and is being processed by [Brand Name].',
    note: 'You can cancel your order until it is shipped.',
    complete: true,
  },
  {
    title: 'Confirmed by [Brand Name].',
    detail: "We've received confirmation from [Brand Name]. Your items are being prepared for shipment.",
    note: 'Still eligible for cancellation until shipped.',
  },
  {
    title: 'Shipped by [Brand Name].',
    detail: 'Our outfit has been shipped. Tracking ID: [Tracking #].',
    note: 'Order can no longer be cancelled after this point.',
    blocked: true,
  },
  {
    title: 'Out for delivery.',
    detail: 'Your package is on its way. Please keep your phone available for delivery updates.',
    note: 'Not available after this point.',
    blocked: true,
  },
  {
    title: 'Delivered',
    detail: 'Your order has been delivered successfully. Enjoy your new look!',
  },
];

  return (
    <ScrollView>
   <View style={styles.container}>
   
         <View style={styles.alignRow}>
        <View style={styles.header}>
     <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
       <FontAwesomeIcon icon={faLessThan} color="#ffffff" size={18} />
    
       <Text style={styles.text}>Back</Text>
     </TouchableOpacity>
   </View>
   </View>
    <View style={styles.content}>
        <Text style={styles.heading}>Track Your Orders </Text>
        <Text style={styles.subHeading}>Track deliveries, check order details, and manage returns.</Text>
        <TouchableOpacity style={styles.box1} >
          <View style={styles.box}>
             <View style={styles.alignRow}>
            <Text style={styles.boxText}>Order ID:</Text>
            <Text style={styles.boxText1}>#ORD254689</Text>
          </View>
          <View style={styles.alignRow}>
            <Text style={styles.boxText}>Order Date:</Text>
            <Text style={styles.boxText1}>Oct 25, 2025</Text>
          </View>
          <View style={styles.alignRow}>
            <Text style={styles.boxText}>Estimated Delivery:</Text>
            <Text style={styles.boxText1}>Oct 30 -Nov 2,2025</Text>
          </View>
          <View style={styles.alignRow}>
            <Text style={styles.boxText}>Deliverying to:</Text>
            <Text style={styles.boxText1}>Ria Jain, 12/4 Green Road</Text>
          </View>
          <View style={styles.alignRow}>
            <Text style={styles.boxText}>Tracking ID:</Text>
            <Text style={styles.boxText1}>#ORD254689</Text>
          </View>

         
          </View>
        </TouchableOpacity>

        </View>
        <View style={[styles.discrptionView]}>
<View style={styles.alignRow1}>
<TouchableOpacity style={styles.selectedView} onPress={() => setActiveInfoTab('shipping')}>
  <View >
  <Text style={styles.text8}>Top Bottom</Text>
 </View>
</TouchableOpacity>
<TouchableOpacity  onPress={() => setActiveInfoTab('howItWorks')}>
  <Text style={styles.text8} >Footwear</Text>
 
</TouchableOpacity>

<TouchableOpacity onPress={() => setActiveInfoTab('productInfo')}>
  <Text style={styles.text8} >Extra</Text>
 
</TouchableOpacity>



</View>

</View>

          <View style={styles.timeline}>
          {orderSteps.map((step, index) => (
            <View key={step.title} style={styles.timelineRow}>
              <View style={styles.timelineIconColumn}>
                <View style={[styles.timelineIcon, step.complete && styles.timelineIconComplete]}>
                  {step.complete ? (
                    <Check color="#ffffff" size={20} strokeWidth={3} />
                  ) : (
                    <Text style={styles.pendingIcon}>✣</Text>
                  )}
                </View>
                {index < orderSteps.length - 1 && <View style={styles.timelineLine} />}
              </View>

              <View style={styles.timelineContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDetail}>{step.detail}</Text>
                {step.note ? (
                  <Text style={[styles.stepNote, step.blocked && styles.blockedNote]}>
                    {step.blocked ? '✕ ' : ''}
                    {step.note}
                  </Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.heading1}>Redund & Return Policy </Text>
        <View style = {styles.alignRow}>
        <Text style={styles.subHeading1}>Out.Fit.Find acts as a facilitattor between you and our partner brands. Refunds and returns are handled according to the brand's individual policy.<Text style={[styles.policyLink, styles.subHeading2]}>View Brand's Refund Policy</Text> </Text>
         </View>
         <TouchableOpacity onPress={() => console.log('Pressed!')}>
     
      
    <View style= {styles.buttonbox1}>
        <Text style = {styles.text6}>Cancel Order</Text>
      </View>
      
    </TouchableOpacity>
          <Text style={styles.heading2}>Until Shipped</Text> 
           <Text style={styles.heading3}>Refund and returns are processed directly by the brand. TimeLines may vary depending on the partner's policy</Text> 
        </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  discrptionView : {
  backgroundColor:"#000000",
  padding:15,
  
},
policyLink: {
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
  policyText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 23,
  },
selectedView : {
        paddingVertical:5,
        paddingHorizontal:5,
        borderWidth:2,
        borderRadius:10,
        borderColor:"#fea26d",
        backgroundColor:"#2e2e2e"
      },

 text8:{
        color: "#fffdfd",
      fontSize:15,
      fontWeight: 900,
      },
  text: {
    fontSize: 16,
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
    padding:10
    
  },
  alignRow1:{
    flexDirection: 'row',
    alignItems: 'center',
    gap:30, 
    marginLeft:30
    
  },
  button: {
  flexDirection: 'row', 
  alignItems: 'center', 
  marginLeft:8
},
content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 40,
    fontWeight: '900',
  },
  subHeading1: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: '900',
    marginLeft: 25,
  },
  box: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#2d2c2c',
  },
  box1: {
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#2d2c2c',
    marginTop: 10,
  },
  boxText: {
    fontSize: 14,
    color: '#ffffff',
    
    fontWeight: '600',
  },
 
     boxText1: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 5,
    fontWeight: '900',
  },

  orderLine: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  timeline: {
    marginTop: 30,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineIconColumn: {
    width: 42,
    alignItems: 'center',
  },
  timelineIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#383a3c',
    borderColor: '#777b7f',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineIconComplete: {
    backgroundColor: '#24c45a',
    borderColor: '#24c45a',
  },
  pendingIcon: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 24,
  },
  timelineLine: {
    width: 4,
    flex: 1,
    minHeight: 78,
    backgroundColor: '#7b7d80',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 8,
  },
  stepTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
  stepDetail: {
    color: '#ffffff',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 10,
  },
  stepNote: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    fontWeight: '700',
  },
  blockedNote: {
    color: '#ffffff',
  },
 
heading1: {
    fontSize: 14,
   
    color: '#ffffff',
    marginBottom: 8,
    fontWeight:'900',
    marginLeft:20
  },

subHeading1: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: '600',
    marginLeft: 20,
  },
  subHeading2: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: '900',
    marginLeft: 20,
  },
  buttonbox1: {
    paddingVertical: 20,
   width:320,
    borderRadius: 20, 
    alignItems: 'center',
    justifyContent: 'center',
   backgroundColor: '#1f1f1f',
   marginLeft:30
   
  },
  text6:{
    fontSize:16,
    fontWeight:"900",
    color:"#ffff",
    },
    heading2: {
    fontSize: 14,
   
    color: '#ffffff',
    marginBottom: 30,
    fontWeight:'900',
   marginLeft:35,
   marginTop:20
   
  },
  heading3: {
    fontSize: 14,
   
    color: '#ffffff',
    marginBottom: 10,
    fontWeight:'900',
   marginLeft:35,
  
   
  },



});

export default HelloWorldApp;
