


const initialState = {
    lang: 'eng'
};

const languageReducer = ( state = initialState, action) => {
    switch(action.type) {
      case 'CHANGE_LANG': {
        return {
          ...state,
          lang: action.payload.lang
        }
      }   
      default:
        return state;
    }
}


export default languageReducer;