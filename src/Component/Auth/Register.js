import { useState } from "react";
import { postRegister } from "../../services/apiService"
import { toast } from 'react-toastify';
import './Register.scss'
import { useNavigate } from 'react-router-dom';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false)
    const navigate = useNavigate();
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleRegister = async () => {

        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }
        if (!password) {
            toast.error('invalid password')
            return;
        }
        let data = await postRegister(email, password, username);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login')
        }
        if (data && +data.EC !== 0) {
            //console('alert me')
            toast.error(data.EM)
        }
    }
    return (
        <div className="register-container">'
            <div className="header">
                <span>All ready have an account</span>
                <button
                    onClick={() => { navigate('/login') }}
                >Log in</button>
            </div>
            <div className='title col-4 mx-auto'>
                Chubebanso
            </div>
            <div className='welcome col-4 mx-auto'>
                Start your journey?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={'email'}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div className='form-group pass-group'>
                    <label>Password (*)</label>
                    <input
                        type={isShowPassword ? 'text' : 'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    {isShowPassword ?
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(false)}
                        >
                            <VscEye />
                        </span>
                        :
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(true)}
                        >
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input
                        type={'text'}
                        className='form-control'
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                    ></input>
                </div>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleRegister()}
                    >Create free account</button>
                </div>
                <div className='text-center'>
                    <span className='back'
                        onClick={() => { navigate('/login') }}
                    >	&#60;&#60;Go to login</span>
                </div>
            </div >
        </div>
    )
}
export default Register