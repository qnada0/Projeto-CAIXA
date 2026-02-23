import { AlertCircle, CheckCircle, WifiOff } from 'lucide-react';

interface InlineAlertProps {
  type: 'error' | 'success' | 'warning' | 'offline';
  message: string;
}

export function InlineAlert({ type, message }: InlineAlertProps) {
  const config = {
    error: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    },
    offline: {
      bg: 'bg-gray-50',
      text: 'text-gray-800',
      icon: <WifiOff className="w-5 h-5 text-gray-600" />,
    },
  };

  const { bg, text, icon } = config[type];

  return (
    <div className={`rounded-2xl p-4 ${bg} flex items-start gap-3`}>
      {icon}
      <p className={`text-sm ${text} flex-1`}>{message}</p>
    </div>
  );
}
