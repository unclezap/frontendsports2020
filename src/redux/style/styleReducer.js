// import stats from '../IMG/stats.gif'
// import helmetCatch from '../IMG/helmetCatch.gif'
// import code from '../IMG/code.gif'
// import twoHundredW from '../IMG/twoHundredW.gif'
// import balls from '../IMG/balls.gif'
// import hourGlass from '../IMG/hourGlass.gif'

import {
    KILL_CSS,
    REVIVE_CSS
} from './styleTypes'

const initialState = {
    backgroundImage1: null,
    backgroundImage2: null,
    backgroundImage3: null,
    backgroundImage4: null,
    // backgroundImage1: `url(${stats})`,
    // backgroundImage2: `url(${helmetCatch})`,
    // backgroundImage3: `url(${code})`,
    // backgroundImage4: `url(${twoHundredW})`,
    backgroundImage5: null,
    // loading1: `url(${balls})`,
    // loading2: `url(${hourGlass})`,
    loading1: null,
    loadeing2: null,
    color1: "white",
    color2: "red",
    color3: "darkblue",
    color4: "green",
    color5: "#cc00cc",
    color6: "ccffcc"
}

const styleReducer = (state=initialState, action) => {
    switch (action.type) {
        case KILL_CSS:
            return {
                backgroundImage1: null,
                backgroundImage2: null,
                backgroundImage3: null,
                backgroundImage4: null,
                backgroundImage5: null,
                color1: "white",
                color2: "white",
                color3: "white",
                color4: "white",
                color5: "white",
                color6: "white"
            }
        case REVIVE_CSS:
            return initialState
        default:
            return state;
    }
}

export default styleReducer