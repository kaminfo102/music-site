'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Music2, Search, User } from 'lucide-react';

export function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Music2 className="h-6 w-6" />
          <span className="font-semibold">هارمونی</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="جستجوی آهنگ، هنرمند یا آلبوم..."
              className="pr-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>پروفایل</DropdownMenuItem>
                <DropdownMenuItem>تنظیمات</DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()}>ورود</Button>
          )}
        </div>
      </div>
    </header>
  );
}