import React, {useEffect, useRef} from 'react';
import Dragula from 'react-dragula';
import './App.css';

const ButtonComponent = () => {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Button
        </button>
    )
};

const DesignView = ({refId}) => {
    return (
        <div ref={refId} className="ui-designer container">

        </div>
    );
};
const ComponentListView = ({refId}) => {
    return (
        <div ref={refId}>

            <ButtonComponent/>

        </div>
    );
};

function App() {

    const uiComponentList = useRef(null);
    const uiDesignComponent = useRef(null);

    useEffect(() => {
        const right = uiDesignComponent.current;
        const left = uiComponentList.current;
        Dragula([left, right], {
            copySortSource: true,
            copy: function (el, source) {
                return source === left
            },
            accepts: function (el, target) {
                return target !== left
            }
        });
    }, [uiComponentList]);


    return (
        <>
            <div className="flex mb-4">
                <div className="w-1/2 bg-gray-400 h-12">
                    <ComponentListView refId={uiComponentList}/>
                </div>
                <div className="w-1/2 bg-gray-500 h-12">
                    <DesignView refId={uiDesignComponent}/>
                </div>
            </div>


        </>
    );

}

export default App;
