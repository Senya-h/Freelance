import React, {useState, useEffect} from 'react';
import Rating from '@material-ui/lab/Rating';
import classes from './FreelanceProfile.module.scss';
import Portfolio from './Portfolio/Portfolio';
import axios from '../../../axios';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import cx from 'classnames';
import SendMessage from './SendMessage/SendMessage';

import { useAuth } from '../../../context/auth';

const Profile = () => {
    let { authTokens } = useAuth();
    authTokens = JSON.parse(authTokens);

    const [userInfo, setUserInfo] = useState({
        name: '',
        location: '',
    })

    const [services, setServices] = useState({});
    const [skills, setSkills] = useState({})

    useEffect(() => {
        axios.get('/user/' + authTokens.userID)
            .then(res => {
                const info = res.data.info;
                const portfolio = res.data.portfolio;
                setUserInfo({name: info.name, location: info.location,})
            })
    }, [])

    return (
        <Wrapper variant='container-fluid' contentOffset='130px'>
            <div className={classes.FreelancerProfile}>
                <div className="row">
                    <img className={cx(classes.ProfileImage,"col-3")} src="https://vignette.wikia.nocookie.net/fairytail/images/c/c3/Erza%27s_picture.png/revision/latest?cb=20190929085837" alt="#" />
                    <div>
                        <h2>{userInfo.name}</h2>
                        <p>Front-End Developer</p>
                        <div>
                            <h3>Ranking</h3>
                            <Rating name='read-only' precision={0.25} value={4.5} readOnly />
                        </div>
                        <div>
                            <h4>Gebėjimai:</h4>
                            <ul style={{listStyle: 'none'}}>
                                <li>HTML5</li>
                                <li>CSS3</li>
                                <li>JS</li>
                                <li>ReactJS</li>
                            </ul>
                        </div>
                        <SendMessage recipient={userInfo.name} id={0}/>
                    </div>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sapien lacus, aliquam sed ornare non, tincidunt vel lacus. Morbi fermentum tortor vel odio ornare, vel placerat mi vestibulum. Etiam fringilla eros at libero finibus, a convallis ipsum auctor. Cras mauris sapien, ultrices quis sem accumsan, vulputate lobortis urna. Nulla ornare, diam eget interdum iaculis, felis odio cursus arcu, non eleifend ligula ligula id turpis. Cras semper rhoncus augue, nec placerat ipsum efficitur at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed at tellus nisl. Etiam vel ante quis nunc mollis sagittis ut sit amet lectus. Suspendisse vestibulum nibh nec quam tristique consectetur. Mauris id imperdiet lacus. </p>
                    <div className="row">
                        <h2>Portfolio</h2>
                        {/* {this.state.portfolio.map(portf => (
                            <Portfolio key={portf.id} title={portf.title} imageUrl={portf.imageUrl} />
                        ))} */}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Profile;