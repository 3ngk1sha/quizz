import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import axios from 'axios';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';
import _, { update } from 'lodash';
import { putUpdateUser } from '../../../services/apiService';
const ModalUpdateUser = (props) => {
    const { show, setShow, fetchListUser, dataUpdate } = props
    // const handleClose = () => {
    //     props.setShow(false)
    // }
    const handleClose = () => {
        setShow(false)
        setEmail('');
        setUserName('');
        setRole('USER');
        setImage('');
        setPassword('');
        setPreviewImage(``);
        props.resetUpdateData();
    }
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        // console.log('run use effect', dataUpdate);
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUserName(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage('');
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [props.dataUpdate])
    const handleUpLoad = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
        else {
            // setPreviewImage("");
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUser = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
        }
        let data = await putUpdateUser(dataUpdate.id, username, role, image);
        //console.log('check respond', data)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await props.fetchListUser()
            // props.setCurrentPage(1)
            await props.fetchListUserWithPaginate(props.currentPage)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    /// console.log('check render:dataupdate', dataUpdate)
    // console.log('check data update', props.dataUpdate);
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled={true}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                disabled={true}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={username}
                                onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label
                                htmlFor="inputState"
                                className="form-label"
                            >Role</label>
                            <select id="inputState" className="form-select" onChange={(event) => setRole(event.target.value)}
                                value={role}>
                                <option value="User">USER</option>
                                <option value="Admin">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className='form-label label-upload' htmlFor='labelUpload'>
                                <FcPlus />Upload file image</label>
                            <input
                                type='file'
                                hidden
                                id='labelUpload'
                                onChange={(event) => handleUpLoad(event)}
                            ></input>

                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default ModalUpdateUser