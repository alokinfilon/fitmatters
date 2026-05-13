import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import { Check } from 'lucide-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Loader } from 'lucide-react-native';
const { width } = Dimensions.get('window');

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
      detail:
        'Our outfit has been shipped. Tracking ID: [Tracking #].',
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
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <FontAwesomeIcon
              icon={faLessThan}
              color="#ffffff"
              size={16}
            />

            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.heading}>Track Your Orders</Text>

          <Text style={styles.subHeading}>
            Track deliveries, check order details, and manage returns.
          </Text>

          {/* Order Card */}
          <TouchableOpacity style={styles.box1}>
            <View style={styles.box}>
              <View style={styles.infoRow}>
                <Text style={styles.boxText}>Order ID:</Text>
                <Text style={styles.boxText1}> #ORD254689</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.boxText}>Order Date:</Text>
                <Text style={styles.boxText1}> Oct 25, 2025</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.boxText}>
                  Estimated Delivery: </Text>

                <Text style={styles.boxText1}>
                   Oct 30 - Nov 2, 2025
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.boxText}>Delivering to: </Text>

                <Text style={styles.boxText1}>
                  Ria Jain, 12/4 Green Road
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.boxText}>Tracking ID: </Text>

                <Text style={styles.boxText1}>#ORD254689</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.discrptionView}>
          <View style={styles.alignRow1}>
            <TouchableOpacity
              style={styles.selectedView}
              onPress={() => setActiveInfoTab('shipping')}
            >
              <Text style={styles.text8}>Top Bottom</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveInfoTab('howItWorks')}
            >
              <Text style={styles.text8}>Footwear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveInfoTab('productInfo')}
            >
              <Text style={styles.text8}>Extra</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {orderSteps.map((step, index) => (
            <View key={step.title} style={styles.timelineRow}>
              <View style={styles.timelineIconColumn}>
                <View
                  style={[
                    styles.timelineIcon,
                    step.complete &&
                      styles.timelineIconComplete,
                  ]}
                >
                  {step.complete ? (
                    <Check
                      color="#ffffff"
                      size={18}
                      strokeWidth={3}
                    />
                  ) : (
                   <Loader
                      color="#ffffff"
                      size={18}
                      strokeWidth={3}
                    />
                  )}
                </View>

                {index < orderSteps.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              <View style={styles.timelineContent}>
                <Text style={styles.stepTitle}>
                  {step.title}
                </Text>

                <Text style={styles.stepDetail}>
                  {step.detail}
                </Text>

                {step.note ? (
                  <Text
                    style={[
                      styles.stepNote,
                      step.blocked &&
                        styles.blockedNote,
                    ]}
                  >
                    {step.blocked ? '✕ ' : ''}
                    {step.note}
                  </Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* Refund */}
        <Text style={styles.heading1}>
          Refund & Return Policy
        </Text>

        <View style={styles.alignRow}>
          <Text style={styles.subHeading1}>
            Out.Fit.Find acts as a facilitator between you and
            our partner brands. Refunds and returns are handled
            according to the brand's individual policy.
            <Text style={styles.policyLink}>
              {' '}
              View Brand's Refund Policy
            </Text>
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={() => console.log('Pressed!')}
        >
          <View style={styles.buttonbox1}>
            <Text style={styles.text6}>Cancel Order</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.heading2}>Until Shipped</Text>

        <Text style={styles.heading3}>
          Refund and returns are processed directly by the
          brand. Timelines may vary depending on the partner's
          policy.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000',
  },

  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: 30,
  },

  headerContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: width * 0.04,
    color: '#fff',
    fontWeight: '900',
    marginLeft: 8,
  },

  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  heading: {
    fontSize: width * 0.07,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 10,
  },

  subHeading: {
    fontSize: width * 0.038,
    color: '#fff',
    marginBottom: 30,
    fontWeight: '600',
    lineHeight: 22,
  },

  box1: {
    borderRadius: 16,
    backgroundColor: '#2d2c2c',
    marginTop: 10,
  },

  box: {
    borderRadius: 16,
    padding: 15,
  },

  infoRow: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    marginBottom: 14,
    flexWrap: 'wrap',
  },

  boxText: {
    fontSize: width * 0.038,
    color: '#fff',
    fontWeight: '600',
  },

  boxText1: {
    fontSize: width * 0.038,
    color: '#ffffff',
    fontWeight: '900',
    flexShrink: 1,
   
    
  },

  discrptionView: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  alignRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectedView: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fea26d',
    backgroundColor: '#2e2e2e',
  },

  text8: {
    color: '#fff',
    fontSize: width * 0.038,
    fontWeight: '900',
  },

  timeline: {
    marginTop: 30,
    paddingHorizontal: 20,
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
    color: '#fff',
    fontSize: 20,
  },

  timelineLine: {
    width: 3,
    flex: 1,
    minHeight: 85,
    backgroundColor: '#7b7d80',
  },

  timelineContent: {
    flex: 1,
    paddingBottom: 25,
    paddingLeft: 12,
  },

  stepTitle: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '900',
  },

  stepDetail: {
    color: '#fff',
    fontSize: width * 0.035,
    lineHeight: 22,
    marginTop: 8,
  },

  stepNote: {
    color: '#fff',
    fontSize: width * 0.032,
    lineHeight: 20,
    marginTop: 8,
    fontWeight: '700',
  },

  blockedNote: {
    color: '#d1d1d1',
  },

  heading1: {
    fontSize: width * 0.045,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '900',
    marginHorizontal: 20,
    marginTop: 10,
  },

  subHeading1: {
    fontSize: width * 0.036,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '500',
    lineHeight: 24,
    flex: 1,
  },

  policyLink: {
    fontWeight: '900',
    textDecorationLine: 'underline',
  },

  buttonbox1: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
    marginTop: 10,
  },

  text6: {
    fontSize: width * 0.042,
    fontWeight: '900',
    color: '#fff',
  },

  heading2: {
    fontSize: width * 0.04,
    color: '#fff',
    marginBottom: 15,
    fontWeight: '900',
    marginLeft: 24,
    marginTop: 20,
  },

  heading3: {
    fontSize: width * 0.035,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '500',
    marginHorizontal: 24,
    lineHeight: 22,
  },

  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default HelloWorldApp;