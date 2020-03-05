import React from 'react';
import './index.css'


export const DesignView = ({refId}) => {

    const exportToHtml = () => {
        const content = refId.current;
        const htmlContent = content.innerHTML;
    };
    return (<div className="p-4 h-screen max-h-screen">
            <div className="mx-8 mb-2 border-solid border-grey-light rounded border shadow-sm">
                <div className="bg-gray-200 px-2 py-3 border-solid border-grey-light border-b">
                    <button
                        onClick={exportToHtml}> Export
                    </button>
                </div>
                <div ref={refId} className="ui-designer h-full h-16 container overflow-scroll">
                </div>
            </div>


        </div>
    );
};