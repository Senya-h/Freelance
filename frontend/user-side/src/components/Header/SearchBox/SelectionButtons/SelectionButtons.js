import React from 'react';

const SelectionButtons = () => {
    return (
        <div className="col-md-12 nav-link-wrap">
            <div className="nav nav-pills text-center" id="v-pills-tab" role="tablist"
                aria-orientation="vertical">
                <a className="nav-link active mr-md-1" id="v-pills-1-tab"
                data-toggle="pill" href="#v-pills-1" role="tab"
                aria-controls="v-pills-1" aria-selected="true">Find a Job</a>

                <a className="nav-link" id="v-pills-2-tab" data-toggle="pill"
                href="#v-pills-2" role="tab" aria-controls="v-pills-2"
                aria-selected="false">Find a Candidate</a>

            </div>
        </div>
    )
};

export default SelectionButtons;