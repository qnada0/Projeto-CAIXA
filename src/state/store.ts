export interface DevFlags {
  offline: boolean;
  redeemFail: boolean;
  videoFail: boolean;
}

export interface QuizResult {
  completed: boolean;
  correctCount: number;
  answers: Record<string, string>;
}

export interface AppState {
  points: number;
  completedSteps: string[];
  redeemedRewards: string[];
  devFlags: DevFlags;
  quizResults: Record<string, QuizResult>;
}

const DEFAULT_STATE: AppState = {
  points: 0,
  completedSteps: [],
  redeemedRewards: [],
  devFlags: {
    offline: false,
    redeemFail: false,
    videoFail: false,
  },
  quizResults: {},
};

const STORAGE_KEY = 'caixa-perto-state';

export const loadState = (): AppState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_STATE, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return DEFAULT_STATE;
};

export const saveState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
};

export const getPoints = (): number => {
  return loadState().points;
};

export const addPoints = (amount: number): void => {
  const state = loadState();
  state.points += amount;
  saveState(state);
};

export const completeStep = (stepId: string): void => {
  const state = loadState();
  if (!state.completedSteps.includes(stepId)) {
    state.completedSteps.push(stepId);
    saveState(state);
  }
};

export const isStepCompleted = (stepId: string): boolean => {
  return loadState().completedSteps.includes(stepId);
};

export const redeemReward = (rewardId: string): void => {
  const state = loadState();
  if (!state.redeemedRewards.includes(rewardId)) {
    state.redeemedRewards.push(rewardId);
    saveState(state);
  }
};

export const isRewardRedeemed = (rewardId: string): boolean => {
  return loadState().redeemedRewards.includes(rewardId);
};

export const getDevFlags = (): DevFlags => {
  return loadState().devFlags;
};

export const setDevFlag = (flag: keyof DevFlags, value: boolean): void => {
  const state = loadState();
  state.devFlags[flag] = value;
  saveState(state);
};

export const getScore = (): number => {
  return 100 + getPoints();
};

export const getLevel = (): string => {
  const score = getScore();
  if (score < 120) return 'Iniciante';
  if (score < 160) return 'Aprendiz';
  return 'Avançado';
};

export const getQuizResult = (quizId: string): QuizResult | undefined => {
  return loadState().quizResults[quizId];
};

export const setQuizAnswer = (quizId: string, questionId: string, optionId: string): void => {
  const state = loadState();
  if (!state.quizResults[quizId]) {
    state.quizResults[quizId] = {
      completed: false,
      correctCount: 0,
      answers: {},
    };
  }
  state.quizResults[quizId].answers[questionId] = optionId;
  saveState(state);
};

export const completeQuiz = (quizId: string, correctCount: number): void => {
  const state = loadState();
  if (!state.quizResults[quizId]) {
    state.quizResults[quizId] = {
      completed: false,
      correctCount: 0,
      answers: {},
    };
  }
  state.quizResults[quizId].completed = true;
  state.quizResults[quizId].correctCount = correctCount;
  saveState(state);
};
