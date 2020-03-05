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
            htmlContent +=newNode.innerHTML;
        }


        var base64doc = btoa(unescape(encodeURIComponent(htmlContent))),
            a = document.createElement('a'),
            e = new MouseEvent('click');

        a.download = 'doc.html';
        a.href = 'data:text/html;base64,' + base64doc;
        a.dispatchEvent(e);
    };
    return (<div className="flex flex-1 flex-wrap">
            <div className={`ml-auto  mr-auto ${layoutSize}`}>
                <div className="border-solid border-grey-light rounded border shadow">
                    <div className="bg-gray-200 px-2 py-3 border-solid border-grey-light border-b">
                        <div className="flex flex-wrap">
                            <div class="flex-auto items-end">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={exportToHtml}>Export
                                </button>
                            </div>
                            <div class="flex-auto items-end">
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
                        </div>
                    </div>
                    <div ref={refId} className="ui-designer h-full h-16 container overflow-y-auto py-2 px-3">
                    </div>
                </div>
            </div>
        </div>
    );
};