import React,{ useState } from 'react';
import { Button, Stack, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';


const currentYear = new Date().getFullYear();

function LoginPage() {
    const [details, setDetails] = useState({ userName: '', password: '' });
    const { signIn } = useAuth();
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        const { userName, password } = details;
        signIn(userName, password).then(() => {
            navigate('/FloorsPage')
        });
    };
    return (
        <div className="login-body">
            <div className="container formContainer">
                <div className="heading pt-2 pb-4">
                    <span className='display-2'>Prisijunkite</span>
                </div>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="form-group pb-3" controlId="userName">
                        <Form.Label>Vartotojo vardas</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="pvz., Jonas"
                            onChange={(e) => setDetails({ ...details, userName: e.target.value })}
                            value={details.userName}
                            required
                        />
                    </Form.Group>
                    {/* <Form.Group className="form-group pb-3" controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g., +370 600 00000"
                            onChange={(e) => setDetails({ ...details, phoneNumber: e.target.value })}
                            value={details.phoneNumber}
                            required
                        />
                    </Form.Group> */}
                    <Form.Group className="form-group" controlId="password">
                        <Form.Label>Slaptažodis</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e) => setDetails({ ...details, password: e.target.value })}
                            value={details.password}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="form-group pt-5 pb-4">
                        <Button type="submit" className="rounded-pill w-100 py-2">
                            Prisijungti
                        </Button>
                    </Form.Group>
                </Form>
                <div className="text-center pt-2 pb-4 ">
                    <span className='registerText'>Esate neregistruotas? <a href="/register">Registruotis</a></span>
                </div>
            </div>
            <div className="mt-auto">
                <Stack
                    direction="horizontal"
                    gap={{ xs: 1, sm: 3 }}
                    className="d-flex flex-row justify-content-center py-1 hide-even">
                </Stack>
            </div>
        </div>
    );
}

export default LoginPage;