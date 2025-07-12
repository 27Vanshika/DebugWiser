import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ 
  label = "Back", 
  fallbackPath = "/", 
  className = "",
  showIcon = true,
  compact = false
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // If no history, navigate to fallback path
      navigate(fallbackPath);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleBack}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg 
          bg-blue-100 text-blue-600 hover:bg-blue-200 
          transition-all duration-200 shadow-sm hover:shadow-md
          ${className}
        `}
        aria-label={label}
      >
        <ArrowLeft size={18} />
      </button>
    );
  }

  return (
    <button
      onClick={handleBack}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg 
        bg-blue-100 text-blue-600 hover:bg-blue-200 
        transition-all duration-200 font-medium text-sm
        shadow-sm hover:shadow-md
        ${className}
      `}
      aria-label={label}
    >
      {showIcon && <ArrowLeft size={16} />}
      {label}
    </button>
  );
};

export default BackButton; 