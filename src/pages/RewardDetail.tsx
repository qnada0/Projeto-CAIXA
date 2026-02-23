import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopBar } from '../components/ui/TopBar';
import { Button } from '../components/ui/Button';
import { InlineAlert } from '../components/ui/InlineAlert';
import { rewards } from '../data/rewards';
import { getPoints, redeemReward, getDevFlags, isRewardRedeemed } from '../state/store';

export function RewardDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [redeemError, setRedeemError] = useState(false);

  const reward = rewards.find((r) => r.id === id);
  const points = getPoints();
  const { redeemFail, offline } = getDevFlags();
  const alreadyRedeemed = isRewardRedeemed(id || '');

  if (!reward) {
    navigate('/rewards');
    return null;
  }

  const canRedeem = points >= reward.points && !alreadyRedeemed;

  const handleRedeem = () => {
    if (offline) {
      return;
    }

    if (redeemFail) {
      setRedeemError(true);
      return;
    }

    redeemReward(reward.id);
    navigate('/redeem-success');
  };

  if (offline) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <TopBar title="Recompensa" showBack />
        <div className="max-w-[420px] mx-auto px-4 py-6">
          <InlineAlert type="offline" message="Sem internet no momento." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopBar title="Recompensa" showBack />
      <div className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        <div className="rounded-2xl p-6 bg-white border border-gray-200 text-center space-y-4">
          <div className="text-6xl">{reward.icon}</div>
          <h1 className="text-2xl font-bold">{reward.title}</h1>
          <p className="text-gray-600">{reward.description}</p>
          <div className="pt-4">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
              {reward.points} pontos
            </span>
          </div>
        </div>

        {redeemError && (
          <InlineAlert type="error" message="Não foi possível concluir agora. Tente novamente." />
        )}

        {alreadyRedeemed && (
          <InlineAlert type="success" message="Você já resgatou esta recompensa" />
        )}

        <div className="space-y-3">
          {!alreadyRedeemed && (
            <Button fullWidth onClick={handleRedeem} disabled={!canRedeem}>
              {redeemError ? 'Tentar de novo' : 'Resgatar'}
            </Button>
          )}
          {!canRedeem && !alreadyRedeemed && (
            <p className="text-sm text-center text-gray-600">
              Você precisa de mais {reward.points - points} pontos
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
