import d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min'
import React from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from '../data/states-defaults';
import statesData from '../data/statesData';
import objectAssign from 'object-assign';

export default class DataMap extends React.Component {
  constructor(props){
    super(props);
    this.datamap = null;
  }
  linearPalleteScale(value){ // for hesh color of the region
    const dataValues = this.props.regionData.map(function(data) { return Math.floor(data.cost_of_living_index) }); // define d3 color range
    const minVal = Math.min(...dataValues);
    const maxVal = Math.max(...dataValues);
    //Min and max range is from 0 -> 192
    return d3.scale.linear().domain([minVal, maxVal]).range(["#EFEFFF","#02386F"])(value);
  }
  redducedData(){
    // console.log('This.props is', this.props);
    // console.log('Region data is', this.props.regionData);
    const newData = this.props.regionData.reduce((object, data) => {
      // console.log('Object is', object);
      // console.log('Data is', data);
      //Testing display of wage & milk
      object[data.state_code] = { value: Math.floor(data.cost_of_living_index), fillColor: this.linearPalleteScale(Math.floor(data.cost_of_living_index)), salary: data.wage }; // setting model color and data
      return object;
    }, {});
    // const obj = objectAssign({}, statesDefaults, newData);
    // return console.log(obj);
    return objectAssign({}, statesData, newData); // updating states
  }
  renderMap(){
    return new Datamap({
      element: ReactDOM.findDOMNode(this),
      scope: 'usa',
      data: this.redducedData(),
      geographyConfig: {
        borderWidth: 0.5,
        highlightFillColor: '#FFCC80',
        popupTemplate: function(geography, data) {
          // console.log('geography is', geography);
          console.log('Data is from popupTemplate:', data)
          if (data /*&& data.cost_of_living_index*/) {
            // console.log('Am I inside yet?')
            return `<div class="hoverinfo"><strong> ${geography.properties.name} <br> Avg Salary: ${data.salary} <br> Avg Living: ${data.value} </strong></div>`;
          } else {
            return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
          }
        }
      }
    });
  }
  currentScreenWidth(){
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
  }
  componentDidMount(){
    console.log('window.innerWidth',window.innerWidth);
    console.log('document.documentElement.clientWidth:', document.documentElement.clientWidth);
    console.log('document.body.clientWidth:', document.body.clientWidth)

    const mapContainer = d3.select('#datamap-container');
    const initialScreenWidth = this.currentScreenWidth();
    const containerWidth = (initialScreenWidth < 600) ?
      { width: initialScreenWidth + 'px',  height: (initialScreenWidth * 0.5625) + 'px' } :
      { width: `${600*2.5}px`, height: `${350*2.5}px` } // filling the whole page

    mapContainer.style(containerWidth);
    this.datamap = this.renderMap();
    window.addEventListener('resize', () => { // resize the map
      const currentScreenWidth = this.currentScreenWidth();
      const mapContainerWidth = mapContainer.style('width');
      if (this.currentScreenWidth() > 600 && mapContainerWidth !== '600px') {
        d3.select('svg').remove();
        mapContainer.style({
          width: `${600*2.5}px`,
          height: `${350*2.5}px`
        });
        this.datamap = this.renderMap();
      }
      else if (this.currentScreenWidth() <= 600) {
        d3.select('svg').remove();
        mapContainer.style({
          width: currentScreenWidth + 'px',
          height: (currentScreenWidth * 0.5625) + 'px'
        });
        this.datamap = this.renderMap();
      }
    });
  }
  componentDidUpdate(){
    this.datamap.updateChoropleth(this.redducedData());
  }
  componentWillUnmount(){
    d3.select('svg').remove();
  }
  render() {
    return (
      <div id="datamap-container"></div>
    );
  }
}

DataMap.propTypes = {
    regionData: React.PropTypes.array.isRequired
};
