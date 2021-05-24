import React from 'react';


const EditBtn = ({ category, setCategoryList, categoryList, setCatName, setModalState, setEditedItemId }) => {
    return <button class="btn" value={category._id}  >
        <i data-toggle="modal" data-target=".bd-example-modal-lg" class="fa fa-edit" onClick={(event) => {
            const editedId = event.target.parentElement.value
            setEditedItemId(editedId);
            let editedItem = categoryList.filter(item => editedId == item._id)[0]
            setCatName(editedItem.catName)
            setModalState("edit")
        }}></i></button>
}
export default EditBtn