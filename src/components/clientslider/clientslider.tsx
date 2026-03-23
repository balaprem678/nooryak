"use client";
import React from 'react';
import "./clientslider.scss";
import Image from 'next/image';
import { Images } from '@/utils/Images';

const sliderImageUrl = [
    {
        url: Images.Logo_blue
    },
    {
        url: Images.Logo_blue
    },
    {
        url: Images.Logo_blue
    },
    {
        url: Images.Logo_blue
    },
    {
        url: Images.Logo_blue
    },
    {
        url: Images.Logo_blue
    },
    {
        url: Images.Logo_blue
    },
    {
        url: Images.Logo_blue
    }
];

const ClientSlider = () => {
    // Duplicate items for seamless infinite loop
    const duplicatedItems = [...sliderImageUrl, ...sliderImageUrl];

    return (
        <div className="logos-container">
            <div className="logos-wrapper">
                <div className="logos-slide">
                    {duplicatedItems.map((item, index) => (
                        <div className="logo-item" key={index}>
                            <Image 
                                src={item.url} 
                                alt="client" 
                                width={120} 
                                height={80}
                                objectFit="contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientSlider;
