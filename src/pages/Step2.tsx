import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/ui/TopBar';
import { Button } from '../components/ui/Button';
import { InlineAlert } from '../components/ui/InlineAlert';
import { Loader2 } from 'lucide-react';
import { getDevFlags } from '../state/store';
import { getTrail } from '../services/content';
import { refreshSignedVideoUrl, isExpired } from '../services/video';
import type { Step, VideoAsset } from '../types/content';

export function Step2() {
  const navigate = useNavigate();
  const { videoFail } = getDevFlags();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stepData, setStepData] = useState<Step | null>(null);
  const [videoAsset, setVideoAsset] = useState<VideoAsset | null>(null);
  const hasRefreshed = useRef(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const trail = await getTrail('organize-gastos');
        const step = trail.steps.find((s) => s.id === 'step-2');

        if (!step) {
          throw new Error('Step não encontrado');
        }

        setStepData(step);
        setVideoAsset(step.video);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar conteúdo');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleVideoError = async () => {
    if (!videoAsset || hasRefreshed.current) {
      setError('Não foi possível carregar o vídeo.');
      return;
    }

    if (isExpired(videoAsset.expiresAt)) {
      try {
        hasRefreshed.current = true;
        const refreshedVideo = await refreshSignedVideoUrl(videoAsset.id);
        setVideoAsset(refreshedVideo);
        hasRefreshed.current = false;
      } catch {
        setError('Não foi possível carregar o vídeo.');
      }
    } else {
      setError('Não foi possível carregar o vídeo.');
    }
  };

  if (videoFail) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <TopBar title="Etapa 2" showBack />
        <div className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Planejamento financeiro simples</h2>
            <p className="text-gray-600">
              Mais dicas práticas para organizar suas finanças e usar melhor seu benefício.
            </p>
          </div>

          <InlineAlert
            type="warning"
            message="Não foi possível carregar o vídeo. Você pode continuar mesmo assim."
          />

          <div className="space-y-3">
            <Button fullWidth onClick={() => navigate('/mission-2')}>
              Continuar
            </Button>
            <Button fullWidth variant="ghost" onClick={() => navigate('/mission-2')}>
              Pular
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopBar title="Etapa 2" showBack />
      <div className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            {stepData?.title || 'Planejamento financeiro simples'}
          </h2>
          <p className="text-gray-600">
            {stepData?.description ||
              'Mais dicas práticas para organizar suas finanças e usar melhor seu benefício.'}
          </p>
        </div>

        {loading && (
          <div className="rounded-2xl overflow-hidden bg-gray-200 aspect-video flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        )}

        {error && (
          <InlineAlert
            type="error"
            message="Não foi possível carregar o vídeo. Você pode continuar mesmo assim."
          />
        )}

        {!loading && !error && videoAsset && (
          <video
            key={videoAsset.url}
            controls
            className="w-full rounded-2xl border border-neutral-200 bg-black"
            src={videoAsset.url}
            onError={handleVideoError}
          >
            Seu navegador não suporta vídeos.
          </video>
        )}

        <div className="space-y-3">
          <Button fullWidth onClick={() => navigate('/mission-2')}>
            Ir para a missão
          </Button>
          <Button fullWidth variant="ghost" onClick={() => navigate('/mission-2')}>
            Pular
          </Button>
        </div>
      </div>
    </div>
  );
}
