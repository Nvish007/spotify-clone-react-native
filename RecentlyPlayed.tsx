import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { recentlyPlayed } from '@/utils/mockData';
import { usePlayerContext } from '@/contexts/PlayerContext';
import { useTheme } from '@/contexts/ThemeContext';

export function RecentlyPlayed() {
  const { playTrack } = usePlayerContext();
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: typeof recentlyPlayed[0] }) => (
    <TouchableOpacity 
      style={[styles.item, { backgroundColor: colors.card }]}
      onPress={() => {
        playTrack({
          id: item.id,
          title: item.title,
          artist: item.artist,
          artwork: item.imageUrl,
        });
      }}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text, paddingHorizontal: 20 }]}>
        Recently Played
      </Text>
      <FlatList
        data={recentlyPlayed}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  item: {
    width: 150,
    marginHorizontal: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemTextContainer: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});