import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import lifecycle from 'react-pure-lifecycle';

import * as d3 from 'd3';
import topojson from 'topojson';
import Datamap from '../node_modules/datamaps/dist/datamaps.usa.min.js';

// import statesDefaults from '../data/states-defaults';
import objectAssign from 'object-assign';
import { components } from 'react-select';

const methods = {
  componentDidMount (){
    console.log('component is mounted!')
    const mapContainer = d3.select('#datamap-container'); // select the element id 
    mapContainer.style(containerWidth); // add style to the element
  },
  componentDidUpdate(){
    // this.datamap.updateChoropleth(this.redducedData());
  },
  componentWillUnmount(){
    // d3.select('svg').remove();
  }
}

const dataMap = () => {
  const map = new Datamap({
    element: ReactDOM.findDOMNode({
      "id": 1,
      "name": "Alabama",
      "wage": 98530,
      "median_rent": 998,
      "cost_of_living_index": 89.3,
      "gas": 2.63,
      "milk": 3.75,
      "eggs": 0,
      "beer": 0
    }), // 
    scope: 'usa'
  });
  return (<div>
    <div id="datamap-container"></div>
    </div>)
  }
  
  export default dataMap;

