import React from "react";
import ReactDOM from 'react-dom'
import App from './App'


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas,far)

ReactDOM.render(
  <React.StrictMode>
  <App></App>
  </React.StrictMode>,
  document.getElementById('React')
)