import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { InlineAlert } from '../ui/InlineAlert';
import { Progress } from '../ui/Progress';
import type { Quiz } from '../../types/quiz';
import { setQuizAnswer, getQuizResult } from '../../state/store';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizRunnerProps {
  quiz: Quiz;
  onComplete: (correctCount: number) => void;
}

export function QuizRunner({ quiz, onComplete }: QuizRunnerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  useEffect(() => {
    const savedResult = getQuizResult(quiz.id);
    if (savedResult && savedResult.answers[currentQuestion.id]) {
      setSelectedOption(savedResult.answers[currentQuestion.id]);
    } else {
      setSelectedOption(null);
    }
    setShowFeedback(false);
  }, [currentQuestionIndex, quiz.id, currentQuestion.id]);

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;

    setQuizAnswer(quiz.id, currentQuestion.id, selectedOption);
    setShowFeedback(true);

    if (selectedOption === currentQuestion.correctOptionId) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalCount =
        correctAnswers + (selectedOption === currentQuestion.correctOptionId ? 1 : 0);
      onComplete(finalCount);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctOptionId;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}
          </span>
        </div>
        <Progress value={progress} max={100} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">{currentQuestion.prompt}</h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === currentQuestion.correctOptionId;
            const showCorrect = showFeedback && isCorrectOption;
            const showWrong = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showWrong
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showCorrect
                      ? 'border-green-500 bg-green-500'
                      : showWrong
                        ? 'border-red-500 bg-red-500'
                        : isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                  }`}
                >
                  {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                  {showWrong && <XCircle className="w-4 h-4 text-white" />}
                  {!showFeedback && isSelected && <div className="w-3 h-3 rounded-full bg-white" />}
                </div>
                <span className="font-medium text-gray-900">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {showFeedback && (
        <InlineAlert
          type={isCorrect ? 'success' : 'error'}
          message={
            isCorrect
              ? `Acertou! ${currentQuestion.explanation || ''}`
              : `Quase! ${currentQuestion.explanation || ''}`
          }
        />
      )}

      <div className="flex gap-3">
        {!showFeedback ? (
          <Button fullWidth onClick={handleConfirm} disabled={!selectedOption} className="h-12">
            Confirmar
          </Button>
        ) : (
          <Button fullWidth onClick={handleNext} className="h-12">
            {isLastQuestion ? 'Finalizar' : 'Próxima'}
          </Button>
        )}
      </div>
    </div>
  );
}
