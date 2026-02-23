export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
}

export const rewards: Reward[] = [
  {
    id: 'partner_discount',
    title: 'Desconto em parceiros',
    description: '10% de desconto em lojas parceiras da Caixa',
    points: 40,
    icon: '🏪',
  },
  {
    id: 'cashback_5',
    title: 'Cashback de R$ 5',
    description: 'R$ 5 de volta em compras com seu cartão Caixa',
    points: 60,
    icon: '💰',
  },
  {
    id: 'topup_10',
    title: 'Recarga de R$ 10',
    description: 'R$ 10 de recarga para seu celular',
    points: 80,
    icon: '📱',
  },
];
