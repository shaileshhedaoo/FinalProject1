import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: '',
            password: '',
            role: '',
            email: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
            role: Yup.string().required("Select a role"),
            email: Yup.string()
                .email('Invalid email address')
                .matches(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    'Invalid email address'
                )
                .required('Email is required')
        }),
        onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
            axios.post('http://localhost:5000/users/register', values)
                .then(() => {
                    setStatus('success');
                    resetForm();
                    alert("Registered Successfully");
                    navigate("/login");
                })
                .catch(error => {
                    setStatus("error");
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    });

    return (
        <div className="container" style={{ marginTop: '5rem' }}>
            <main className="form-signin w-50 mx-auto" style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 className="h3 mb-4 fw-normal" style={{ textAlign: 'center', color: '#3a3a3a' }}>Register</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            placeholder="User Name"
                            style={{ borderColor: formik.touched.username && formik.errors.username ? '#dc3545' : '#ced4da' }}
                        />
                        <label htmlFor="username">User Name</label>
                        {formik.touched.username && formik.errors.username ? (
                            <div className='text-danger' style={{ fontSize: '0.875rem' }}>{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Password"
                            style={{ borderColor: formik.touched.password && formik.errors.password ? '#dc3545' : '#ced4da' }}
                        />
                        <label htmlFor="password">Password</label>
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-danger' style={{ fontSize: '0.875rem' }}>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Email"
                            style={{ borderColor: formik.touched.email && formik.errors.email ? '#dc3545' : '#ced4da' }}
                        />
                        <label htmlFor="email">Email</label>
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-danger' style={{ fontSize: '0.875rem' }}>{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="form-floating mb-4">
                        <select
                            className="form-select"
                            id="role"
                            {...formik.getFieldProps('role')}
                            style={{ borderColor: formik.touched.role && formik.errors.role ? '#dc3545' : '#ced4da' }}
                        >
                            <option value='' disabled>Select a role</option>
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                        <label htmlFor="role">Role</label>
                        {formik.touched.role && formik.errors.role ? (
                            <div className='text-danger' style={{ fontSize: '0.875rem' }}>{formik.errors.role}</div>
                        ) : null}
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitting} style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>Register</button>

                    {formik.status === 'success' && (
                        <div className="alert alert-success mt-3" role="alert">Registration successful!</div>
                    )}
                    {formik.status === 'error' && (
                        <div className="alert alert-danger mt-3" role="alert">Registration failed. Please try again.</div>
                    )}
                </form>
            </main>
        </div>
    );
};

export default Register;
