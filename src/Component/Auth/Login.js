import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/useAction';
import { ImSpinner10 } from "react-icons/im"
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLoadingData, setIsLoadingData] = useState(false)
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
        }
        if (!password) {
            toast.error('invalid password')
        }
        setIsLoadingData(true);
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM);
            setIsLoadingData(false)
            navigate('/')
        }
        if (data && data.EC !== 0) {
            //console('alert me')
            toast.error(data.EM)
            setIsLoadingData(false)
        }
        // console.log(">>check respond", data)
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't you have account yet ?</span>
                <button
                    onClick={() => { navigate('/register') }}
                >Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Chubebanso
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello,who is this
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
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                </div>
                <span className='forgot-password'>Forgot password</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                        disabled={isLoadingData}
                    >
                        {isLoadingData === true && <ImSpinner10 className='load-icon' />}
                        <span>Login to Chubebanso</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back'
                        onClick={() => { navigate('/') }}
                    >	&#60;&#60;Go to home page</span>
                </div>
            </div>
        </div>
    )
}
export default Login