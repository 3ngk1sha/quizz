import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUser, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
const AssignQuiz = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState([]);
    const [listUser, setListUser] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [listQuiz, setListQuiz] = useState();
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })

            setListQuiz(newQuiz)
        }
    }
    const fetchUser = async () => {
        let res = await getAllUser();
        console.log(res);
        if (res && res.EC === 0) {
            let user = res.DT.map(item => {
                return {
                    value: item.id,
                    label: ` ${item.id} -${item.username} -${item.email}`
                }
            })

            setListUser(user)
        }
    }
    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            // setSelectedQuiz({});
            // setSelectedUser({});
        } else toast.error(res.EM);
    }
    return (
        <div className="assign-quiz-container row">
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
            <div className="col-6 form-group">
                <div className="mb-2">
                    <label>Select User</label>
                </div>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button className='btn btn-warning mt-3 '
                    onClick={() => handleAssign()}
                >Assigns</button>
            </div>
        </div>
    )
}
export default AssignQuiz
