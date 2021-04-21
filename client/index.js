import React from 'react';
import { render } from 'react-dom';
// import App from './App';
import styles from './stylesheets/styles.scss';
import BarChart from './BarChart';

render(<App />, document.getElementById('root'));

export default function App() {
  return (
    <div>
      <h5>Inside App component</h5>
      <
      {/* <Map /> */}
      <BarChart />
    </div>
  );
}
