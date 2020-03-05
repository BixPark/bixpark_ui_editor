import React, {useEffect, useRef, useState} from 'react';
import './index.css'
import ReactDOM from "react-dom";
import {EditorModalComponent} from "./component_data_editor/EditorForm";
import {ComponentType} from "../components";
import {ComponentRegistry} from "../components/registry";


const ComponentSelectWrapper = ({id, Component, selectedComponentType}) => {
    console.log(Component);
    return (
        <div className="border-2
            cursor-move
            border-dashed
            border-transparent
            hover:border-gray-500
            hover:shadow-xl rounded m-2 p-1 " id={id}>
            <div
                className="hover:bg-blue-700 bg-blue-500
            flex justify-center rounded
            shadow-lg"
            >
                <div className="ml-auto py-2 mr-auto text-white">
                    <div className="text-center">
                        <Component.preview/>
                        <h2> {(selectedComponentType === ComponentType.ALL) &&
                        <strong>({Component.type})</strong>} {Component.name} </h2>
                    </div>

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
    const [selectedType, setSelectedType] = useState(ComponentType.ALL);
    const componentTypes = [
        ComponentType.ALL, ComponentType.NAVIGATION, ComponentType.HERO
    ];


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
        setComponentList(ComponentRegistry);


    }, [drake]);


    return (
        <>
            <div id="dash-content"
                 className="bg-gray-200 border-l-2 border-gray-400
                 py-2 lg:py-0 w-1/6 h-screen flex flex-wrap content-start overflow-auto">

                <nav className="flex flex-wrap items-center justify-center p-2 pb-4">

                    <h1 className="text-md text-indigo-500 font-semibold">
                        Select component and drag to canvas <i className="fa fa-hand-point-down"></i></h1>

                </nav>

                <nav className="items-center justify-center p-2 pb-4">
                    <div className="inline-block relative w-full">
                        <select
                            onChange={(eventTarget) => {
                                setSelectedType(eventTarget.target.value)
                            }}
                            className="block appearance-none w-full flex-grow-0 bg-white border border-gray-400
                             hover:border-gray-500 px-4 py-2 pr-8 rounded shadow
                             leading-tight focus:outline-none focus:shadow-outline">
                            {componentTypes.map((value) => {
                                return (
                                    <option className="w-full" value={value}>{value}</option>
                                );
                            })}

                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </nav>

                <div className="w-full" ref={refId}>
                    {Object.entries(componentList).filter(([key, value]) =>
                        selectedType === ComponentType.ALL || value.type === selectedType)
                        .map(([key, value]) => {
                                return (
                                    <ComponentSelectWrapper
                                        selectedComponentType={selectedType}
                                        key={key} Component={value} id={key}/>
                                );
                            }
                        )}
                </div>
            </div>
        </>
    );
};

