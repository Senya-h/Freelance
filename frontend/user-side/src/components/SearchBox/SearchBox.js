import React, {useState, useEffect} from 'react';
import FindJobForm from './FindJobForm';
import FindFreelancerForm from './FindFreelancerForm';
import cx from 'classnames';
import classes from './SearchBox.module.scss';
import axios from '../../axios';

const FIND_A_JOB = "FIND_A_JOB";
const FIND_A_CANDIDATE = 'FIND_A_CANDIDATE';

const SearchBox = () => {

    //state for holding the name of an active tab
    const [activeTab, setTab] = useState(FIND_A_JOB)
    const [skillNames, setSkillNames] = useState([]);
    
    //sets tab name on click
    const handleOpenTab = (tab) => {
        setTab(tab);
    }

    useEffect(() => {
        axios.get('/skills')
            .then(res => {
                console.log(res);
                setSkillNames(res.data.map(skill => skill.skillName));
            })
    },[]);

    return (
        <div className={`${classes["ftco-search"]} my-md-5`}>
            <div className="row">
                <div className="col-md-12">
                    <div className={cx("nav text-center", classes["nav-pills"])} role="tablist">
                        <button 
                            onClick={() => handleOpenTab(FIND_A_JOB)} 
                            className={cx("mr-md-1", classes['nav-link'], activeTab === FIND_A_JOB? classes["active"]: "")}
                            role="tab"
                        >
                            Rask darbą
                        </button>
                        <button 
                            onClick={() => handleOpenTab(FIND_A_CANDIDATE)} 
                            className={cx(classes["nav-link"], activeTab === FIND_A_CANDIDATE? classes["active"]: "")}
                            role="tab" 
                        >
                            Rask freelancerį
                        </button>
                    </div>
                </div>
                <div className={cx("col-md-12", classes["tab-wrap"])}>
                    <div className={cx(classes["tab-content"], "p-4")}>
                        {activeTab === FIND_A_JOB ? 
                            <FindJobForm skillNames={skillNames} />
                            :
                            <FindFreelancerForm skillNames={skillNames} /> 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;