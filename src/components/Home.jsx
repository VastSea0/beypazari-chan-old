import { useState, React, useEffect } from 'react';
import Header from "./Header";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ButtonP from "./ButtonPrimary";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare,   faGear, faBell, faLanguage, } from '@fortawesome/free-solid-svg-icons';
const HomePage = () => {
    const [pValue, setPValue] = useState(false);
    const [show, setShow] = useState(false);
    const [kelimeshow, setKelimeShow] = useState(false);

    const [clientScore, setClientScore] = useState(0);  
   
    useEffect(() => {
        const saklananSkor = localStorage.getItem('skor');
        if (saklananSkor) {
          setClientScore(parseInt(saklananSkor));
        }
      }, [clientScore]);
      
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
     
    const handleKelimeClose = () => setKelimeShow(false);
    const handleKelimeShow = () => setKelimeShow(true);

    useEffect(() => {
        if(clientScore != 0 || clientScore != null){
            setPValue(true)
        }
    }, [])
      
    return(
        <div className="homeApp">
             <Header></Header>
             <div className="content">
                <center >
                   
                     <div className="progress-table">
                     <div className="container mt-3">
                     <div className="row">
                            <div className="col-6 ">
                            <h3>Istatiklerin</h3>
                            <p>Su ana kadar yaptigin yuzdelik  dilim</p>
                            </div>
                            <div className="col-6 ">
                            <div style={{ width: 128, height: 128 }}>
                                <CircularProgressbar  value={clientScore / 10}  text={ clientScore / 10} />
                            </div>
                            </div>
                            
                        </div>
                        </div>
                     </div>
                     <div className="study  ">
                    <div className="row"> 
                    <span className="st">
                    
                              
                        <FontAwesomeIcon icon={faLanguage} size='5x' style={{color: "#d94039",}} />

 
                        </span>
                        <span className="st ">
                    
                              
                    <FontAwesomeIcon icon={faLanguage} size='5x' style={{color: "#d94039",}} />


                    </span>
                         
                    </div>
                    <div className="row">
                    <span className="st col">
                        <button   className='btn-p'  onClick={handleShow}>
                            <h1>
                                Hiragana Çalismaya Basla
                         

                            </h1>
                        </button>


                        </span>
                        <span className="st col">
                        <button   className='btn-p'  onClick={handleKelimeShow}>
                            <h1>
                                Kelime Çalismaya Basla
                            </h1>
                        </button>
                        

                        </span>
                        
                    </div>
                        
                     </div>
                     </center>
             </div>

             <Modal show={show} onHide={handleClose} className='modal'>
            <Modal.Header closeButton>
            <Modal.Title >
            Haydi Calisalim
           
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
            pValue && (
                <>
                Cok iyi gidiyorsun! su an {clientScore} kere dogru cevap verdin!!   
                </> 
            )
           }
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
      <Modal show={kelimeshow} onHide={handleKelimeClose} className='modal'>
            <Modal.Header closeButton>
            <Modal.Title >
            Haydi Calisalim
           
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
            pValue && (
                <>
                Cok iyi gidiyorsun! 
                </> 
            )
           }
                  Sanırım artık kendini kelime calismaya hazir hissediyorsun!
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleKelimeClose}>
                Kapat
            </Button>
            <Button variant="primary" href='/calis/kelime' onClick={handleKelimeClose}>
            Calis
            </Button>
            </Modal.Footer>
      </Modal>
        </div>
    )
}

export default HomePage;