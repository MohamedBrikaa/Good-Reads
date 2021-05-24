import React, { Component } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './Categories.css'
import bg from '../../assests/bg.png'
import { Link } from 'react-router-dom'
export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: [],
            data: [],
            perPage: 10,

            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    receivedData() {
        axios
            .get(`http://localhost:5000/categories`)
            .then(res => {

                const data = res.data.cats;
                console.log(data,"dd",res.data.page)
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                 this.state.postData = slice
                 this.setState({postData:data})
       
                this.setState({
                    pageCount: Math.ceil(res.data.dataLength / this.state.perPage),
                })
            
        });
            
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        this.setState({
            currentPage: selectedPage,
          
        }, () => {
            axios
            .get(`http://localhost:5000/categories/?page=`+selectedPage+1)
            .then(res => {

                const data = res.data.cats;
                this.state.postData = data
                this.setState({postData:data})
            })
        });


    };

    componentDidMount() {
        this.receivedData()
    }
    render() { const {postData}=this.state
        return (
            <div class="mb-5">
                <div class="row  m-5 d-flex justify-content-around text-center">
                {
                postData.map((category, index) =>
                <div key={index} class="card bg-info mb-3 p-3 " style={{ width: 300 }}>

      <Link  class=" text-white  font-italic mt-3 " style={{fontSize:25,textDecoration:"none" }} to={"/categories/" + category._id}>{category.catName}</Link>
  
    </div>
                 ) }
                </div>
                <div class=" d-flex justify-content-center mt-5">
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
                <img class ="col-12"src={bg}/>
            </div>
            

        )
    }
}