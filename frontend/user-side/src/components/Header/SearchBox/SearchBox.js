import React from 'react';
import SelectionButtons from './SelectionButtons/SelectionButtons';
import Form from './Form/Form';

const SearchBox = () => {

    return (
        <div className="ftco-search my-md-5">
            <div className="row">
                <SelectionButtons />
                <div className="col-md-12 tab-wrap">
                    <div className="tab-content p-4" id="v-pills-tabContent">
                        <Form show placeholder="eg. Graphic, Web Developer"/>
                        <Form placeholder="eg. Adam Scott" />  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;