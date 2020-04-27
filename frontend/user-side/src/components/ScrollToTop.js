import { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import {animateScroll as scroll} from 'react-scroll';

const ScrollToTop = (props) => {
    useEffect(() => {
        scroll.scrollToTop({
            duration: 500,
            smooth: true
        })
    }, [props.location])

    return props.children;
}

export default withRouter(ScrollToTop)