


export const addToProject = (newProduct) => {
    return( dispatch, getState, { getFirebase, getFirestore} ) => {
        
        const firestore = getFirestore();
        firestore.collection('products').add({
            ...newProduct,
            Started_on: new Date(),
            Compleated: '0',
        }).then( () => {
            dispatch({ type: 'ADD_PRODUCT', newProduct })
        }).catch( (err) => {
            dispatch({ type: 'CREATE_ERROR', newProduct })
        })
    }
}