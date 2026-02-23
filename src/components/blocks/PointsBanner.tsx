import { Sparkles } from 'lucide-react';

interface PointsBannerProps {
  points: number;
}

export function PointsBanner({ points }: PointsBannerProps) {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90 mb-1">Seus pontos</p>
          <p className="text-4xl font-bold">{points}</p>
        </div>
        <Sparkles className="w-12 h-12 opacity-80" />
      </div>
    </div>
  );
}
