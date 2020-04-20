// import { Component } from "react";
// import createMyStore from "../store/store";

// const isServer = typeof window === "undefined";
// const _REDUX_STORE_ = "_REDUX_STORE_";

// /* 
// 获取或创建一个store。每次进行后端渲染，都创建一个新的store，
// 请求返回后的首次前端渲染，也会创建一个新的store，与流程示意图一致。
//  */
// function getOrCreateStore(initialState) {
// 	if (isServer) {
// 		return createMyStore(initialState);
// 	}
// 	if (!window[_REDUX_STORE_]) {
// 		window[_REDUX_STORE_] = createMyStore(initialState);
// 	}
// 	return window[_REDUX_STORE_];
// }


// function WithRedux(Comp) {
// 	return class HOCComp extends Component {
// 		constructor(props) {
// 			super(props);
// 			/* 利用初始化后的state创建store */
// 			this.store = getOrCreateStore(props.initialState);
// 		}
// 		static async getInitialProps(ctx) {
			
//             const MyStore = getOrCreateStore({ counter: 0 });
//             /* 利用ctx把store传入App，在App中进行store的初始化 */
// 			ctx.ReduxStore = MyStore;
            
//             let appProps = {};
//             if(typeof Comp.getInitialProps === 'function'){
//                 appProps = await Comp.getInitialProps(ctx);
//             }
//             /* 
//             store初始化后，使用store的getState()方法获取初始化后的state，放入到return的对象中，
//             return的对象会被序列化，存放在id为"__NEXT_DATA__"的script标签中，随服务端渲染出的HTML返回，
//             前端渲染时从props中取出此state，生成与后端一致的store。
//             */
// 			return {
// 				...appProps,
// 				initialState: MyStore.getState()
// 			};
// 		}
// 		render() {
// 			/* 把constructor中生成的store通过props传到App中 */
// 			return <Comp {...this.props} ReduxStore={this.store} />;
// 		}
// 	};
// }

// export default WithRedux;



import React from 'react'
import createMyStore from "../store/store";

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return createMyStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createMyStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      }
    }

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}