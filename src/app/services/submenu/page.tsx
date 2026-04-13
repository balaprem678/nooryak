import React from 'react'
import ServicesHeroBanner from './herobanner'
import ServicesSection from './ourservices/OurServicesSection'
import WhyChooseNooryak from './whychoosenooryak'
import OurProcess from './ourprocess'


export default function ServicesSubmenu() {
    return (
        <>
            <ServicesHeroBanner />
            <ServicesSection />
            <WhyChooseNooryak />
            <OurProcess />
        </>
    )
}
