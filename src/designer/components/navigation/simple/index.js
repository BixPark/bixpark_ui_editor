import React from 'react';
import {FieldType} from "../../../component_list/component_data_editor/EditorForm";
import preview from "./preview.svg";
import {ComponentType} from "../../index";

class PageData {
    name = "TAGLINE";
    logo = "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
    links = [
        {
            "name": "Link1",
            "link": "#"
        },
        {
            "name": "Link2",
            "link": "#"
        },
        {
            "name": "Link3",
            "link": "#"
        },
        {
            "name": "Link4",
            "link": "#"
        }
    ];
}

const FormEditorData = (data) => {
    return {
        "name": {
            "value": data.name,
            "type": FieldType.TEXT_FILED,
            "label": "Name",
            "placeHolder": "Name",
        },
        "logo": {
            "value": data.logo,
            "type": FieldType.IMAGE_FILED,
            "label": "Logo",
            "placeHolder": "Logo",
        },
    }
};


const Component = ({data}) => {
    return (
        <nav className="flex items-center justify-between flex-wrap p-6 w-full">
            <div className="flex items-center flex-shrink-0 mr-6">
               <img src={data.logo} width={54} height={54} className="mr-3"/>
                <span className="font-semibold text-xl tracking-tight">{data.name}</span>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="inline-block text-sm">
                    <a href="#responsive-header"
                       className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-white mr-4">
                        Docs
                    </a>
                    <a href="#responsive-header"
                       className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-white mr-4">
                        Examples
                    </a>
                    <a href="#responsive-header"
                       className="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-white">
                        Blog
                    </a>
                </div>
            </div>
        </nav>
    )
};


export const NavigationSimple = () => {
    return {
        "type": ComponentType.NAVIGATION,
        "data": new PageData(),
        "formData": FormEditorData,
        "component": Component,
        "style": React.createElement("style",),
        "name": "Simple",
        "preview": () => {
            return (
                <img src={preview} width={150} alt={"design"}/>
            );
        }
    }
};