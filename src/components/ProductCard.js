import React from "react";
import "./ProductCard.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayFeatures from "./DisplayFeatures";



function ProductCard({ product, productPrice, productValidity, maxAbsoluteDiscount}) {
    const navigate = useNavigate();
    const initialDesc = product.productDescription.substr(0, 200) + ".... ";
    const [description, setDescription] = useState(initialDesc);
    const [isExpanded, setIsExpanded] = useState(false);
    const [featuresIdToTitle, setFeaturesIdToTitle] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState("bg-white");
    
    console.log(maxAbsoluteDiscount)

    
        const handleDelete = async () => {
            try {
                const response = await fetch(`http://localhost:4000/v1/products/deleteProduct/${product._id}`, {
                    method: 'PATCH',
                });
                
                if (response.ok) {
                    // If deletion is successful, call the onDelete function passed as prop
                    console.log('Product deleted successfully');
                } else {
                    // Handle error cases
                    console.error('Failed to delete product');
                }
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }

        const handleVisibility = async () => {
            try {
                const response = await fetch(`http://localhost:4000/v1/products/visibilityProduct/${product._id}`, {
                    method: 'PATCH',
                });

                if (response.ok) {
                    if(backgroundColor === "bg-white"){
                        setBackgroundColor("bg-gray-300");
                    }
                    else{
                        setBackgroundColor("bg-white");
                    }
                } else {
                    // Handle error cases
                    console.error('Failed to update product visibility');
                }
            } catch (error) {
                console.error('Failed to update product visibility:', error);
            }
        
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
    
    if (!product.isInactive) {
        
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
            <DisplayFeatures productFeatures={productFeatures} productFeaturesIdToTitle={featuresIdToTitle}/>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <button className="btn-red" onClick={handleDelete}>Inactive</button>
        <button className="btn-red py-6" onClick={handleVisibility}>Visible</button>
    </div>
</div>


        );
    }
}

export default ProductCard;

