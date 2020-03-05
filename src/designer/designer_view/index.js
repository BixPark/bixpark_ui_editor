import React, {useState} from 'react';
import './index.css'


export const DesignView = ({refId}) => {

    const [layoutSize, setLayoutSize] = useState("browser--desktop");

    const changeLayoutSize = (size) => {
        setLayoutSize(size);
    };

    const exportToHtml = () => {
        const content = refId.current;
        const htmlContent = content.innerHTML;
    };
    return (<div className="flex flex-wrap py-2">
            <div className={`ml-auto  mr-auto ${layoutSize}`}>
                <div className="border-solid border-grey-light rounded border shadow">
                    <div className="bg-gray-200 px-2 py-3 border-solid border-grey-light border-b">
                        <div className="flex flex-wrap">
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