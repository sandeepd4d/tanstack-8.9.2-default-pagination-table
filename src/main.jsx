import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
// import BasicTable from './components/BasicTable.jsx';
import TableWithDefaultPagination from './components/TableWithDefaultPagination';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BasicTable /> */}
    <TableWithDefaultPagination />
    {/* <App /> */}
  </React.StrictMode>,
)
