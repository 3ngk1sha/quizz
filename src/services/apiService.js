import axios from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}
const getAllUser = () => {
    return axios.get('api/v1/participant/all');
}
const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id)
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`,);
}
const postLogin = (userEmail, userPassword) => {
    return axios.post(`/api/v1/login`, { email: userEmail, password: userPassword, delay: 3000 })
}
const postRegister = (email, password, username) => {
    return axios.post(`/api/v1/register`, { email, password, username })
}
const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant')
}
const getDataQuiz = (quizId) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`)
}
const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data })
}
const postCreatNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post(`/api/v1/quiz`, data)
}
const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`)
}
const putUpdateQuiz = (id, name, description, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id)
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.put('/api/v1/quiz', data);
}
const deleteQuiz = (quizId) => {
    return axios.delete(`/api/v1/quiz/${quizId}`, quizId);
}
const postCreateNewQuestionForQuiz = (id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', id)
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {

    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}
const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}
const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}
export {
    postCreateNewAnswerForQuestion, postCreateNewUser, getAllUser,
    putUpdateUser, deleteUser, getUserWithPaginate, postLogin,
    postRegister, getQuizByUser, getDataQuiz, postSubmitQuiz,
    postCreatNewQuiz, getAllQuizForAdmin, putUpdateQuiz, deleteQuiz,
    postCreateNewQuestionForQuiz, postAssignQuiz, getQuizWithQA
}