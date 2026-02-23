import { Lock } from 'lucide-react';

interface RewardCardProps {
  title: string;
  description: string;
  points: number;
  icon: string;
  available: boolean;
  redeemed?: boolean;
  onClick?: () => void;
}

export function RewardCard({
  title,
  description,
  points,
  icon,
  available,
  redeemed,
  onClick,
}: RewardCardProps) {
  return (
    <button
      onClick={available && !redeemed ? onClick : undefined}
      disabled={!available || redeemed}
      className={`w-full rounded-2xl p-4 border text-left transition-all ${
        available && !redeemed
          ? 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-md'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-600">{points} pontos</span>
            {!available && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Bloqueado</span>
              </div>
            )}
            {redeemed && <span className="text-xs text-green-600 font-medium">Resgatado</span>}
          </div>
        </div>
      </div>
    </button>
  );
}
