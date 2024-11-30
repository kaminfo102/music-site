'use client';

import { useQuery } from '@tanstack/react-query';
import { LyricsDisplay } from '@/components/lyrics-display';
import { Button } from '@/components/ui/button';
import { Play, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCurrentSong } from '@/lib/store/player-slice';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
  releaseYear: string;
  genre: string;
}

const mockSong: Song = {
  id: '1',
  title: 'Midnight Dreams',
  artist: 'Luna Echo',
  album: 'Nocturnal Symphonies',
  cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  url: '/sample.mp3',
  releaseYear: '2024',
  genre: 'Electronic',
};

export default function SongPage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch();
  const { data: song } = useQuery({
    queryKey: ['song', params.id],
    queryFn: () => Promise.resolve(mockSong),
  });

  if (!song) return null;

  const playSong = () => {
    dispatch(setCurrentSong(song));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{song.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{song.artist}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Album</p>
              <p className="font-medium">{song.album}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Release Year</p>
              <p className="font-medium">{song.releaseYear}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Genre</p>
              <p className="font-medium">{song.genre}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button size="lg" onClick={playSong}>
              <Play className="h-5 w-5 mr-2" />
              Play
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5 mr-2" />
              Like
            </Button>
            <Button size="icon" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <LyricsDisplay songId={song.id} initialLyrics="Loading lyrics..." />
    </div>
  );
}