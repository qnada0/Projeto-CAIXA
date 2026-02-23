import type { Quiz } from '../types/quiz';

export const quizMission1: Quiz = {
  id: 'mission-1-quiz',
  title: 'Organize seus Gastos',
  questions: [
    {
      id: 'q1',
      prompt: 'Qual é a melhor forma de controlar seus gastos mensais?',
      options: [
        { id: 'a', label: 'Não preciso controlar, só gasto quando tenho' },
        { id: 'b', label: 'Anotar todos os gastos e comparar com minha renda' },
        { id: 'c', label: 'Gastar primeiro e ver o que sobra no fim do mês' },
      ],
      correctOptionId: 'b',
      explanation:
        'Anotar seus gastos ajuda a entender para onde vai seu dinheiro e planejar melhor.',
    },
    {
      id: 'q2',
      prompt: 'O que é importante fazer antes de fazer uma compra grande?',
      options: [
        { id: 'a', label: 'Comprar na hora para não perder a promoção' },
        { id: 'b', label: 'Pesquisar preços e ver se cabe no orçamento' },
        { id: 'c', label: 'Usar o cartão de crédito sem pensar' },
      ],
      correctOptionId: 'b',
      explanation: 'Pesquisar preços e planejar evita compras por impulso e ajuda a economizar.',
    },
    {
      id: 'q3',
      prompt: 'Como usar melhor seu benefício Caixa?',
      options: [
        { id: 'a', label: 'Gastar tudo de uma vez' },
        { id: 'b', label: 'Planejar as compras do mês e priorizar o essencial' },
        { id: 'c', label: 'Deixar o saldo parado sem usar' },
      ],
      correctOptionId: 'b',
      explanation:
        'Planejar suas compras garante que você aproveite todo o benefício da melhor forma.',
    },
  ],
};

export const quizMission2: Quiz = {
  id: 'mission-2-quiz',
  title: 'Planejamento Financeiro',
  questions: [
    {
      id: 'q1',
      prompt: 'Por que é importante ter uma reserva de emergência?',
      options: [
        { id: 'a', label: 'Não é importante, posso pedir emprestado' },
        { id: 'b', label: 'Para ter dinheiro guardado em caso de imprevistos' },
        { id: 'c', label: 'Só pessoas ricas precisam disso' },
      ],
      correctOptionId: 'b',
      explanation:
        'Uma reserva de emergência protege você de imprevistos sem precisar fazer dívidas.',
    },
    {
      id: 'q2',
      prompt: 'Qual a melhor forma de lidar com o cartão de crédito?',
      options: [
        { id: 'a', label: 'Usar o limite máximo todo mês' },
        { id: 'b', label: 'Pagar apenas o mínimo da fatura' },
        { id: 'c', label: 'Usar com controle e pagar a fatura completa' },
      ],
      correctOptionId: 'c',
      explanation: 'Pagar a fatura completa evita juros altos e mantém seu crédito saudável.',
    },
    {
      id: 'q3',
      prompt: 'Como definir prioridades nos gastos?',
      options: [
        { id: 'a', label: 'Pagar primeiro as coisas essenciais como moradia e alimentação' },
        { id: 'b', label: 'Comprar o que aparece primeiro' },
        { id: 'c', label: 'Gastar com lazer antes de tudo' },
      ],
      correctOptionId: 'a',
      explanation:
        'Priorizar gastos essenciais garante que suas necessidades básicas sejam atendidas.',
    },
  ],
};
