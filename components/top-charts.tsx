'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCurrentSong } from '@/lib/store/player-slice';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
  plays: number;
}

const topSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/sample.mp3',
    plays: 1234567,
  },
  {
    id: '2',
    title: 'Urban Beats',
    artist: 'City Pulse',
    cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/sample.mp3',
    plays: 987654,
  },
  {
    id: '3',
    title: 'Nature\'s Call',
    artist: 'Forest Harmony',
    cover: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    url: '/sample.mp3',
    plays: 876543,
  },
];

export function TopCharts() {
  const dispatch = useDispatch();
  const { data: songs, isLoading } = useQuery({
    queryKey: ['top-songs'],
    queryFn: () => Promise.resolve(topSongs),
  });

  const playSong = (song: Song) => {
    dispatch(setCurrentSong(song));
  };

  if (isLoading) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Top Charts</h2>
      <div className="space-y-4">
        {songs?.map((song) => (
          <Card key={song.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <img
                src={song.cover}
                alt={song.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{song.title}</h3>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
                <p className="text-xs text-muted-foreground">
                  {(song.plays / 1000000).toFixed(1)}M plays
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => playSong(song)}
                >
                  <Play className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}