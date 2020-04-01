import React from 'react';
import classes from './FreelanceProfile.module.scss';
import Portfolio from './Portfolio/Portfolio';
import axios from '../../../axios';
import Wrapper from '../../Wrapper/Wrapper';

class Profile extends React.Component {

    state = {
        name: '',
        location: '',
        portfolio: [],
        error: false
    }

    componentDidMount() {
        const userRequest = axios.get('/users/1');
        const portfolioRequest1 = axios.get('/photos/1');
        const portfolioRequest2 = axios.get('/photos/2');
        const portfolioRequest3 = axios.get('/photos/3');
        const portfolioRequest4 = axios.get('/photos/4');


        Promise.all([userRequest, portfolioRequest1, portfolioRequest2, portfolioRequest3, portfolioRequest4]).then(res => {
            console.log(res);
            this.setState({
                name: res[0].data.name,
                location: res[0].data.address.city,
                portfolio: [ 
                    {
                        imageUrl: res[1].data.url,
                        title: res[1].data.title,
                        id: res[1].data.id
                    },
                    {
                        imageUrl: res[2].data.url,
                        title: res[2].data.title,
                        id: res[2].data.id
                    },
                    {
                        imageUrl: res[3].data.url,
                        title: res[3].data.title,
                        id: res[3].data.id
                    },
                    {
                        imageUrl: res[4].data.url,
                        title: res[4].data.title,
                        id: res[4].data.id
                    }
                ]
            })
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true})
        })
    }

    render() {
        return (
            <Wrapper>
                <div className="container-fluid position-relative">
                    <div style={{paddingTop: '130px'}}>
                        <div className={classes.FreelancerProfile}>
                            <div className="row">
                                <img className={classes.ProfileImage + " col-3"} src="https://vignette.wikia.nocookie.net/fairytail/images/c/c3/Erza%27s_picture.png/revision/latest?cb=20190929085837" alt="#" />
                                <div className="">
                                    <p>{this.state.name}</p>
                                    <p>{this.state.location}</p>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sapien lacus, aliquam sed ornare non, tincidunt vel lacus. Morbi fermentum tortor vel odio ornare, vel placerat mi vestibulum. Etiam fringilla eros at libero finibus, a convallis ipsum auctor. Cras mauris sapien, ultrices quis sem accumsan, vulputate lobortis urna. Nulla ornare, diam eget interdum iaculis, felis odio cursus arcu, non eleifend ligula ligula id turpis. Cras semper rhoncus augue, nec placerat ipsum efficitur at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed at tellus nisl. Etiam vel ante quis nunc mollis sagittis ut sit amet lectus. Suspendisse vestibulum nibh nec quam tristique consectetur. Mauris id imperdiet lacus. </p>
                                <div className="row">
                                    {this.state.portfolio.map(portf => (
                                        <Portfolio key={portf.id} title={portf.title} imageUrl={portf.imageUrl} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        )
    }
}

export default Profile;