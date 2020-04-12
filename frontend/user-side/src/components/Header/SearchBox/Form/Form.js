import React from 'react';

const Form = (props) => {
    return (
        <div className={"tab-pane fade show active"} id="v-pills-1"
        role="tabpanel" aria-labelledby="v-pills-nextgen-tab">
            <form action="#" className="search-job">
                <div className="row no-gutters">
                    <div className="col-md mr-md-2">
                        <div className="form-group">
                            <div className="form-field">
                                <div className="icon"><span
                                    className="icon-briefcase"></span></div>
                                <input type="text" className="form-control"
                                    placeholder={props.placeholder}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md mr-md-2">
                        <div className="form-group">
                            <div className="form-field">
                                <div className="select-wrap">
                                    <div className="icon"><span
                                        className="ion-ios-arrow-down"></span>
                                    </div>
                                    <select name="" id=""
                                            className="form-control">
                                        <option value="">Kategorija</option>
                                        <option value="">Pilnas etatas</option>
                                        <option value="">Ne pilnas etatas</option>
                                        <option value="">Freelance</option>
                                        <option value="">Praktika</option>
                                        <option value="">Laikinas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md mr-md-2">
                        <div className="form-group">
                            <div className="form-field">
                                <div className="icon"><span
                                    className="icon-map-marker"></span></div>
                                <input type="text" className="form-control"
                                    placeholder="Šalis"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                            <div className="form-field">
                                <button type="submit"
                                        className="form-control btn btn-primary">Ieškoti
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default Form;