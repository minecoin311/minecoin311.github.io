import React , {useState} from 'react';

function Logo(props) {
    const [dataLogo] = useState([
        {
            id: 1,
            name: 'OrcaXP'
        },
        {
            id: 2,
            name: 'OXP'
        },
        {
            id: 3,
            name: 'OrcaXP'
        },
        {
            id: 4,
            name: 'OXP'
        },
        {
            id: 5,
            name: 'OrcaXP'
        },
        {
            id: 6,
            name: 'OXP'
        },
        {
            id: 7,
            name: 'OrcaXP'
        },
        {
            id: 8,
            name: 'OXP'
        },
        {
            id: 9,
            name: 'OrcaXP'
        },
        {
            id: 10,
            name: 'OXP'
        },
    ])
    return (
        <section className="logo-slider">          
                <div className="logo-slider-wrap">
                    <div className="logo-slider-inner">
                        {
                            dataLogo.map(idx => (
                                <h3 key={idx.id}>{idx.name}</h3>
                            ))
                        }

                    </div>
                    <div className="logo-slider-inner style-2">
                        {
                            dataLogo.map(idx => (
                                <h3 key={idx.id}>{idx.name}</h3>
                            ))
                        }
                    </div>
                </div>
            </section>
    );
}

export default Logo;