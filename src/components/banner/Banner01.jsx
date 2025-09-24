// Banner01.jsx
import React from 'react';
import PropTypes from 'prop-types';

import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import DexLogo from '../../assets/images/logo/dexscreener-logo.svg';
import OrcaLogo from '../../assets/images/logo/orca-logo.svg';
import JupiterLogo from '../../assets/images/logo/jupiter-logo.svg';

import './styles.scss';
import img1 from '../../assets/images/OrcaXP/slider-1.png';
import bg from '../../assets/images/OrcaXP/backg.png';
import clip1 from '../../assets/images/OrcaXP/oxp-ch2.mp4';

import gsap from 'gsap';

Banner01.propTypes = { data: PropTypes.array };

/** BUY 반짝 효과 */
function runBuyColorWave(rootEl) {
  if (!rootEl) return;
  const buyEl = rootEl.querySelector('[data-anim-buy]');
  if (!buyEl) return;

  if (!buyEl.dataset.splitted) {
    const text = buyEl.textContent || '';
    buyEl.textContent = '';
    const frag = document.createDocumentFragment();
    text.split('').forEach((ch) => {
      const span = document.createElement('span');
      span.textContent = ch;
      span.className = 'js-buy-char';
      span.style.display = 'inline';
      frag.appendChild(span);
    });
    buyEl.appendChild(frag);
    buyEl.dataset.splitted = '1';
  }

  const chars = buyEl.querySelectorAll('.js-buy-char');
  gsap.killTweensOf(chars);

  gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
    .to(chars, { color: '#e6e759', duration: 0.4, stagger: 0.05, ease: 'power2.out' })
    .to(chars, { color: '#80e5e3', duration: 0.3, stagger: 0.05 }, '>-25%')
    .to(chars, { color: '#fff', duration: 0.3, stagger: 0.05 }, '>-25%');
}

/** level / up 교차 스케일 */
function runScaleEffect(rootEl) {
  if (!rootEl) return;
  const levelEl = rootEl.querySelector('[data-anim-level]');
  const upEl = rootEl.querySelector('[data-anim-up]');
  if (!levelEl || !upEl) return;

  gsap.killTweensOf([levelEl, upEl]);
  gsap.set([levelEl, upEl], {
    display: 'inline-block',
    transformOrigin: '50% 65%',
    scale: 1,
  });

  gsap.to(levelEl, {
    scale: 1.2,
    duration: 0.7,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  gsap.to(upEl, {
    scale: 1.2,
    duration: 0.7,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 0.7,
  });
}

function runEffectsForSlide(rootEl) {
  runBuyColorWave(rootEl);
  runScaleEffect(rootEl);
}

function Banner01({ data }) {
  return (
    <section
      className="tf-slider"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* 배경 컬러 오버레이 */}
      <div className="bg-inner" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Swiper
              modules={[Navigation, Scrollbar, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              className="slider-home"
              loop={true}
              onInit={(swiper) => {
                const slide = swiper.slides[swiper.activeIndex];
                setTimeout(() => runEffectsForSlide(slide), 350);
              }}
              onSlideChangeTransitionEnd={(swiper) => {
                const slide = swiper.slides[swiper.activeIndex];
                runEffectsForSlide(slide);
              }}
            >
              {data.slice(0, 4).map((idx) => (
                <SwiperSlide key={idx.id}>
                  <div className="slider-item">
                    <div className="tf-slider-item">
                      <div className="content-inner">
                        {/* 상단 OXP + 키워드 */}
                        <div className="text-typing">
                          <h1 className="heading mb0">
                            O<span className="js-flip-letter">X</span>P
                          </h1>
                          <div className="animate-contain">
                            <div className="animated-text">
                              <span>{'\u00A0DEGENS'}</span>
                              <span>GAMERS</span>
                              <span>MEMERS</span>
                            </div>
                          </div>
                        </div>

                        {/* 메인 타이틀 */}
                        <h1 className="heading">
                          <span data-anim-buy>BUY</span> to{' '}
                          <span data-anim-level>level</span>{' '}
                          <span data-anim-up>up</span>
                        </h1>

                        {/* <p className="sub-heading">{idx.desc}</p> */}

                        {/* 버튼: Orca / Dexscreener / Jupiter */}
                        <div className="btn-slider">
                          <a
                            href="https://www.orca.so/tokens"
                            className="brand-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img src={OrcaLogo} alt="Orca" />
                            <span>Orca</span>
                          </a>

                          <a
                            // href="https://dexscreener.com/"
                            className="brand-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img src={DexLogo} alt="Dexscreener" />
                            <span>Dexscreener</span>
                          </a>

                          <a
                            // href="https://jup.ag/swap"
                            className="brand-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img src={JupiterLogo} alt="Jupiter" />
                            <span>Jupiter</span>
                          </a>
                        </div>
                      </div>

                      <div className="content-right">
                        <div className="content-slide">
                          <div className="image hologram">
                            <video
                              className="slider-video"
                              src={clip1}
                              muted
                              playsInline
                              loop
                              autoPlay
                              preload="metadata"
                              poster={img1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner01;
