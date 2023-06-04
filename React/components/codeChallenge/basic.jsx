import { React } from 'react'
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import debug from "sabio-debug";



// import { Card, Row } from "react-bootstrap";
// import { useLocation, useNavigate } from "react-router-dom";
// 

// import PropTypes from "prop-types";
// import debug from "sabio-debug";


function Basic() {

    const [formData] = useState({
        seasonId: "",
        isPhysicalRequired: false,
        isBackgroundCheckRequired: false,
        isTestRequired: false,
        testId: "",
        minimumScoreRequired: "",
        isFitnessTestRequired: false,
        isClinicRequired: false,
        dueDate: ""
    });

    const _logger = debug.extend();

    const basicSchema = Yup.object().shape({
        seasonId: Yup.number().required("The Season is Required"),
        isPhysicalRequired: Yup.boolean().required(),
        isBackgroundCheckRequired: Yup.boolean().required(),
        isTestRequired: Yup.boolean().required(),
        testId: Yup.number().when('isTestRequired', {
            is: (isTestRequired) => isTestRequired === true,
            then: () => Yup.number().required("Select the Test")
        }),
        minimumScoreRequired: Yup.number().when('isTestRequired', {
            is: (isTestRequired) => isTestRequired === true,
            then: () => Yup.number().typeError("Must be a number").required("Include the Minimum Score Required"),
        }),
        isFitnessTestRequired: Yup.boolean().required(),
        isClinicRequired: Yup.boolean().required(),
        dueDate: Yup.date().min(new Date(), "Invalid Due Date").required("Include the Due Date")
    })

    const onCertificationFormSubmit = (values) => {

        const payload = { ...values };

        if (!payload.isTestRequired) {
            payload.testId = null
            payload.minimumScoreRequired = null
        }
        _logger("logger");
        console.log("Payload", payload);
    }

    return (
        <div className='container'>
            <Formik
                enableReinitialize={true}
                initialValues={formData}
                validationSchema={basicSchema}
                onSubmit={onCertificationFormSubmit}
            >
                {({ values }) => (
                    <Form>
                        <div className='row'>
                            <div className="col-3 form-group">
                                <label
                                    className="form-label"
                                    htmlFor="seasonId">
                                    Season
                                </label>
                                <Field
                                    className="form-select"
                                    name="seasonId"
                                    as="select"
                                    component="select"
                                >
                                    <option value="">Select something</option>
                                    <option value="1">Select 1</option>
                                </Field>
                                <ErrorMessage
                                    name="seasonId"
                                    component="small"
                                    className="text-danger">
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-3 form-group">
                                <label
                                    className="form-label"
                                    htmlFor="isPhysicalRequired">
                                    Is Physical Required
                                </label>
                                <Field
                                    className="form-check-input "
                                    name="isPhysicalRequired"
                                    type="checkbox"
                                >
                                </Field>
                                {`${values.isPhysicalRequired ? "Yes" : "No"}`}

                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-3 form-group">
                                <label
                                    className="form-label"
                                    htmlFor="isBackgroundCheckRequired">
                                    Is Background Check Required
                                </label>
                                <Field
                                    className="form-check-input"
                                    name="isBackgroundCheckRequired"
                                    type="checkbox"
                                >
                                </Field>
                                {`${values.isBackgroundCheckRequired ? "Yes" : "No"}`}

                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-3 form-group">
                                <label
                                    className="form-label"
                                    htmlFor="isTestRequired">
                                    Is Test Required
                                </label>
                                <Field
                                    className="form-check-input"
                                    name="isTestRequired"
                                    type="checkbox"
                                >
                                </Field>
                                {`${values.isTestRequired ? "Yes" : "No"}`}

                            </div>
                        </div>
                        <div className='row'>
                            {values.isTestRequired &&
                                <div className="row">
                                    <div className="col-3 form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="testId">
                                            Test Id
                                        </label>
                                        <Field
                                            className="form-select"
                                            name="testId"
                                            as="select"
                                            component="select"
                                        >
                                            <option value="">Select something</option>
                                            <option value="1">Select 1</option>
                                        </Field>
                                        <ErrorMessage
                                            name="testId"
                                            component="small"
                                            className="text-danger">
                                        </ErrorMessage>
                                    </div>
                                    <div className="col-3 form-group">
                                        <label
                                            className="form-label"
                                            htmlFor="minimumScoreRequired">
                                            Minimum Score Required
                                        </label>
                                        <Field
                                            className="form-control"
                                            name="minimumScoreRequired"
                                            type="text">
                                        </Field>
                                        <ErrorMessage
                                            name="minimumScoreRequired"
                                            component="small"
                                            className="text-danger">
                                        </ErrorMessage>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='row'>
                            <div className="col-3 form-group">
                                <label
                                    className="form-label"
                                    htmlFor="isFitnessTestRequired">
                                    Is Fitness Test Required
                                </label>
                                <Field
                                    className="form-check-input"
                                    name="isFitnessTestRequired"
                                    type="checkbox"
                                >
                                </Field>
                                {`${values.isFitnessTestRequired ? "Yes" : "No"}`}

                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-3 form-group">
                                <label
                                    className="form-label"
                                    htmlFor="isClinicRequired">
                                    Is Clinic Required
                                </label>
                                <Field
                                    className="form-check-input"
                                    name="isClinicRequired"
                                    type="checkbox"
                                >
                                </Field>
                                {`${values.isClinicRequired ? "Yes" : "No"}`}

                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-3 form-group">
                                <label
                                    className="form-label"
                                    htmlFor="dueDate">
                                    Due Date
                                </label>
                                <Field
                                    className="form-control"
                                    name="dueDate"
                                    type="date"
                                >
                                </Field>
                                <ErrorMessage
                                    name="dueDate"
                                    component="small"
                                    className="text-danger">
                                </ErrorMessage>

                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary"> Submit</button>
                    </Form>
                )}
            </Formik>

        </div >

    )
}

export default Basic