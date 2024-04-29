import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare,   faGear, faBell } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return(
            <div className="header navbar">
                <div className="share">
                    <button  className="btn ">
                        <FontAwesomeIcon icon={faShare} size="xl" style={{color: "#d94039",}} />
                    </button>
                </div>
                <div className="bell-gear">
                    <button  className="btn  ">
                        <FontAwesomeIcon  icon={faGear} size="xl" style={{color: "#d94039",}}  />   
                    </button>
                    <button  className="btn ">
                        <FontAwesomeIcon  icon={faBell} size="xl" style={{color: "#d94039",}}  />   
                    </button>
                </div>
            </div>
    )
}

export default Header;