import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/components/App';
import StashMap from '../../src/components/StashMap';
import _ from 'lodash';
import { shallow } from 'enzyme';

it('contains StashMap', () => {
  var app = shallow(<App />);

  //expect(app.contains(<StashMap />)).toEqual(true);
});
