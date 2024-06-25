import ModalCreateUser from "./ModalCreateUser"
import './Manage.scss';
import { FcPlus } from 'react-icons/fc'
import { useState } from 'react';
import TableUser from "./TableUser";
import { useEffect } from "react"
import { getAllUser } from "../../../services/apiService"
import { getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPageginate";
const ManageUser = (props) => {
    const LIMIT_USER = 3;
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [listUser, setListUser] = useState([])
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // useEffect(() => {
    //     console.log('run use effect')
    // })
    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1)
    }, [])
    const fetchListUser = async () => {
        let res = await getAllUser();
        console.log(res);
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        console.log(res);
        if (res.EC === 0) {
            console.log('check res', res.DT)
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }
    const testFunction = async () => {
        let res = await getAllUser();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const handleClickButtonUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
        //console.log('update user', user);
    }
    const handleClickButtonView = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
        //console.log('update user', user);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const handleBtnDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        console.log('check data delete', user)
        setDataDelete(user);
        //console.log('update user', user);
    }
    //console.log('data update')
    return (
        < div className="manage-user-container" >
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="btn-addnew">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)} > <FcPlus /> Add new user</button>
                </div>
                <div className="table-users-cointainer">
                    {/* <TableUser
                        listUser={listUser}
                        handleClickButtonUpdate={handleClickButtonUpdate}
                        handleClickButtonView={handleClickButtonView}
                        handleBtnDeleteUser={handleBtnDeleteUser}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickButtonUpdate={handleClickButtonUpdate}
                        handleClickButtonView={handleClickButtonView}
                        handleBtnDeleteUser={handleBtnDeleteUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}

                    />
                </div>
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                testFunction={testFunction}
                fetchListUser={fetchListUser}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                fetchListUser={fetchListUser}
                resetUpdateData={resetUpdateData}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalViewUser
                show={showModalViewUser}
                setShow={setShowModalViewUser}
                fetchListUser={fetchListUser}
                dataView={dataView}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDelete={dataDelete}
                fetchListUser={fetchListUser}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div >
    )
}
export default ManageUser