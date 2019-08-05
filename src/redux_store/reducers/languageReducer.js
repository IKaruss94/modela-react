
import { Helmet } from 'react-helmet'

const HTMLlangCodes = [
  { 'ENG': 'en' },
  { 'LAT': 'lv' },
  { 'RUS': 'ru' },
]


const initialState = {
    lang: 'ENG'
};

const languageReducer = ( state = initialState, action) => {
    switch(action.type) {
      case 'CHANGE_LANG': {
        document.documentElement.lang = HTMLlangCodes[action.payload.lang];
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