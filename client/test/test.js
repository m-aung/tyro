/* -------------------------------------------------------------------------- */
/*                            Welcome to React Test                           */
/* -------------------------------------------------------------------------- */

/* --------------------- Loading modules for enzyme test -------------------- */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

/* --------------------------- Loading Components --------------------------- */

import App from '../App.jsx';

describe('Testing App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it('includes 1 div', () => {
    expect(wrapper.find('div')).to.have.lengthOf(1);
  });
});
