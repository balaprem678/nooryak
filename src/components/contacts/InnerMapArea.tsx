import mapIcon from '../../../public/assets/img/contact/map-icon.svg';
import Image from 'next/image';

const InnerMapArea = () => {
    return (
        <div className="tp-contact-map-ptb p-relative pb-120">
            <div className="tp-contact-map-wrapper p-relative">
                <div className="tp-contact-map-icon-box">
                    <div className="tp-contact-map-icon">
                        <span><Image src={mapIcon} alt="contact image" /></span>
                    </div>
                </div>
               



                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6042264474518!2d80.27275357507806!3d13.060845387262779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526703186886ef%3A0xc96617a758dc125a!2sNOORYAK%20TECHNOLOGIES%20Website%20Development%20Company%20Chennai!5e0!3m2!1sen!2sin!4v1774884227172!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
};

export default InnerMapArea;