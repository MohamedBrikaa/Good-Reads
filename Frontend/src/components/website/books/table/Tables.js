import React from "react";
import "./Tables.css";
import ReactStars from "react-stars";
import axios from "axios";
const SERVER_URL = "http://localhost:5000";
const options = [
  { id: 1, value: "Read", label: "Read" },
  { id: 2, value: "Reading", label: "Reading" },
  { id: 3, value: "want to read", label: "want to read" },
];
const token = sessionStorage.getItem("userToken");
let userRating = 0;

export default class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      postData: [],
      perPage: 10,
      currentPage: 1,
      // selectedPage: 0,
      booksChanges: false,
      offset: 0,
    };
    //this.handlePageClick = this.handlePageClick.bind(this);
    this.state.books = props.books;
    this.state.postData = props.postData;
    console.log("prpos post", this.state.postData);
    console.log("Books are here !!", this.state.books);
  }

  render() {
    return (
      <div>
        <h1 className='readingProgress'>{this.props.tableTitle}</h1>
        <table id='books'>
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>{" "}
      </div>
    );
  }

  renderTableData() {
    const { postData } = this.props;
    return postData.map((book, index) => {
      userRating = book.myRating;
      const token = sessionStorage.getItem("userToken");

      const {
        _id,
        bookImage,
        name,
        author,
        totalRatingValue,
        totalRatingCount,
      } = book.book.book; //destructuring
      const { myRating, myShelve } = book;
      //   console.log(book);

      //console.log(shelve);
      return (
        <tr key={_id}>
          <td>{index + 1}</td>
          <td><a href={`${SERVER_URL}/${bookImage}`} target="_blank">
            <img
              src={`${SERVER_URL}/${bookImage}`}
              style={{ width: 50, height: 50 }}
              alt={name}
            />
            </a>
          </td>
          <td>
            <a href={`http://localhost:3000/books/${_id}`}>{name}</a>
          </td>
          <td>
            {author.firstName} {author.lastName}
          </td>

          <td>
              <ReactStars
                count={5}
                edit={false}
                size={20}
                color1={"grey"}
                color2={"yellow"}
                value={totalRatingValue / totalRatingCount}
              />
          </td>

          <td onClick={(e) => console.log(e.target)}>
            <ReactStars
              count={5}
              edit={true}
              onChange={(e) => handleRatingChange(e, _id)}
              size={20}
              color1={"grey"}
              color2={"yellow"}
              value={myRating}
            />
          </td>
          <td>
            <select onChange={(e) => handleSelectChange(e, _id)}>
              <option value='' selected={myShelve === ""}></option>/>
              <option value='Read' selected={myShelve === "Read"}>
                Read
              </option>
              />
              <option
                value='Want To Read'
                selected={myShelve === "Want To Read"}
              >
                Want To Read
              </option>
              />
              <option
                value='Currently Reading'
                selected={myShelve === "Currently Reading"}
              >
                Currently Reading
              </option>
              />
            </select>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    return (
      <tr>
        <th>No.</th>
        <th>cover</th>
        <th>Name</th>
        <th>Author</th>
        <th>Avg Rate</th>
        <th>Rating</th>
        <th>shelve</th>
      </tr>
    );
    //});
  }
}
const handleRatingChange = (e, bookId) => {
  const token = sessionStorage.getItem("userToken");
  console.log(bookId);
  console.log(e);
  userRating = e;
  console.log(userRating);
  axios
    .post("http://localhost:5000/ratings/" + token, {
      value: userRating,
      bookId,
    })
    .then((res) => {
      console.log("success", res.data);
    })
    .catch(function (error) {
      console.log("failed", error);
    });
};
const handleSelectChange = (e, bookId) => {
  console.log(bookId);
  const value = e.target.value;
  console.log(value);
  const token = sessionStorage.getItem("userToken");
  console.log(token);
  axios
    .post("http://localhost:5000/shelve/" + token, {
      state: value,
      bookId,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(" failed to post the shelve state", error);
    });
};
