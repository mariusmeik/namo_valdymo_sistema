import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useAPI from './useAPI';
import ReactTable from "react-table";  
import PhoneInput from 'react-phone-number-input';

export default function FlatEditPage() {
    const {floorId } = useParams()
    const {flatId } = useParams()
    const fetch = useAPI()
    const navigate = useNavigate()
    //const [floor, setFloor] = useState();
    // const [floorId, setDescription] = useState();
    const [flat, setFlat] = useState({ id: 0, flatNumber: 0, floorId: 0 });
    

    const HandleSave = () => {
        console.log(flat);
        fetch({ requestType: 'put', requestURL: `/Floors/${floorId}/Flats/${flatId}`, requestBody: { id: flat.id,flatNumber:flat.flatNumber,floorId:flat.floorId } } ).then(() => {
            console.log(flat);
            navigate('/FloorsPage');
        });
    };
    const HandleDelete = () => {
        console.log(floorId)
        console.log(flatId)
        fetch({ requestType: 'delete', requestURL: `/Floors/${floorId}/Flats/${flatId}` }).then(() => {
            console.log("ad deleted :)")
        });
        navigate('/FloorsPage');
    };
    useEffect(() => {
        fetch({ requestType: 'get', requestURL: `/Floors/${floorId}/Flats/${flatId}` }).then((flat) => {
            console.log("flat")
            console.log(flat)
            setFlat(flat);
        });
    }, []);

    const HandleCancel = () => {
        navigate(`/Floors/${floorId}`);
    };

    return (
        <Container className="py-5">
            <div className="modalContainer d-flex flex-column">
            <div className='d-flex flex-row phoneNumberContainer'>
                    buto numeris
                    aukšto id
                </div>
                <div className='d-flex flex-row phoneNumberContainer'>
                    
                    <input id="flatNumber" type="number" value={flat.flatNumber} onChange={ (e)=>setFlat({ ...flat, flatNumber : e.target.value})}></input>
                    <input id="floorId" type="number" value={flat.floorId} onChange={ (e)=>setFlat({ ...flat, floorId : e.target.value})}></input>
                </div>
                <div className='d-flex flex-row'>
                    <Button className="button adButtons mx-1 mt-4 py-4" onClick={HandleSave} >
                        <span>Išsaugoti</span>
                    </Button>
                    <Button className="button adButtons mx-1 mt-4 py-4" onClick={HandleCancel} >
                        <span>Atšaukti</span>
                    </Button>
                    <Button className="button adButtons mx-1 mt-4 py-4" onClick={HandleDelete} >
                        <span>Ištrinti</span>
                    </Button>
                </div>
            </div>
        </Container>
    );
}