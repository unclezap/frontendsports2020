import {
    UPDATE_CORRECT_PREDICTIONS
} from './analysisTypes'

const batchSkeleton = {
    batchId: 0,
    correct: 0,
    incorrect: 0,
    errorMargin: 0,
}

const initialState = {
    batch: [batchSkeleton],
    loaded: false
}

const batchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CORRECT_PREDICTIONS:
            console.log("===================")

            console.log("state before", state)
            let updatedBatch = state.batch.filter(batch => batch.batchId === action.batchId)

            if (updatedBatch.length === 0) {
                updatedBatch = batchSkeleton
            } else {
                updatedBatch = updatedBatch[0]
            }

            updatedBatch.batchId = action.batchId
            updatedBatch.correct += action.correct
            updatedBatch.incorrect += action.incorrect
            updatedBatch.errorMargin += action.errorMargin

            console.log("state after",state)
            console.log("other batches", [...state.batch.filter(batch => batch.batchId !== action.batchId)])
            console.log("updatedBatch", updatedBatch)

            return {
                ...state,
                batch: [...state.batch.filter(batch => batch.batchId !== action.batchId), updatedBatch],
                loaded: true
            }
        default:
            return state;
    }
}

// const batchReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case UPDATE_CORRECT_PREDICTIONS:
//             console.log("===================")

//             // console.log("state before", state)
//             // console.log("action batchID", action.batchId)
//             // let updatedBatch = state.batch.filter(batch => batch.batchId === action.batchId)

//             if (state.batch.filter(batch => batch.batchId === action.batchId).length === 0) {
//                 console.log("skeleton creation")
//                 console.log("filter length", state.batch.filter(batch => batch.batchId !== action.batchId).length)
//                 console.log("filter", state.batch.filter(batch => batch.batchId !== action.batchId))
//                 let newBatch = batchSkeleton
//                 newBatch.batchId = action.batchId
//                 newBatch.correct += action.correct
//                 newBatch.incorrect += action.incorrect
//                 newBatch.errorMargin += action.errorMargin
//                 return {
//                     ...state,
//                     batch: [...state.batch.filter(batch => batch.batchId !== action.batchId), newBatch],
//                     loaded: true
//                 }
//             } else {
//                 console.log("old batch")
//                 console.log("state", state)
//                 console.log("filter", state.batch.filter(batch => batch.batchId !== action.batchId).length)
//                 // updatedBatch = updatedBatch[0]
//                 let updatedBatch = state.batch.filter(batch => batch.batchId === action.batchId)[0]
//                 updatedBatch.batchId = action.batchId
//                 updatedBatch.correct += action.correct
//                 updatedBatch.incorrect += action.incorrect
//                 updatedBatch.errorMargin += action.errorMargin
//                 return {
//                     // ...state,
//                     batch: [...state.batch.filter(batch => batch.batchId !== action.batchId), updatedBatch],
//                     loaded: true
//                 }
//             }

//             // console.log("state after",state)
//             // console.log("other batches", [...state.batch.filter(batch => batch.batchId !== action.batchId)])
//             // console.log("updatedBatch", updatedBatch)
//             // books: prev.books.map((book, index) => {
//             //     if (index == bookIndex) {
//             //       return { ...book, title: newTitle };
//             //     }
//             //     return book;
            
//         default:
//             return state;
//     }
// }

//attempt 2
// const batchReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case UPDATE_CORRECT_PREDICTIONS:
//             console.log("===================")

//             console.log("state before", state)
//             let updatedBatch = state.batch.map((batch) => {
//                 if (batch.batchId === action.batchId) {
//                     return batch
//                 }
//             })[0] 

//             console.log("updatedBatch", updatedBatch)
//             if (updatedBatch == undefined ) {
//                 console.log("skileton")
//                 updatedBatch = batchSkeleton
//             }

//             updatedBatch.batchId = action.batchId
//             updatedBatch.correct += action.correct
//             updatedBatch.incorrect += action.incorrect
//             updatedBatch.errorMargin += action.errorMargin

//             console.log("state after",state)
//             console.log("other batches", [...state.batch.filter(batch => batch.batchId !== action.batchId)])
//             console.log("updatedBatch", updatedBatch)

//             return {
//                 // ...state,
//                 batch: state.batch.map((batch) => {
//                     if (batch.batchId !== action.batchId) {
//                         return batch
//                     } else {
//                         return updatedBatch
//                     }
//                 }),
//                 loaded: true
//             }
//         default:
//             return state;
//     }
// }

export default batchReducer