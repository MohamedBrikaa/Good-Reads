import React from "react";
import Tables from "./table/Tables";
import "./Books.css";
import ReactPaginate from "react-paginate";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
const SERVER_URL = "http://localhost:5000";
//import ReactPaginate from "react-paginate";
const token = sessionStorage.getItem("userToken");
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelveState: "all",
      books: [],
      postData: [],
      perPage: 10,
      currentPage: 1,
      booksChanges: false,
      offset: 0,
      tableTitle: "All Books",
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  receivedData() {
    //data
    axios
      .get(`${SERVER_URL}/books/` + token + "/" + this.state.shelveState)
      .then((res) => {
        // console.log("data received at books ==>", res.data.books);
        const books = res.data.books;
        //console.log("Received data assigned: ==> ", books);
        //console.log(this.state.offset);
        const slice = books.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
        this.postData = slice;
        this.setState({ postData: books });
        //console.log("Received data  sliced ==>", this.postData);

        this.setState({
          pageCount: Math.ceil(res.data.dataLength / this.state.perPage),
        });
      });
  }
  componentDidMount() {
    this.receivedData();
  }
  handlePageClick = (e) => {
    console.log("hi");
    const selectedPage = e.selected;
    this.setState(
      {
        currentPage: selectedPage,
      },
      () => {
        axios
          .get(
            `${SERVER_URL}/books/${token}/${this.state.shelveState}/?page=` +
              parseInt(selectedPage) +
              1
          )
          .then((res) => {
            const books = res.data.books;

            this.postData = books;
            this.setState({ postData: books });
          });
      }
    );
  };
  render() {
    return (
      <div className='BooksContainer'>
        <div className='sideBarContainer'>
          <ul onClick={(e) => console.log(e.target)}>
            <ul className='readingProgressSwitch'>
              <Link onClick={this.renderAll}>All Books</Link>
            </ul>
            <ul className='readingProgressSwitch'>
              <Link onClick={this.renderCurrent}>Currently Reading</Link>
            </ul>
            <ul className='readingProgressSwitch'>
              <Link onClick={this.renderRead}>Read Books</Link>
            </ul>
            <ul className='readingProgressSwitch'>
              <Link onClick={this.renderWant}>Want to Read</Link>
            </ul>
          </ul>
        </div>
        <div>
          <hr />
        </div>

        <div className='tableContainer'>
          <Tables
            booksChanges={this.state.booksChanges}
            books={this.state.books}
            postData={this.state.postData}
            tableTitle={this.state.tableTitle}
          />
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            // breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            //subContainerClassName={"pages-pagination"}
            activeClassName={"active"}
            //previousClassName={"pagination-span"}
            pageClassName={"pagePaginate"}
          />
        </div>
      </div>
    );
  }
  renderAll = (e) => {
    this.state.shelveState = "all";
    this.state.tableTitle = " All Books ";
    this.receivedData();
  };
  renderCurrent = (e) => {
    this.state.shelveState = "Currently Reading";
    this.state.tableTitle = " Currently Reading ";
    this.receivedData();
  };
  renderRead = (e) => {
    this.state.shelveState = "Read";
    this.state.tableTitle = " Read ";
    this.receivedData();
  };
  renderWant = (e) => {
    this.state.shelveState = "Want To Read";
    this.state.tableTitle = " Want To Read ";
    this.receivedData();
  };
}
