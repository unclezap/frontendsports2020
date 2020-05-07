import {
    CREATE_CHART_OBJECT
} from './superAnalysisTypes'

export const addChartObject = (object) => {
    return {
        type: CREATE_CHART_OBJECT,
        options: object
    }
}