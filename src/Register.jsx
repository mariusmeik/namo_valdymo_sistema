import { useState } from 'react';
import { Button, Stack, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const currentYear = new Date().getFullYear();

function RegisterPage() {
    const [details, setDetails] = useState({ name: '', lastName: '', phoneNumber: '', password: '', isApproved: false, flatId:0, role: 'user' });
    const { register } = useAuth();
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        const { name, lastName, phoneNumber, password, isApproved, flatId, role } = details;
        register(name, lastName, phoneNumber, password, isApproved, flatId, role).then(() => {
            navigate('/FloorsPage')
            console.log("suveike");
        }).catch((rez)=>{
                console.log(rez);
        });
    };
    return (
        <div className="login-body">
            <div className="container formContainer">
                <div className="heading pt-2 pb-4">
                    <span className='display-2'>Registruotis</span>
                </div>
                {/* </div>name: '',lastName: '',phoneNumber:'', password: '',isApproved:false,flatId ,role:'user' */}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="form-group pb-3" controlId="name">
                        <Form.Label>Vardas</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g., Jonas"
                            onChange={(e) => setDetails({ ...details, name: e.target.value })}
                            value={details.name}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group pb-3" controlId="lastName">
                        <Form.Label>Pavarde</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g., Jonaitis"
                            onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
                            value={details.lastName}
                            required
                        />
                        <Form.Group className="form-group pb-3" controlId="phoneNumber">
                            <Form.Label>Telefono numeris</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g., 863086770"
                                onChange={(e) => setDetails({ ...details, phoneNumber: e.target.value })}
                                value={details.phoneNumber}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="form-group pb-3" controlId="password">
                            <Form.Label>Slaptažodis</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g., Jonas123"
                                onChange={(e) => setDetails({ ...details, password: e.target.value })}
                                value={details.password}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="form-group pb-3" controlId="flatId">
                            <Form.Label>Buto id</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g., 2"
                                onChange={(e) => setDetails({ ...details, flatId: e.target.value })}
                                value={details.flatId}
                                required
                            />
                        </Form.Group>

                    </Form.Group>
                    <Form.Group className="form-group pt-5 pb-4">
                        <Button type="submit" className="rounded-pill w-100 py-2">
                            Registruotis
                        </Button>
                    </Form.Group>

                </Form>

            </div>
        </div>

    );
}

export default RegisterPage;