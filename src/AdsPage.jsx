//import './AdsPage.css';
//import './AdPage.css';
import { useEffect, useState } from 'react';
import { Button, Container, Form, } from 'react-bootstrap';
import { Box, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAPI from '../hooks/useAPI';

function AdsPage() {
    const [advertisement, setAdvertisement] = useState();
    const [details, setDetails] = useState({ text: '' });
    const navigate = useNavigate()
    const fetch = useAPI()
    const HandleWriteReview = (ad) => {
        fetch({ requestType: 'post', requestURL: `/businesses/${ad.businessId}/advertisements/${ad.id}/reviews`, requestBody: details.text }).then(() => {
            console.log("review posted :)")
        });
    }
    const HandleViewReview = (ad) => {
        navigate(`./businesses/${ad.businessId}/advertisements/${ad.id}/reviews`)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = (ad) => {
        setOpen(true);
        fetch({ requestType: 'get', requestURL: `/businesses/${ad.businessId}/advertisements/${ad.id}` }).then((ad) => {
            setAdvertisement(ad)
        });
    }
    const handleClose = () => setOpen(false);
    const [ads, setAdvertisements] = useState([]);
    const [noStateMessage, setNoStateMessage] = useState('');
    const localStorageUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        fetch({ requestType: 'get', requestURL: '/advertisements' }).then((ads) => {
            if (ads.length === 0) {
                setNoStateMessage('No advertisements were found');
            }
            setAdvertisements(ads);
        });
    }, []);

    const HandleEditClick = (adId, bId) => {
        navigate(`/businesses/${bId}/advertisements/${adId}`);
    };

    const HandleDeleteClick = (adId, bId) => {
        fetch({ requestType: 'delete', requestURL: `/businesses/${bId}/advertisements/${adId}` }).then((ads) => {
            console.log("ad deleted :)")
        });
        navigate('/advertisements');
    };
    return (
        <Container className="py-5">
            {ads.map((ad) => (
                <div className="adContainer d-flex" key={ad.id}>
                    <div className="adSubContainer" onClick={() => handleOpen(ad)}>
                        <div className="adName h5 px-2">{ad.name}</div>
                        <div className="description">{ad.description}</div>
                        <div className="phoneNumber">{ad.phoneNumber}</div>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        key={advertisement?.id}
                    >
                        <Box className='style'>
                            <Container className="py-5 container">
                                <div className="adContainer d-flex flex-column">
                                    <div className="h1 text-white">{advertisement?.name}</div>
                                    <div className='descriptionText text-white border'>{advertisement?.description}</div>
                                    <div className="d-flex flex-row">
                                        <Form onSubmit={() => HandleWriteReview(advertisement)}>
                                            <Form.Group className="form-group pb-3" controlId="name">
                                                <Form.Label className='text-white'>Review</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Write your review here"
                                                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                                                    value={details.name}
                                                    required
                                                />
                                            </Form.Group>
                                            <div className='d-flex flex-row'>
                                                <Form.Group className="form-group">
                                                    <Button type="submit" className="button adButton mx-5 mb-3 mt-5 py-5 px-5" >
                                                        <span>Write a review</span>
                                                    </Button>
                                                </Form.Group>
                                                <Form.Group className="form-group">
                                                    <Button className="button adButton mx-5 mb-3 mt-5 py-5 px-5" onClick={() => HandleViewReview(advertisement)}>
                                                        <span>View Reviews[count]</span>
                                                    </Button>
                                                </Form.Group>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Container>
                        </Box>
                    </Modal>
                    {localStorageUser?.role === 'admin' && (
                        <>
                            <Button className="btn editButton" onClick={() => HandleEditClick(ad.id, ad.businessId)}>
                                Edit
                            </Button>
                            <Button className="btn deleteButton" onClick={() => HandleDeleteClick(ad.id, ad.businessId)}>
                                Delete
                            </Button>
                        </>
                    )}
                </div>
            ))}
            {ads.length === 0 && <h2>{noStateMessage}</h2>}
        </Container>
    );
}

export default AdsPage;