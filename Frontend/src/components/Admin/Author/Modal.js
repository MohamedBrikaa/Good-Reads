import React from 'react';
import axios from 'axios'

const SERVER_URL = "http://localhost:5000";

function Modal({ setAuthorList, authorList, modalState, editedItemId, editedFirstName, setEditedFirstName,editedLastName, setEditedLastName, editedPhoto, seteditedPhoto, editedDob, setEditedDob,editedDetails,seteditedDetails }) {
   
   return (<React.Fragment>
        <div class="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{modalState === "add" ? "Add New Author" : "Edit Author"}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <Form
                            authorList={authorList} setAuthorList={setAuthorList}
                            modalState={modalState} editedItemId={editedItemId}
                            editedFirstName={editedFirstName} setEditedFirstName={setEditedFirstName}
                            editedLastName={editedLastName} setEditedLastName={setEditedLastName}
                            editedPhoto={editedPhoto} seteditedPhoto={seteditedPhoto}
                            editedDob={editedDob} setEditedDob={setEditedDob}
                            editedDetails={editedDetails} seteditedDetails={seteditedDetails}
                        ></Form>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>)
}

function Form(props) {
    const { authorList, setAuthorList, modalState, editedItemId,
        editedFirstName, setEditedFirstName, editedLastName, setEditedLastName,
        editedPhoto, seteditedPhoto, editedDob, setEditedDob, editedDetails, seteditedDetails} = props

    return <form method="POST" >
        <div class="form-group">
            <label for="recipient-name" class="col-form-label font-weight-bold">*First Name:</label>
            <input type="text" class="form-control" id="first-name" value={editedFirstName} onChange={e => setEditedFirstName(e.target.value)} />

            <label for="recipient-name" class="col-form-label font-weight-bold">*Last Name:</label>
            <input type="text" class="form-control" id="last-name" value={editedLastName} onChange={e => setEditedLastName(e.target.value)} />

            <label for="recipient-name" class="col-form-label font-weight-bold">*Date Of Birth:</label>
            <input type="date" class="form-control" id="dob" value={editedDob} onChange={e => setEditedDob(e.target.value)} />

            <label for="authorImage" class="col-form-label font-weight-bold">*Author Image:</label>
            <input type="file" class="form-control" id="authorImage" name="authorImage" onChange={(e) => seteditedPhoto(e.target.files[0])} />
            
            <label for="recipient-name" class="col-form-label font-weight-bold">Details:</label>
            <input type="text" class="form-control" id="first-name" value={editedDetails} onChange={e => seteditedDetails(e.target.value)} />

            <div class="modal-footer " >
                <button type="submit"
                    onClick={() => {
                        let formData = new FormData()
                        formData.append("firstName", editedFirstName)
                        formData.append("lastName", editedLastName)
                        formData.append("dob", editedDob)
                        formData.append("details", editedDetails)
                        formData.append("authorImage", editedPhoto)
                        if (modalState === "add") {
                            if (editedFirstName && editedLastName && editedDob && editedPhoto) {
                                axios.post(`${SERVER_URL}/authors`, formData, {})
                                    .then(res => {
                                        setAuthorList([...authorList, res.data])
                                    })
                            } else {
                                alert("Please Fill All Fields")
                            }
                        } else { //edit Author
                            if (editedFirstName && editedLastName && editedDob) {
                                axios.patch(`${SERVER_URL}/authors/${editedItemId}`, formData)
                                    .then(res => {
                                        if (res.status === 200) {
                                            setAuthorList(authorList.map(item => {
                                                return item._id == editedItemId ? res.data : item
                                            }));
                                        } else {
                                            alert("Database Erorr!")
                                        }
                                    })
                            } else {
                                alert("Please Fill All Fields")
                            }
                        }
                    }
                    }
                    class="btn btn-primary " data-dismiss="modal" style={{ margin: "auto" }}>{modalState === "add" ? "Add Author" : "Edit"}</button>
            </div>
        </div>
    </form >
}

export default Modal