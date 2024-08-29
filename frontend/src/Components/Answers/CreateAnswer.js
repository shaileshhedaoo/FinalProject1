// CreateAnswer.js
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CreateAnswer = () => {
    const { qid } = useParams(); // Get the question ID from the route parameters
    const navigate = useNavigate(); // For navigation after submitting the answer
    const [statusMessage, setStatusMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            answertext: '',
        },
        validationSchema: Yup.object({
            answertext: Yup.string().required('Answer text is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axios.post(`http://localhost:5000/api/answers/${qid}`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in local storage
                    },
                });
                setStatusMessage(response.data.message);
                setSubmitting(false);
                formik.resetForm(); // Reset the form after submission
                navigate(`/readquestion/${qid}`); // Redirect to the question page
            } catch (error) {
                setStatusMessage(error.response?.data?.message || 'An error occurred');
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container mt-4">
            <h2>Answer the Question</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="answertext" className="form-label">Your Answer</label>
                    <textarea
                        id="answertext"
                        name="answertext"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.answertext}
                        rows="4"
                    />
                    {formik.touched.answertext && formik.errors.answertext && (
                        <div className="text-danger">{formik.errors.answertext}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                    Submit Answer
                </button>

                {statusMessage && (
                    <div className={formik.isSubmitting ? 'text-warning' : 'text-success'}>
                        {statusMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateAnswer;
