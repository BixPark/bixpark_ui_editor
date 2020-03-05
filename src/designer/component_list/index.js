import React, {useEffect, useRef, useState} from 'react';
import './index.css'
import {HeroComponentDesign1} from "../components/hero/design_1";
import ReactDOM from "react-dom";
import {HeroComponentDesign2} from "../components/hero/landing_page";
import {EditorModalComponent} from "../components/editor_base/EditorForm";


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
    const modalRef = useRef();
    const [data, setData] = useState(Component.data);

    const toggleModal = () => {
        const body = document.querySelector('body');
        const modal = modalRef.current;
        modal.classList.toggle('opacity-0');
        modal.classList.toggle('pointer-events-none');
        body.classList.toggle('modal-active');
    };


    return (
        <div className="flex
        group
        relative
        flex-wrap focus:shadow-outline
        hover:border-blue-800
        border-dashed
        border-2
        border-transparent
        " id={id}>
            <div className="absolute group-hover:visible  top-0 left-0 bg-gray-700">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={toggleModal}>Edit
                </button>
            </div>
            <Component.component status={"build"} data={data}/>
            <EditorModalComponent modalRef={modalRef} data={data} setData={setData} toggleModal={toggleModal}
                                  Component={Component}/>
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
                if (el && el.parentNode) {
                    const componentId = el.id;
                    const Component = getComponent(el.id);
                    let newNode = document.createElement("div");
                    // let component = React.createElement(HeroComponentDesign1, {status: "build"});
                    ReactDOM.render(<ComponentPreviewWrapper Component={Component} id={componentId}/>, newNode);
                    el.parentNode.replaceChild(newNode, el);
                }
            });
        }
        setComponentList({
            "component_1": HeroComponentDesign2(),
            "component_2": HeroComponentDesign1()
        });

        return () => {

        }

    }, [drake]);


    return (
        <>
            <div id="dash-content"
                 className="bg-gray-200 py-2 lg:py-0 w-1/4 lg:max-w-sm h-screen flex flex-wrap content-start">
                <div className="w-1/2 lg:w-full" ref={refId}>
                    {Object.entries(componentList).map(([key, value]) => {
                            return (
                                <ComponentSelectWrapper key={key} Component={value.component} id={key}/>
                            );
                        }
                    )}
                </div>
            </div>
        </>
    );
};

