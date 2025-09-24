import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import menus from '../../pages/menu';
import { Dropdown } from 'react-bootstrap';

import './styles.scss';
import logo from '../../assets/images/logo/logo.png';
import logodark from '../../assets/images/logo/logo_dark.png';

import DarkMode from './DarkMode';

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [menuActive, setMenuActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const matrixRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!matrixRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    matrixRef.current.appendChild(canvas);

    const setSize = () => {
      canvas.width = matrixRef.current.clientWidth;
      canvas.height = matrixRef.current.clientHeight;
    };
    setSize();

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / (fontSize + 2));
    let drops = new Array(columns).fill(1);

    let animId;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00f7ff';
      ctx.font = `${fontSize}px Orbitron, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * (fontSize + 2), drops[i] * (fontSize + 2));

        if (drops[i] * (fontSize + 2) > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    const onResize = () => {
      setSize();
      columns = Math.floor(canvas.width / (fontSize + 2));
      drops = new Array(columns).fill(1);
    };
    window.addEventListener('resize', onResize);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.remove();
    };
  }, []);

  const handleMenuActive = () => setMenuActive(!menuActive);
  const handleDropdown = (index) => setActiveIndex(index);

  return (
    <header className={`header ${scroll ? 'is-fixed' : ''}`}>
      {/* 배경 레이어 */}
      <div className="header-neon-overlay" aria-hidden="true" />
      <div className="header-matrix-bg" ref={matrixRef} aria-hidden="true" />

      <div className="tf-container">
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner" className="header-content">
              <div id="site-logo" className="clearfix">
                <div id="site-logo-inner">
                  <Link to="/" rel="home" className="main-logo">
                    <img id="logo_header" className="logo-dark" src={logodark} alt="Binasea" />
                    <img id="logo_header" className="logo-light" src={logo} alt="Binasea" />
                  </Link>
                </div>
              </div>

              <div className="header-center">
                <nav id="main-nav" className={`main-nav ${menuActive ? 'active' : ''}`}>
                  <ul id="menu-primary-menu" className="menu">
                    {menus.map((data, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleDropdown(idx)}
                        className={`menu-item ${data.namesub ? 'menu-item-has-children' : ''} ${
                          activeIndex === idx ? 'active' : ''
                        }`}
                      >
                        <Link to={data.links}>{data.name}</Link>
                        {data.namesub && (
                          <ul className="sub-menu">
                            {data.namesub.map((submenu) => (
                              <li key={submenu.id} className="menu-item">
                                <NavLink to={submenu.links}>{submenu.sub}</NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="header-right">
                <DarkMode />

                {/* 소셜들 */}
                <Link to="https://discord.gg/orcaxp777" className="tf-button discord">
                  <i className="icon-fl-vt"></i>
                </Link>
                <Link to="https://x.com/OrcaXP777" className="tf-button discord">
                  <i className="fa-brands fa-x-twitter"></i>
                </Link>
                {/* ✅ Telegram 추가 */}
                <Link to="https://t.me/orcaxp777" className="tf-button discord">
                  <i className="fab fa-telegram-plane"></i>
                </Link>
                <Link to="https://www.instagram.com/orcaxp777" className="tf-button discord">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="https://www.youtube.com/@OrcaXP777" className="tf-button discord">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link to="https://www.tiktok.com/@orcaxp777" className="tf-button discord">
                  <i className="icon-fl-tik-tok-2"></i>
                </Link>



                <Link
                  to="https://www.orca.so/tokens"
                  className="tf-button connect"
                  data-toggle="modal"
                  data-target="#popup_bid"
                >
                  <i className="icon-fl-wallet"></i>
                </Link>

                <div className={`mobile-button ${menuActive ? 'active' : ''}`} onClick={handleMenuActive}>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
