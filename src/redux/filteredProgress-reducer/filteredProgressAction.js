

export const updateFilteredProgress = (apps) => ({
    type: 'UPDATE_FILTERED_PROGRESS',
    payload: apps
});  
export default updateFilteredProgress


export const updateFilteredProgressTitle = (title) => ({
    type: 'UPDATE_FILTERED_PROGRESS_TITLE',
    payload: title
});  

export const updateFilteredProgressButtonValue = (value) => ({
    type: 'UPDATE_FILTERED_PROGRESS_BUTTON_VALUE',
    payload: value
});  
