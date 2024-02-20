import React from "react";
import "./ProductCard.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayUserFeatures from "./DisplayUserFeatures";
import {loadStripe} from '@stripe/stripe-js';




function ProductUserCard({ product, productPrice, productValidity, maxAbsoluteDiscount}) {
    const navigate = useNavigate();
    const initialDesc = product.productDescription.substr(0, 200) + ".... ";
    const [description, setDescription] = useState(initialDesc);
    const [isExpanded, setIsExpanded] = useState(false);
    const [featuresIdToTitle, setFeaturesIdToTitle] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState("bg-white");
    
    const handleBuy = async () => {
        const stripe = await loadStripe("pk_test_51OkvUsSIy7xLF6FWwz748UvcGqqj4LFcbxzLPllHj5BS6zyuVwnSeTJ7bGHM9VVRLE5XPGTq6dGCY8rAMxV0noWD00C2ktRzz9");
        
        const body = {
            quantity: 1,
            productPrice: productPrice,
            productName:  product.productName,
        };
        const headers = {
            "Content-Type": "application/json",
        };
        const response = await fetch("http://localhost:4000/v1/products/createCheckoutSession", {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });
        const session = await response.json();
        
        const orderDetails = {
            "userEmail": localStorage.getItem("email"),
            "productId": product._id,
            "paymentId": session.id
        }
        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));


        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
        localStorage.setItem("result", JSON.stringify(result));
        console.log(result);
        }
        
    
    


    useEffect(() => {
        const getFeatures = async () => {
            const response = await fetch("http://localhost:4000/v1/features/getFeatures");
            const data = await response.json();
            console.log(data);
            const features = {};
            data.forEach((feature) => {
                features[feature._id] = feature.title;
            });
            setFeaturesIdToTitle(features);
        }
        getFeatures();
    }, []);

    // Check if the product is visible and not inactive
    const productFeatures = product.features[0];
    
    if (!product.isInactive && product.isVisibleOnUi) {
        
        const handleDescriptionToggle = () => {
            setIsExpanded(!isExpanded);
        };

        return (
<div id="card" className={`card ${backgroundColor}`}>
    <div className="flex gap-1">
        <div className="course-info flex-1 flex flex-col justify-between gap-4">
            <div className="course-details">
                <h1 className="text-3xl">{product.productName}</h1>
                <div className="flex flex-row">
                <h4 className="course-price">₹{productPrice}</h4>
                {maxAbsoluteDiscount> 0 &&
                    <h3 className="text-yellow-600">+ {maxAbsoluteDiscount}%OFF</h3>
                }
                </div>
                <h1 className="text-red-400 text-2xl mb-4">Validity: {productValidity}</h1>
            </div>
            <div className="description text-gray-700">
                {isExpanded ? product.productDescription : description}
                <span className="read-more" onClick={handleDescriptionToggle}>
                    {isExpanded ? "show less" : "read more"}
                </span>
            </div>
        </div>
        <div className="features">
            <DisplayUserFeatures productFeatures={productFeatures} productFeaturesIdToTitle={featuresIdToTitle}/>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <button className="btn-red" onClick={handleBuy}>Buy Now</button>
    </div>
</div>


        );
    }
}

export default ProductUserCard;