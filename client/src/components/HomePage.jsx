import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [
    "http://localhost:7777/uploads/a.jpg",
    "http://localhost:7777/uploads/c.jpg",
    "http://localhost:7777/uploads/b.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % images.length);
        setFade(true);
      }, 500); // Match this timeout to the CSS transition duration
    }, 3000); // Change images every 3 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="homepage">
      <div className={`image-slideshow ${fade ? 'fade-in' : 'fade-out'}`}>
        <img src={images[currentImageIndex]} alt="Delicious Cake" />
      </div>
      <div className="text-side">
        <img src="http://localhost:7777/uploads/newlogo.jpg" alt="Logo" className="logo" />
        <p style={{
                fontFamily: 'Dancing Script',
                fontSize: '2rem', // Adjust size as needed
                fontWeight: '400',
                color: '#f4a7b9', // Peach-pink color
                textAlign: 'center' // Center alignment if needed
            }}>הרגע הזה בו אתם מגישים פטיפור מרהיב ביופיו, מעניקים מארז מתנה עוצר נשימה ומזמינים את האורחים להתכבד בבר קינוחים נדיר ויוקרתי הוא רגע של אושר, רגע שבו הלב עולה על גדותיו והרצון לכבד ולהוקיר מובע באומנות ייחודית, נדירה ומדויקת ביצירות הקולינריות מבית מותג הפטיפורים וקינוחי הבוטיק  .</p>
      </div>
    </div>
  );
};

export default HomePage;