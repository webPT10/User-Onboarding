import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
//withFormik is the HOC

import * as Yup from 'yup';
import axios from 'axios';

const LoginForm = ({ values, touched, errors, status }) => {

    const [employees, setEmployee] = useState([])

    useEffect(() => {
        status && setEmployee(employees => [...employees, status])
    }, [status])

    return (
    <div className='login-form'>
        <Form>
            <label htmlFor='username' hidden>User Name</label>
            <Field 
                type='text' 
                name='username' 
                placeholder='username' 
                // value={values.username} // not needed when using Field/Formik
                // onChange={handleChange} //handleChange is a built in function w/ Formik
            /> 
            {touched.username && errors.username && (
                <p>{errors.username}</p>
            )}
            <br />

            <label htmlFor='email' hidden>Email</label>
            <Field 
                type='text' 
                name='email' 
                placeholder='email'
            />
            {touched.email && errors.email && (
                <p>{errors.email}</p>
            )}
            <br />

            <label htmlFor='password' hidden>Password</label>
            <Field 
                type='password' 
                name='password' 
                placeholder='password'
            />
            {touched.password && errors.password && (
                <p>{errors.password}</p>
            )}
            <br />

            <Field component='select' name='dropdown'>
                <option>Role...</option>
                <option value='fe'>Frontend Engineer</option>
                <option value='be'>Backend Engineer</option>
                <option value='dg'>Designer</option>
                <option value='ds'>Data Scientist</option>
            </Field>
            {touched.dropdown && errors.dropdown && (
                <p>{errors.dropdown}</p>
            )}
            <br />

            <label htmlFor='checkbox'>Employee Agreement</label>
            <Field 
                type='checkbox' 
                name='checkbox' 
                placeholder='checkbox'
                checked={values.checkbox} // not sure about this
            />
            {touched.checkbox && errors.checkbox && (
                <p>{errors.checkbox}</p>
            )}
            <br />

            <button type='submit'>BUTTON!</button>
        </Form>
        {employees.map(employee => (
            <ul key={employee.id}>
                <li>Username: {employee.username}</li>
                <li>Email: {employee.email}</li>
                <li>Password:{employee.password}</li>
                <li>Role:{employee.role}</li> 
                <li>Employee Agreement: {employee.checkbox}</li>
            </ul>
        ))}
    </div>
    )
}

const FormikLoginForm = withFormik ({
    mapPropsToValues({ username, email, password, dropdown, checkbox }){
        return {
            username: username || "", 
            email: email || "",
            password: password || "",
            dropdown: dropdown || "",
            checkbox: checkbox || false, //checks or unchecks
        };
    }, 
    validationSchema: Yup.object().shape({
        username: Yup.string().required("Username, please"),
        email: Yup.string().required("Required"),
        password: Yup.string().min(12, 'Must have 12 characters or more').required("Required"),
        dropdown: Yup.string().oneOf(['fe', 'be', 'dg', 'ds']).required('Kindly select your Role'),
        checkbox: Yup.boolean().required("This is required"),
    }),
    handleSubmit(values, {setStatus }) {
        axios
            .post('https://reqres.in/api/users/', values)
            .then(response => { setStatus(response.data); })
            .catch(error => console.log(error.response));
    }
})(LoginForm) //LoginForm is being passed to withFormik, gets everything that comes with withFormik

export default FormikLoginForm; // need to export FormikLoginForm, no longer LoginForm

console.log("this is the HOC",FormikLoginForm)