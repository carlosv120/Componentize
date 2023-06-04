import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

const basicSchema = Yup.object().shape({
    fullName: Yup.string().min(2).max(50).required("Is Required"),
    email: Yup.string().email("Invalid email yey").required("Is Required")


    //IF NOTHING HAPPENS, THEN CHECK THE VALIDATION SCHEMA, REDUCERS AND ERRORS.
})

class Basic extends React.Component {
    state = {
        formData: {
            fullName: "",
            email: ""
        }
    }

    handleSubmit = (values) => {

        //no prevent default

        console.log(values);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">

                        <Formik
                            enableReinitialize={true}
                            initialValues={this.state.formData}

                            onSubmit={this.handleSubmit}

                            validationSchema={basicSchema}
                        >

                            {/* NO MORE ONCHANGE, FORMIK MANAGES THE STATE FOR US */}

                            <Form>
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <Field type="text" name="fullName"></Field>
                                    {/* NOT THIS ANYMORE<input type="text" name="name"></input> */}

                                    <ErrorMessage name="fullName" component="div" className="has-error"></ErrorMessage>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field type="text" name="email" className="form-control"></Field>
                                    <ErrorMessage name="email" component="div" className="has-error"></ErrorMessage>

                                </div>
                                <button type="submit" className="btn btn-primary"> Submit</button>


                            </Form>

                        </Formik>

                    </div>
                </div>
            </div>





        )
    }
}

export default Basic;