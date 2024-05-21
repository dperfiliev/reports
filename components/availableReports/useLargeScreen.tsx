import { useState, useEffect } from 'react';

// Хук, который возвращает true, если ширина окна больше 1024px
function useIsLargeScreen(): boolean {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    // Очистка события
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isLargeScreen;
}

export default useIsLargeScreen;