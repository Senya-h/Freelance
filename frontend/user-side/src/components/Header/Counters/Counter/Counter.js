import React from 'react';

const Counter = (props) => {

    return (
        <div className="col-md-4 d-flex justify-content-center counter-wrap">
            <div className="block-18 text-center">
                <div className="text d-flex">
                    <div className="icon mr-2">
                        <span className={props.flaticon}></span>
                    </div>
                    <div className="desc text-left">
                        <strong className="number" data-number="450">0</strong>
                        <span>{props.title}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Counter;