import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import { useState } from 'react';
import { Check, ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Loader } from 'lucide-react-native';

const HelloWorldApp = ({ navigation }) => {
  const [activeInfoTab, setActiveInfoTab] = useState('shipping');

  const orderSteps = [
    {
      title: 'Order Placed',
      detail:
        'Your order has been received and is being processed by [Brand Name].',
      note: 'You can cancel your order until it is shipped.',
      complete: true,
    },
    {
      title: 'Confirmed by [Brand Name].',
      detail:
        "We've received confirmation from [Brand Name]. Your items are being prepared for shipment.",
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
      detail:
        'Your package is on its way. Please keep your phone available for delivery updates.',
      note: 'Not available after this point.',
      blocked: true,
    },
    {
      title: 'Delivered',
      detail:
        'Your order has been delivered successfully. Enjoy your new look!',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.alignRow}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.pop()}
              >
                <FontAwesomeIcon icon={faLessThan} color="#ffffff" size={18} />

                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.heading}>Track Your Orders </Text>
            <Text style={styles.subHeading}>
              Track deliveries, check order details, and manage returns.
            </Text>
            <TouchableOpacity style={styles.box1}>
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
              <TouchableOpacity
                style={styles.selectedView}
                onPress={() => setActiveInfoTab('shipping')}
              >
                <View>
                  <Text style={styles.text8}>Top Bottom</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveInfoTab('howItWorks')}>
                <Text style={styles.text8}>Footwear</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveInfoTab('productInfo')}>
                <Text style={styles.text8}>Extra</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.productSummaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTitle}>Product Name</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Category:</Text>
              <Text style={styles.summaryValue}>Topwear (1) | Footwear (1)</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items:</Text>
              <Text style={styles.summaryValue}>2</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Status:</Text>
              <Text style={styles.summaryValue}>Preparing for shipment</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Estimated Delivery:</Text>
              <Text style={styles.summaryValue}>Oct 30 - Nov 2, 2025</Text>
            </View>
          </View>

          <View style={styles.timeline}>
            {orderSteps.map((step, index) => (
              <View key={step.title} style={styles.timelineRow}>
                <View style={styles.timelineIconColumn}>
                  <View
                    style={[
                      styles.timelineIcon,
                      step.complete && styles.timelineIconComplete,
                    ]}
                  >
                    {step.complete ? (
                      <Check color="#ffffff" size={20} strokeWidth={3} />
                    ) : (
                      <Loader color="#ffff" />
                    )}
                  </View>
                  {index < orderSteps.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>

                <View style={styles.timelineContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDetail}>{step.detail}</Text>
                  {step.note ? (
                    <Text
                      style={[
                        styles.stepNote,
                        step.blocked && styles.blockedNote,
                      ]}
                    >
                      {step.blocked ? '❌  ' : ''}
                      {step.note}
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.heading1}>Redund & Return Policy </Text>
          <View style={styles.alignRow}>
            <Text style={styles.subHeading1}>
              Out.Fit.Find acts as a facilitattor between you and our partner
              brands. Refunds and returns are handled according to the brand's
              individual policy.
              <Text style={[styles.policyLink, styles.subHeading2]}>
                View Brand's Refund Policy
              </Text>{' '}
            </Text>
          </View>
          <TouchableOpacity onPress={() => console.log('Pressed!')}>
            <View style={styles.buttonbox1}>
              <Text style={styles.text6}>Cancel Order</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.heading2}>Until Shipped</Text>
          <Text style={styles.heading3}>
            Refund and returns are processed directly by the brand. TimeLines
            may vary depending on the partner's policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  discrptionView: {
    backgroundColor: '#000000',
    padding: wp('4%'),
  },
  policyLink: {
    fontWeight: '900', 
    textDecorationLine: 'underline',
  },
  policyText: {
    color: '#ffffff',
    fontSize: wp('3.6%'),
    lineHeight: wp('5.8%'),
  },
  selectedView: {
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('1.5%'),
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fea26d',
    backgroundColor: '#2e2e2e',
  },
  text8: {
    color: '#fffdfd',
    fontSize: wp('4%'),
    fontWeight: '900',
  },
  text: {
    fontSize: wp('4.2%'),
    color: '#fff',
    fontWeight: '900',
    marginLeft: wp('2%'),
  },
  header: {
    marginTop: hp('1.2%'),
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('2.5%'),
  },
  alignRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('7.5%'),
    marginLeft: wp('7.5%'),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('2%'),
  },
  content: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('2.5%'),
  },
  heading: {
    fontSize: wp('6%'),
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: hp('1%'),
  },
  subHeading: {
    fontSize: wp('3.8%'),
    color: '#ffffff',
    marginBottom: hp('2%'),
    fontWeight: '900',
  },
  subHeading1: {
    fontSize: wp('3.6%'),
    color: '#ffffff',
    marginBottom: hp('2.5%'),
    fontWeight: '600',
    marginLeft: wp('5%'),
  },
  box: {
    borderRadius: 12,
    padding: wp('2.5%'),
    backgroundColor: '#2d2c2c',
  },
  box1: {
    borderRadius: 12,
    marginBottom: hp('1%'),
    backgroundColor: '#2d2c2c',
    marginTop: hp('1.2%'),
  },
  boxText: {
    fontSize: wp('3.8%'),
    color: '#ffffff',
    fontWeight: '800',
  },
  boxText1: {
    fontSize: wp('3.9%'),
    color: '#ffffff',
    marginLeft: wp('1.2%'),
    fontWeight: '900',
  },
    productSummaryBox: {
    backgroundColor: '#000000',
    marginHorizontal: wp('4%'),   
    marginTop: hp('2%'),          
    borderRadius: 16,
    padding: wp('4%'),            
   
    gap: hp('1.2%'),               
  },
  summaryRow: {
    flexDirection: 'row',
   gap: wp('2%'),
    alignItems: 'center',
  },
  summaryTitle: {
    color: '#ffffff',
    fontSize: wp('4.5%'),      
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#e9e9e9',
    fontSize: wp('4%'),          
    fontWeight: '500',
  },
  summaryValue: {
    color: '#ffffff',
    fontSize: wp('4%'),         
    fontWeight: '900',
  },
  orderLine: {
    color: '#ffffff',
    fontSize: wp('3.6%'),
    fontWeight: '800',
    lineHeight: wp('5%'),
  },
  timeline: {
    marginTop: hp('3.5%'),
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineIconColumn: {
    width: wp('11%'),
    alignItems: 'center',
  },
  timelineIcon: {
    width: wp('8.5%'),
    height: wp('8.5%'),
    borderRadius: wp('4.25%'), 
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
    fontSize: wp('5.5%'),
    lineHeight: wp('6%'),
  },
  timelineLine: {
    width: 4,
    flex: 1,
    minHeight: hp('9.5%'),
    backgroundColor: '#7b7d80',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: hp('2.5%'),
    paddingLeft: wp('2%'),
  },
  stepTitle: {
    color: '#ffffff',
    fontSize: wp('4%'),
    fontWeight: '900',
  },
  stepDetail: {
    color: '#ffffff',
    fontSize: wp('3.8%'),
    lineHeight: wp('5.2%'),
    marginTop: hp('1.2%'),
  },
  stepNote: {
    color: '#ffffff',
    fontSize: wp('3.3%'),
    lineHeight: wp('4.5%'),
    marginTop: hp('1%'),
    fontWeight: '700',
  },
  blockedNote: {
    color: '#ffffff',
  },
  heading1: {
    fontSize: wp('3.8%'),
    color: '#ffffff',
    marginBottom: hp('1%'),
    fontWeight: '900',
    marginLeft: wp('5%'),
    fontWeight:"900"
  },
  subHeading2: {
    fontSize: wp('3.8%'),
    color: '#ffffff',
    marginBottom: hp('2.5%'),
    fontWeight: '900',
    marginLeft: wp('5%'),
  },
  buttonbox1: {
    paddingVertical: hp('2.2%'),
    width: '85%', 
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
    marginVertical: hp('2%'),
  },
  text6: {
    fontSize: wp('4.8%'),
    fontWeight: '900',
    color: '#ffffff',
  },
  heading2: {
    fontSize: wp('3.6%'),
    color: '#ffffff',
    marginBottom: hp('3.5%'),
    fontWeight: '900',
    marginLeft: wp('8%'),
    marginTop: hp('2.5%'),
  },
  heading3: {
    fontSize: wp('3.6%'),
    color: '#ffffff',
    marginBottom: hp('1.2%'),
    fontWeight: '900',
    marginLeft: wp('8%'),
  },
});

export default HelloWorldApp;
