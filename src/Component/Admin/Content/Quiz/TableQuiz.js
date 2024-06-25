
import { useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
const TableQuiz = (props) => {
    const { listQuiz } = props
    return (
        <>
            <div >List Quizzes</div>
            <table className="table table-hover table-bordered  my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {listQuiz && listQuiz.map((item, index) => {
                    return (
                        <tr key={`table-quiz-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.difficulty}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <button className="btn btn-warning" onClick={() => props.handleUpdateQuiz(item)}>Edit</button>
                                    <button className="btn btn-danger " onClick={() => props.handleDeleteQuiz(item)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}
export default TableQuiz;