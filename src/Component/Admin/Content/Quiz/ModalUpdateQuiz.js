import { useState, useEffect } from 'react';
import { NavItem } from 'react-bootstrap';
import _, { update } from 'lodash';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { putUpdateQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate } = props
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    useEffect(() => {
        // console.log('run use effect', dataUpdate);
        if (!_.isEmpty(dataUpdate)) {
            console.log('check data', dataUpdate.difficulty)
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setType(dataUpdate.difficulty);
            setImage('');
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [props.dataUpdate])
    const handleClose = () => {
        setShow(false)
        setName(''); setDescription('');
        setType('Easy')
    }
    const handleSubmitUpdateQuiz = async () => {
        let data = await putUpdateQuiz(dataUpdate.id, name, description, type, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            await props.fetchQuiz()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    const handleUpLoad = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
        else {
            // setPreviewImage("");
        }
    }
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
                    <Modal.Title>Update Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="name"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text"
                                className="form-control"
                                value={description}

                                onChange={(event) => { setDescription(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-4">
                            <label
                                htmlFor="inputState"
                                className="form-label"
                            >Type</label>
                            <select id="inputState" className="form-select" onChange={(event) => setType(event.target.value)}
                                value={type}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default ModalUpdateQuiz;