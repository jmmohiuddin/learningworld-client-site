import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Orders from "../Orders/Orders";
import Header from "../Header/Header";
import "./Book.css";
const Book = () => {
  const { bookId } = useParams();
  const [events, setEvents] = useState([]);
  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => {
    const orderDetails = {
      shipment: data,
      ...loggedInUser,
      orderTime: new Date(),
    };
    fetch("https://quiet-springs-03889.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("order placed successfully");
        }
      });
  };
  const [book, setBook] = useState([]);
  useEffect(() => {
    fetch("https://quiet-springs-03889.herokuapp.com/events")
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, []);
  const books = book?.find((book) => book?._id === bookId);
  useEffect(() => {
    fetch(
      "https://quiet-springs-03889.herokuapp.com/orders?email=" +
        loggedInUser.email
    )
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  console.log(loggedInUser);
  return (
    <>
      <Header></Header>
      {newUser ? (
        <Orders></Orders>
      ) : (
        <section className="bookingContainer container-md">
          <div className="bookDetailsContainer">
            <h3>Checkout</h3>
            <button
              className="btn btn-primary mb-3"
              onClick={() => setNewUser(!newUser)}
            >
              View Order
            </button>
            <div class="row">
              <input
                readOnly
                type="text"
                className="col-4 text-center"
                defaultValue="Name"
              />
              <input
                readOnly
                type="text"
                className="col-4 text-center"
                defaultValue="Quantity"
              />
              <input
                readOnly
                type="text"
                className="col-4 text-center"
                defaultValue="Price"
              />
            </div>
            <form className="ship-form row" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="d-none"
                name="id"
                defaultValue={books?._id}
                ref={register({ required: true })}
                placeholder="book cost"
              />
              <input
                className=" col-4 text-center"
                readOnly
                name="bookName"
                defaultValue={books?.AddEvents?.name}
                ref={register({ required: true })}
              />{" "}
              <input
                className="  col-4 text-center"
                readOnly
                name="quantity"
                defaultValue={1}
                ref={register({ required: true })}
                placeholder="book cost"
              />{" "}
              <input
                className=" col-4 text-center"
                readOnly
                name="cost"
                defaultValue={books?.AddEvents?.cost}
                ref={register({ required: true })}
                placeholder="book cost"
              />
              <input
                type="submit"
                value="Checkout"
                className="btn btn-primary submit mt-3"
              />
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Book;
