'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Upload, Music2 } from 'lucide-react';

const songSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  album: z.string().min(1, 'Album is required'),
  genre: z.string().min(1, 'Genre is required'),
  releaseYear: z.string().regex(/^\d{4}$/, 'Must be a valid year'),
  description: z.string().optional(),
});

export function SongManager() {
  const [uploading, setUploading] = useState(false);
  const form = useForm<z.infer<typeof songSchema>>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      title: '',
      artist: '',
      album: '',
      genre: '',
      releaseYear: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof songSchema>) {
    try {
      setUploading(true);
      // Here you would typically upload the song file and metadata to your backend
      console.log(values);
      toast.success('Song added successfully!');
      form.reset();
    } catch (error) {
      toast.error('Failed to add song');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Music2 className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Add New Song</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-8 border rounded-lg bg-card">
            <div className="flex items-center justify-center w-full mb-6">
              <label
                htmlFor="song-file"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/5 hover:bg-muted/10"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-10 w-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MP3, WAV or OGG (MAX. 10MB)
                  </p>
                </div>
                <input id="song-file" type="file" className="hidden" accept="audio/*" />
              </label>
            </div>

            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter song title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artist</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter artist name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="album"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Album</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter album name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="releaseYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Release Year</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter genre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter song description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add Song'}
          </Button>
        </form>
      </Form>
    </div>
  );
}