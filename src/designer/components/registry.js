import {HeroComponentDesign2} from "./hero/landing_page";
import {HeroComponentDesign1} from "./hero/design_1";
import {NavigationSimple} from "./navigation/simple";
import {ProductListSimple} from "./product/simple";

export const ComponentRegistry = {
    "component_1": HeroComponentDesign2(),
    "component_2": HeroComponentDesign1(),
    "component_3": NavigationSimple(),
    "component_4": ProductListSimple(),
}