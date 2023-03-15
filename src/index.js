import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/styles.scss';
import 'styles/animate.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "redux/store";
import { ParallaxProvider } from 'react-scroll-parallax';
import { Amplify } from 'aws-amplify';
import config from './amplify-config';

Amplify.configure({
    API: {
        endpoints: [
            {
                name: "main-app",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    }
});

// This ensures that on mobile safari, we don't include the menu bar and search bar in our height 
// We set the height of body in all.css
function screenHeight() {
    function checkScreenHeight() {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    window.addEventListener('orientationchange', function () {
        // After orientationchange, add a one-time resize event
        var afterOrientationChange = function () {
            checkScreenHeight()
            window.removeEventListener('resize', afterOrientationChange);
        };
        window.addEventListener('resize', afterOrientationChange);
    })

    checkScreenHeight()
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    screenHeight()
}


ReactDOM.render(
    <Provider store={store}>
        <ParallaxProvider>
            <App />
        </ParallaxProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
