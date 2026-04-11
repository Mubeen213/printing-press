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
    <div className="bg-secondary text-white text-xs sm:text-sm relative overflow-hidden" style={{ height: '2rem' }}>
      <div className="max-w-[1280px] mx-auto px-4 text-center h-full flex items-center justify-center overflow-hidden">
        <p className="animate-announcement-swap w-full truncate" key={currentIndex}>
          {announcementMessages[currentIndex]}
        </p>
      </div>
    </div>
  );
}
