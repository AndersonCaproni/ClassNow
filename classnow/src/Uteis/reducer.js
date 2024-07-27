export function reducer(state, action) {
    switch(action.type) {
        case "update_input":
            return{
                ...state,
                [action.key]: action.value,
            };

        case "count_sum":
            return {
                ...state,
                [action.key]: state[action.key] + action.value,
            };
        
        case "count":
            return{
                ...state,
                [action.key]: state[action.key] + 1,
            };
        
        case "update_multiples":
            return action.object;

        case "boolean":
            return {
                ...state,
                [action.key]: !action.key,
            };
        default:
            return state;
    }
    
}