import React, {useEffect, useState,useReducer} from 'react';
import './index.css'
import {ErrorMessage, Field, Form, Formik} from "formik";

class HeroData {
    name = "The Coldest Sunset";
    description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et\n" +
        "                    perferendis eaque, exercitationem praesentium nihil.";
    image = "https://tailwindcss.com/img/card-top.jpg"
}

const ComponentView = ({data}) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg w-full">
            <img className="w-full" src={data.image} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{data.name}</div>
                <p className="text-gray-700 text-base">
                    {data.description}
                </p>
            </div>
        </div>
    );
};
const ComponentDataEditor = (data, setData) => {
    return (
        <>
            <Formik
                initialValues={{name: "Name"}}
                onSubmit={(values, {setSubmitting}) => {
                    setData(
                        values
                    )
                }}
            >
                {({isSubmitting}) => (
                    <div className={"w-full max-w-lg"}>
                        <Form>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <Field name="name">

                                    {({
                                          field, // { name, value, onChange, onBlur }
                                          form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                          meta,
                                      }) => (
                                        <>
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-first-name">
                                                First Name
                                            </label>
                                            <input
                                                className="appearance-none block
                                             w-full bg-gray-200 text-gray-700 border
                                             rounded py-3 px-4
                                              mb-3 leading-tight focus:outline-none focus:bg-white"
                                                placeholder="Jane"  {...field}/>
                                            {meta.touched && meta.error && (
                                                <p className="text-red-500 text-xs italic">{meta.error}</p>
                                            )}

                                        </>
                                    )}


                                </Field>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <Field name="description">

                                    {({
                                          field, // { name, value, onChange, onBlur }
                                          form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                          meta,
                                      }) => (
                                        <>
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Description
                                            </label>
                                            <input
                                                className="appearance-none block
                                             w-full bg-gray-200 text-gray-700 border
                                             rounded py-3 px-4
                                              mb-3 leading-tight focus:outline-none focus:bg-white"
                                                placeholder="Description"  {...field}/>
                                            {meta.touched && meta.error && (
                                                <p className="text-red-500 text-xs italic">{meta.error}</p>
                                            )}

                                        </>
                                    )}


                                </Field>
                            </div>

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


        </>
    );
};

const ComponentPreview = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <h1>Header Component</h1>
        </div>
    );
};


export const HeroComponentDesign1 = ({key, status, data, setData}) => {
    const hero = useState(new HeroData());
    useEffect(() => {
        if (!data && setData) {
            setData(hero);
        }
    }, [data]);

    switch (status) {
        case "preview":
            return <ComponentPreview/>;
        case "editor":
            return <ComponentDataEditor data={hero} setData={setData}/>;
        default:
            return <ComponentView data={hero}/>
    }
};