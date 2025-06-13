import React, { useEffect, useState } from 'react';
import './SplashScreen.css'; // We'll add animation here

function Screen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    showSplash && (
      <div className="splash-screen">
        <h1 className="splash-title"> <i className="fa-solid fa-book-open fs-1 fa-fade"></i> MY BOOK COLLECTION</h1>
      </div>
    )
  );
}

export default Screen;
