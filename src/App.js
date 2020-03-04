import React, {useEffect, useRef, useState} from 'react';
import Dragula from 'react-dragula';
import './App.css';
import {DesignView} from "./designer/designer_view";
import {ComponentListView} from "./designer/component_list";

function App() {

    const uiComponentList = useRef(null);
    const uiDesignComponent = useRef(null);

    const [drake, setDrake] = useState(null);

    useEffect(() => {
        const right = uiDesignComponent.current;
        const left = uiComponentList.current;
        let drake = Dragula([left, right], {
            copySortSource: true,
            copy: function (el, source) {
                return source === left
            },
            accepts: function (el, target) {
                return target !== left
            }
        });

        setDrake(drake);


        return () => {

        }

    }, [uiComponentList]);


    return (
        <>
            <div className="flex mb-4">
                <div className="w-1/2 bg-gray-400 h-12">
                    <ComponentListView drake={drake} refId={uiComponentList}/>
                </div>
                <div className="w-1/2 bg-gray-500 h-12">
                    <DesignView refId={uiDesignComponent}/>
                </div>
            </div>


        </>
    );

}

export default App;
