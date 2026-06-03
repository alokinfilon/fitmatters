import React, { useState, useEffect } from 'react';
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
   KeyboardAvoidingView, 
    Keyboard, 
      TouchableWithoutFeedback, 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import { 
  Home as HomeIcon, 
  Search, 
  Image as CommunityIcon, 
  ShoppingBag, 
  MoreHorizontal,
  Bell,
  Layers,
  Plus,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Smile
} from 'lucide-react-native';
import { Tokens } from '../theme/theme'; 

const MASTER_LIMIT = 100;

const CommunitySpace = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('Recent'); 
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const [activePostCommentId, setActivePostCommentId] = useState(null);

  useEffect(() => {
    fetchCommunityPosts();
  }, []);

  const fetchCommunityPosts = () => {
    setLoading(true);
    fetch(`https://dummyjson.com/products`)
      .then(response => response.json())
      .then(json => {
        if (json && json.products) {
          const formattedPosts = json.products.slice(0, 15).map((product, index) => ({
            id: `post-${product.id}`,
            username: index % 2 === 0 ? 'Brooklyn Simmons' : 'Brooklyn Simmons',
            userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
            timeAgo: `${index + 2} days ago`,
            postImage: product.images?.[0] || product.thumbnail,
            title: product.title === "Essence Mascara Lash Princess" ? "Crisp whites, clean cuts, and coffee in hand ☕" : product.description,
            tags: ['#CollegeCasual', '#OOTD', '#CasualChic'],
            likes: 213 + index,
            commentsCount: 12 + index,
            shares: 21 + index,
          }));
          setPosts(formattedPosts);
        }
      })
      .catch(error => console.error("Social data pull fail:", error))
      .finally(() => setLoading(false));
  };

  // const openProductDisplay = item => {
  //   if (navigation && navigation.push) {
  //     navigation.push('ProductDisplay', { product: item });
  //   }
  // };

  const handleToggleComment = (postId) => {
    if (activePostCommentId === postId) {
      setActivePostCommentId(null); 
    } else {
      setActivePostCommentId(postId); 
      setCommentText('');
    }
  };

  const renderPostCard = ({ item }) => (
    <LinearGradient
      colors={['#242525', '#1A1C1D']}
      start={{ x: 0.02, y: 0.5 }}
      end={{ x: 0.98, y: 0.5 }}
      style={styles.postCardOuterFrame}
    >
     
      <View style={styles.postHeaderRow}>
        <View style={styles.postHeaderUserGroup}>
          <Image source={{ uri: item.userAvatar }} style={styles.userAvatarProfilePic} />
          <Text numberOfLines={1} style={styles.userNameText}>{item.username}</Text>
        </View>
        <Text style={styles.timeStampText}>{item.timeAgo}</Text>
      </View>

     
      <View style={styles.imageDisplayContainer}>
        <Image source={{ uri: item.postImage }} style={styles.mainPostMediaImage} resizeMode="cover" />
        
        <View style={styles.mediaCarouselIndicatorTrack}>
          <View style={styles.indicatorDotInactive} />
          <LinearGradient
            colors={['#FEF9BD', '#FA83F2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.indicatorDotActive}
          />
          <View style={styles.indicatorDotInactive} />
          <View style={styles.indicatorDotInactive} />
        </View>
      </View>

      <View style={styles.postContentContainerDescriptionBlock}>
        <View style={styles.descriptionHeaderTitleWrapperRow}>
          <Text style={styles.mainDescriptionTitleText} numberOfLines={2}>
            {item.title}
          </Text>
          <TouchableOpacity  activeOpacity={0.7} style={styles.bagActionButton}>
            <ShoppingBag size={Tokens.scaleAsset(24)} color="#CCCCCC" />
          </TouchableOpacity>
        </View>

        <View style={styles.tagListContainerRow}>
          {item.tags.map((tag, i) => (
            <Text key={i} numberOfLines={1} style={styles.hashTagTextItem}>{tag}</Text>
          ))}
        </View>

        <View style={styles.metricsActionBarGroupRow}>
          
          <TouchableOpacity style={styles.individualMetricTabItem} activeOpacity={0.7}>
            <Heart size={Tokens.scaleAsset(24)} color="#CCCCCC" />
            <Text style={styles.metricLabelValueStringText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.individualMetricTabItem} 
            activeOpacity={0.7}
            onPress={() => handleToggleComment(item.id)}
          >
            <MessageSquare 
              size={Tokens.scaleAsset(24)} 
              color={activePostCommentId === item.id ? "#818181" : "#CCCCCC"} 
            />
            <Text style={[
              styles.metricLabelValueStringText, 
              activePostCommentId === item.id ? { color: '#818181' } : { color: '#CCCCC' }
            ]}>
              {item.commentsCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.individualMetricTabItem} activeOpacity={0.7}>
            <Share2 size={Tokens.scaleAsset(24)} color="#CCCCCC" />
            <Text style={styles.metricLabelValueStringText}>{item.shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveActionRightAlignedAnchorButton} activeOpacity={0.7}>
            <Bookmark size={Tokens.scaleAsset(24)} color="#CCCCCC" />
          </TouchableOpacity>

        </View>
      </View>

      {activePostCommentId === item.id && (
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
              <Smile size={Tokens.scaleAsset(22)} color="#E5E5E5" />
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
          
          <View style={styles.topNavigationHeaderModuleOuterContainer}>
            <Text style={styles.screenHeaderTitleMainText}>Community</Text>
            
            <View style={styles.headerSquareActionButtonsGridWrapperRow}>
               <LinearGradient
              colors={['#333637', '#242426']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.squareHeaderActionButtonItem}
            > 
              <TouchableOpacity  activeOpacity={0.75}>
                <Bell size={Tokens.scaleAsset(24)} color="#E5E5E5" />
              </TouchableOpacity>
              </LinearGradient>

               <LinearGradient
              colors={['#333637', '#242426']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.squareHeaderActionButtonItem}
            > 
              <TouchableOpacity  activeOpacity={0.75}>
                <Layers size={Tokens.scaleAsset(24)} color="#E5E5E5" />
              </TouchableOpacity>
              </LinearGradient>

               <LinearGradient
              colors={['#333637', '#242426']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.squareHeaderActionButtonItem}
            > 
              <TouchableOpacity  activeOpacity={0.75}>
                <Plus size={Tokens.scaleAsset(24)} color="#E5E5E5" />
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

          {loading ? (
            <View style={styles.centerSpinnerLoaderViewFrame}>
              <ActivityIndicator size="large" color="#F8876C" />
            </View>
          ) : (
            <FlatList
              data={posts}
              renderItem={renderPostCard}
              keyExtractor={item => item.id}
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
    paddingTop: Tokens.gaps.large,
    paddingBottom: 140, 
  },

  topNavigationHeaderModuleOuterContainer: {
    width: '100%',
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    paddingTop: Tokens.gaps.large,
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
    //backgroundColor: '#242426',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabsPanelOuterWrapperContainerSectionBox: {
    width: '100%',
    paddingHorizontal: Tokens.layout.paddingHorizontal,
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
  tabTextLabelActive: {
    color: '#fff',
    fontWeight: 'bold',
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
  postHeaderUserGroup: {
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
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Tokens.gaps.large,
  },
  mainPostMediaImage: {
    width: '100%',
    height: '100%',
  },
  mediaCarouselIndicatorTrack: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  indicatorDotInactive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.25,
    borderColor: '#CCCCCC',
  },
  indicatorDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
    marginTop:5
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
    justifyContent:"space-evenly"
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

  lineDivider: {
    width: '100%',
    height: 0,
    borderTopWidth: 1,
    borderColor: '#323537',
    marginVertical: Tokens.gaps.large,
  },

});

export default CommunitySpace;