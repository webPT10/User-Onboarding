import React from 'react';
import { withFormik, Form, Field } from 'formik';


function LoginForm (){
    return (
    <div>
        <form>
            <label name='username' hidden>User Name</label>
            <input type='text' name='username' placeholder='username' />
            <br />

            <label name='email' hidden>Email</label>
            <input type='text' name='email' placeholder='email' />
            <br />

            <label name='pw' hidden>Password</label>
            <input type='password' name='pw' placeholder='password' />
            <br />

            <label name='checkbox' hidden>Checkbox</label>
            <input type='checkbox' name='checkbox' placeholder='checkbox' />
            <br />

            <button type='submit'>BUTTON!</button>
        </form>
    </div>
    )
}

const FormikLoginForm = withFormik ({
    mapPropsToValues(){
        return {
            name: "TEST"
        }
    }
})(LoginForm)
console.log(FormikLoginForm)
export default LoginForm;