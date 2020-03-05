import React, {useEffect, useRef, useState} from 'react';
import './index.css'
import {HeroComponentDesign1} from "../components/hero/design_1";
import ReactDOM from "react-dom";
import {HeroComponentDesign2} from "../components/hero/landing_page";
import {EditorModalComponent} from "./component_data_editor/EditorForm";


const ComponentSelectWrapper = ({id, Component}) => {
    console.log(Component);
    return (
        <div
            className="border-2 border-gray-500
            border-dashed hover:border-transparent
            hover:bg-gray-600 hover:shadow-xl rounded
            p-2 m-2 md:mx-2 md:my-2 flex justify-center bg-gray-500"
            id={id}>
            <div className="ml-auto mr-auto text-white">
                <div className="text-center">
                    <Component.preview/>
                    <h2>{Component.name}</h2>
                </div>

            </div>
        </div>
    )

};

const ComponentPreviewWrapper = ({id, Component, dataManager}) => {
    const modalRef = useRef();
    const [data, setData] = useState(Component.data);
    const [isEditorPanelVisible, setEditorPanelVisible] = useState(false);

    const toggleModal = () => {
        const body = document.querySelector('body');
        const modal = modalRef.current;
        modal.classList.toggle('opacity-0');
        modal.classList.toggle('pointer-events-none');
        body.classList.toggle('modal-active');
    };

    useEffect(() => {
        if (dataManager)
            dataManager.notify(Component, id, data);
    }, [id, dataManager, data]);

    const toggleEditorPanel = () => {
        setEditorPanelVisible(!isEditorPanelVisible);
    };

    const deleteContent = (id) => {
        dataManager.removeContent(id)
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
        " id={`child_${id}`} onMouseEnter={() => {
            toggleEditorPanel()
        }} onMouseLeave={() => {
            toggleEditorPanel()
        }}>
            {isEditorPanelVisible &&
            (<>
                <div className="absolute w-full h-full left-0 z-50 p-4">
                    <button
                        className="rounded  bg-blue-700 p-1 text-white px-2"
                        onClick={toggleModal}>Content <i className="fa fa-paint-brush"></i>
                    </button>
                    <button
                        className="rounded  bg-red-700 p-1 text-white px-2 mx-2"
                        onClick={() => {
                            deleteContent(id)
                        }}><i className="fa fa-trash"></i>
                    </button>
                </div>
                <div className="absolute w-full h-full bg-gray-100 left-0 opacity-75 z-10">
                </div>
            </>)
            }

            <Component.component status={"build"} data={data}/>
            <EditorModalComponent modalRef={modalRef} data={data}
                                  setData={setData}
                                  toggleModal={toggleModal}
                                  Component={Component}/>
        </div>
    )

};

export const ComponentListView = ({drake, refId, designerViewId, dataManager}) => {
    const initialId = 0;
    const [componentList, setComponentList] = useState({});
    const [nextId, setNextId] = useState(initialId);


    const getComponent = (id) => {
        return componentList[id];
    };

    useEffect(() => {
        if (drake) {
            drake.on("drop", function (el, target, source, sibling) {
                if (el && el.parentNode && target !== source) {
                    const Component = getComponent(el.id);
                    let newNode = document.createElement("div");
                    setNextId(prevState => {
                        const componentId = `component_id_${prevState}`;
                        newNode.setAttribute("id", componentId);
                        ReactDOM.render(<ComponentPreviewWrapper dataManager={dataManager} Component={Component}
                                                                 id={componentId}/>, newNode);
                        el.parentNode.replaceChild(newNode, el);
                        return prevState + 1;
                    });
                }
            });
        }
        setComponentList({
            "component_1": HeroComponentDesign2(),
            "component_2": HeroComponentDesign1()
        });


    }, [drake]);


    return (
        <>
            <div id="dash-content"
                 className="bg-gray-200 py-2 lg:py-0 w-1/4 lg:max-w-sm h-screen flex flex-wrap content-start">

                <nav className="flex flex-wrap items-center justify-center p-2 pb-4">

                    <h1 className="text-md text-indigo-500 font-semibold">
                        Select component and drag to canvas <i className="fa fa-hand-point-down"></i></h1>

                </nav>

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

