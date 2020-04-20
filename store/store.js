import { createStore, applyMiddleware } from 'redux'
import { persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'



const ADD = 'add';

const defaultState = {
    counter: 1
}

function reducer(preState, action) {
    switch (action.type) {
        case ADD:
            // return {
            //     ...preState,
            //     counter: preState.counter+1
            // }
            return Object.assign({}, preState, {
                counter: preState.counter + 1,
              })
        default:
            return preState
    }
}

const persistConfig = {
    key: 'root',
    storage,
   // whitelist: ['exampleData'], // place to select which state you want to persist
}
  
  const persistedReducer = persistReducer(persistConfig, reducer)



function createMyStore(initialState = defaultState) {
    //const MyStore = createStore(reducer, initialState);
   
    const MyStore = createStore(
        persistedReducer, 
        initialState,
        composeWithDevTools(applyMiddleware())
    );
    return MyStore
}
// export const persistor = persistStore(createMyStore)
export default createMyStore

