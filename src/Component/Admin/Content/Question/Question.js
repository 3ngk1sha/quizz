import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './Question.scss';
import { AiFillMinusSquare } from 'react-icons/ai';
import { AiFillPlusSquare } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { toast } from 'react-toastify';
import { getAllQuizForAdmin, postCreateNewAnswerForQuestion, postCreateNewQuestionForQuiz } from '../../../../services/apiService';
const Questions = (props) => {

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' },
    // ];
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [dataImage, setDataImage] = useState({
        title: '',
        url: ''
    })
    const initQuestion = [{
        id: uuidv4(),
        description: 'question 1',
        image: '',
        imageName: '',
        imageFile: '',
        answers: [
            {
                id: uuidv4(),
                description: 'answer 1',
                isCorrect: false,
            },
        ],
    }]
    const [questions, setQuestions] = useState(initQuestion);
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const HandleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                image: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ],
            };

            setQuestions([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            const updatedQuestions = questions.filter((item) => item.id !== id);
            setQuestions(updatedQuestions);
        }
    };

    const HandleAddRemoveAnswer = (type, questionID, answerID) => {
        const updatedQuestions = _.cloneDeep(questions);
        const questionIndex = updatedQuestions.findIndex((item) => item.id === questionID);

        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };
            updatedQuestions[questionIndex].answers.push(newAnswer);
        }

        if (type === 'REMOVE') {
            const answerIndex = updatedQuestions[questionIndex].answers.findIndex(
                (item) => item.id === answerID
            );
            updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
        }

        setQuestions(updatedQuestions);
    };

    const handleOnChange = (type, questionID, value) => {
        const updatedQuestions = _.cloneDeep(questions);
        const questionIndex = updatedQuestions.findIndex((item) => item.id === questionID);

        if (type === 'QUESTION') {
            updatedQuestions[questionIndex].description = value;
        }

        setQuestions(updatedQuestions);
    };

    const handleOnChangeFileQuestion = (questionID, event) => {
        const updatedQuestions = _.cloneDeep(questions);
        const questionIndex = updatedQuestions.findIndex((item) => item.id === questionID);

        if (questionIndex > -1 && event.target.files && event.target.files[0]) {
            updatedQuestions[questionIndex].imageName = event.target.files[0].name;
            updatedQuestions[questionIndex].imageFile = event.target.files[0];
        }

        setQuestions(updatedQuestions);
    };
    const handleAnswerQuestion = (type, questionID, answerID, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionID);

        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(answer => {
                console.log(answerID);
                if (answer.id === answerID) { // Use double equal sign for comparison
                    if (type === "CHECKBOX") {
                        answer.isCorrect = value;
                        console.log(answer.id)
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                    return answer;
                } else {
                    return answer; // Return other answers unchanged
                }
            });
            console.log(questionClone);
            setQuestions(questionClone);
        }
    }
    const handlePreViewImage = (questionID) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionID);

        if (index > -1) {
            try {
                const imageUrl = URL.createObjectURL(questionClone[index].imageFile);
                setDataImage({
                    url: imageUrl,
                    title: questionClone[index].imageName
                });
                setIsPreviewImage(true);
            } catch (error) {
                console.error("Error creating object URL:", error);
                // Handle the error gracefully, e.g., show an error message to the user.
            }
        }
    }
    const [listQuiz, setListQuiz] = useState();
    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: item.description
                }
            })

            setListQuiz(newQuiz)
        }
    }
    const handleQuestionForQuiz = async () => {
        // console.log('question', selectedQuiz)
        //validate data 
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a quiz   ")
            return;
        }
        //validate answer
        let isValid = true;
        let indexQuestion = 0;
        let indexAnswer = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValid = false;
                    indexAnswer = j;
                    break;
                }
            }
            indexQuestion = i;
            if (isValid === false) break;
        }
        if (isValid === false) {
            toast.error(`Not empty answer ${indexAnswer + 1} at question ${indexQuestion + 1}`);
            return;
        }
        //validate question
        let isValidQ = true;
        let indexQ1 = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false;
                indexQ1 = i;
                break;
            }
        }
        if (isValidQ === false) {
            toast.error(`Not empty description for question ${indexQ1 + 1} `)
            return;
        }
        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile)

            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
            }
        }
        toast.success("Create question and answer success")
        setQuestions(initQuestion);
    }
    return (
        <div className="question-container">
            <div className="manage-question">
                <div className="title">Manage Question</div>
                <hr />
                <div className="add-new-quesstion">
                    <div className="col-6 form-group">
                        <div className="mb-2">
                            <label>Select Quiz</label>
                        </div>
                        <Select
                            defaultValue={selectedQuiz}
                            onChange={setSelectedQuiz}
                            options={listQuiz}
                        />
                    </div>
                    <div className="mt-3 mb-2">Add Question:</div>
                    <div>
                        {questions && questions.length > 0 ? (
                            questions.map((question, index) => (
                                <div key={question.id} className="q-main mb-5">
                                    <div className="question-content">
                                        <div className="form-floating description">
                                            <input
                                                value={question.description}
                                                type="text"
                                                className="form-control"
                                                id="floatingInput"
                                                placeholder=""
                                                onChange={(event) =>
                                                    handleOnChange('QUESTION', question.id, event.target.value)
                                                }
                                            />
                                            <label>Question {index + 1}'s Description</label>
                                        </div>
                                        <div className="group-upload">
                                            <label className="label-upload" htmlFor={`${question.id}`}>
                                                <span>
                                                    <BsFillImageFill />
                                                </span>
                                                {' '}
                                            </label>
                                            <input
                                                type="file"
                                                id={`${question.id}`} // Associate the label and input with the same id
                                                onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                                className="file-input"
                                            />
                                            <span  >{question.imageName ? <span
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handlePreViewImage(question.id)}>{question.imageName}</span>
                                                : '0 files uploaded'}</span>
                                        </div>
                                        <div className="btn-add">
                                            <span onClick={() => HandleAddRemoveQuestion('ADD')}>
                                                <AiFillPlusSquare className="icon-add" />
                                            </span>
                                            {questions.length > 1 && (
                                                <span onClick={() => HandleAddRemoveQuestion('REMOVE', question.id)}>
                                                    <AiFillMinusSquare className="icon-remove" />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {
                                        question.answers && question.answers.length > 0 ? (
                                            question.answers.map((answer, i) => (
                                                <div key={answer.id} className="answer-content">
                                                    <input className="form-check-input iscorrect"
                                                        checked={answer.isCorrect}
                                                        type="checkbox"
                                                        onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)} />
                                                    <div className="form-floating answer-name">
                                                        <input
                                                            value={answer.description}
                                                            type="text"
                                                            className="form-control"

                                                            onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)}
                                                        />
                                                        <label>Answer {i + 1}</label>
                                                    </div>
                                                    <div className="btn-group">
                                                        <span onClick={() => HandleAddRemoveAnswer('ADD', question.id)}>
                                                            <AiFillPlusSquare className="icon-add" />
                                                        </span>
                                                        {question.answers.length > 1 && (
                                                            <span
                                                                onClick={() =>
                                                                    HandleAddRemoveAnswer('REMOVE', question.id, answer.id)
                                                                }
                                                            >
                                                                <AiFillMinusSquare className="icon-remove" />
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : null
                                    }
                                </div>

                            ))

                        ) : null}
                        {questions && questions.length > 0
                            && <div>
                                <button className='btn btn-warning' onClick={() => handleQuestionForQuiz()}>
                                    Save Question
                                </button>
                            </div>

                        }
                        {isPreviewImage === true && <Lightbox
                            image={dataImage.url} //tao 1 duong link payload de xem duoc 
                            title={dataImage.title}
                            onClose={() => setIsPreviewImage(false)}
                        ></Lightbox>}
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Questions;
