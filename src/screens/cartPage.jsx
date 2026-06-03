import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import {
  ArrowLeft,
  Check,
  Loader,
  Home as HomeIcon, 
  Search, 
  Image as CommunityIcon, 
  ShoppingBag, 
  MoreHorizontal
} from 'lucide-react-native';
import { Tokens } from '../theme/theme'; // Central Tokens file configuration reference
import ArrowLeftIcon from '../component/svg/arrow'
import CheckMarkl from '../component/svg/checkMarklIcon'
import LoadingIcon from '../component/svg/loadingIcon'
 const feedbackIconSize = Tokens.scaleAsset(12);
const { width } = Dimensions.get('window');

const TOTAL_PADDINGS = Tokens.layout.paddingHorizontal * 2;
const DYNAMIC_TAB_WIDTH = (width - TOTAL_PADDINGS - (Tokens.gaps.large * 2)) / 3;

export default function TrackOrders({ navigation }) {
  const [activeItemTab, setActiveItemTab] = useState('Top bottom'); // Top bottom, Footwear, Extra

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.replace('Home'); 
    }
  };

  // Step Timeline Data Source Array for clean layout scaling
  const timelineSteps = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Your order has been received and is being processed by [Brand Name].',
      footnote: 'You can cancel your order until it is shipped.',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Confirmed by [Brand Name].',
      description: 'We’ve received confirmation from [Brand Name]. Your items are being prepared for shipment.',
      footnote: 'Still eligible for cancellation until shipped.',
      status: 'active',
    },
    {
      id: 3,
      title: 'Shipped by [Brand Name].',
      description: 'Our outfit has been shipped. Tracking ID: #ORD245679.',
      footnote: '❌ Order can no longer be cancelled after this point.',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Out for delivery.',
      description: 'Your package is on its way. Please keep your phone available for delivery updates.',
      footnote: '❌ Not available after this point.',
      status: 'pending',
    },
    {
      id: 5,
      title: 'Delivered',
      description: 'Your order has been delivered successfully. Enjoy your new look!',
      footnote: '',
      status: 'pending',
    },
  ];

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
          
          {/* Back Header Target Navigation Row */}
          <View style={styles.backHeaderRow}>
            <TouchableOpacity style={styles.backButtonTouchTarget} onPress={handleGoBack} activeOpacity={0.7}>
              <ArrowLeftIcon size={Tokens.scaleAsset(24)} color="#E5E5E5" strokeWidth={1.5} />
              <Text style={styles.backButtonTextLabel}>Back</Text>
              </TouchableOpacity>
            </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
            
            {/* Main Header Labels Area Terminal */}
            <View style={styles.headerMetaBlockFrame}>
              <Text style={styles.screenTitleMainHeading}>Track Your Orders</Text>
              <Text style={styles.screenSubtitleLabelDescription}>Track deliveries, check order details, and manage returns.</Text>
                </View>

            {/* Core Summary Card Info Terminal Area Box (Frame 526) */}
            <LinearGradient
              colors={['#242525', '#1A1C1D']}
              start={{ x: 0.02, y: 0.5 }}
              end={{ x: 0.98, y: 0.5 }}
              style={styles.summaryCardOuterFrameBox}
            >
              <View style={styles.summaryInnerDataFieldRow}>
                <Text style={styles.summaryFieldLabelString}>Order ID: <Text style={styles.summaryFieldValueBoldString}>#ORD245679</Text></Text>
                </View>
              <View style={styles.summaryInnerDataFieldRow}>
                <Text style={styles.summaryFieldLabelString}>Order Date: <Text style={styles.summaryFieldValueBoldString}>Oct 25, 2025</Text></Text>
                </View>
              <View style={styles.summaryInnerDataFieldRow}>
                <Text style={styles.summaryFieldLabelString}>Estimated Delivery: <Text style={styles.summaryFieldValueBoldString}>Oct 30 – Nov 2, 2025</Text></Text>
                </View>
              <View style={styles.summaryInnerDataFieldRow}>
                <Text style={styles.summaryFieldLabelString}>Delivering to: <Text style={styles.summaryFieldValueBoldString}>Ria Jain, 12/4 Green Road, Delhi</Text></Text>
              </View>
              <View style={styles.summaryInnerDataFieldRow}>
                <Text style={styles.summaryFieldLabelString}>Tracking ID: <Text style={styles.summaryFieldValueBoldString}>#ORD245679</Text></Text>
          </View>
            </LinearGradient>

            {/* Item Switch Category Tab Toggle Strip Layout Component Box Area (Frame 530) */}
            <View style={styles.navigationTabsStripRowWrapperContainerBox}>
              {['Top bottom', 'Footwear', 'Extra'].map((tab) => {
                const isTabActive = activeItemTab === tab;
                return (
              <TouchableOpacity
  key={tab}
  onPress={() => setActiveItemTab(tab)}
  activeOpacity={0.85}
  // Keep the dynamic width on the touchable wrapper
  style={{ width: DYNAMIC_TAB_WIDTH }} 
>
  {isTabActive ? (
    <LinearGradient
      colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      // PASS THE DYNAMIC WIDTH HERE AS WELL 👇
      style={[styles.borderGradientContainer, { width: DYNAMIC_TAB_WIDTH }]}
    >
      <View style={styles.activeSolidBackgroundMaskShield}>
      <LinearGradient
        colors={['rgba(253, 219, 189, 0.15)', 'rgba(247, 125, 97, 0.12)', 'rgba(251, 180, 157, 0.12)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.activeTabOverlayGradientHighlightBoxMask}
              >
        <Text numberOfLines={1} style={styles.categoryTabLabelTextStringActive}>
          {tab}
        </Text>
      </LinearGradient>
                </View>
    </LinearGradient>
  ) : (
    <View style={styles.inactiveCategoryTabOverlayContainerContentBox}>
      <Text numberOfLines={1} style={styles.categoryTabLabelTextStringInactive}>
        {tab}
      </Text>
    </View>
  )}
              </TouchableOpacity>


                );
              })}
            </View>

            <View style={styles.lineDividerHorizontalRuleElement} />

            {/* Selected Active Product Informational Sheet Meta Row Block */}
            <View style={styles.productMetaOverviewClusterContainer}>
              <Text style={styles.productNameMainLabelHeading}>Product Name</Text>
              <Text style={styles.productCategorySubInfoLabelText}>Category: <Text style={styles.whiteEmphasisValueText}>Topwear (1) | Footwear (1)</Text></Text>
              <Text style={styles.productCategorySubInfoLabelText}>Items: <Text style={styles.whiteEmphasisValueText}>2</Text></Text>
              <Text style={styles.productCategorySubInfoLabelText}>Status: <Text style={styles.whiteEmphasisValueText}>Preparing for shipment</Text></Text>
              <Text style={styles.productCategorySubInfoLabelText}>Estimated Delivery: <Text style={styles.whiteEmphasisValueText}>Oct 30 – Nov 2, 2025</Text></Text>
            </View>

            {/* Vertical Multi-Stage Step Timeline Tracker Engine Section (Discount Card Map Blueprint) */}
            <View style={styles.verticalTimelineEngineOuterWrapperBlockSectionContainer}>
              
              {/* Dynamic Absolute Background Track Bar Connector Axis Paths Layer */}
              <View style={styles.timelineAbsoluteTrackLineBackgroundBackdropPath} />
              <View style={styles.timelineAbsoluteTrackLineActiveProgressIndicatorPath} />

              {/* Loop rendering every timeline node component card wrapper item */}
              {timelineSteps.map((step, idx) => {
                return (
                  <View key={step.id} style={[styles.timelineStepRowLayoutBlockNode, idx === timelineSteps.length - 1 && { marginBottom: 0 }]}>
                    
                    {/* Status Circle Indicator Module Assembly */}
                    <View style={styles.statusCircleIndicatorWrapperOuterNode}>
                      {step.status === 'completed' && (
                        <View style={styles.timelineStatusCircleCompletedFill}>
                          <CheckMarkl size={feedbackIconSize+12} color="#ffffff" strokeWidth={3} />
            </View>
                      )}
                      {step.status === 'active' && (
                        <View style={styles.timelineStatusCircleActiveFill}>
                          <LoadingIcon size={Tokens.scaleAsset(24)} color="#ffffff" strokeWidth={3} />

          </View>
                      )}
                      {step.status === 'pending' && (
                        <LinearGradient
                          colors={['#333637', '#242426']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.timelineStatusCirclePendingFill}
                        >
                          <LoadingIcon size={Tokens.scaleAsset(24)} color="#ffffff" strokeWidth={3} />

                        </LinearGradient>
                    )}
                  </View>

                    {/* Step Content Card Text Blocks */}
                    <View style={styles.timelineStepRightContentTextFieldCardWrapperBox}>
                      <Text style={[styles.timelineStepCardHeadingTitleLabelText, step.status === 'active' && { color: '#fefefe' }]}>
                        {step.title}
                      </Text>
                      <Text style={styles.timelineStepCardDescriptionContentParagraphStringText}>
                        {step.description}
                      </Text>
                      {step.footnote !== '' && (
                        <Text style={styles.timelineStepCardFootnoteContextStatusLabelText}>
                          {step.footnote}
                        </Text>
                  )}
                </View>

          </View>
                );
              })}

            </View>

            {/* REFACTORED REFUND & RETURN SYSTEM: Written directly on background canvas to match image_a91021.jpg */}
            <View style={styles.refundPolicyFlatAreaBlockSectionContainer}>
              <Text style={styles.refundPolicySectionHeadingMainTitleText}>Refund & Return Policy</Text>
              
              <Text style={styles.refundPolicyContextParagraphDescriptionText}>
                Out.Fit.Find acts as a facilitator between you and our partner brands. Refunds and returns are handled according to the brand’s individual policy.{' '}
                <Text style={styles.underlineActionLinkStringTextLink}>View Brand’s Refund Policy</Text>
              </Text>

              
              <TouchableOpacity>
              <LinearGradient
                                colors={['#333637', '#242426']}
                                start={{ x: 0.1, y: 0.5 }}
                                end={{ x: 0.9, y: 0.6 }}
                                style={styles.cancelOrderCtaWorkflowActionButtonTouchTarget}
                                
                              >
                                
                                 <Text style={styles.cancelOrderButtonStringTextLabel}>Cancel Order</Text>
                              </LinearGradient></TouchableOpacity>
              
              <Text style={styles.untilShippedClockFootnoteLabelHintText}>⏰ Until Shipped</Text>

              {/* Bold Dynamic Policy Warning block aligned cleanly over footer space */}
              <Text style={styles.globalNetworkPolicyStatementDisclosureParagraphText}>
                Refunds and returns are processed directly by the brand. Timelines may vary depending on the partner’s policy.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>

      

      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContentContainer: {
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    paddingTop: Tokens.gaps.medium,
    //paddingBottom: 140, 
  },
  
  // Header Back Button Row Track Layout
  backHeaderRow: {
    width: '100%',
    height: 40,
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Tokens.gaps.small,
  },
  backButtonTouchTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    height: '100%',
  },
  backButtonTextLabel: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: '#E5E5E5',
  },

  // Titles Section Layout Cluster
  headerMetaBlockFrame: {
    width: '100%',
    gap: Tokens.gaps.small,
    marginBottom: Tokens.gaps.xlarge,
  },
  screenTitleMainHeading: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.title,
    lineHeight: Tokens.typography.lineHeights.title,
    color: '#FFFFFF',
  },
  screenSubtitleLabelDescription: {
    fontFamily: Tokens.typography.families.light,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#E5E5E5',
  },

  summaryCardOuterFrameBox: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#323537',
    padding: 24,
    gap: Tokens.gaps.medium,
    marginBottom: Tokens.gaps.xlarge,
  },
  summaryInnerDataFieldRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryFieldLabelString: {
    fontFamily: Tokens.typography.families.light,
    fontSize: 14,
    lineHeight: 24,
    color: '#E5E5E5',
  },
  summaryFieldValueBoldString: {
    fontFamily: Tokens.typography.families.semiBold,
    color: '#FFFFFF',
    fontSize: 14,
  },

  // Interactive Switch Tabs Layout System Mappings (Frame 530 Panel Track)
  navigationTabsStripRowWrapperContainerBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 36,
    marginBottom: Tokens.gaps.large,
  },
  borderGradientContainer: {
 flex: 1,                    // Fills the 36px high touchable wrapper
    padding: 1,                 // Your crisp 1px wide border line
    borderRadius: 9,            // Matures 1px larger than the inner 8px radius
    overflow: 'hidden',  
  },
 activeSolidBackgroundMaskShield: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
   
    backgroundColor: '#242426', 
  },
  activeTabOverlayGradientHighlightBoxMask: {
    flex: 1,
    height: 36,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  inactiveCategoryTabOverlayContainerContentBox: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTabLabelTextStringActive: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  categoryTabLabelTextStringInactive: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    color: '#E5E5E5',
    textAlign: 'center',
  },
  lineDividerHorizontalRuleElement: {
    width: '100%',
    height: 0,
    borderTopWidth: 1,
    borderColor: '#323537',
    marginBottom: Tokens.gaps.xlarge,
  },

  // Selected Active Product Specs Overview Segment Panel Cluster Bounds
  productMetaOverviewClusterContainer: {
    width: '100%',
    gap: Tokens.gaps.small,
    marginBottom: Tokens.gaps.xlarge,
  },
  productNameMainLabelHeading: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  productCategorySubInfoLabelText: {
    fontFamily: Tokens.typography.families.light,
    fontSize: 14,
    lineHeight: 24,
    color: '#E5E5E5',
  },
  whiteEmphasisValueText: {
    fontFamily: Tokens.typography.families.medium,
    color: '#FFFFFF',
  },

  // Vertical Timeline Progress Tracker Layout Core Mappings (Discount Card Spec Architecture)
  verticalTimelineEngineOuterWrapperBlockSectionContainer: {
    width: '100%',
    position: 'relative',
    paddingLeft: 4,
    marginBottom: Tokens.gaps.section,
  },
  
  // Symmetrical Backdrop Tracking Line Paths Layer Axis Properties
  timelineAbsoluteTrackLineBackgroundBackdropPath: {
    position: 'absolute',
    left: 20, // Centers circle dots perfectly
    top: 24,
    bottom: 24,
    width: 6,
    backgroundColor: '#323537',
    borderRadius: 3,
    zIndex: 1,
  },
  timelineAbsoluteTrackLineActiveProgressIndicatorPath: {
    position: 'absolute',
    left: 20,
    top: 24,
    height: 84, 
    width: 6,
    backgroundColor: '#79DE95',
    borderRadius: 3,
    zIndex: 2,
  },
  timelineStepRowLayoutBlockNode: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: Tokens.gaps.xlarge,
    zIndex: 3, 
  },
  statusCircleIndicatorWrapperOuterNode: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timelineStatusCircleCompletedFill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2BBA52',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineStatusCircleActiveFill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#323537',
    borderWidth: 1,
    borderColor: '#818181',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineStatusCirclePendingFill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#818181',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Step Content Context Strings Mappings
  timelineStepRightContentTextFieldCardWrapperBox: {
    flex: 1,
    gap: 6,
    paddingTop: 4,
  },
  timelineStepCardHeadingTitleLabelText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  timelineStepCardDescriptionContentParagraphStringText: {
    fontFamily: Tokens.typography.families.light,
    fontSize: 14,
    lineHeight: 22,
    color: '#E5E5E5',
  },
  timelineStepCardFootnoteContextStatusLabelText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 12,
    color: '#B3B3B3',
    marginTop: 2,
  },

  refundPolicyFlatAreaBlockSectionContainer: {
    width: '100%',
    gap: Tokens.gaps.large,
    paddingVertical: 4,
    marginBottom: Tokens.gaps.xlarge,
  },
  refundPolicySectionHeadingMainTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14, // Enlarged and set directly over flat text flow
    color: '#FFFFFF',
  },
  refundPolicyContextParagraphDescriptionText: {
    fontFamily: Tokens.typography.families.light,
    fontSize: 14,
    lineHeight: 24,
    color: '#E5E5E5',
  },
  underlineActionLinkStringTextLink: {
    fontFamily: Tokens.typography.families.medium,
    textDecorationLine: 'underline',
    color: '#E5E5E5', 
  },
  cancelOrderCtaWorkflowActionButtonTouchTarget: {
    width: '100%',
    height: Tokens.components.buttonHeight,
    borderRadius: Tokens.components.radiusButton,
    backgroundColor: '#161618', // Matte dark solid block fill
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  cancelOrderButtonStringTextLabel: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  untilShippedClockFootnoteLabelHintText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    color: '#E5E5E5',
    alignSelf: 'flex-start', // Shifted left-aligned to align directly with the cancel button
    marginTop: 2,
    marginBottom: Tokens.gaps.medium,
  },
  globalNetworkPolicyStatementDisclosureParagraphText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14, 
    lineHeight: 26,
    color: '#FFFFFF', 
    textAlign: 'left', 
    marginTop: Tokens.gaps.large,
  },

 
});