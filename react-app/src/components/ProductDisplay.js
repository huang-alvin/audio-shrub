import React, { useState, useEffect } from "react";
import "./CSS/ProductDisplay.css";

const ProductDisplay = ({ post }) => {
  return (
    <section className="product-display">
      <div className="product">
        <img
          // src="https://i.imgur.com/EHyR2nP.png"
          src={post.image}
          alt={post.title}
          className="product-image"
        />
        <div className="product-description">
          <h3>{post.title}</h3>
          {post.by ? <h3>ALBUM</h3> : <h3>MERCH</h3>}
          {parseInt(post.price) > 0 ? (
            <h5>${post.price.toFixed(2)}</h5>
          ) : (
            <h5>FREE</h5>
          )}
        </div>
      </div>
      <form action="/api/purchase/create-checkout-session" method="POST">
        <button type="submit" id="checkout-button">
          Checkout
        </button>
      </form>
    </section>
  );
};
export default ProductDisplay;
const Message = ({ message }) => (
  <section>
    <p className="product-message">{message}</p>
  </section>
);
// export default function App() {
//   const [message, setMessage] = useState("");
//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);
//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }
//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);
//   return message ? <Message message={message} /> : <ProductDisplay />;
// }
