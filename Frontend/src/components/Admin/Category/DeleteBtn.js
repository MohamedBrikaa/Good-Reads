import React from 'react';
import axios from 'axios';

const DeleteBtn = ({ category, setCategoryList, categoryList }) => {
    return <button class="btn" value={category._id} >
        <i class="fa fa-trash" onClick={(event) => {
            const deletedId = event.target.parentElement.value;
            if (window.confirm("Are You Sure!")) {
                axios.delete(`http://localhost:5000/categories/${deletedId}`).then(res => {
                        if (res.status === 200) {
                            setCategoryList(() => {
                                return categoryList.filter(item => deletedId != item._id)
                            })
                        }
                    })
            }
        }}></i></button>
}
export default DeleteBtn