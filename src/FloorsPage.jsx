import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Container, Form, } from 'react-bootstrap';
import { Fade, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAPI from './useAPI';
import flat from './flat.jpg';


function FloorsPage() {
    const [floor, setFloor] = useState();
    const [details, setDetails] = useState({ text: '' });
    const navigate = useNavigate()
    const fetch = useAPI()
    const HandleWriteFloor = (floor) => {
        fetch({ requestType: 'post', requestURL: `/Floors/${floor.id}`, requestBody: details.text }).then(() => {
            console.log("floor posted :)")
        });
    }
    const HandleViewFlat = (floor) => {
        navigate(`./${floor.id}/Flats`)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = (floor) => {
        setOpen(true);
        fetch({ requestType: 'get', requestURL: `/Floors/${floor.id}` }).then((floor) => {
            setFloor(floor)
        });
    }
    const handleClose = () => setOpen(false);
    const [ads, setFloors] = useState([]);
    const [noStateMessage, setNoStateMessage] = useState('');
    const localStorageUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        fetch({ requestType: 'get', requestURL: '/Floors' }).then((ads) => {
            console.log(ads);
            if (ads.length === 0) {
                setNoStateMessage('No Floors were found');
            }
            setFloors(ads);
        });
    }, []);

    const HandleEditClick = (id, WhichFloor) => {
        navigate(`/Floors/${id}`);
    };

    const HandleDeleteClick = (adId) => {
        fetch({ requestType: 'delete', requestURL: `/Floors/${adId}` }).then((ads) => {
            console.log("Floor deleted :)")
        });
        navigate('/Floors');
    };
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Aukštai</h1>
            <Container style={{ paddingTop: 0 }} >
                <div className="d-flex flex-row justify-content-between">
                    <div className="id">Aukšto id</div>
                    <div className="WhichFloor">Kuris Aukštas</div>
                </div>
                {ads.map((floor) => (
                    <div className="" key={floor.id}>
                        <div className="d-flex flex-row justify-content-between" onClick={() => handleOpen(floor)}>
                            <div className="id">{floor.id}</div>
                            <div className="WhichFloor">{floor.whichFloor}</div>
                        </div>

                        {localStorageUser?.role === 'Admin' && (
                            <>
                                <Button className="btn editButton" onClick={() => HandleEditClick(floor.id, floor.WhichFloor)}>
                                    Redaguoti
                                </Button>
                                <Button className="btn deleteButton" onClick={() => HandleDeleteClick(floor.id, floor.WhichFloor)}>
                                Ištrinti
                                </Button>
                            </>
                        )}
                    </div>
                ))}
                {ads.length === 0 && <h2>{noStateMessage}</h2>}

                <Modal open={open} onClose={handleClose} className="bg-primary">
                    {/* <Box className='style'> */}
                    <Fade in={open} timeout={1500}>
                        <Container className="py-5 container">
                            <div className="adContainer d-flex flex-column">
                                <div className="h1 text-white">{floor?.id}</div>
                                <div className='descriptionText text-white border'>{floor?.WhichFloor}</div>
                                <div className="d-flex flex-row">
                                    <Form onSubmit={() => HandleWriteFloor(floor)}>
                                        <Form.Group className="form-group pb-3" controlId="name">
                                            <Form.Label className='text-white'>Aukštas</Form.Label>
                                        </Form.Group>
                                        <div className='d-flex flex-row'>

                                            <Form.Group className="form-group">
                                                <Button className="button adButton mx-5 mb-3 mt-5 py-5 px-5" onClick={() => HandleViewFlat(floor)}>
                                                    <span>Butai</span>
                                                </Button>
                                            </Form.Group>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Container>
                        {/* </Box> */}
                    </Fade>
                </Modal>
            </Container>
            <img src={flat} alt="Butas" style={{ width: "100%", height: "auto" }}></img>
        </div>
    );
}

export default FloorsPage;