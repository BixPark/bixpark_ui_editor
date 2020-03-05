import React from 'react';
import './index.css'
import {FieldType} from "../../editor_base/EditorForm";

export class HeroData {
    name = "The Coldest Sunset";
    subTitle = "The Coldest Sunset 222";
    description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et" +
        "perferendis eaque, exercitationem praesentium nihil.";
    image = "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
}

export const HeroComponentFormEditorData = (data) => {
    return {
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
    }
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
const ComponentPreview = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <h1>Header Component</h1>
        </div>
    );
};


const HeroComponent = ({key, status, data, setData}) => {
    if (status === "preview") {
        return <ComponentPreview/>;
    } else {
        return <ComponentView data={data}/>
    }
};

export const HeroComponentDesign1 = () => {
    return {
        "data": new HeroData(),
        "formData": HeroComponentFormEditorData,
        "component": HeroComponent
    }
};
