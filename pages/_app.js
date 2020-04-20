// import App from "next/app";
// import WithRedux from "../components/withRedux";
// import { Provider } from "react-redux";
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'

// function MyApp({ Component, pageProps, ReduxStore }) {
// 	let persistor = persistStore(ReduxStore)

// 	return (
// 		<Provider store={ReduxStore}>
// 			 <PersistGate
//           		loading={<Component {...pageProps} />}
//           		persistor={persistor}>
        
// 					<Component {...pageProps} />
// 			</PersistGate>
// 		</Provider>
// 	);
// }

// MyApp.getInitialProps = async appContext => {
// 	const appProps = await App.getInitialProps(appContext);
	
// 	/* 获取store并初始化 */
// 	const store = appContext.ReduxStore;
	
// 	store.subscribe(() => {
// 		console.log("store change");
// 	});
// 	store.dispatch({ type: "add" });
	
// 	return { ...appProps };
// };
// /* 使用WithRedux */
// export default WithRedux(MyApp);



import App from 'next/app'
import React from 'react'
import withReduxStore from '../components/withRedux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

class MyApp extends App {
  constructor(props) {
    super(props)
	this.persistor = persistStore(props.reduxStore)
	
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <PersistGate
          loading={<Component {...pageProps} />}
          persistor={this.persistor}
        >
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)