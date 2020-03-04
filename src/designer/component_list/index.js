import React, {useEffect, useState} from 'react';
import './index.css'
import {HeroComponentDesign1} from "../components/hero/design_1";
import ReactDOM from "react-dom";

const ComponentSelectWrapper = ({id, Component}) => {
    return (
        <div
            className="border-2 border-gray-400
            border-dashed hover:border-transparent
            hover:bg-white hover:shadow-xl rounded
            p-2 m-2 md:mx-2 md:my-2"
            id={id}>
            <Component status={"preview"}/>
        </div>
    )

};

const ComponentPreviewWrapper = ({id, Component}) => {
    return (
        <div className="max-w-sm overflow-hidden shadow-lg" id={id}>
            <Component status={"build"}/>
        </div>
    )

};

export const ComponentListView = ({drake, refId}) => {

    const [componentList, setComponentList] = useState({});

    const getComponent = (id) => {
        return componentList[id];
    };

    useEffect(() => {
        if (drake) {
            drake.on("drop", function (el, target, source, sibling) {
                const componentId = el.id;
                const Component = getComponent(el.id);
                let newNode = document.createElement("div");
                // let component = React.createElement(HeroComponentDesign1, {status: "build"});
                ReactDOM.hydrate(<ComponentPreviewWrapper Component={Component} id={componentId}/>, newNode);
                el.parentNode.replaceChild(newNode, el);
            });
        }
        setComponentList({
            "component_1": HeroComponentDesign1
        });

        return () => {

        }

    }, [drake]);


    return (

        <>

            <div id="dash-content" className="bg-gray-200 py-2 lg:py-0 w-1/4 lg:max-w-sm flex flex-wrap content-start">


                <div className="w-1/2 lg:w-full" ref={refId}>
                    {Object.entries(componentList).map(([key, value]) => {
                            return (
                                <ComponentSelectWrapper key={key} Component={value} id={key}/>
                            );
                        }
                    )}
                </div>


            </div>


        </>
    );
};