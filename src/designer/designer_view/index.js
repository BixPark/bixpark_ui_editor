import React, {useState} from 'react';
import './index.css'
import ReactDOM from "react-dom";


export const DesignView = ({refId, drake, dataManager}) => {

    const [layoutSize, setLayoutSize] = useState("browser--desktop");

    const changeLayoutSize = (size) => {
        setLayoutSize(size);
    };

    const exportToHtml = () => {

        const containers = drake.containers;
        const designElements = containers[1].childNodes;

        const siteData = dataManager.getSiteData();
        const exportDataOrder = [];
        for (const designElement of designElements) {
            let componentId = designElement.id;
            exportDataOrder.push(siteData[componentId]);
        }
        let htmlContent = "";
        for (const expData of exportDataOrder) {
            let newNode = document.createElement("div");
            ReactDOM.render(<expData.Component.component status={"build"} data={expData.data}/>, newNode);
            htmlContent += newNode.innerHTML;
        }


        var base64doc = btoa(unescape(encodeURIComponent(htmlContent))),
            a = document.createElement('a'),
            e = new MouseEvent('click');

        a.download = 'doc.html';
        a.href = 'data:text/html;base64,' + base64doc;
        a.dispatchEvent(e);
    };
    return (<div className="flex flex-1 flex-col flex-wrap">
            <nav className="flex flex-wrap items-center justify-end p-2 pb-4">

                <button
                    className="hover:bg-gray-200 text-gray-800 font-normal py-2 px-4 rounded inline-flex items-center">
                    <i className="fa fa-photo-video  mx-2"></i>
                    <span>Preview</span>
                </button>
                <button
                    onClick={exportToHtml}
                    className="bg-purple-700 hover:bg-gray-400 hover:text-purple-800 text-white font-normal py-2 px-4 m-2 rounded inline-flex items-center">
                    <i className="fa fa-upload mx-2" aria-hidden="true"></i>
                    <span>Publish</span>
                </button>
            </nav>

            <div className={`ml-auto  mr-auto ${layoutSize}`}>
                <div className="border-solid border-grey-light rounded border shadow">
                    <div className="bg-gray-200 px-2 py-3 border-solid border-grey-light border-b">
                        <nav className="flex flex-wrap items-center justify-between p-0">
                            <div className="lg:order-2 w-auto"><a
                                className="text-xl text-indigo-500 font-semibold" href="#">Business Web site</a></div>
                            <div className="navbar-menu hidden lg:order-3 lg:block w-full lg:w-2/5 lg:text-right">

                                <button className="py-2 px-4 text-gray-600 text-sm focus:outline-none"
                                        onClick={() => {
                                            changeLayoutSize("browser--mobile")
                                        }}>
                                    <i className="fa fa-mobile-alt"></i>
                                </button>
                                <button className="py-2 px-4 text-gray-600 text-sm focus:outline-none" onClick={() => {
                                    changeLayoutSize("browser--tablet")
                                }}>
                                    <i className="fa fa-tablet-alt"></i>
                                </button>
                                <button className="py-2 px-4 text-gray-600 text-sm focus:outline-none" onClick={() => {
                                    changeLayoutSize("browser--desktop")
                                }}>
                                    <i className="fa fa-desktop"></i>
                                </button>

                            </div>
                        </nav>
                    </div>
                    <div ref={refId}
                         className="ui-designer h-full h-16 flex flex-col  container overflow-y-auto py-2 px-3">
                    </div>
                </div>
            </div>
        </div>
    );
};