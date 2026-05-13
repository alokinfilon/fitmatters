import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  BriefcaseBusiness,
  Flame,
  Leaf,
  Shirt,
  Snowflake,
  Sparkles,
} from 'lucide-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const horizontalPadding = 16;
const gridGap = 8;

const categories = [
  { label: 'Everyday Fit', Icon: Shirt, active: true },
  { label: 'Work Fit', Icon: BriefcaseBusiness },
  { label: 'Winter Vacation Fit', Icon: Snowflake },
  { label: 'Date Night Fit', Icon: Flame },
  { label: 'Summer Vacation Fit', Icon: Leaf },
  { label: 'Night Out Fit', Icon: Sparkles, active: true },
];

const getImageSource = item => {
  return { uri: item.image };
};

const OutfitFeed = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions();

  const cardWidth = useMemo(() => {
    const usableWidth =
      width - horizontalPadding * 2 - gridGap;

    return Math.floor(usableWidth / 2);
  }, [width]);

  const circleSize = Math.max(
    85,
    Math.min(86, Math.round(width * 0.2)),
  );

  const cardHeight = Math.round(cardWidth * 1.32);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => {
        const clothing = json.filter(item =>
          item.category
            ?.toLowerCase()
            .includes('clothing'),
        );

        setProducts(clothing.length > 0 ? clothing : json);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const outfits = products;

  const openProductDisplay = item => {
    navigation.navigate('ProductDisplay', {
      product: item,
    });
  };

  const renderCategory = ({
    label,
    Icon,
    active,
  }) => (
    <TouchableOpacity
      key={label}
      activeOpacity={0.82}
      style={[
        styles.categoryChip,
        active && styles.activeCategoryChip,
      ]}
    >
      <Icon
        size={13}
        strokeWidth={2}
        color={active ? '#ffb49d' : '#d8ecf0'}
      />

      <Text
        numberOfLines={1}
        style={styles.categoryText}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderStory = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={() => openProductDisplay(item)}
      style={[
        styles.storyItem,
        index === 0 && styles.firstStoryItem,
      ]}
    >
      <View
        style={[
          styles.storyRing,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
          },
        ]}
      >
        <Image
          source={getImageSource(item)}
          style={styles.storyImage}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  const renderOutfit = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => openProductDisplay(item)}
      style={[
        styles.card,
        {
          width: cardWidth,
          height: cardHeight,
        },
      ]}
    >
      <Image
        source={getImageSource(item)}
        style={styles.cardImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const ListHeader = (
    <View style={styles.header}>
      <View style={styles.categoryWrap}>
        {categories.map(renderCategory)}
      </View>

      <View style={styles.divider} />

      <FlatList
        data={outfits}
        renderItem={renderStory}
        keyExtractor={item => `story-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyList}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#ffb49d"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}
    >
      <FlatList
        data={outfits}
        renderItem={renderOutfit}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        key={cardWidth}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
        columnWrapperStyle={styles.gridRow}
      />
    </SafeAreaView>
  );
};

export default OutfitFeed;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#080808',
  },

  loaderContainer: {
    flex: 1,
    backgroundColor: '#080808',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gridContent: {
    paddingBottom: 18,
  },

  header: {
    backgroundColor: '#080808',
  },

  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
    paddingHorizontal: horizontalPadding,
    paddingTop: 20,
    paddingBottom: 19,
  },

  categoryChip: {
    minHeight: 37,
    maxWidth: '100%',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#484848',
    backgroundColor: '#27292b',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
  },

  activeCategoryChip: {
    borderColor: '#ff9e89',
    backgroundColor: '#302827',
  },

  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
    flexShrink: 1,
  },

  divider: {
    height: 1,
    backgroundColor: '#5f5e5e',
    marginHorizontal: horizontalPadding,
    marginBottom: 17,
  },

  storyList: {
    paddingLeft: horizontalPadding,
    paddingRight: 8,
    paddingBottom: 17,
  },

  storyItem: {
    marginRight: 13,
    idth: '100%',
    height: '100%',
  },

  firstStoryItem: {
    marginLeft: 0,
    
  },

  storyRing: {
    borderWidth: 3,
    borderColor: '#fecec2',
    backgroundColor: '#f6eadf',
    overflow: 'hidden',
    
  },

  storyImage: {
    width: '100%',
    height: '100%',
  },

  gridRow: {
    paddingHorizontal: horizontalPadding,
    justifyContent: 'space-between',
  },

  card: {
    borderRadius: 7,
    overflow: 'hidden',
    backgroundColor: '#fff1e5',
    marginBottom: gridGap,
  },

  cardImage: {
    width: '100%',
    height: '100%',
  },
});