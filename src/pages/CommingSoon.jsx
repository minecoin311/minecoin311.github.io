import React from 'react';
import { Link } from 'react-router-dom';

import img from '../assets/images/OrcaXP/bg.png'
import logo from '../assets/images/logo/logo_dark.png'

function CommingSoon(props) {
    return (
            <section className="comming-soon ">
                <img src={img} alt="Binabox" className="bg-comming-soon" />
                <div className="comming-soon-inner">
                    <div className="logo">
                        <Link to="/" ><img src={logo} alt="Binabox" id="logo_header" /></Link>
                    </div>
                    <h2 className="title">COMMING SOON</h2>
                    <div className="countdown">
                        <span className="js-countdown" data-timer="1655555" data-labels=" DAYS,  HOURS  , MINUTES  , SECONDS "></span>
                    </div>

                    {/* <form action="#" id="subscribe-form">
                        <input type="email" placeholder="Enter your email" required="" id="subscribe-email" />
                        <button className="tf-button" type="submit" id="subscribe-button">SIGN UP</button>
                    </form> */}

                    {/* <div className="group-btn">
                        <Link to="https://discord.gg/orcaxp777" className="tf-button discord" data-toggle="modal" data-target="#popup_bid"><i className="icon-fl-vt"></i><span>DISCORD</span></Link>
                        <Link to="/contact" className="tf-button discord" data-toggle="modal" data-target="#popup_bid"><i className="icon-fl-vt"></i><span>DISCORD</span></Link>
                    </div> */}

                    <ul className="social-item">
                        <li><Link to="https://discord.gg/orcaxp777"><i className="icon-fl-vt"></i></Link></li>
                        <li><Link to="https://x.com/OrcaXP777"><i className="fa-brands fa-x-twitter"></i></Link></li>
                        {/* <li><Link to="#"><i className="fab fa-facebook"></i></Link></li> */}
                        <li><Link to="https://www.instagram.com/orcaxp777"><i className="fab fa-instagram"></i></Link></li>
                        <li><Link to="https://www.youtube.com/@OrcaXP777"><i className="fab fa-youtube"></i></Link></li>
                        <li><Link to="https://www.tiktok.com/@orcaxp777"><i className="icon-fl-tik-tok-2"></i></Link></li>
                    
                        
                    </ul>
                </div>
        </section>
    );
}

export default CommingSoon;