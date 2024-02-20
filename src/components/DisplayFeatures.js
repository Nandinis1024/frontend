import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

function DisplayFeatures({ productFeatures, productFeaturesIdToTitle }) {
    console.log(productFeaturesIdToTitle);
    return (
        <div className="p-4 rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Features</h1>
            <ul>
                {Object.keys(productFeatures).map((key) => (
                    <li key={key} className="mb-2">
                        <div className="flex items-center justify-between">
                            <strong className="mr-2 pr-5">{productFeaturesIdToTitle[key]}</strong>
                            {productFeatures[key] === "true" &&
                                <span className="text-green-500"><FontAwesomeIcon icon={faCheck} className="h-6" /></span>
                            }
                            {productFeatures[key] === "false" &&
                                <span className="text-red-500"><FontAwesomeIcon icon={faTimes} className="h-6" /></span>
                            }
                            {productFeatures[key] !== "true" && productFeatures[key] !== "false" &&
                                productFeatures[key]
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default DisplayFeatures;
