import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { newReleases } from '@/utils/mockData';
import { usePlayerContext } from '@/contexts/PlayerContext';
import { useTheme } from '@/contexts/ThemeContext';

export function NewReleases() {
  const { playTrack } = usePlayerContext();
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: typeof newReleases[0] }) => (
    <TouchableOpacity 
      style={styles.item}
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
      <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[styles.itemArtist, { color: colors.secondaryText }]} numberOfLines={1}>
        {item.artist}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text, paddingHorizontal: 20 }]}>
        New Releases
      </Text>
      <FlatList
        data={newReleases}
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
    width: 160,
    marginHorizontal: 4,
  },
  itemImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  itemArtist: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});