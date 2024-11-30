'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Music2, LayoutDashboard, Users, PlayCircle, ListMusic } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/songs', label: 'Songs', icon: Music2 },
  { href: '/admin/playlists', label: 'Playlists', icon: ListMusic },
  { href: '/admin/users', label: 'Users', icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-muted/10 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <PlayCircle className="h-6 w-6" />
        <h1 className="font-semibold">Harmony Admin</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                'w-full justify-start gap-2',
                pathname === item.href && 'bg-muted'
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}