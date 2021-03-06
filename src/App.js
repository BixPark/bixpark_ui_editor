import React, {useEffect, useRef, useState} from 'react';
import Dragula from 'react-dragula';
import './App.css';
import {DesignView} from "./designer/designer_view";
import {ComponentListView} from "./designer/component_list";
import {SideBar} from "./designer/component_list/SideBar";

function App() {

    const uiComponentList = useRef(null);
    const uiDesignComponent = useRef(null);

    const [drake, setDrake] = useState(null);
    const [siteData, setSiteData] = useState({});
    const SiteDataManager = {
        notify: (Component, id, data) => {
            siteData[id] = {
                "data": data,
                "Component": Component
            };
            setSiteData(siteData);
            console.log(siteData);
        },
        getSiteData: () => {
            return siteData;
        },
        removeContent: (id) => {
            document.getElementById(id).remove();
            delete siteData[id];
        }
    };

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
            {/*<SideBar/>*/}


            <div className="h-screen flex flex-row flex-wrap flex w-full flex-grow content-start">
                <ComponentListView drake={drake} dataManager={SiteDataManager} refId={uiComponentList}
                                   designerViewId={uiDesignComponent}/>

                <div id="main-content" className="w-full flex-1">
                    <DesignView refId={uiDesignComponent} dataManager={SiteDataManager} drake={drake}/>
                </div>
            </div>


        </>
    );

}

export default App;
