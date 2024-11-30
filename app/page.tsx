import { HeroSection } from '@/components/hero-section';
import { FeaturedMusic } from '@/components/featured-music';
import { TopCharts } from '@/components/top-charts';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <HeroSection />
      <FeaturedMusic />
      <TopCharts />
    </div>
  );
}