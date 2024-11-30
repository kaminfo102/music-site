import { Button } from '@/components/ui/button';
import { Music2 } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-l from-primary/10 via-primary/5 to-background">
      <div className="relative z-10 px-8 py-16 md:py-24 flex flex-col items-center text-center">
        <Music2 className="h-16 w-16 mb-6 text-primary animate-bounce" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          موسیقی شما، به سبک شما
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          میلیون‌ها آهنگ را پخش کنید، لیست پخش دلخواه خود را بسازید و موسیقی جدید
          مخصوص خود را کشف کنید.
        </p>
        <div className="flex gap-4">
          <Button size="lg">شروع به گوش دادن</Button>
          <Button size="lg" variant="outline">
            مرور موسیقی
          </Button>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-l from-primary/20 via-primary/10 to-background/5"
        style={{
          maskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)',
        }}
      />
    </div>
  );
}