'use client';

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setIsPlaying, setProgress, setDuration } from '@/lib/store/player-slice';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Volume2, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

export function MusicPlayer() {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume, progress } = useSelector(
    (state: RootState) => state.player
  );
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (currentSong) {
      if (soundRef.current) {
        soundRef.current.unload();
      }

      soundRef.current = new Howl({
        src: [currentSong.url],
        html5: true,
        volume,
        onplay: () => dispatch(setIsPlaying(true)),
        onpause: () => dispatch(setIsPlaying(false)),
        onend: () => dispatch(setIsPlaying(false)),
        onload: () => dispatch(setDuration(soundRef.current?.duration() || 0)),
      });
    }
  }, [currentSong, dispatch, volume]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (soundRef.current && isPlaying) {
        dispatch(setProgress(soundRef.current.seek()));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, dispatch]);

  const togglePlay = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-12 h-12 rounded-md"
          />
          <div>
            <h3 className="font-medium">{currentSong.title}</h3>
            <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button onClick={togglePlay} size="icon">
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <Slider
            value={[progress]}
            max={soundRef.current?.duration() || 0}
            step={0.1}
            onValueChange={([value]) => {
              if (soundRef.current) {
                soundRef.current.seek(value);
                dispatch(setProgress(value));
              }
            }}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          <Slider
            value={[volume * 100]}
            max={100}
            onValueChange={([value]) => {
              const newVolume = value / 100;
              if (soundRef.current) {
                soundRef.current.volume(newVolume);
              }
            }}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}