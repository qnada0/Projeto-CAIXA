import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/ui/TopBar';
import { QuizRunner } from '../components/blocks/QuizRunner';
import { quizMission2 } from '../data/quizzes';
import { completeQuiz, completeStep, addPoints } from '../state/store';

export function Mission2() {
  const navigate = useNavigate();

  const handleComplete = (correctCount: number) => {
    completeQuiz(quizMission2.id, correctCount);
    completeStep('mission-2');

    if (correctCount === 3) {
      addPoints(10);
    }

    navigate('/points-2');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopBar title="Missão 2" showBack />
      <div className="max-w-[420px] mx-auto px-4 py-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">{quizMission2.title}</h2>
          <p className="text-gray-600">
            Responda às perguntas para completar a missão e ganhar pontos.
          </p>
        </div>

        <QuizRunner quiz={quizMission2} onComplete={handleComplete} />
      </div>
    </div>
  );
}
