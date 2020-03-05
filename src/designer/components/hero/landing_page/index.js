import React from 'react';
import './index.css'
import {FieldType} from "../../editor_base/EditorForm";

export class HeroComponentLandingPageData {
    name = "The Coldest Sunset";
    subTitle = "The Coldest Sunset 222";
    description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et" +
        "perferendis eaque, exercitationem praesentium nihil.";
    image = "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
}

export const HeroComponentLandingFormEditorData = (data) => {
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
        <section className="font-sans h-screen w-full bg-cover text-center flex flex-col items-center justify-center"
                 style={
                     {
                         backgroundImage: `url({data.image})`,
                         backgroundRepeat: 'no-repeat',
                     }
                 }>
            <div className="bg-white text-black rounded-full h-16 w-16 flex items-center justify-center mb-8">
                <i className="fas fa-play ml-1"></i>
            </div>
            <label htmlFor="" className="uppercase tracking-extrawide text-white text-xs font-hairline mt-8">Watch
                Video</label>
            <h3 className="text-white mx-auto max-w-sm mt-4 font-normal text-2xl leading-normal">Differentiate Yourself
                And Attract
                More Attention Sales And Profits</h3>
        </section>
    );
};

const ComponentPreview = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <h1>Header Component Landing</h1>
        </div>
    );
};


const HeroComponentLandingPage = ({key, status, data, setData}) => {
    console.log(status, setData);
    if (status === "preview") {
        return <ComponentPreview/>;
    } else {
        return <ComponentView data={data}/>
    }
};


export const HeroComponentDesign2 = () => {
    return {
        "data": new HeroComponentLandingPageData(),
        "formData": HeroComponentLandingFormEditorData,
        "component": HeroComponentLandingPage
    }
};