import React, {useState, useEffect} from 'react';
import SkillForm from './SkillForm';
import OpenDialogButton from '../../OpenDialogButton';

import {makeStyles} from '@material-ui/core/styles';
import axios from '../../../axios';

const useStyles = makeStyles(theme => ({
    skillsList: {
        listStyle: 'none',
        paddingLeft: '0',
    },
    skill: {
        borderBottom: '1px solid black',
        fontSize: '19px',
        marginRight: '5px'
    },
}))

const Skills = ({visitingUserID, profileUserID, token, userSkills}) => {
    const classes = useStyles();
    const [allSkills, setAllSkills] = useState([]);
    const [currSkills, setCurrSkills] = useState([]);

    useEffect(() => {
        axios.get('/skills')
            .then(res => {
                setAllSkills(res.data);
            })
    }, [])

    useEffect(() => {
        setCurrSkills(userSkills);
    }, [userSkills])

    const showSkillCommentModal = (id) => {
        axios.get(`/client/approves-list/${id}/${profileUserID}`)
            .then(res => {
                
            })
    };

    return (
        <section>
            <h4>
                Gebėjimai
                {visitingUserID === profileUserID?
                <OpenDialogButton type="edit" form="skill" title="Mano gebėjimai" >
                    <SkillForm token={token} allSkills={allSkills} checkedSkills={currSkills.map(skill => skill.id.toString())} setSkills={setCurrSkills}/>
                </OpenDialogButton>
                : null}
            </h4>
            <ul className={classes.skillsList}>
                {currSkills.map(skill => (
                    <li key={skill.id}>
                        <span onClick={() => showSkillCommentModal(skill.id)} className={classes.skill}>{skill.skill}</span> REITINGAS
                    </li>
                ))}
            </ul>
        </section>
    )
};

export default Skills;