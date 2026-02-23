import { Trophy } from 'lucide-react';
import { Progress } from '../ui/Progress';

interface ScoreWidgetProps {
  score: number;
  level: string;
}

export function ScoreWidget({ score, level }: ScoreWidgetProps) {
  const getNextLevelThreshold = () => {
    if (score < 120) return 120;
    if (score < 160) return 160;
    return 200;
  };

  const nextThreshold = getNextLevelThreshold();
  const previousThreshold = score < 120 ? 100 : score < 160 ? 120 : 160;

  return (
    <div className="rounded-2xl p-4 bg-white border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <Trophy className="w-6 h-6 text-yellow-600" />
        <div>
          <p className="text-sm text-gray-600">Nível atual</p>
          <p className="text-lg font-semibold">{level}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Pontuação</span>
          <span className="font-medium">
            {score} / {nextThreshold}
          </span>
        </div>
        <Progress value={score - previousThreshold} max={nextThreshold - previousThreshold} />
      </div>
    </div>
  );
}
