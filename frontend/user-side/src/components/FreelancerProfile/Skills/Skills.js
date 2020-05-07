import React, {useState, useEffect} from 'react';
import SkillForm from './SkillForm';
import OpenDialogButton from '../../OpenDialogButton';
import SkillCommentsModal from './SkillCommentsModal';
import SkillCommentsForm from './SkillCommentsForm';
import {makeStyles} from '@material-ui/core/styles';
import axios from '../../../axios';
import { useAuth } from '../../../context/auth';

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

const Skills = ({visitingUserID, profileUserID, userSkills}) => {
    const classes = useStyles();
    const { authData } = useAuth();

    const [allSkills, setAllSkills] = useState([]);
    const [currSkills, setCurrSkills] = useState([]);

    const [comments, setComments] = useState([]);

    const [commentsModalOpen, setCommentsModalOpen] = useState({
        open: false,
        skill_id: 0
    });

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
                setComments(res.data);
                setCommentsModalOpen({
                    open: true,
                    skill_id: id
                });
                console.log(res);
            })
    };

    const refreshComments = (id) => {
        axios.get(`/client/approves-list/${id}/${profileUserID}`)
            .then(res => {
                setComments(res.data);
            })
    };

    return (
        <section>
            <h4>
                Gebėjimai
                {visitingUserID === profileUserID?
                <OpenDialogButton type="edit" form="skill" title="Mano gebėjimai" >
                    <SkillForm token={authData.token} allSkills={allSkills} checkedSkills={currSkills.map(skill => skill.id.toString())} setSkills={setCurrSkills}/>
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
            <SkillCommentsModal
                open={commentsModalOpen.open} 
                setOpen={setCommentsModalOpen} 
                title="Gebėjimų įvertinimai"
                visitingUserID={visitingUserID}
                profileUserID={profileUserID}
                skill_id={commentsModalOpen.skill_id}
                user_id={profileUserID}
                comments={comments}
                refreshComments={refreshComments}
                >
                <SkillCommentsForm />
            </SkillCommentsModal>
        </section>
    )
};

export default Skills;