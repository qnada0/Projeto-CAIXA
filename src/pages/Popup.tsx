import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Popup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-[420px] w-full space-y-6">
        <div className="rounded-2xl p-6 bg-white border border-gray-200 text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Seu benefício caiu</h1>
          <p className="text-gray-600">
            Que tal usar esse mês com mais tranquilidade? Faça uma trilha rápida e ganhe pontos.
          </p>
        </div>

        <div className="space-y-3">
          <Button fullWidth onClick={() => navigate('/trail')}>
            Começar agora
          </Button>
          <Button fullWidth variant="ghost" onClick={() => navigate('/profile')}>
            Depois
          </Button>
        </div>
      </div>
    </div>
  );
}
