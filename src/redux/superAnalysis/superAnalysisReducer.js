import {
    CREATE_CHART_OBJECT
} from './superAnalysisTypes'

const initialState = {
    options: {},
    loaded: false
}

const superAnalysisReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CHART_OBJECT:

            if (state.loaded) {
                return {
                    options: action.options,
                    loaded: true
                }
            } else {
                return {
                    ...state,
                    options: Object.assign(state.options, Object.assign(state.options.series.data, state.options.series.data.push(action.options.series.data))),
                    loaded: true
                }
            }
        default:
            return state
    }
}

export default superAnalysisReducer