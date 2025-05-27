import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Music, User, SquarePlay as PlaySquare } from 'lucide-react-native';
import { searchResults } from '@/utils/mockData';
import { usePlayerContext } from '@/contexts/PlayerContext';
import { useTheme } from '@/contexts/ThemeContext';

interface SearchResultsProps {
  query: string;
}

type ResultType = 'track' | 'artist' | 'album';

export function SearchResults({ query }: SearchResultsProps) {
  const { playTrack } = usePlayerContext();
  const { colors } = useTheme();
  
  // Filter results based on query
  const filteredResults = searchResults.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    ('artist' in item && item.artist.toLowerCase().includes(query.toLowerCase()))
  );

  const getIconForType = (type: ResultType) => {
    switch (type) {
      case 'track':
        return <Music size={20} color={colors.secondaryText} />;
      case 'artist':
        return <User size={20} color={colors.secondaryText} />;
      case 'album':
        return <PlaySquare size={20} color={colors.secondaryText} />;
    }
  };

  const renderItem = ({ item }: { item: typeof searchResults[0] }) => (
    <TouchableOpacity 
      style={[styles.resultItem, { borderBottomColor: colors.border }]}
      onPress={() => {
        if (item.type !== 'artist') {
          playTrack({
            id: item.id,
            title: item.title,
            artist: 'artist' in item ? item.artist : '',
            artwork: item.imageUrl,
          });
        }
      }}
    >
      <View style={[styles.imageContainer, { backgroundColor: colors.card }]}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : (
          getIconForType(item.type)
        )}
      </View>
      <View style={styles.itemContent}>
        <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.itemMeta}>
          <View style={[styles.typeBadge, { backgroundColor: colors.border }]}>
            <Text style={[styles.typeText, { color: colors.secondaryText }]}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </View>
          {'artist' in item && (
            <Text style={[styles.artistText, { color: colors.secondaryText }]} numberOfLines={1}>
              {item.artist}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.resultsCount, { color: colors.secondaryText }]}>
        {filteredResults.length} results for "{query}"
      </Text>
      <FlatList
        data={filteredResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 120,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemContent: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  typeText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
  },
  artistText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});