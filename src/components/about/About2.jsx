// About1.jsx
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typewriter from "../common/Typewriter";
import "./styles.scss";

About1.propTypes = { data: PropTypes.array };

// (뷰포인트 감지 Hook은 이제 필요없음, 설명 타이핑만 유지)
function useInViewOnce(ref, options = { threshold: 0.35 }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.unobserve(entry.target);
      }
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, options, inView]);
  return inView;
}

function About1(props) {
  const { data } = props;

  const [dataBlock] = useState({
    heading: "Orca XP",
    desc:
      "Born from a penguin in an orca hoodie Fueled by XP ⚡ A coin for degens, gamers, memers, and keyboard warriors! OXP: BUY to level up, miss it and fall behind",
  });

  const [dataCounter] = useState([{ id: 1, title: "Total NFTs", number: "7777" }]);

  // 설명 문장 관찰 (타이핑 효과용)
  const descRef = useRef(null);
  const inViewDesc = useInViewOnce(descRef, {
    threshold: 0.35,
    rootMargin: "0px 0px -10% 0px",
  });

  // (선택) 제목 깜빡임 속도 랜덤화
  useEffect(() => {
    const el = document.querySelector(".tf-about .tf-heading .heading.neon-call-text");
    if (!el) return;
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const update = () => el.style.setProperty("--neon-call-interval", `${rand(2400, 4600)}ms`);
    update();
    const onIter = () => update();
    el.addEventListener("animationiteration", onIter);
    el.addEventListener("webkitAnimationIteration", onIter);
    return () => {
      el.removeEventListener("animationiteration", onIter);
      el.removeEventListener("webkitAnimationIteration", onIter);
    };
  }, []);

  return (
    <section className="tf-section tf-about">
      <div className="tf-container">
        <div className="row">
          <div className="col-md-12">
            <div className="tf-heading wow fadeInUp">
              {/* ⬇️ Monoton + 네온 적용 */}
              <h2 className="heading neon-call-text">{dataBlock.heading}</h2>
              <p className="sub-heading" ref={descRef}>
                <Typewriter
                  text={dataBlock.desc}
                  start={inViewDesc}
                  speed={30}
                  startDelay={200}
                  once={true}
                />
              </p>
            </div>

            <div className="counter-wrap wow fadeInUp" data-wow-delay="0.2s">
              {dataCounter.map((idx) => (
                <div key={idx.id} className="tf-counter">
                  <h6>{idx.title}</h6>
                  <div className="content">
                    {/* 숫자를 각 자리별로 나눠 애니메이션 */}
                    <span className="counter-number" aria-label={idx.number}>
                      {idx.number.split("").map((d, i) => (
                        <span
                          key={i}
                          className="digit"
                          style={{ "--i": i }}
                          aria-hidden="true"
                        >
                          {d}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* (다른 섹션은 그대로) */}
        </div>
      </div>
    </section>
  );
}

export default About1;
