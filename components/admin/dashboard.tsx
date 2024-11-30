'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Music2, Users, ListMusic, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Songs',
    value: '2,345',
    description: 'Songs in library',
    icon: Music2,
  },
  {
    title: 'Active Users',
    value: '1,234',
    description: 'Last 30 days',
    icon: Users,
  },
  {
    title: 'Playlists Created',
    value: '456',
    description: 'User playlists',
    icon: ListMusic,
  },
  {
    title: 'Total Plays',
    value: '45.2K',
    description: 'Last 30 days',
    icon: TrendingUp,
  },
];

export function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}