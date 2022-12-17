import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Container, Form, } from 'react-bootstrap';
import { Fade, Modal } from '@mui/material';
import { useNavigate,useParams } from 'react-router-dom';
import useAPI from './useAPI';


function FlatsPage() {
    const {floorId } = useParams()
    const [flat, setFlat] = useState();
    const [details, setDetails] = useState({ text: '' });

    const navigate = useNavigate()
    const fetch = useAPI()
    const HandleWriteFlat = (flat) => {
        fetch({ requestType: 'post', requestURL: `/Floors/${floorId}/Flats/${flat.id}`, requestBody: details.text }).then(() => {
            console.log("flat posted :)")
        });
    }
    const HandleViewFlat = (flat) => {
        navigate(`./${flat.id}/People`)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = (flat) => {
        console.log(flat);
        setOpen(true);
        fetch({ requestType: 'get', requestURL: `/Floors/${floorId}/Flats/${flat.id}` }).then((flat) => {
            setFlat(flat)
            console.log(flat);
        });
    }

    const handleClose = () => setOpen(false);
    const [ads, setFlats] = useState([]);
    const [noStateMessage, setNoStateMessage] = useState('');
    const localStorageUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        fetch({ requestType: 'get', requestURL: `/Floors/${1}/Flats` }).then((ads) => {
            console.log(ads);
            if (ads.length === 0) {
                setNoStateMessage('No Flats were found');
            }
            setFlats(ads);
        });
    }, []);

    const HandleEditClick = (id, flatNumber,floorId) => {
        navigate(`/FloorsPage/${floorId}/Flats/${id}`);
    };

    const HandleDeleteClick = (id,floorId) => {
        fetch({ requestType: 'delete', requestURL: `/Floors/${floorId}/Flats/${flat?.id}` }).then((ads) => {
            console.log("Flat deleted :)")
        });
        navigate(`/FloorsPage/${floorId}/Flats/${id}`);
    };
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Butai</h1>
            <Container style={{ paddingTop: 0 }} >
                <div className="d-flex flex-row justify-content-between">
                    <div className="id">Buto id</div>
                    <div className="flatNumber">Buto numeris</div>
                    <div className="floorId">Aukšto id</div>
                </div>
                {ads.map((flat) => (
                    <div className="" key={flat.id}>
                        <div className="d-flex flex-row justify-content-between" onClick={() => handleOpen(flat)}>
                            <div className="id">{flat.id}</div>
                            <div className="flatNumber">{flat.flatNumber}</div>
                            <div className="floorId">{flat.floorId}</div>
                        </div>

                        {localStorageUser?.role === 'Admin' && (
                            <>
                                <Button className="btn editButton"  style={{ marginRight: 20 }} onClick={() => HandleEditClick(flat.id, flat.flatNumber,flat.floorId)}>
                                    Redaguoti
                                </Button>

                                <Button className="btn deleteButton" onClick={() => HandleDeleteClick(flat.id,flat.floorId)}>
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
                                <div className="h1 text-white">{flat?.id}</div>
                                <div className='descriptionText text-white border'>{flat?.flatNumber}</div>
                                <div className='descriptionText text-white border'>{flat?.floorId}</div>
                                <div className="d-flex flex-row">
                                    <Form onSubmit={() => HandleWriteFlat(flat)}>
                                        <Form.Group className="form-group pb-3" controlId="name">
                                            <Form.Label className='text-white'>Butas</Form.Label>
                                        </Form.Group>
                                        <div className='d-flex flex-row'>

                                            <Form.Group className="form-group">
                                                <Button className="button adButton mx-5 mb-3 mt-5 py-5 px-5" onClick={() => HandleViewFlat(flat)}>
                                                    <span>Gyventojai</span>
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
        </div>
    );
}

export default FlatsPage;