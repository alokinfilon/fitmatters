import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../App';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { Tokens } from '../theme/theme'; 
import BellIcon from '../component/svg/BellIcon';
import MyPostIcon from '../component/svg/MyPostIcon';
import PlusIcon from '../component/svg/PlusIcon';
import ShoppingBagIcon from '../component/svg/shoppingBagIcon';
import HeartIcon from '../component/svg/HeartIcon';
import ShareIcon from '../component/svg/ShareIcon';
import CommentIcon from '../component/svg/CommentIcon';
import SaveIcon from '../component/svg/SaveIcon';
import SmileIcon from '../component/svg/SmileIcon';
import { useAlertModal } from '../component/modal'; 
import authService from '../services/authService'; 

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Calculate exact width of the carousel items inside your padded card container
const CAROUSEL_WIDTH = SCREEN_WIDTH - (Tokens.layout.paddingHorizontal * 2) - 32; // 32 accounts for 16px padding on both sides of postCardOuterFrame

const CommunitySpace = ({ navigation }) => {
  const { showModal } = useAlertModal();
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('Recent'); 
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { setUserIsAuthenticated } = useContext(AuthContext);

  const [activePostCommentId, setActivePostCommentId] = useState(null);
  
  // Track active index map for each post individually: { [postId]: activeImageIndex }
  const [activeImageIndices, setActiveImageIndices] = useState({});

  useEffect(() => {
    fetchCommunityPosts();
  }, []);

  const fetchCommunityPosts = () => {
    setLoading(true);
    fetch(`https://fitmatters-backend.onrender.com/products`)
      .then(response => response.json())
      .then(json => {
        if (json && json.products) {
          const formattedPosts = json.products.slice(0, 200).map((product, index) => {
            // Enforce that every post has exactly 3 images
            let initialImages = product.images || [];
            if (initialImages.length === 0 && product.thumbnail) {
              initialImages = [product.thumbnail];
            }
            
            // Build uniform array containing exactly 3 items using loop repeats if necessary
            const exactThreeImages = [];
            for (let i = 0; i < 3; i++) {
              if (initialImages[i]) {
                exactThreeImages.push(initialImages[i]);
              } else {
                // Fallback to first available or thumbnail image if less than 3 exist
                exactThreeImages.push(initialImages[0] || product.thumbnail);
              }
            }

            return {
              id: `post-${product.id}`,
              username: index % 2 === 0 ? 'Brooklyn Simmons' : 'Brooklyn Simmons',
              userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
              timeAgo: `${index + 2} days ago`,
              postImages: exactThreeImages, // Array containing exactly 3 structural items
              title: product.title === "Essence Mascara Lash Princess" ? "Crisp whites, clean cuts, and coffee in hand ☕" : product.title,
              tags: ['#CollegeCasual', '#OOTD', '#CasualChic'],
              likes: 213 + index,
              commentsCount: 12 + index,
              shares: 21 + index,
            };
          });
          setPosts(formattedPosts);
        }
      })
      .catch(error => console.error("Social data pull fail:", error))
      .finally(() => setLoading(false));
  };

  const handleToggleComment = (postId) => {
    if (activePostCommentId === postId) {
      setActivePostCommentId(null); 
    } else {
      setActivePostCommentId(postId); 
      setCommentText('');
    }
  };

  const handleLogoutPress = () => {
    showModal({
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out of your account?',
      variant: 'warning',
      confirmText: 'Log Out',
      cancelText: 'Stay',
      onConfirm: async () => {
        try {
          await authService.logout();
          setUserIsAuthenticated(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpScreen' }],
          });
        } catch (error) {
          showModal({
            title: 'Logout Failed',
            message: error.message || 'Could not securely log out. Please try again.',
            variant: 'error'
          });
        }
      },
      onCancel: () => console.log('Logout cancelled by user') 
    });
  };

  // Handles moving dots by monitoring scroll content offsets dynamically
  const handleCarouselScroll = (postId, event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offset / slideSize);
    
    if (activeImageIndices[postId] !== activeIndex) {
      setActiveImageIndices(prev => ({
        ...prev,
        [postId]: activeIndex,
      }));
    }
  };

  const renderPostCard = ({ item: postItem }) => {
    const currentActiveIndex = activeImageIndices[postItem.id] || 0;

    return (
      <LinearGradient
        colors={['#242525', '#1A1C1D']}
        start={{ x: 0.02, y: 0.5 }}
        end={{ x: 0.98, y: 0.5 }}
        style={styles.postCardOuterFrame}
      >
        {/* Header Row */}
        <View style={styles.postHeaderRow}>
          <View style={styles.postHeaderGroupView}>
            <Image source={{ uri: postItem.userAvatar }} style={styles.userAvatarProfilePic} />
            <Text numberOfLines={1} style={styles.userNameText}>{postItem.username}</Text>
          </View>
          <Text style={styles.timeStampText}>{postItem.timeAgo}</Text>
        </View>

        {/* Media Window Carousel Frame Container */}
        <View style={styles.imageDisplayContainer}>
          <FlatList
            data={postItem.postImages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CAROUSEL_WIDTH}
            decelerationRate="fast"
            keyExtractor={(imgUrl, idx) => `${postItem.id}-img-${idx}`}
            onScroll={(e) => handleCarouselScroll(postItem.id, e)}
            scrollEventThrottle={16}
            renderItem={({ item: imageUrl }) => (
              <Image 
                source={{ uri: imageUrl }} 
                style={styles.mainPostMediaImage} 
                resizeMode="cover" 
              />
            )}
          />
          
          {/* Dynamic Track Bar Overlay Indicators */}
          <View style={styles.mediaCarouselIndicatorTrack}>
            {postItem.postImages.map((_, dotIndex) => {
              if (dotIndex === currentActiveIndex) {
                return (
                  <LinearGradient
                    key={dotIndex}
                    colors={['#FEF9BD', '#FA83F2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.indicatorDotActive}
                  />
                );
              }
              return <View key={dotIndex} style={styles.indicatorDotInactive} />;
            })}
          </View>
        </View>

        {/* Descriptions and Actions */}
        <View style={styles.postContentContainerDescriptionBlock}>
          <View style={styles.descriptionHeaderTitleWrapperRow}>
            <Text style={styles.mainDescriptionTitleText} numberOfLines={2}>
              {postItem.title}
            </Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.bagActionButton}>
              <ShoppingBagIcon size={Tokens.scaleAsset(28)} color="#CCCCCC" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          <View style={styles.tagListContainerRow}>
            {postItem.tags.map((tag, i) => (
              <Text key={i} numberOfLines={1} style={styles.hashTagTextItem}>{tag}</Text>
            ))}
          </View>

          <View style={styles.metricsActionBarGroupRow}>
            <TouchableOpacity style={styles.individualMetricTabItem} activeOpacity={0.7}>
              <HeartIcon size={Tokens.scaleAsset(28)} color="#CCCCCC" strokeWidth={1.5} />
              <Text style={styles.metricLabelValueStringText}>{postItem.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.individualMetricTabItem} 
              activeOpacity={0.7}
              onPress={() => handleToggleComment(postItem.id)}
            >
              <CommentIcon size={Tokens.scaleAsset(28)} color={activePostCommentId === postItem.id ? "#818181" : "#CCCCCC"} strokeWidth={1.5} />
              <Text style={[
                styles.metricLabelValueStringText, 
                activePostCommentId === postItem.id ? { color: '#818181' } : { color: '#CCCCCC' }
              ]}>
                {postItem.commentsCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.individualMetricTabItem} activeOpacity={0.7}>
              <ShareIcon size={Tokens.scaleAsset(28)} color="#CCCCCC" strokeWidth={1.5} />
              <Text style={styles.metricLabelValueStringText}>{postItem.shares}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveActionRightAlignedAnchorButton} activeOpacity={0.7}>
              <SaveIcon size={Tokens.scaleAsset(26)} color="#CCCCCC" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Comment Drawer Form Block */}
        {activePostCommentId === postItem.id && (
          <View style={styles.commentInputFormTerminalAreaBoxContainer}>
            <View style={styles.commentTextInputContainerRowWrapperBoxField}>
              <TextInput
                style={styles.commentTextInputNativeComponentField}
                placeholder="Your Comment"
                placeholderTextColor="#B3B3B3"
                value={commentText}
                onChangeText={setCommentText}
                autoFocus={true}
              />
            </View>

            <View style={styles.commentActionTriggersPanelRowLayout}>
              <TouchableOpacity activeOpacity={0.7} style={styles.smileyIconTouchTarget}>
                <SmileIcon size={Tokens.scaleAsset(28)} color="#E5E5E5" strokeWidth={1.5} />
              </TouchableOpacity>

              <View style={styles.commentFormActionButtonsSplitWrapperRowBox}>
                <TouchableOpacity 
                  style={styles.cancelCommentButton} 
                  activeOpacity={0.7}
                  onPress={() => setActivePostCommentId(null)}
                >
                  <Text style={styles.cancelButtonTextStringLabel}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.85} onPress={() => setActivePostCommentId(null)}>
                  <LinearGradient
                    colors={['#FBB59E', '#F8876C', '#F16646', '#F98F7A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.postSubmitCommentButtonGradientContainerBox}
                  >
                    <Text style={styles.postSubmitCommentButtonTextLabel}>Post</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </LinearGradient>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainerWrapper}>
      <View style={styles.topNavigationHeaderModuleOuterContainer}>
        <Text style={styles.screenHeaderTitleMainText}>Community</Text>
        
        <View style={styles.headerSquareActionButtonsGridWrapperRow}>
          <LinearGradient
            colors={['#333637', '#242426']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.squareHeaderActionButtonItem}
          > 
            <TouchableOpacity activeOpacity={0.75}>
              <BellIcon size={Tokens.scaleAsset(28)} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#333637', '#242426']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.squareHeaderActionButtonItem}
          > 
            <TouchableOpacity activeOpacity={0.75}>
              <MyPostIcon size={Tokens.scaleAsset(28)} color="#E5E5E5" strokeWidth={1.5} />
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#333637', '#242426']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.squareHeaderActionButtonItem}
          > 
            <TouchableOpacity
              onPress={handleLogoutPress}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel="Log out of application"
            >
              <PlusIcon size={Tokens.scaleAsset(28)} color="#E5E5E5" strokeWidth={2} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      <View style={styles.tabsPanelOuterWrapperContainerSectionBox}>
        <LinearGradient
          colors={['#333637', '#242426']}
          start={{ x: 0.01, y: 0.5 }}
          end={{ x: 0.99, y: 0.5 }}
          style={styles.tabsPanelInnerGradientWrapperBackgroundTrackBox}
        >
          <TouchableOpacity 
            style={styles.individualTabButtonAnchorWrapper}
            onPress={() => setActiveTab('Trending')}
            activeOpacity={0.85}
          >
            {activeTab === 'Trending' ? (
              <LinearGradient
                colors={['rgba(251, 181, 158, 1)', 'rgba(248, 135, 108, 1)', 'rgba(241, 102, 70, 1)', 'rgba(249, 143, 122, 1)']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.borderGradientContainer}
              >
                <View style={styles.solidMaskShield}>
                  <LinearGradient
                    colors={['rgba(253, 219, 189, 0.15)', 'rgba(247, 125, 97, 0.12)', 'rgba(251, 180, 157, 0.12)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.activeTabHighlightOverlayGradientBoxMask}
                  >
                    <Text numberOfLines={1} style={styles.tabTextLabelActive}>Trending 🔥</Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveTabOverlayContainerContentBox}>
                <Text numberOfLines={1} style={styles.tabTextLabelInactive}>Trending 🔥</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.individualTabButtonAnchorWrapper}
            onPress={() => setActiveTab('Recent')}
            activeOpacity={0.85}
          >
            {activeTab === 'Recent' ? (
              <LinearGradient
                colors={['rgba(251, 181, 158, 1)', 'rgba(248, 135, 108, 1)', 'rgba(241, 102, 70, 1)', 'rgba(249, 143, 122, 1)']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.borderGradientContainer}
              >
                <View style={styles.solidMaskShield}>
                  <LinearGradient
                    colors={['rgba(253, 219, 189, 0.15)', 'rgba(247, 125, 97, 0.12)', 'rgba(251, 180, 157, 0.12)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.activeTabHighlightOverlayGradientBoxMask}
                  >
                    <Text numberOfLines={1} style={styles.tabTextLabelActive}>Recent 🆕</Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveTabOverlayContainerContentBox}>
                <Text numberOfLines={1} style={styles.tabTextLabelInactive}>Recent 🆕</Text>
              </View>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
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
          
          {loading ? (
            <View style={styles.centerSpinnerLoaderViewFrame}>
              <ActivityIndicator size="large" color="#F8876C" />
            </View>
          ) : (
            <FlatList
              data={posts}
              renderItem={renderPostCard}
              keyExtractor={item => item.id}
              ListHeaderComponent={renderHeader}
              contentContainerStyle={styles.socialFeedScrollContentContainerSpacingPadding}
              showsVerticalScrollIndicator={false}
            />
          )}
        </SafeAreaView>
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
  centerSpinnerLoaderViewFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialFeedScrollContentContainerSpacingPadding: {
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    paddingBottom: 40, 
  },
  headerContainerWrapper: {
    paddingTop: Tokens.gaps.large, 
  },
  topNavigationHeaderModuleOuterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Tokens.gaps.large,
  },
  screenHeaderTitleMainText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  headerSquareActionButtonsGridWrapperRow: {
    flexDirection: 'row',
    gap: Tokens.gaps.large,
  },
  squareHeaderActionButtonItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#323537',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsPanelOuterWrapperContainerSectionBox: {
    width: '100%',
    marginBottom: Tokens.gaps.large,
  },
  tabsPanelInnerGradientWrapperBackgroundTrackBox: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#323537',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    gap: Tokens.gaps.large,
  },
  individualTabButtonAnchorWrapper: {
    flex: 1,
    height: 40,
  },
  borderGradientContainer: {
    flex: 1,
    padding: 1,            
    borderRadius: 9,         
    overflow: 'hidden',
  },
  solidMaskShield: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A', 
  },
  activeTabHighlightOverlayGradientBoxMask: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inactiveTabOverlayContainerContentBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tabTextLabelActive: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    color: '#FFFFFF',
  },
  tabTextLabelInactive: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 14,
    color: '#B3B3B3',
  },
  postCardOuterFrame: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#323537',
    padding: 16,
    marginBottom: Tokens.gaps.xlarge,
  },
  postHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: Tokens.gaps.large,
  },
  postHeaderGroupView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    flex: 1,
  },
  userAvatarProfilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C4C4C4',
  },
  userNameText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  timeStampText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 12,
    color: '#B3B3B3',
  },
  imageDisplayContainer: {
    width: '100%',
    height: 389,
    borderRadius: 16,
    backgroundColor: '#1A1C1D',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Tokens.gaps.large,
  },
  mainPostMediaImage: {
    width: CAROUSEL_WIDTH,
    height: '100%',
  },
  mediaCarouselIndicatorTrack: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  indicatorDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  indicatorDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  postContentContainerDescriptionBlock: {
    width: '100%',
    gap: Tokens.gaps.large,
    marginBottom: Tokens.gaps.large,
  },
  descriptionHeaderTitleWrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    gap: Tokens.gaps.small,
  },
  mainDescriptionTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 18,
    lineHeight: 28,
    color: '#E5E5E5',
    flex: 1,
  },
  bagActionButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  tagListContainerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Tokens.gaps.small,
    width: '100%',
  },
  hashTagTextItem: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 12,
    color: '#B3B3B3',
  },
  metricsActionBarGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 4,
    justifyContent: "space-evenly"
  },
  individualMetricTabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    marginRight: Tokens.gaps.xlarge,
  },
  metricLabelValueStringText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    color: '#CCCCCC',
  },
  saveActionRightAlignedAnchorButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInputFormTerminalAreaBoxContainer: {
    width: '100%',
    gap: Tokens.gaps.large,
    paddingTop: 8,
  },
  commentTextInputContainerRowWrapperBoxField: {
    width: '100%',
    height: 72,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#818181',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  commentTextInputNativeComponentField: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    color: '#B3B3B3',
    padding: 0,
    width: '100%',
    height: '100%',
    textAlignVertical: 'top',
  },
  commentActionTriggersPanelRowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  smileyIconTouchTarget: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentFormActionButtonsSplitWrapperRowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.large,
  },
  cancelCommentButton: {
    width: 80,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonTextStringLabel: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#CCCCCC',
  },
  postSubmitCommentButtonGradientContainerBox: {
    width: 100,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postSubmitCommentButtonTextLabel: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default CommunitySpace;