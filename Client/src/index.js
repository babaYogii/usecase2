import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { init as initApm } from "@elastic/apm-rum";

initApm({

  serviceName: 'React',


  serverUrl: 'https://fedd99c6c2a9445a9235a41a897dc998.apm.us-central1.gcp.cloud.es.io:443',


  serviceVersion: '',


  environment: 'my-environment'

})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


