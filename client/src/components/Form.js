import React from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react'
import { Form as FormUser, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, isSubmitting }) => {
    return (
        <div className="register-form">
            <h1>Register</h1>
            <FormUser>
                <Form>
                    <Form.Field>
                        <Field type="text" name="username" placeholder="Username" />
                        {touched.username && errors.username && (
                            <p className="error">{errors.username}</p>
                        )}
                    </Form.Field>

                    <Form.Field>
                        <Field type="password" name="password" placeholder="Password" />
                        {touched.password && errors.password && (
                            <p className="error">{errors.password}</p>
                        )}
                    </Form.Field>

                    <br />

                    <Button type="submit" disabled={isSubmitting}>Sign Up</Button>
                </Form>
            </FormUser>
        </div>
    );
};

const RegisterForm = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || '',
            password: password || ''
        }
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(8, 'Password must be 8 characters or longer')
            .required('Password is required')
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
        // console.log('form submitted', values);
        if (values.username === "vyue001") {
            setErrors({ username: "That username is already taken" });
            setSubmitting(false);
        }

        axios.post('http://localhost:5000/api/register', values)
            .then(res => {
                console.log(res)
                setStatus(res.data);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err.response);
                setSubmitting(false);
            });
    }

})(UserForm);

export default RegisterForm;