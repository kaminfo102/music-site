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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { FileText } from 'lucide-react';

const lyricsSchema = z.object({
  songId: z.string().min(1, 'Song is required'),
  lyrics: z.string().min(1, 'Lyrics are required'),
  language: z.string().min(1, 'Language is required'),
  contributor: z.string().min(1, 'Contributor name is required'),
});

const mockSongs = [
  { id: '1', title: 'Midnight Dreams - Luna Echo' },
  { id: '2', title: 'Urban Beats - City Pulse' },
  { id: '3', title: "Nature's Call - Forest Harmony" },
];

export function LyricsManager() {
  const [saving, setSaving] = useState(false);
  const form = useForm<z.infer<typeof lyricsSchema>>({
    resolver: zodResolver(lyricsSchema),
    defaultValues: {
      songId: '',
      lyrics: '',
      language: 'en',
      contributor: '',
    },
  });

  async function onSubmit(values: z.infer<typeof lyricsSchema>) {
    try {
      setSaving(true);
      // Here you would typically save the lyrics to your backend
      console.log(values);
      toast.success('Lyrics saved successfully!');
      form.reset();
    } catch (error) {
      toast.error('Failed to save lyrics');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <FileText className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Manage Lyrics</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-8 border rounded-lg bg-card">
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="songId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Song</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a song" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockSongs.map((song) => (
                          <SelectItem key={song.id} value={song.id}>
                            {song.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contributor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contributor</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contributor name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lyrics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lyrics</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter song lyrics"
                        className="min-h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? 'Saving...' : 'Save Lyrics'}
          </Button>
        </form>
      </Form>
    </div>
  );
}