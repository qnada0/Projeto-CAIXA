import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/ui/TopBar';
import { Button } from '../components/ui/Button';
import { PointsBanner } from '../components/blocks/PointsBanner';
import { ScoreWidget } from '../components/blocks/ScoreWidget';
import { getPoints, getScore, getLevel, isRewardRedeemed } from '../state/store';
import { rewards } from '../data/rewards';

export function Profile() {
  const navigate = useNavigate();
  const points = getPoints();
  const score = getScore();
  const level = getLevel();

  const redeemedRewards = rewards.filter((r) => isRewardRedeemed(r.id));

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopBar title="Meu Perfil" />
      <div className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        <PointsBanner points={points} />

        <ScoreWidget score={score} level={level} />

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recompensas resgatadas</h2>
          {redeemedRewards.length > 0 ? (
            <div className="space-y-3">
              {redeemedRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="rounded-2xl p-4 bg-white border border-gray-200 flex items-center gap-4"
                >
                  <div className="text-3xl">{reward.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{reward.title}</h3>
                    <p className="text-sm text-gray-600">{reward.points} pontos</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl p-6 bg-white border border-gray-200 text-center">
              <p className="text-gray-600">Você ainda não resgatou nenhuma recompensa</p>
            </div>
          )}
        </div>

        <Button fullWidth onClick={() => navigate('/rewards')}>
          Ver recompensas
        </Button>
      </div>
    </div>
  );
}
