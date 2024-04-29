import { useState, React } from 'react';
import Header from "./Header";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ButtonP from "./ButtonPrimary";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const HomePage = () => {
    const pValue = 77;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className="homeApp">
             <Header></Header>
             <div className="content">
                     <h1 className="home-text"> 
                            Anasayfa 
                     </h1>
                     <div className="progress-table">
                     <div className="container mt-3">
                     <div className="row">
                            <div className="col-6 ">
                            <h3>İstatiklerin</h3>
                            <p>Son 3 alıştırmada yapmış olduğun yüzdelik dilim</p>
                            </div>
                            <div className="col-6 ">
                            <div style={{ width: 100, height: 100 }}>
                                <CircularProgressbar value={pValue}  text={pValue} />
                            </div>
                            </div>
                            
                        </div>
                        </div>
                     </div>
                     <div className="study  ">
                    <div className="row">
                    <span className="st col">
                        <ButtonP   text={"etiket1"}></ButtonP>

                        </span>
                        <span className="st">
                        <ButtonP   text={"etiket2"}></ButtonP>

                        </span>
                    </div>
                    <div className="row">
                    <span className="st col">
                        <button   className='btn-p'  onClick={handleShow}>
                            <h1>
                                Çalismaya Basla
                            </h1>
                        </button>

                        </span>
                        <span className="st">
                        <ButtonP   text={"Tablo"}></ButtonP>

                        </span>
                    </div>
                        
                     </div>

             </div>

             <Modal show={show} onHide={handleClose} className='modal'>
            <Modal.Header closeButton>
            <Modal.Title >
            Haydi Calisalim
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Japonca harflerinde kendini Quizler ile gelistirerek ogrenimine devam et!
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

export default HomePage;