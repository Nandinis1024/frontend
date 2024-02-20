import { useEffect } from "react";
import "./Success.css";


function Success() {
  
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
          paymentStatus: "success",
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
      <img src="/Success-PNG-HD.png" alt="Success" className="success-image" />
      <h2 className="success-message">Congratulations! Your payment was successful.</h2>
    </div>
  );
}

export default Success;
