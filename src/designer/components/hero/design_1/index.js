import React from 'react';
import './index.css'
import {FieldType} from "../../../component_list/component_data_editor/EditorForm";

class DataClass {
    header = "The Coldest Sunset";
    client = "Client Name";
    description = "Great offer, competitive prices, professional service.That’s " +
        "how I’d remember the Dunder Mifflin. " +
        "Although I had to switch paper provider, sometimes I really miss Dunder family." +
        " I also got gift basket from the team!";
    image = "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
}

export const HeroComponentFormEditorData = (data) => {
    return {
        "header": {
            "value": data.header,
            "type": FieldType.TEXT_FILED,
            "label": "Header",
            "placeHolder": "Header",
        },
        "client": {
            "value": data.client,
            "type": FieldType.TEXT_FILED,
            "label": "Client",
            "placeHolder": "Client",
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
        <section className="py-12 px-4 w-full text-center">
            <h2 className="text-4xl mb-8 font-heading">{data.header}</h2>
            <div className="max-w-2xl mx-auto"><img
                className="mt-6 rounded-lg shadow-xl mt-8 h-64 w-full object-cover object-center"
                src={data.image}
                alt=""/>
                <div>
                    <h3 className="text-2xl mb-4 font-heading">{data.client}</h3>
                    <p className="text-gray-500 leading-relaxed">{data.description}</p>
                </div>
            </div>
        </section>
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
        "data": new DataClass(),
        "formData": HeroComponentFormEditorData,
        "component": HeroComponent
    }
};
