import React, { createContext, useContext, useState, useCallback } from 'react';
import { Audio } from 'expo-av';

interface Track {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  audioUrl?: string;
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlayback: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerContextProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  
  // Initialize audio
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  
  const playTrack = useCallback(async (track: Track) => {
    // Unload any existing audio
    if (sound) {
      await sound.unloadAsync();
    }
    
    // In a real app, we would load audio from track.audioUrl
    // For this demo, we're just pretending to play music
    const { sound: newSound } = await Audio.Sound.createAsync(
      // This is just a silent audio file for demo purposes
      // In a real app you would use track.audioUrl
      require('@/assets/silence.mp3')
    );
    
    setSound(newSound);
    setCurrentTrack(track);
    setIsPlaying(true);
    await newSound.playAsync();
  }, [sound]);
  
  const togglePlayback = useCallback(async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    
    setIsPlaying(!isPlaying);
  }, [sound, isPlaying]);
  
  const playNext = useCallback(() => {
    // In a real app, this would play the next track in queue
    // For demo purposes, we'll just toggle playback state
    setIsPlaying(true);
  }, []);
  
  const playPrevious = useCallback(() => {
    // In a real app, this would play the previous track
    // For demo purposes, we'll just toggle playback state
    setIsPlaying(true);
  }, []);
  
  return (
    <PlayerContext.Provider 
      value={{ 
        currentTrack, 
        isPlaying, 
        playTrack, 
        togglePlayback,
        playNext,
        playPrevious
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerContextProvider');
  }
  return context;
};
