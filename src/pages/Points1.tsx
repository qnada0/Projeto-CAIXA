import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/ui/TopBar';
import { Button } from '../components/ui/Button';
import { Sparkles } from 'lucide-react';
import { addPoints, completeStep } from '../state/store';

export function Points1() {
  const navigate = useNavigate();

  useEffect(() => {
    addPoints(20);
    completeStep('step-1');
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopBar title="Parabéns" />
      <div className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-center space-y-4">
          <Sparkles className="w-16 h-16 mx-auto" />
          <h1 className="text-3xl font-bold">+20 pontos</h1>
          <p className="text-blue-100">Você completou a primeira etapa!</p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-gray-600">
            Continue avançando para ganhar mais pontos e trocar por recompensas.
          </p>
        </div>

        <div className="space-y-3">
          <Button fullWidth onClick={() => navigate('/step-2')}>
            Continuar
          </Button>
          <Button fullWidth variant="ghost" onClick={() => navigate('/rewards')}>
            Ver recompensas
          </Button>
        </div>
      </div>
    </div>
  );
}
