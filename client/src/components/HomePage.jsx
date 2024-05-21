import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputText } from 'primereact/inputtext';

const HomePage = () => {
    return (
        <>
            <h1>Hacker!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
        
        </>
    )
}




// import React from 'react';
// import { Carousel } from 'primereact/carousel';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';

// const HomePage = () => {
//   const cakes = [
//     { id: 1, name: "Chocolate Petit Four", imageUrl: "http://localhost:7777/uploads/a.jpg", description: "Rich chocolate layers with creamy filling."},
//     { id: 2, name: "Vanilla Petit Four", imageUrl: "http://localhost:7777/uploads/b.jpg", description: "Classic vanilla with a modern twist."},
//     { id: 3, name: "Strawberry Cake", imageUrl: "http://localhost:7777/uploads/c.jpg", description: "Fresh strawberries and cream."},
//     { id: 4, name: "Lemon Cake", imageUrl: "http://localhost:7777/uploads/d.jpg", description: "Zesty lemon flavor in every bite."},
//     { id: 5, name: "Cheese Cake", imageUrl: "http://localhost:7777/uploads/e.jpg", description: "Smooth, creamy, and irresistible."}
//   ];

//   const cakeTemplate = (cake) => {
//     return (
//       <Card title={cake.name} style={{ width: '25em' }} header={<img alt={cake.name} src={cake.imageUrl} style={{ width: '100%' }} />}>
//         <p>{cake.description}</p>
//         <Button label="Read More" className="p-button-rounded p-button-outlined" />
//       </Card>
//     );
//   };

//   return (
//     <div className="homepage">
//       <div className="carousel-demo">
//         <Carousel value={cakes} itemTemplate={cakeTemplate} numVisible={3} numScroll={1} responsiveOptions={[{ breakpoint: '1024px', numVisible: 3 }, { breakpoint: '768px', numVisible: 2 }, { breakpoint: '560px', numVisible: 1 }]} />
//       </div>
//     </div>
//   );
// };

// export default HomePage


// import React from 'react';
// import { Carousel } from 'primereact/carousel';
// import 'primeflex/primeflex.css';

// const HomePage = () => {
//   const cakes = [
//     { id: 1, imageUrl: "http://localhost:7777/uploads/e.jpg" },
//     { id: 2, imageUrl: "http://localhost:7777/uploads/a.jpg" },
//     { id: 3, imageUrl: "http://localhost:7777/uploads/b.jpg" }
//   ];

//   const responsiveOptions = [
//     { breakpoint: '1024px', numVisible: 1, numScroll: 1 },
//     { breakpoint: '768px', numVisible: 1, numScroll: 1 },
//     { breakpoint: '560px', numVisible: 1, numScroll: 1 }
//   ];

//   const cakeTemplate = (cake) => {
//     return (
//       <img src={cake.imageUrl} alt="Cake Image" style={{ width: '100%', display: 'block' }} />
//     );
//   };




//   return (
//     <div className="p-grid p-nogutter homepage">
//       <div className="p-col-12 p-md-8 carousel-column">
//         <Carousel value={cakes} itemTemplate={cakeTemplate} responsiveOptions={responsiveOptions} circular autoPlayInterval={3000} />
//       </div>
//       <div className="p-col-12 p-md-4 text-column">
//         <img src="http://localhost:7777/uploads/newlogo.jpg" alt="Logo" className="logo" />
//         <p className="description">Our boutique offers the finest selection of cakes and petit fours...</p>
//       </div>
//     </div>
//   );
// };



// export default HomePage;


// import React from 'react';
// import { Carousel } from 'primereact/carousel';
// import 'primeflex/primeflex.css';

// const HomePage = () => {
//     const cakes = [
//             { id: 1, imageUrl: "http://localhost:7777/uploads/e.jpg" },
//             { id: 2, imageUrl: "http://localhost:7777/uploads/a.jpg" },
//             { id: 3, imageUrl: "http://localhost:7777/uploads/b.jpg" }
//           ];

//   const responsiveOptions = [
//     { breakpoint: '1024px', numVisible: 1, numScroll: 1 },
//     { breakpoint: '768px', numVisible: 1, numScroll: 1 },
//     { breakpoint: '560px', numVisible: 1, numScroll: 1 }
//   ];

//   const cakeTemplate = (cake) => {
//     return (
//       <img src={cake.imageUrl} alt="Cake Image" style={{ width: '100%', display: 'block' }} />
//     );
//   };

//   return (
//     <div className="p-grid p-nogutter homepage">
//       <div className="p-col-12 p-md-8 carousel-column">
//       <Carousel value={cakes} itemTemplate={cakeTemplate} responsiveOptions={responsiveOptions}
//           circular autoPlayInterval={3000} autoplay>
//         </Carousel>

//       </div>
//       <div className="p-col-12 p-md-4 text-column">
//         <img src="http://localhost:7777/uploads/newlogo.jpg" alt="Logo" className="logo" />
//         <p className="description">Our boutique offers the finest selection of cakes and petit fours...</p>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// import React, { useState, useEffect } from 'react';

// const HomePage = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const images = [
//     "http://localhost:7777/uploads/a.jpg",
//     "http://localhost:7777/uploads/c.jpg",
//     "http://localhost:7777/uploads/b.jpg",
//   ];

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % images.length);
//     }, 3000); // Change images every 3 seconds

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [images.length]);

//   return (
//     <div className="homepage">
//       <div className="image-slideshow">
//         <img src={images[currentImageIndex]} alt="Delicious Cake" style={{ width: '100%', display: 'block' }} />
//       </div>
//       <div className="text-side">
//         <img src="http://localhost:7777/uploads/newlogo.jpg" alt="Logo" className="logo" />
//         <p>הרגע הזה בו אתם מגישים פטיפור מרהיב ביופיו, מעניקים מארז מתנה עוצר נשימה ומזמינים את האורחים להתכבד בבר קינוחים נדיר ויוקרתי הוא רגע של אושר, רגע שבו הלב עולה על גדותיו והרצון לכבד ולהוקיר מובע באומנות ייחודית, נדירה ומדויקת ביצירות הקולינריות מבית מותג הפטיפורים וקינוחי הבוטיק  .</p>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
