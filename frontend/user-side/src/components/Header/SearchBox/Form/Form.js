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
                                        <option value="">Category</option>
                                        <option value="">Full Time</option>
                                        <option value="">Part Time</option>
                                        <option value="">Freelance</option>
                                        <option value="">Internship</option>
                                        <option value="">Temporary</option>
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
                                    placeholder="Location"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                            <div className="form-field">
                                <button type="submit"
                                        className="form-control btn btn-primary">Search
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