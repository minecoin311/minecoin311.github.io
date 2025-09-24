import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import OrcaPhase1 from '../../assets/images/OrcaXP/oxp-load1.png';
import OrcaPhase2 from '../../assets/images/OrcaXP/oxp-load2.png';
import OrcaPhase3 from '../../assets/images/OrcaXP/oxp-load3.png';
import OrcaPhase4 from '../../assets/images/OrcaXP/oxp-load4.png';

RoadMap2.propTypes = {
  /** [{ id, title, list:[{id,text}], image? }] */
  data: PropTypes.array.isRequired,
};

function RoadMap2({ data }) {
  // 스크롤 리빌
  useEffect(() => {
    const nodes = document.querySelectorAll('.timeline-split .phase');
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // 데스크톱에서 이미지 높이를 텍스트 높이에 맞춤
  useEffect(() => {
    const sync = () => {
      const isDesktop = window.innerWidth > 900;
      document.querySelectorAll('.timeline-split .phase').forEach((p) => {
        const t = p.querySelector('.desktop-view .rm-text');
        if (isDesktop && t)
          p.style.setProperty('--h', `${Math.max(t.offsetHeight, 360)}px`);
        else p.style.removeProperty('--h');
      });
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  // 스크롤 점 이동 (데스크톱만)
  useEffect(() => {
    const container = document.querySelector('.section-roadmap2 .timeline-split');
    if (!container) return;

    const DOT = 18;
    let rafId = 0;
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    const update = () => {
      if (window.innerWidth <= 900) {
        container.style.setProperty('--dotY', `0px`);
        return;
      }
      const rect = container.getBoundingClientRect();
      const viewMid = window.innerHeight * 0.5;
      const posFromTop = viewMid - rect.top;
      const progress = clamp(posFromTop / rect.height, 0, 1);
      const y = progress * Math.max(0, rect.height - DOT);
      container.style.setProperty('--dotY', `${y}px`);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ✅ 네온 텍스트 깜빡임 속도 랜덤화 (선택사항 적용)
  useEffect(() => {
    const el = document.querySelector('.section-roadmap2 .tf-heading .heading.neon-motel-text');
    if (!el) return;
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const update = () => el.style.setProperty('--neon-interval', `${rand(2400, 4600)}ms`);
    update();
    const onIter = () => update();
    el.addEventListener('animationiteration', onIter);
    el.addEventListener('webkitAnimationIteration', onIter); // Safari 구버전
    return () => {
      el.removeEventListener('animationiteration', onIter);
      el.removeEventListener('webkitAnimationIteration', onIter);
    };
  }, []);

  const fallbacks = [OrcaPhase1, OrcaPhase2, OrcaPhase3, OrcaPhase4];

  return (
    <section className="tf-section section-roadmap2">
      <div className="tf-heading mb87">
        {/* ✅ 네온 클래스 추가 */}
        <h2 className="heading neon-motel-text">ROAD MAP</h2>
      </div>

      <div className="timeline-split">
        <div className="center-line" aria-hidden="true" />
        <div className="scroll-dot" aria-hidden="true" />

        {data.map((phase, idx) => {
          const even = idx % 2 === 0;
          const img = phase.image ?? fallbacks[idx] ?? null;

          return (
            <article className="phase" key={phase.id}>
              {/* ====== 데스크톱: 좌/우 교차 ====== */}
              <div className="desktop-view">
                <div className="col left">
                  {even ? (
                    <div className="rm-stack">
                      <div className="rm-halo" aria-hidden="true" />
                      <div className="rm-card rm-text">
                        <div className="title-row"><h3>{phase.title}</h3></div>
                        <ul>{phase.list?.map((it) => <li key={it.id}>{it.text}</li>)}</ul>
                      </div>
                    </div>
                  ) : (
                    <div className="rm-stack">
                      <div className="rm-halo" aria-hidden="true" />
                      <div className="rm-card rm-image">
                        {img && <img src={img} alt="" loading="lazy" />}
                      </div>
                    </div>
                  )}
                </div>

                <div className="col right">
                  {even ? (
                    <div className="rm-stack">
                      <div className="rm-halo" aria-hidden="true" />
                      <div className="rm-card rm-image">
                        {img && <img src={img} alt="" loading="lazy" />}
                      </div>
                    </div>
                  ) : (
                    <div className="rm-stack">
                      <div className="rm-halo" aria-hidden="true" />
                      <div className="rm-card rm-text">
                        <div className="title-row"><h3>{phase.title}</h3></div>
                        <ul>{phase.list?.map((it) => <li key={it.id}>{it.text}</li>)}</ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ====== 모바일: 항상 글 → 그림 ====== */}
              <div className="mobile-view">
                <div className="rm-stack">
                  <div className="rm-halo" aria-hidden="true" />
                  <div className="rm-card rm-text">
                    <div className="title-row"><h3>{phase.title}</h3></div>
                    <ul>{phase.list?.map((it) => <li key={it.id}>{it.text}</li>)}</ul>
                  </div>
                </div>
                <div className="rm-stack">
                  <div className="rm-halo" aria-hidden="true" />
                  <div className="rm-card rm-image">
                    {img && <img src={img} alt="" loading="lazy" />}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RoadMap2;
