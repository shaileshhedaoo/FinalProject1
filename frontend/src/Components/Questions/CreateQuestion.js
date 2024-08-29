
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateQuestion() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            questiontext: '',
            description: '',
            image: '',
            category: ''
        },
        validationSchema: Yup.object({
            questiontext: Yup.string().required('Question Text is required'),
            description: Yup.string().required('Description is required'),
            image: Yup.string()
                .url('Invalid URL format')
                .required('Image URL is required'),
            category: Yup.string().required('Category is required'),
        }),
        onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
            const token = localStorage.getItem('token'); // Get token from localStorage
            axios.post('http://localhost:5000/questions', values, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
            })
                .then(response => {
                    setStatus('success');
                    resetForm();
                    navigate('/');
                    alert('Question added successfully.');
                })
                .catch(error => {
                    setStatus('error');
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white text-center">
                            <h3>Add New Question</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className='mb-3'>
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

                                <div className='mb-3'>
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
                                            <img src={formik.values.image} alt="Preview" className="img-fluid rounded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                        </div>
                                    )}
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor='description' className='form-label'>Description</label>
                                    <input
                                        id="description"
                                        name="description"
                                        type="text"
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

                                <button type='submit' className='btn btn-success w-100' disabled={formik.isSubmitting}>
                                    Add Question
                                </button>

                                {formik.status === 'success' && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        Question added successfully!
                                    </div>
                                )}
                                {formik.status === 'error' && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        There was an error adding the question. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateQuestion;
