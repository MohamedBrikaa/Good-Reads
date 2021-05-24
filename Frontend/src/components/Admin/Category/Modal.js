import React from 'react';
import axios from 'axios';



function Modal({ setCategoryList, categoryList, catName, setCatName, modalState, editedItemId }) {    
    return (<React.Fragment>
        <div class="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{modalState === "add" ? "Add New Category" : "Edit Category"}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={e=>e.preventDefault()}>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Category:</label>
                                <input type="text" class="form-control" id="recipient-name" onChange={e => setCatName(e.target.value)} value={catName} required/>
                            </div>
                        </form>
                    </div>
                    <ConfirmationBtn
                        categoryList={categoryList} setCategoryList={setCategoryList}
                        catName={catName} modalState={modalState} editedItemId={editedItemId}
                    ></ConfirmationBtn>
                </div>
            </div>
        </div>
    </React.Fragment>)
}



function ConfirmationBtn({ categoryList, setCategoryList, catName, modalState, editedItemId }) {
    return (<div class="modal-footer " >
        <button type="button" onClick={(e) => {
            e.preventDefault()
            if (catName) {
                if (modalState === "add") { //Add New Category
                    axios.post(`http://localhost:5000/categories`, { catName: catName })
                        .then(res => {
                            if (res.status === 200) {
                                setCategoryList([...categoryList, res.data])
                            } else {
                                alert("Erorr! Category Name Exist")
                            }
                        })
                } else {    //Edit Category
                    axios.patch(`http://localhost:5000/categories/${editedItemId}`, { catName: catName })
                        .then(res => {
                            if (res.status === 200) {
                                setCategoryList(categoryList.map(item => {
                                return item._id == editedItemId ? res.data : item
                                }));
                            } else {
                                alert("Erorr! Category Name Exist")
                            }
                        })
                }
            } else {
                alert("Name Can't be Empty")
            }
        }}
            class="btn btn-primary " data-dismiss="modal" style={{ margin: "auto" }}>{modalState === "add" ? "Add Category" : "Edit"}</button>
    </div>)
}
export default Modal