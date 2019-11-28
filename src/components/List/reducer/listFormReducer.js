export default (state=null,action) => {
    switch (action.type) {
        case 'transmit_form_api':
            return {...action.value}
        default:
            return {...state}
    }
}