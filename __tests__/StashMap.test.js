import React from 'react';
import ReactDOM from 'react-dom';
import StashMap from '../src/StashMap';
import _ from 'lodash';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  var app = shallow(<StashMap />);

});
