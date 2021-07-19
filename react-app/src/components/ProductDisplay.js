import React from "react";
import { useSelector } from "react-redux";
import "./CSS/ProductDisplay.css";

const ProductDisplay = ({ post }) => {
  // CORS wouldn't accept fetch req, even with CORS already set up. Also, random json serialize err
  //  json works just not with
  // const handleSubmit = async () => {
  //   await fetch("/api/purchase/create-checkout-session", {
  //     method: "POST",
  //     header: { "Content-Type": "application/json" },
  //     // body: JSON.stringify(post),
  //   });
  // };
  const sessionUserId = useSelector((state) => state.session.user.id);

  const type = post.by ? "music" : "merch";
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
        <input hidden name="title" value={post.title} />
        <input hidden name="image" value={post.image} />
        <input hidden name="type" value={type} />
        <input hidden name="postId" value={post.id} />
        <input hidden name="userId" value={sessionUserId} />
        <input hidden name="ownerId" value={post.user_id} />
        <button
          type="submit"
          id="checkout-button"
          // onClick={handleSubmit}
        >
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
