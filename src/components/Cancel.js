import "./Cancel.css";
import { useEffect } from "react";


function Cancel() {

  useEffect(() => {
    const generateOrderHistory = async () => {
      const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
      const response = await fetch("http://localhost:4000/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: orderDetails.userEmail,
          productId: orderDetails.productId,
          paymentId: orderDetails.paymentId,
          paymentStatus: "failed",
        }),
      });
      const data = await response.json();
      console.log(data);
      localStorage.removeItem("orderDetails");
    }
    generateOrderHistory();
  }, []);
  
  return (
    <div className="success-container">
      <img src="/Cancel.png" alt="Success" className="success-image" />
      <h2 className="cancel-message">Oops! Your payment failed.</h2>
    </div>
  );
}

export default Cancel;