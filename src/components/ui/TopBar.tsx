import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function TopBar({ title, showBack = false, onBack }: TopBarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-[420px] mx-auto px-4 h-14 flex items-center">
        {showBack && (
          <button
            onClick={handleBack}
            className="mr-3 -ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>
    </div>
  );
}
