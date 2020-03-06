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
        <section className="pt-8 px-4 pb-4">
            <h2 className="text-4xl mb-2 leading-tight font-heading">Dunder Mifflin Family</h2>
            <p className="max-w-xl mb-8 text-gray-500">Because no great company could exist without accountants,
                sellers, stock workers, and of course - paper.</p>
            <div className="flex flex-wrap -mx-4 text-center">
                <div className="w-full lg:w-1/3 px-4 mb-8">
                    <div className="h-full pb-6 rounded shadow-md"><img className="mx-auto mb-4"
                                                                        src="placeholders/pictures/female_avatar.svg"
                                                                        alt=""/>
                        <div className="px-8">
                            <h3 className="text-xl font-heading font-semibold">Karen Filippelli</h3><span>Regional Manager at Utica branch</span>
                            <div className="flex justify-center py-3 my-4 mx-12 border-t border-b"><img
                                className="w-8 h-8 mx-3" src="placeholders/icons/message.svg" alt=""/><img
                                className="w-8 h-8 mx-3" src="placeholders/icons/share.svg" alt=""/><img
                                className="w-8 h-8 mx-3" src="placeholders/icons/star.svg" alt=""/></div>
                            <p>Started as a Sales representative at Stamford branch, moved to Scranton.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 px-4 mb-8">
                    <div className="h-full pb-6 rounded shadow-md"><img className="mx-auto mb-4"
                                                                        src="placeholders/pictures/male_avatar.svg"
                                                                        alt=""/>
                        <div className="px-8">
                            <h3 className="text-xl font-heading font-semibold">Darryl Philbin</h3><span>Marketing Director</span>
                            <div className="flex justify-center py-3 my-4 mx-12 border-t border-b"><img
                                className="w-8 h-8 mx-3" src="placeholders/icons/message.svg" alt=""/><img
                                className="w-8 h-8 mx-3" src="placeholders/icons/share.svg" alt=""/><img
                                className="w-8 h-8 mx-3" src="placeholders/icons/star.svg" alt=""/></div>
                            <p>I started there as an Assistant and finally got a promotion to the Marketing
                                Director.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 px-4 mb-8">
                    <div className="h-full pb-6 rounded shadow-md"><img className="mx-auto mb-4"
                                                                        src="placeholders/pictures/female_avatar.svg"
                                                                        alt=""/>
                        <div className="px-8">
                            <h3 className="text-xl font-heading font-semibold">Kelly Kapoor</h3>
                            <span>Customer Service</span>
                            <div className="flex justify-center py-3 my-4 mx-12 border-t border-b"><img
                                className="w-8 h-8 mx-3" src="placeholders/icons/message.svg" alt=""/><img
                                className="w-8 h-8 mx-3" src="placeholders/icons/share.svg" alt=""/><img
                                className="w-8 h-8 mx-3" src="placeholders/icons/star.svg" alt=""/></div>
                            <p>I work for Dunder Mifflin for a few years now. I learned a lot.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};


export const ProductListSimple = () => {
    return {
        "type": ComponentType.PRODUCT,
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