'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

const featuredAlbums: Album[] = [
  {
    id: '1',
    title: 'Midnight Melodies',
    artist: 'Luna Dreams',
    cover: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '2',
    title: 'Urban Rhythms',
    artist: 'City Beats',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '3',
    title: 'Nature\'s Symphony',
    artist: 'Forest Echo',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '4',
    title: 'Electric Dreams',
    artist: 'Neon Pulse',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

export function FeaturedMusic() {
  const { data: albums, isLoading } = useQuery({
    queryKey: ['featured-albums'],
    queryFn: () => Promise.resolve(featuredAlbums),
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Albums</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <Skeleton className="h-48 rounded-t-lg" />
                <div className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Featured Albums</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {albums?.map((album) => (
          <Card key={album.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{album.title}</h3>
                <p className="text-sm text-muted-foreground">{album.artist}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}