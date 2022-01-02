import React from 'react';
import Map from "./components/Map";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleRight, faChevronCircleDown, faSquare, faPlusSquare, faMinusSquare, faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far, faSquareFull, faCheckSquare, faChevronCircleRight, faChevronCircleDown, faMinusSquare, faPlusSquare, faSquare);


function App() {
    return (
        <Map/>
    );
}
export default App;
