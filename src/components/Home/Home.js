import React, { useEffect, useState } from "react";
import Nilkhet from "../../images/Nilkhet.jfif";
import "./Home.css";
import BookCart from "../BookCart/BookCart";
import { CircularProgress } from "@material-ui/core";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
const Home = () => {
  const [book, setBook] = useState([]);
  useEffect(() => {
    fetch("https://quiet-springs-03889.herokuapp.com/events")
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, []);
  console.log(book);
  return (
    <>
      <Header></Header>
      <div
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${Nilkhet})`,
        }}
        className="background"
      >
        <div className="container allBook">
          {book.length === 0 && (
            <CircularProgress className="text-center mt-5" />
          )}
          {book.map((book) => (
            <BookCart key={book._id} book={book}></BookCart>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
