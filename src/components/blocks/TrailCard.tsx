import { Progress } from '../ui/Progress';

interface TrailCardProps {
  title: string;
  description: string;
  progress: number;
  total: number;
}

export function TrailCard({ title, description, progress, total }: TrailCardProps) {
  return (
    <div className="rounded-2xl p-4 bg-white border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progresso</span>
          <span className="font-medium">
            {progress} de {total}
          </span>
        </div>
        <Progress value={progress} max={total} />
      </div>
    </div>
  );
}
