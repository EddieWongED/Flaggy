

import '../style/error.css';
import errorImg from '../icons/error.png';

const Error = (props) => {
    const {msg} = props;
    return (
        <div
        className="error-div">
            <img
            className="error-img"
            alt="error-img"
            src={errorImg}/>
            <div
            className="error-msg-div">
                {msg}
            </div>
        </div>
    )
}

Error.defaultProps = {
    msg: "404 Not Found"
}

export default Error;