import React from 'react';
import Counter from './Counter/Counter';

const Counters = () => {
    return (
        <div className="ftco-counter ftco-no-pt ftco-no-pb">
            <div className="row">
                <Counter flaticon="flaticon-worldwide" title="Countries"/>
                <Counter flaticon="flaticon-visitor" title="Companies"/>
                <Counter flaticon="flaticon-resume" title="Active Employees"/>
            </div>
        </div>
    )
};

export default Counters;