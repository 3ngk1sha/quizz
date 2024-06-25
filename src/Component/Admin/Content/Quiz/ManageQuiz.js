import React from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin } from '../../../../services/apiService';
import { postCreatNewQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { Accordion } from 'react-bootstrap';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import DeleteQuiz from './DeleteQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
];
const ManageQuiz = (event) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Easy');
    const [image, setImage] = useState(null);
    const [dataUpdate, setDataUpdate] = useState({});
    const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
    const [listQuiz, setListQuiz] = useState([]);
    const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);
    const [dataDelete, setDataDelete] = useState()
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
        else {
            // setPreviewImage("");
        }
    }
    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name or description is required');
            return
        }
        let response = await postCreatNewQuiz(description, name, type.value, image);
        if (response && response.EC === 0) {
            toast.success(response.EM)
            setName('');
            setDescription('');
            setImage(null);
        } else {
            toast.error(response.EM)
        }
    }
    const handleUpdateQuiz = (quiz) => {
        setShowUpdateQuiz(true);
        setDataUpdate(quiz);

    }
    const handleDeleteQuiz = (quiz) => {
        setShowDeleteQuiz(true);
        setDataDelete(quiz);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header> Manage Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="addnew-quiz">
                            <fieldset>
                                <legend>Add new Quiz</legend>
                                <hr></hr>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" p
                                        laceholder='your quiz name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" placeholder='description'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={'Quiz type'}
                                    />
                                </div>
                                <div className='more-actions form-group' >
                                    <label className='mb-1'>Upload image</label>
                                    <input type='file' className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                    ></input>
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-warning'
                                        onClick={() => handleSubmitQuiz()}
                                    >Save</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz
                                handleUpdateQuiz={handleUpdateQuiz}
                                handleDeleteQuiz={handleDeleteQuiz}
                                listQuiz={listQuiz}
                                fetchQuiz={fetchQuiz}
                            />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header> Update Q/A</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header> Assigns to User</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <ModalUpdateQuiz
                show={showUpdateQuiz}
                setShow={setShowUpdateQuiz}
                resetUpdateData={resetUpdateData}
                dataUpdate={dataUpdate}
                fetchQuiz={fetchQuiz}
            />
            <DeleteQuiz
                show={showDeleteQuiz}
                setShow={setShowDeleteQuiz}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
            />
        </div>
    );
}

export default ManageQuiz;
