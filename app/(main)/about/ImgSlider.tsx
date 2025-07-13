'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

interface ImgSliderProps {
  images: string[]
  className?: string
}

export function ImgSlider({ images, className }: ImgSliderProps) {
  return (
    <div className={className}>
      <Swiper modules={[Autoplay, EffectFade]} loop={true} slidesPerView={1} spaceBetween={0} effect="fade" autoplay={{ delay: 5000 }}>
        {images.map((src, idx) => (
          <SwiperSlide key={idx} className="size-full">
            <img className="size-full object-cover" src={src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
