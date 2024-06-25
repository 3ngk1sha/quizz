import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './Component/User/User';
import Admin from './Component/Admin/Admin';
import HomPage from './Component/Home/HomePage';
import ManageUser from './Component/Admin/Content/ManageUser';
import DashBoard from './Component/Admin/Content/DashBoard';
import Login from './Component/Auth/Login';
import App from './App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./Component/Auth/Register";
import ListQuiz from "./Component/User/ListQuiz";
import DetailQuiz from "./Component/User/DetailQuiz";
import ManageQuiz from "./Component/Admin/Content/Quiz/ManageQuiz";
import Question from "./Component/User/Question";
import Questions from "./Component/Admin/Content/Question/Question";
const NotFound = () => {
    return (
        <div className="container mt-3 alert alert-danger">
            404.Not found data with current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<HomPage />} />
                    <Route path='users' element={<ListQuiz />} />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='/admins' element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<Questions />}></Route>
                </Route>
                <Route path='/login' element={<Login />} ></Route>
                <Route path='/register' element={<Register />} ></Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default Layout;