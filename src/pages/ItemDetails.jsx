import React from 'react';
import PageTitle from '../components/pagetitle/PageTitle';

import Footer from '../components/footer';
import Collection03 from '../components/collection/Collection03';
import dataCollection from '../assets/fake-data/data-collection';
import { Link } from 'react-router-dom';

import img from '../assets/images/OrcaXP/1.png'

function ItemDetails(props) {
    return (
        <div className='page-collection'>

            <PageTitle title='NFT' />

            <section className=" tf-item-detail ">
                <div className="tf-container">
                   <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="tf-item-detail-image">
                                <img src={img} alt="Binabox" />
                             
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="tf-item-detail-inner">
                                <h2 className="title">OrcaXP#1</h2>
                                <p className="des">This collection, born in the OrcaXP universe, consists of 7,777 adorable characters, each equipped with a variety of unique gear and distinctive styles.
                                </p>
                                <div className="infor-item-wrap">
                                    <div className="infor-item-box">
                                        <div className="category">Background Color</div>
                                        <h4 className="name">???</h4>
                                    </div>
                                    <div className="infor-item-box">
                                        <div className="category">Skin</div>
                                        <h4 className="name">???</h4>
                                    </div>
                                    <div className="infor-item-box">
                                        <div className="category">Face</div>
                                        <h4 className="name">???</h4>
                                    </div>
                                    <div className="infor-item-box">
                                        <div className="category">Keyboard</div>
                                        <h4 className="name">???</h4>
                                    </div>
                                    <div className="infor-item-box">
                                        <div className="category">headset</div>
                                        <h4 className="name">???</h4>
                                    </div>
                                    {/* <div className="infor-item-box">
                                        <div className="category">Special</div>
                                        <h4 className="name">CAT</h4>
                                    </div> */}
                                </div>
                                <div className="price">
                                    <span className="heading">PRICE:</span>
                                    <span>0.0??? ETH</span>
                                </div>
                                <div className="group-btn">
                                    <Link to="#" className="tf-button opensea"><i className="icon-fl-bag"></i> BUY </Link>
                                   <div className="group-2">
                                        <Link to="https://discord.gg/orcaxp777" className="tf-button style-2 "><i className="icon-fl-vt"></i> JOIN DISCORD</Link>
                                        <Link to="https://x.com/OrcaXP777" className="tf-button style-2 twitter"><i className="fa-brands fa-x-twitter"></i> JOIN TWITTER</Link>
                                   </div>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </section>

            <Collection03 data={dataCollection} />

            <Footer />
            
        </div>
    );
}

export default ItemDetails;