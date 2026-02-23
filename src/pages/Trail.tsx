import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/ui/TopBar';
import { Button } from '../components/ui/Button';
import { TrailCard } from '../components/blocks/TrailCard';
import { isStepCompleted } from '../state/store';

export function Trail() {
  const navigate = useNavigate();
  const step1Complete = isStepCompleted('step-1');
  const step2Complete = isStepCompleted('step-2');
  const progress = (step1Complete ? 1 : 0) + (step2Complete ? 1 : 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopBar title="Trilha de Conhecimento" showBack />
      <div className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Aprenda e ganhe pontos</h2>
          <p className="text-gray-600">
            Complete as etapas e descubra como usar melhor seus benefícios Caixa.
          </p>
        </div>

        <TrailCard
          title="Trilha Educativa"
          description="2 etapas curtas sobre benefícios e finanças"
          progress={progress}
          total={2}
        />

        <div className="space-y-3">
          <Button fullWidth onClick={() => navigate('/step-1')}>
            Iniciar trilha
          </Button>
          <Button fullWidth variant="ghost" onClick={() => navigate('/profile')}>
            Depois
          </Button>
        </div>
      </div>
    </div>
  );
}
