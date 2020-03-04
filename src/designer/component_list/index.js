import React, {useEffect, useRef, useState} from 'react';
import './index.css'
import {HeroComponentDesign1, HeroData} from "../components/hero/design_1";
import ReactDOM from "react-dom";
import {HeroComponentLandingPage, HeroComponentLandingPageData} from "../components/hero/landing_page";

const EditorModalComponent = ({modalRef, Component, toggleModal, data, setData}) => {

    useEffect(() => {
        const overlay = document.querySelector('.modal-overlay');
        overlay.addEventListener('click', toggleModal);

        let closemodal = document.querySelectorAll('.modal-close');
        for (let i = 0; i < closemodal.length; i++) {
            closemodal[i].addEventListener('click', toggleModal);
        }

        document.onkeydown = function (evt) {
            evt = evt || window.event;
            let isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc")
            } else {
                isEscape = (evt.keyCode === 27)
            }
            if (isEscape && document.body.classList.contains('modal-active')) {
                toggleModal()
            }
        };

    });


    return (
        <div
            ref={modalRef}
            className="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div
                className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

                <div
                    className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                    <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18"
                         height="18" viewBox="0 0 18 18">
                        <path
                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                    <span className="text-sm">(Esc)</span>
                </div>

                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">Simple Modal!</p>
                        <div className="modal-close cursor-pointer z-50">
                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18"
                                 height="18" viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                            </svg>
                        </div>
                    </div>

                    <Component status={"editor"} data={data} setData={setData}/>


                </div>
            </div>
        </div>
    )
};


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
        <div className="max-w-sm overflow-hidden shadow-lg" id={id}>
            <button onClick={toggleModal}>Edit</button>
            <Component.component status={"build"} data={data}/>
            <EditorModalComponent modalRef={modalRef} data={data} setData={setData} toggleModal={toggleModal}
                                  Component={Component.component}/>
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
                    ReactDOM.hydrate(<ComponentPreviewWrapper Component={Component} id={componentId}/>, newNode);
                    el.parentNode.replaceChild(newNode, el);
                }
            });
        }
        setComponentList({
            "component_1": {
                "data": new HeroData(),
                "component": HeroComponentDesign1
            },
            "component_2": {
                "data": new HeroComponentLandingPageData(),
                "component": HeroComponentLandingPage
            }
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
                                <ComponentSelectWrapper key={key} Component={value.component} id={key}/>
                            );
                        }
                    )}
                </div>
            </div>
        </>
    );
};