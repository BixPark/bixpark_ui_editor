import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";

export const FieldType = {
    TEXT_FILED: "textFiled",
    TEXT_AREA_FILED: "textAreaFiled",
    IMAGE_FILED: "imageFiled",
};

const TextField = ({name, label, placeHolder}) => {
    console.log(name, label, placeHolder);
    return (<div className="flex flex-wrap -mx-3 mb-6">
        <Field name={name}>

            {({
                  field, // { name, value, onChange, onBlur }
                  form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
              }) => (
                <>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name">
                        {label}
                    </label>
                    <input
                        className="appearance-none block
                                             w-full bg-gray-200 text-gray-700 border
                                             rounded py-3 px-4
                                              mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder={placeHolder}  {...field}/>
                    {meta.touched && meta.error && (
                        <p className="text-red-500 text-xs italic">{meta.error}</p>
                    )}

                </>
            )}


        </Field>
    </div>);
};

const TextAreaField = ({name, label, placeHolder}) => {
    return (<div className="flex flex-wrap -mx-3 mb-6">
        <Field name={name}>

            {({
                  field, // { name, value, onChange, onBlur }
                  form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
              }) => (
                <>
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        {label}
                    </label>
                    <textarea
                        className="appearance-none block
                                             w-full bg-gray-200 text-gray-700 border
                                             rounded py-3 px-4
                                              mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder={placeHolder}  {...field}></textarea>
                    {meta.touched && meta.error && (
                        <p className="text-red-500 text-xs italic">{meta.error}</p>
                    )}

                </>
            )}


        </Field>
    </div>);
};
const SingleImageField = ({name, label, placeHolder, setFieldValue}) => {
    return (
        <div className="flex flex-wrap -mx-3 mb-6">
            <Field name={name}>

                {({
                      field, // { name, value, onChange, onBlur }
                      form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                  }) => (
                    <>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            {label}
                        </label>
                        <input
                            type="file"
                            className="appearance-none block
                                             w-full bg-gray-200 text-gray-700 border
                                             rounded py-3 px-4
                                              mb-3 leading-tight focus:outline-none focus:bg-white"
                            placeholder={placeHolder} onChange={(event) => {


                            let reader = new FileReader();

                            reader.onloadend = (e) => {

                                // values.image = e.target.result;
                                setFieldValue("image", e.target.result);

                            };


                            reader.readAsDataURL(event.currentTarget.files[0]);


                        }}/>
                        {meta.touched && meta.error && (
                            <p className="text-red-500 text-xs italic">{meta.error}</p>
                        )}

                        <Thumb file={field.value}/>

                    </>
                )}


            </Field>
        </div>);
};

const Thumb = ({file}) => {
    if (!file) {
        return <p>loading...</p>;
    }

    return (<img src={file}
                 className="img-thumbnail mt-2"
                 height={200}
                 width={200}/>);
};

export const EditorForm = ({formData, updateData}) => {
    const [data, setData] = useState({});

    useEffect(() => {

        const data = {};

        for (const [key, value] of Object.entries(formData)) {
            data[key] = value.value;
        }
        setData(data);

    }, [formData]);


    return (
        <Formik
            initialValues={data}
            onSubmit={(values, {setSubmitting}) => {
                console.log("Values", values);
                updateData(
                    values
                )
            }}
        >
            {({isSubmitting, setFieldValue}) => (
                <div className={"w-full max-w-lg"}>
                    <Form>
                        {Object.entries(formData).map(([key, value]) => {
                            console.log(key);
                            switch (value.type) {
                                case FieldType.TEXT_FILED:
                                    return <TextField name={key} label={value.label} placeHolder={value.placeHolder}/>;
                                case FieldType.TEXT_AREA_FILED:
                                    return <TextField name={key} label={value.label} placeHolder={value.placeHolder}/>;
                                case FieldType.IMAGE_FILED:
                                    return <SingleImageField name={key} label={value.label}
                                                             placeHolder={value.placeHolder}
                                                             setFieldValue={setFieldValue}/>;
                                default:
                                    return (<></>);
                            }
                        })}


                        <div className="flex justify-end pt-2">
                            <button
                                disabled={isSubmitting}
                                type={"submit"}
                                className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Action
                            </button>
                            <button
                                className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">Close
                            </button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );

};