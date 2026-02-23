import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/ui/TopBar';
import { PointsBanner } from '../components/blocks/PointsBanner';
import { RewardCard } from '../components/blocks/RewardCard';
import { InlineAlert } from '../components/ui/InlineAlert';
import { rewards } from '../data/rewards';
import { getPoints, getDevFlags, isRewardRedeemed } from '../state/store';

export function Rewards() {
  const navigate = useNavigate();
  const points = getPoints();
  const { offline } = getDevFlags();

  if (offline) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <TopBar title="Recompensas" showBack />
        <div className="max-w-[420px] mx-auto px-4 py-6">
          <InlineAlert type="offline" message="Sem internet no momento." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar title="Recompensas" showBack />
      <div className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        <PointsBanner points={points} />

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Suas recompensas</h2>
          <div className="space-y-3">
            {rewards.map((reward) => (
              <RewardCard
                key={reward.id}
                title={reward.title}
                description={reward.description}
                points={reward.points}
                icon={reward.icon}
                available={points >= reward.points}
                redeemed={isRewardRedeemed(reward.id)}
                onClick={() => navigate(`/reward/${reward.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
