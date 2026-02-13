import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importa los estilos (obligatorio)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import BlowerCard from './BlowerCard';

export default function BlowerSwiper({ blowers }) {
  if (!blowers || blowers.length === 0) {
    return (
      <div className="alert alert-info">
        No hay blowers disponibles en este momento.
      </div>
    );
  }

  return (
    <div className="team-catalog-slider-wrapper" style={{ position: 'relative', overflowX: 'hidden' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={blowers.length > 1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1400: { slidesPerView: 4 },
        }}
        className="my-swiper" // opcional, para estilos si necesitas
      >
        {blowers.map((blower) => (
          <SwiperSlide key={blower.id}>
            <BlowerCard blower={blower} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tus estilos personalizados – puedes mantenerlos */}
      <style jsx>{`
        .swiper-slide {
          height: auto !important;
        }
        
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0,0,0,0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
        
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        
        .swiper-pagination-bullet-active {
          background: #0d6efd !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}