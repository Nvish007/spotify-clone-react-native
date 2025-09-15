import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Play, Pause, SkipForward } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { usePlayerContext } from '@/contexts/PlayerContext';
import { useTheme } from '@/contexts/ThemeContext';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export function MiniPlayer() {
  const router = useRouter();
  const { currentTrack, isPlaying, togglePlayback, playNext } = usePlayerContext();
  const { colors, isDark } = useTheme();
  
  const progressValue = useSharedValue(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        progressValue.value = withTiming(
          progressValue.value >= 100 ? 0 : progressValue.value + 0.5,
          { duration: 1000 }
        );
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  if (!currentTrack) return null;

  const handlePress = () => {
    router.push('/player');
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      {Platform.OS !== 'web' && (
        <BlurView intensity={80} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
      )}
      
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { backgroundColor: colors.primary },
            progressStyle
          ]} 
        />
      </View>
      
      <View style={styles.content}>
        <Image source={{ uri: currentTrack.artwork }} style={styles.artwork} />
        
        <View style={styles.trackInfo}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={[styles.artist, { color: colors.secondaryText }]} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
        </View>
        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={togglePlayback}>
            {isPlaying ? (
              <Pause size={22} color={colors.text} />
            ) : (
              <Play size={22} color={colors.text} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={playNext}>
            <SkipForward size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60, // Leave room for the tab bar
    left: 8,
    right: 8,
    height: 64,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  progressContainer: {
    height: 3,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  progressBar: {
    height: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  artist: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  controls: {
    flexDirection: 'row',
  },
  controlButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});