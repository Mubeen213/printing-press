import { useState, useEffect } from 'react';
import { announcementMessages } from '@/data/siteContent';

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcementMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-secondary text-white text-xs sm:text-sm py-2 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 text-center">
        <p className="animate-fade-in" key={currentIndex}>
          {announcementMessages[currentIndex]}
        </p>
      </div>
    </div>
  );
}
