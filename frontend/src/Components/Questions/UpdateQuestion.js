import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateQuestion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const token = localStorage.getItem('token'); // Get the token from local storage

    useEffect(() => {
        axios.get(`http://localhost:5000/questions/id/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
        })
        .then((response) => {
            setQuestion(response.data);
        })
        .catch((error) => {
            console.log("There was an error fetching the question data!", error);
        });
    }, [id, token]);

    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            questiontext: question?.questiontext || "",
            description: question?.description || "",
            image: question?.image || '',
            category: question?.category || "",
        },

        validationSchema: Yup.object({
            questiontext: Yup.string().required("Question text is required"),
            description: Yup.string().required('Description is required'),
            image: Yup.string().url('Invalid URL format'),
            category: Yup.string().required("Category is required"),
        }),

        onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
            console.log('Submitting values:', values);
            console.log('Updating question with ID:', id);
            axios.put(`http://localhost:5000/questions/updatequestion/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
            })
            .then(() => {
                console.log('Question updated successfully');
                setStatus("success");
                resetForm();
                navigate(`/readquestion/${id}`);
            })
            .catch((error) => {
                console.log('Error updating question:', error);
                setStatus("error");
            })
            .finally(() => {
                setSubmitting(false);
            });
        }
    });

    return (
        <div className='container mt-5'>
            <button
                type="button"
                className="btn btn-secondary mb-4"
                onClick={() => window.history.back()}>
                Back
            </button>
            <div className="card shadow-lg border-light">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Update Question</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-4'>
                            <label htmlFor='questiontext' className='form-label'>Question Text</label>
                            <input
                                id="questiontext"
                                name="questiontext"
                                type="text"
                                className={`form-control ${formik.touched.questiontext && formik.errors.questiontext ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.questiontext}
                                data-testid="questiontext"
                            />
                            {formik.touched.questiontext && formik.errors.questiontext && (
                                <div className='invalid-feedback'>{formik.errors.questiontext}</div>
                            )}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='image' className='form-label'>Image URL</label>
                            <input
                                id="image"
                                name="image"
                                type="text" 
                                className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.image}
                                data-testid="image"
                            />
                            {formik.touched.image && formik.errors.image && (
                                <div className='invalid-feedback'>{formik.errors.image}</div>
                            )}
                            {formik.values.image && (
                                <div className='mt-3'>
                                    <img src={formik.values.image} alt="Preview" className="img-fluid rounded shadow-sm" style={{ maxHeight: '200px' }} />
                                </div>
                            )}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='description' className='form-label'>Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                data-testid="description"
                            />
                            {formik.touched.description && formik.errors.description && (
                                <div className='invalid-feedback'>{formik.errors.description}</div>
                            )}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='category' className='form-label'>Category</label>
                            <input
                                id="category"
                                name="category"
                                type="text"
                                className={`form-control ${formik.touched.category && formik.errors.category ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.category}
                                data-testid="category"
                            />
                            {formik.touched.category && formik.errors.category && (
                                <div className='invalid-feedback'>{formik.errors.category}</div>
                            )}
                        </div>

                        <button type='submit' className='btn btn-primary w-100' disabled={formik.isSubmitting}>
                            Update
                        </button>

                        {formik.status && formik.status === 'success' && (
                            <div className='alert alert-success mt-3' data-testid='response'>
                                Question updated successfully!
                            </div>
                        )}

                        {formik.status && formik.status === 'error' && (
                            <div className='alert alert-danger mt-3' data-testid='response'>
                                There was an error updating the question.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateQuestion;
