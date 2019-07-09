/*
import {
    CHECKOUT_BEGIN,
    CHECKOUT_SUCCESS,
    CHECKOUT_ERROR,
    RESET_DATA
} from '../actions/-actionFetchData';
*/


const initialState = {
    client: [
        {
            id: 0,
            type: 'text',
            value:'client_firstname',
            isRequired: true,
            placeholder: '',
            Lable_eng: 'Firstname'
        },
        {
            id: 1,
            type: 'text',
            value:'client_lastname',
            isRequired: true,
            placeholder: '',
            Lable_eng: 'Lastname'
        },
        {
            id: 2,
            type: 'email',
            value:'client_email',
            isRequired: true,
            placeholder: '',
            Lable_eng: 'E-mail'
        },
        {
            id: 3,
            type: 'text',
            value:'client_address',
            isRequired: true,
            placeholder: '',
            Lable_eng: 'Address'
        },
        {
            id: 4,
            type: 'text',
            value:'client_city',
            isRequired: true,
            placeholder: '',
            Lable_eng: 'City'
        },
        {
            id: 5,
            type: 'text',
            value:'client_zip',
            isRequired: true,
            placeholder: '',
            Lable_eng: 'ZIP code'
        },
        {
            id: 6,
            type: 'text',
            value:'client_state',
            isRequired: false,
            placeholder: '',
            Lable_eng: 'State'
        },
        {
            id: 7,
            type: 'text',
            value:'client_country',
            isRequired: true,
            placeholder: '',
            Lable_eng: 'Country'
        },
        {
            id: 8,
            type: 'text',
            value:'client_phone',
            isRequired: true,
            placeholder: '',
            Lable_eng: 'Phone'
        }
    ],
    delivery: [
        {
            id: 0,
            type: 'text',
            value:'deliver_name',
            isRequired: false,
            placeholder: 'Andrea Borcheli',
            Lable_eng: 'Full name'
        },
        {
            id: 1,
            type: 'text',
            value:'deliver_address',
            isRequired: false,
            placeholder: '',
            Lable_eng: 'Address'
        },
        {
            id: 2,
            type: 'text',
            value:'deliver_city',
            isRequired: false,
            placeholder: '',
            Lable_eng: 'City'
        },
        {
            id: 3,
            type: 'text',
            value:'deliver_zip',
            isRequired: false,
            placeholder: '',
            Lable_eng: 'ZIP code'
        },
        {
            id: 4,
            type: 'text',
            value:'deliver_state',
            isRequired: false,
            placeholder: '',
            Lable_eng: 'State'
        },
        {
            id: 5,
            type: 'text',
            value:'deliver_country',
            isRequired: false,
            placeholder: '',
            Lable_eng: 'Country'
        },
        {
            id: 6,
            type: 'text',
            value:'deliver_phone',
            isRequired: false,
            placeholder: '',
            Lable_eng: 'Phone'
        }
    ],
    payment: [
        {
            id: 0,
            Lable_eng: 'Choose your payment method ...'
        },
        {
            id: 1,
            Lable_eng: 'PayPal'
        },
        {
            id: 2,
            Lable_eng: 'Bank draft'
        },
        {
            id: 3,
            Lable_eng: '"Unistream" payment (RU, UA, ..)'
        },
        {
            id: 4,
            Lable_eng: '"Kontakt" payment (RU, UA, ..)'
        },
        {
            id: 5,
            Lable_eng: 'Cash on delivery (LV)'
        }
    ],
    loading: false,
    error: null
};

const checkoutReducer = ( state = initialState, action) => {
    switch(action.type) {  
      case 'CHECKOUT_SUCCESS':
        return {
          ...state,
          loading: false,
          response: action.payload.res
        };
  
      case 'CHECKOUT_ERROR':
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            client: [], 
            delivery: [],
            payment: []
        };

      case 'RESET_DATA':
        return { ...state, ...initialState }    

      default:
        return state;
    }
}

export default checkoutReducer;
/*
[
    {
        id: 0,
        group_id: 1,
        type: 'text',
        placeholder: '',
        Lable_eng: 'Firstname'
    },
    {
        id: 1,
        group_id: 1,
        type: 'text',
        placeholder: '',
        Lable_eng: 'Lastname'
    },
    {
        id: 2,
        group_id: 1,
        type: 'email',
        placeholder: '',
        Lable_eng: 'E-mail'
    },
    {
        id: 3,
        group_id: 1,
        type: 'text',
        placeholder: '',
        Lable_eng: 'Address'
    },
    {
        id: 4,
        group_id: 1,
        type: 'text',
        placeholder: '',
        Lable_eng: 'City'
    },
    {
        id: 5,
        group_id: 1,
        type: 'text',
        placeholder: '',
        Lable_eng: 'ZIP code'
    },
    {
        id: 6,
        group_id: 1,
        type: 'text',
        placeholder: '',
        Lable_eng: 'State'
    },
    {
        id: 7,
        group_id: 1,
        type: 'text',
        placeholder: '',
        Lable_eng: 'Country'
    },
    {
        id: 8,
        group_id: 1,
        type: 'text',
        placeholder: '',
        Lable_eng: 'Phone'
    },

    // 

    
    {
        id: 9,
        group_id: 2,
        type: 'text',
        placeholder: 'Andrea Borcheli',
        Lable_eng: 'Full name'
    },
    {
        id: 10,
        group_id: 2,
        type: 'text',
        placeholder: '',
        Lable_eng: 'Address'
    },
    {
        id: 11,
        group_id: 2,
        type: 'text',
        placeholder: '',
        Lable_eng: 'City'
    },
    {
        id: 12,
        group_id: 2,
        type: 'text',
        placeholder: '',
        Lable_eng: 'ZIP code'
    },
    {
        id: 13,
        group_id: 2,
        type: 'text',
        placeholder: '',
        Lable_eng: 'State'
    },
    {
        id: 14,
        group_id: 2,
        type: 'text',
        placeholder: '',
        Lable_eng: 'Country'
    },

    //
    
    {
        id: 15,
        group_id: 3,
        type: 'text',
        placeholder: '',
        Lable_eng: 'PayPal'
    },
    {
        id: 16,
        group_id: 3,
        type: 'text',
        placeholder: '',
        Lable_eng: 'Bank draft'
    },
    {
        id: 17,
        group_id: 3,
        type: 'text',
        placeholder: '',
        Lable_eng: '"Unistream" payment (RU, UA, ..)'
    },
    {
        id: 18,
        group_id: 3,
        type: 'text',
        placeholder: '',
        Lable_eng: '"Kontakt" payment (RU, UA, ..)'
    },
    {
        id: 19,
        group_id: 3,
        type: 'text',
        placeholder: '',
        Lable_eng: 'Cash on delivery (LV)'
    },
]
*/