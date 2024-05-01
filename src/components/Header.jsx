import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare,   faGear, faBell } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from "react-bootstrap";

const Header = () => {
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
            <div className="header navbar">
                <div className="share">
                    <button  className="btn " onClick={() => {handleShow()}}>
                        <FontAwesomeIcon icon={faShare} size="xl" style={{color: "#d94039",}} />
                    </button>
                </div>
                <h1 className="home-text"> 
                            Anasayfa  オープンソーダ
                     </h1>
                <div className="bell-gear">
                    <button  className="btn  ">
                        <FontAwesomeIcon  icon={faGear} size="xl" style={{color: "#d94039",}}  />   
                    </button>
                    <button  className="btn ">
                        <FontAwesomeIcon  icon={faBell} size="xl" style={{color: "#d94039",}}  />   
                    </button>
                </div>
                <Modal show={show} onHide={handleClose} className='modal'>
            <Modal.Header closeButton>
            <Modal.Title >
            OpenSoda Projesini paylasarak bize destekl ol!
           
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            オープンソーダ
                <ul>
                    <li>
                        <a href="https://instagram.com/vastseaoffical">Instagram Resmi hesap</a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/marsstakiuzayliyim/">Instagram Egehan'ın</a>
                    </li>
                    <li>
                        Bizi paylas <br />
                        <code>
                        Sende OpenSoda ile Japon dilini geliştir! 
                        <br></br>
                       <a className="https://opensoda.web.app ">  https://opensoda.web.app  </a> 
                        </code>
                    </li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Kapat
            </Button>
            <Button variant="primary" href='/calis' onClick={handleClose}>
            Calis
            </Button>
            </Modal.Footer>
      </Modal>
            </div>
    )
}

export default Header;