import React from 'react';
import './index.css'
import {FieldType} from "../../editor_base/EditorForm";

export class HeroComponentLandingPageData {
    tagLine = "TAGLINE";
    title = "No paper plane can be made without paper";
    article = "Professional, dedicated, local. Dunder Mifflin is " +
        "on its best patch to change the way you think about paper. That’s us - people who sell limitless " +
        "paper in the paperless world.";
    linkTo = "#";
    linkName = "Learn more";
    buttonLink = "#";
    buttonName = "Sign up";
}

export const HeroComponentLandingFormEditorData = (data) => {
    return {
        "tagLine": {
            "value": data.tagLine,
            "type": FieldType.TEXT_FILED,
            "label": "TagLine",
            "placeHolder": "TagLine",
        },
        "title": {
            "value": data.title,
            "type": FieldType.TEXT_FILED,
            "label": "Title",
            "placeHolder": "Title",
        },
        "article": {
            "value": data.article,
            "type": FieldType.TEXT_AREA_FILED,
            "label": "Article",
            "placeHolder": "Article",
        },
        "linkTo": {
            "value": data.linkTo,
            "type": FieldType.TEXT_FILED,
            "label": "Link To",
            "placeHolder": "Link To",
        },
        "linkName": {
            "value": data.linkName,
            "type": FieldType.TEXT_FILED,
            "label": "Link Name",
            "placeHolder": "Link Name",
        },
        "buttonName": {
            "value": data.buttonName,
            "type": FieldType.TEXT_FILED,
            "label": "Button Name",
            "placeHolder": "Button Name",
        },
        "buttonLink": {
            "value": data.buttonLink,
            "type": FieldType.TEXT_FILED,
            "label": "Button Link",
            "placeHolder": "Button Link",
        },
    }
}

const ComponentView = ({data}) => {
    return (
        <section className="py-12 px-4 w-full text-center">
            <div className="w-full max-w-2xl mx-auto"><span className="text-sm font-semibold">{data.tagLine}</span>
                <h2 className="text-5xl mt-2 mb-6 leading-tight font-heading">{data.title}</h2>
                <p className="mb-8 text-gray-500 leading-relaxed">{data.article}</p>
                <div><a
                    className="inline-block py-4 px-8 mr-6 leading-none text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow"
                    href={data.buttonLink}>{data.buttonName}</a><a className="text-blue-700 hover:underline"
                                                                   href={data.linkTo}>{data.linkName}</a></div>
            </div>
        </section>
    );
};

const ComponentPreview = () => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <h1>Header component</h1>
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
    const path = require('path');
    return {
        "data": new HeroComponentLandingPageData(),
        "formData": HeroComponentLandingFormEditorData,
        "component": HeroComponentLandingPage,
        "style": React.createElement("style",)

    }
};