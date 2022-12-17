import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useAPI from './useAPI';
import PhoneInput from 'react-phone-number-input';

export default function FloorEditPage() {
    const {floorId } = useParams()
    const fetch = useAPI()
    const navigate = useNavigate()
    //const [floor, setFloor] = useState();
    // const [floorId, setDescription] = useState();
    const [whichFloor, setWhichFloor] = useState();

    const HandleSave = () => {
        fetch({ requestType: 'put', requestURL: `/Floors/${floorId}`, requestBody: { whichFloor: whichFloor,id:floorId} }).then(() => {
            navigate('/FloorsPage');
        });
    };
    const HandleDelete = () => {
        fetch({ requestType: 'delete', requestURL: `/Floors/${floorId}` }).then(() => {
            console.log("ad deleted :)")
        });
        navigate('/FloorsPage');
    };
    useEffect(() => {
        fetch({ requestType: 'get', requestURL: `/Floors/${floorId}` }).then((floor) => {
            //setFloor(floor);
            setWhichFloor(floor.whichFloor);
        });
    }, []);

    const HandleCancel = () => {
        navigate(`/FloorsPage`);
    };

    return (
        <Container className="py-5">
            <div className="modalContainer d-flex flex-column">
                <div className='d-flex flex-row phoneNumberContainer'>
                    
                    <input id="number" type="number" value={whichFloor} onChange={ (e)=>setWhichFloor(e.target.value)}></input>
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