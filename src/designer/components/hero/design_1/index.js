import React, {useEffect, useState} from 'react';
import './index.css'
import {EditorForm, FieldType} from "../../editor_base/EditorForm";

export class HeroData {
    name = "The Coldest Sunset";
    subTitle = "The Coldest Sunset 222";
    description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et" +
        "perferendis eaque, exercitationem praesentium nihil.";
    image = "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
}


const ComponentView = ({data}) => {
    return (
        <div className="rounded overflow-hidden shadow-lg w-full">
            <img className="w-full" src={data.image} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{data.name} <small>{data.subTitle}</small></div>
                <p className="text-gray-700 text-base">
                    {data.description}
                </p>
            </div>
        </div>
    );
};
const ComponentDataEditor = ({data, setData}) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (data) {
            setFormData({
                "name": {
                    "value": data.name,
                    "type": FieldType.TEXT_FILED,
                    "label": "Title",
                    "placeHolder": "Title",
                },
                "subTitle": {
                    "value": data.subTitle,
                    "type": FieldType.TEXT_FILED,
                    "label": "Sub Title",
                    "placeHolder": "Sub Title",
                },
                "description": {
                    "value": data.description,
                    "type": FieldType.TEXT_AREA_FILED,
                    "label": "Description",
                    "placeHolder": "Description",
                },

                "image": {
                    "value": data.image,
                    "type": FieldType.IMAGE_FILED,
                    "label": "Image",
                    "placeHolder": "Image",
                }
            })
        }
    }, [data]);

    if (data) {

        return (
            <>
                <EditorForm data={data} formData={formData} updateData={setData}/>
            </>
        );
    }

    return (<a>Loading...</a>)
};

const ComponentPreview = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <h1>Header Component</h1>
        </div>
    );
};


export const HeroComponentDesign1 = ({key, status, data, setData}) => {
    console.log(status, setData);
    switch (status) {
        case "preview":
            return <ComponentPreview/>;
        case "editor":
            return <ComponentDataEditor data={data} setData={setData}/>;
        default:
            return <ComponentView data={data}/>
    }
};