import React, {useState} from 'react';
import Form from './Form/Form';
import cx from 'classnames';
import classes from './SearchBox.module.scss';

const FIND_A_JOB = "FIND_A_JOB";
const FIND_A_CANDIDATE = 'FIND_A_CANDIDATE';

const SearchBox = () => {

    //state for holding the name of an active tab
    const [activeTab, setTab] = useState(FIND_A_JOB)
    
    //sets tab name on click
    const handleOpenTab = (tab) => {
        setTab(tab);
    }

    return (
        <div className={cx(classes["ftco-search"], "my-md-5")}>
            <div className="row">
                <div className="col-md-12">
                    <div className={cx("nav text-center", classes["nav-pills"])} role="tablist">
                        <button 
                            onClick={() => handleOpenTab(FIND_A_JOB)} 
                            className={cx("mr-md-1", classes['nav-link'], activeTab === FIND_A_JOB? classes["active"]: "")}
                            role="tab"
                        >
                            Find a Job
                        </button>
                        <button 
                            onClick={() => handleOpenTab(FIND_A_CANDIDATE)} 
                            className={cx(classes["nav-link"], activeTab === FIND_A_CANDIDATE? classes["active"]: "")}
                            role="tab" 
                        >
                            Find a Candidate
                        </button>
                    </div>
                </div>
                <div className={cx("col-md-12", classes["tab-wrap"])}>
                    <div className={cx(classes["tab-content"], "p-4")}>
                        {activeTab === FIND_A_JOB ? <Form placeholder="eg. Graphic, Web Developer"/> :
                        <Form placeholder="eg. Adam Scott" /> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;