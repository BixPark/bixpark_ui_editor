import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";

export const FieldType = {
    TEXT_FILED: "textFiled",
    TEXT_AREA_FILED: "textAreaFiled",
    IMAGE_FILED: "imageFiled",
};

const TextField = ({name, label, placeHolder}) => {
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
                                setFieldValue(name, e.target.result);

                            };


                            reader.readAsDataURL(event.currentTarget.files[0]);


                        }}
                        />
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

const EditorForm = ({formData, data, updateData}) => {
    return (
        <Formik
            initialValues={{...data}}
            onSubmit={(values, {setSubmitting}) => {
                updateData(
                    values
                )
            }}
        >
            {({isSubmitting, setFieldValue, values}) => (
                <div className="w-full max-w-lg h-screen max-h-screen">
                    <Form>
                        {Object.entries(formData).map(([key, value]) => {
                            switch (value.type) {
                                case FieldType.TEXT_FILED:
                                    return <TextField key={key} name={key} label={value.label}
                                                      placeHolder={value.placeHolder}/>;
                                case FieldType.TEXT_AREA_FILED:
                                    return <TextAreaField key={key} name={key} label={value.label}
                                                          placeHolder={value.placeHolder}/>;
                                case FieldType.IMAGE_FILED:
                                    return <SingleImageField key={key} name={key} label={value.label}
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
                                className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Save
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


export const EditorModalComponent = ({modalRef, Component, toggleModal, data, setData}) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (data) {
            setFormData(Component.formData(data))
        }
    }, [data]);

    useEffect(() => {
        const overlay = document.querySelector('.modal-overlay');
        overlay.addEventListener('click', toggleModal);

        let closemodal = document.querySelectorAll('.modal-close');
        for (let i = 0; i < closemodal.length; i++) {
            closemodal[i].addEventListener('click', toggleModal);
        }

        document.onkeydown = function (evt) {
            evt = evt || window.event;
            let isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc")
            } else {
                isEscape = (evt.keyCode === 27)
            }
            if (isEscape && document.body.classList.contains('modal-active')) {
                toggleModal()
            }
        };

    });


    return (
        <div ref={modalRef}
            className="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div
                className="modal-container bg-white w-3/4 mx-auto rounded shadow-lg z-50 overflow-y-auto">

                <div
                    className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                    <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                         viewBox="0 0 18 18">
                        <path
                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                    <span className="text-sm">(Esc)</span>
                </div>

                <div className="modal-content py-4  text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">Simple Modal!</p>
                        <div className="modal-close cursor-pointer z-50">
                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18"
                                 height="18" viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                            </svg>
                        </div>
                    </div>

                    <EditorForm data={data} formData={formData} updateData={setData}/>

                </div>
            </div>
        </div>

    )
};
