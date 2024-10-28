const { createStore } = Redux

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

const initialState = {
    count: 101,
}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            }
        case CHANGE_BY:
            return {
                ...state,
                count: state.count + cmd.diff
            }
        default: return state    
    }
}


export const store = createStore(appReducer)