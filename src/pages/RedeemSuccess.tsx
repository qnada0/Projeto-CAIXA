import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/ui/TopBar';
import { Button } from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';

export function RedeemSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopBar title="Sucesso" />
      <div className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        <div className="rounded-2xl p-8 bg-white border border-gray-200 text-center space-y-4">
          <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
          <h1 className="text-2xl font-bold">Recompensa resgatada!</h1>
          <p className="text-gray-600">
            Sua recompensa foi processada com sucesso. Confira no seu perfil.
          </p>
        </div>

        <div className="space-y-3">
          <Button fullWidth onClick={() => navigate('/profile')}>
            Ver meu perfil
          </Button>
          <Button fullWidth variant="ghost" onClick={() => navigate('/rewards')}>
            Ver recompensas
          </Button>
        </div>
      </div>
    </div>
  );
}
