import React, {useEffect, useState} from 'react';
import './index.css'
import {HeroComponentDesign1} from "../components/hero/design_1";
import ReactDOM from "react-dom";

const ComponentSelectWrapper = ({id, Component}) => {
    return (
        <div className="max-w-sm overflow-hidden shadow-lg" id={id}>
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

    const [componentList, setComponentList] = useState([]);

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
            "key": "component_1",
            "component": HeroComponentDesign1
        });

        return () => {

        }

    }, [drake]);


    return (
        <div ref={refId}>
            {Object.entries(componentList).map(([key, value]) => {
                    return (
                        <ComponentSelectWrapper key={key} Component={value} id={key}/>
                    );
                }
            )}
        </div>
    );
};