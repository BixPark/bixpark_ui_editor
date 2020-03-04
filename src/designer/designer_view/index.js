import React from 'react';
import './index.css'


export const DesignView = ({refId}) => {

    const exportToHtml = () => {
        const content = refId.current;
        const htmlContent = content.innerHTML;
    };
    return (
        <div className="flex flex-1 flex-wrap">
            <button onClick={exportToHtml}>Export</button>
            <div ref={refId} className="ui-designer container">
            </div>
        </div>
    );
};