'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Globe2 } from 'lucide-react';

interface LyricsDisplayProps {
  songId: string;
  initialLyrics?: string;
  availableLanguages?: string[];
}

export function LyricsDisplay({
  songId,
  initialLyrics = '',
  availableLanguages = ['en'],
}: LyricsDisplayProps) {
  const [lyrics, setLyrics] = useState(initialLyrics);
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);
    // Here you would typically fetch lyrics in the selected language
    // For now, we'll just show a placeholder
    setLyrics(`Sample lyrics in ${newLanguage}`);
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Lyrics</h3>
        <div className="flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-muted-foreground" />
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {availableLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang === 'en' ? 'English' : lang === 'es' ? 'Spanish' : lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="h-[400px] p-4">
        <div className="whitespace-pre-line">{lyrics}</div>
      </ScrollArea>
    </div>
  );
}