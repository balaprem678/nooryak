// "use client";
// import "./clientslider.scss";
// import Image from 'next/image';
// import { Images } from '@/utils/Images';

// const sliderImageUrl = [
//     { url: Images.clientlogo_1 },
//     { url: Images.clientlogo_2 },
//     { url: Images.clientlogo_3 },
//     { url: Images.clientlogo_4 },
//     { url: Images.clientlogo_5 },
//     { url: Images.clientlogo_6 },
//     { url: Images.clientlogo_7 },
//     { url: Images.clientlogo_8 },
//     { url: Images.clientlogo_9 },
//     { url: Images.clientlogo_10 },
//     { url: Images.clientlogo_11 },
//     { url: Images.clientlogo_12 },
//     { url: Images.clientlogo_13 },
//     { url: Images.clientlogo_14 },
//     { url: Images.clientlogo_15 },
//     { url: Images.clientlogo_16 },
//     { url: Images.clientlogo_17 },
//     { url: Images.clientlogo_18 },
//     { url: Images.clientlogo_19 },
// ];

// const ClientSlider = () => {
//     const duplicatedItems = [...sliderImageUrl, ...sliderImageUrl];

//     return (
//         <div className="logos-container">
//             <div className="logos-wrapper">
//                 <div className="logos-slide">
//                     {duplicatedItems.map((item, index) => (
//                         <div className="logo-item" key={index}>
//                             {/* <Image
//                                 src={item.url}
//                                 alt="client"
//                                 width={150}
//                                 height={80}
//                                 objectFit="contain"
//                             /> */}
//                             <Image
//                                 src={item.url}
//                                 alt="client"
//                                 width={150}
//                                 height={80}
//                                 sizes="(max-width:768px) 100px, 150px"
//                                 style={{ objectFit: "contain" }}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ClientSlider;


"use client";
import "./clientslider.scss";
import Image from "next/image";
import { Images } from "@/utils/Images";

const sliderImageUrl = [
  { url: Images.clientlogo_1 },
  { url: Images.clientlogo_2 },
  { url: Images.clientlogo_3 },
  { url: Images.clientlogo_4 },
  { url: Images.clientlogo_5 },
  { url: Images.clientlogo_6 },
  { url: Images.clientlogo_7 },
  { url: Images.clientlogo_8 },
  { url: Images.clientlogo_9 },
  { url: Images.clientlogo_10 },
  { url: Images.clientlogo_11 },
  { url: Images.clientlogo_12 },
  { url: Images.clientlogo_13 },
  { url: Images.clientlogo_14 },
  { url: Images.clientlogo_15 },
  { url: Images.clientlogo_16 },
  { url: Images.clientlogo_17 },
  { url: Images.clientlogo_18 },
  { url: Images.clientlogo_19 },
];

const ClientSlider = () => {
  // 🔥 duplicate for infinite loop
  const duplicatedItems = [...sliderImageUrl, ...sliderImageUrl];

  return (
    <div className="logos-container">
      <div className="logos-wrapper">
        <div className="logos-slide">
          {duplicatedItems.map((item, index) => (
            <div className="logo-item" key={index}>
              <Image
                src={item.url}
                alt="client logo"
                width={150}
                height={80}
                sizes="(max-width:768px) 100px, 150px"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSlider;