import React from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {

    const { id } = useParams();
    const location = useLocation();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        await RestaurantFinder.post(`/${id}/addReview`, {
            name,
            review: reviewText,
            rating
        });
        navigate('/')
        /* try to make this refersh so the user stays on the same page */
    }


    return (
        <div className="mb-2">
            <form action="" >
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="form-control" placeholder="name" />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)} id="rating" className="custom-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} id="Review" className="form-control"></textarea>
                </div>
                <button onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview; 