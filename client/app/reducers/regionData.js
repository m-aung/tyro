import { EDIT_ROW, DELETE_ROW, ADD_ROW } from '../constants/ActionTypes';
import objectAssign from 'object-assign';

export default function regionData(state = [], action) {
  switch (action.type) {
    case EDIT_ROW:
      return state.map((data) => {
        console.log('Inside regionData.js');
        if (data.regionName === action.regionName) {
          return objectAssign({}, data, { value: action.value });
        } else {
          return data;
        }
      });

    case DELETE_ROW:
      return state.filter((data) => {
        console.log('Inside regionData.js');
        return data.regionName !== action.regionName;
      });

    case ADD_ROW:
      return [
        {
          regionName: action.regionName,
          code: action.code,
          value: action.value,
        },
        ...state,
      ];

    default:
      return state;
  }
}
