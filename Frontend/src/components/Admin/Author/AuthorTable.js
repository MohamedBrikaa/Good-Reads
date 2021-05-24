import React from 'react';
import { useState, useEffect } from 'react';
import "../Table.css"
import Modal from "./Modal"
import axios from 'axios'
import AdminNav from "../AdminNav/AdminNav"

const SERVER_URL = "http://localhost:5000";
function BookTable() {
    let i = 0;
    const [authorList, setAuthorList] = useState([])
    const [editedItemId, setEditedItemId] = useState()
    const [modalState, setModalState] = useState("add")
    const [editedFirstName, setEditedFirstName] = useState("")
    const [editedDetails, seteditedDetails] = useState("")
    const [editedLastName, setEditedLastName] = useState("")
    const [editedPhoto, seteditedPhoto] = useState("")
    const [editedDob, setEditedDob] = useState({})

    useEffect(() => {
        fetchData(`${SERVER_URL}/authors/all`, setAuthorList)
    }, [])
    return <div class="mt-5 text-center"><AdminNav />
        <button class="btn" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => {
            setEditedFirstName("")
            setEditedLastName("")
            seteditedPhoto("")
            setEditedDob("")
            seteditedDetails("")
            setModalState("add")
        }}><i class="fa fa-plus"></i></button>
        <Modal
            authorList={authorList} setAuthorList={setAuthorList}
            modalState={modalState} editedItemId={editedItemId}
            editedFirstName={editedFirstName} setEditedFirstName={setEditedFirstName}
            editedLastName={editedLastName} setEditedLastName={setEditedLastName}
            editedPhoto={editedPhoto} seteditedPhoto={seteditedPhoto}
            editedDob={editedDob} setEditedDob={setEditedDob}
            editedDetails={editedDetails} seteditedDetails={seteditedDetails}
        />
        <table class="table mt-2 table-striped" >
            <thead class="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Photo</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Date Of Birth</th>
                    <th scope="col">Details</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    authorList.map((author) => {
                        i++;
                        return <TarbleRow index={i}
                            author={author}
                            authorList={authorList} setAuthorList={setAuthorList}
                            setEditedItemId={setEditedItemId} setModalState={setModalState}
                            setEditedFirstName={setEditedFirstName} setEditedLastName={setEditedLastName}
                            seteditedPhoto={seteditedPhoto} setEditedDob={setEditedDob} seteditedDetails={seteditedDetails}
                        ></TarbleRow>
                    })
                }
            </tbody>
        </table>
    </div>
}

function TarbleRow({ index, author, authorList, setAuthorList,setModalState, setEditedItemId, setEditedFirstName, setEditedLastName,seteditedPhoto, setEditedDob, seteditedDetails }) {
    const date = author.dob.substring(0, 10);
    return (<tr>
        <th scope="row">{index}</th>
        <td>
            <a href={`${SERVER_URL}/${author.authorImage}`} target="_blank">
                <img src={`${SERVER_URL}/${author.authorImage}`} alt={author.firstName} style={{ width: "70px", height: "70px",borderRadius:"50%" }} />
            </a>
        </td>
        <td>{author.firstName}</td>
        <td>{author.lastName}</td>
        <td>{date}</td>
        <td>{author.details?author.details:""}</td>  
        <td>
            <EditBtn author={author} authorList={authorList}
                setModalState={setModalState} setEditedItemId={setEditedItemId}
                setEditedFirstName={setEditedFirstName} setEditedLastName={setEditedLastName}
                seteditedPhoto={seteditedPhoto} setEditedDob={setEditedDob} seteditedDetails={seteditedDetails}
            ></EditBtn>
            <DeleteBtn author={author} setAuthorList={setAuthorList} authorList={authorList}></DeleteBtn>
        </td>
    </tr>
    )
}

const EditBtn = ({ author, authorList, setModalState, setEditedItemId,
    setEditedFirstName, setEditedLastName, seteditedPhoto, setEditedDob,seteditedDetails }) => {
    return <button class="btn" value={author._id}  >
        <i data-toggle="modal" data-target=".bd-example-modal-lg" class="fa fa-edit" onClick={(event) => {
            const editedId = event.target.parentElement.value
            setEditedItemId(editedId);
            let editedItem = authorList.filter(item => editedId == item._id)[0]
            setEditedFirstName(editedItem.firstName)
            setEditedLastName(editedItem.lastName)
            seteditedPhoto(editedItem.authorImage)
            seteditedDetails(editedItem.details)
            setEditedDob(editedItem.dob.substring(0, 10))
            setModalState("edit")
        }}></i></button>
}

const DeleteBtn = ({ author, setAuthorList, authorList }) => {
    return <button class="btn" value={author._id} >
        <i class="fa fa-trash" onClick={(event) => {
            const deletedId = event.target.parentElement.value;
            if (window.confirm("Are You Sure!")) {
                axios.delete(`${SERVER_URL}/authors/${deletedId}`).then(res => {
                    if (res.status === 200) {
                        setAuthorList(() => {
                            return authorList.filter(item => deletedId != item._id)
                        })
                    }
                })
            }
        }}></i></button>
}

async function fetchData(url, setList) {
    let response = await fetch(url)
    let data = await response.json();
    setList(data);
}
export default BookTable