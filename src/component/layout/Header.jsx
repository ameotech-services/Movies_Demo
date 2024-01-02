import React from "react";
import PlusIcon from '../../assets/images/plus.svg';
import LogoutIcon from '../../assets/images/logout.svg'


const Header = (props) => {
    return(
        <div>
            <div className="header d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2 gap-lg-3">
                    <h3 className="header_title mb-0">My movies</h3>
                    <img src={PlusIcon} alt="Add Movie" className="header_title_img" onClick={() => props.handleAddMovie()} />
                </div>
                <div className="header_right_elem d-flex align-items-center gap-2 gap-lg-3">
                    <h3 className="header_right_lbl mb-0">Logout</h3>
                    <img src={LogoutIcon} alt="Logout" className="header_title_img" onClick={() => props.handleLogout()} />
                </div>
            </div>
        </div>
    )
}



export default Header;