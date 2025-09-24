import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo/logo-footer.png';
import OrcaLogo from '../../assets/images/logo/orca-logo.svg';
import DexLogo from '../../assets/images/logo/dexscreener-logo.svg';
import JupiterLogo from '../../assets/images/logo/jupiter-logo.svg';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 500);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="tf-container">
          <div className="row">
            {/* 좌측: 로고 + 텍스트 */}
            <div className="widget widget-infor">
              <div className="logo">
                <img id="logo_footer" src={logo} alt="OrcaXP" />
              </div>
              <p className="content">OXP: BUY to level up!</p>
            </div>

            {/* 우측: 거래소 로고 */}
            <div className="exchange-logos">
              <a href="https://www.orca.so/tokens" target="_blank" rel="noopener noreferrer">
                <img src={OrcaLogo} alt="Orca" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <img src={DexLogo} alt="Dexscreener" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <img src={JupiterLogo} alt="Jupiter" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 copyright + 소셜 */}
      <div className="bottom-inner">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <div className="bottom">
                <p className="copy-right">OrcaXP 2025 - ALL rights reserved</p>

                <ul className="social-item">
                  <li>
                    <Link to="https://discord.gg/orcaxp777">
                      <i className="icon-fl-vt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://x.com/OrcaXP777">
                      <i className="fa-brands fa-x-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://t.me/orcaxp777">
                      <i className="fab fa-telegram-plane"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.instagram.com/orcaxp777">
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.youtube.com/@OrcaXP777">
                      <i className="fab fa-youtube"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.tiktok.com/@orcaxp777">
                      <i className="icon-fl-tik-tok-2"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isVisible && <Link onClick={scrollToTop} to="#" id="scroll-top"></Link>}
    </footer>
  );
}

export default Footer;
