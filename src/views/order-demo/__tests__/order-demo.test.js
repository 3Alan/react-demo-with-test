import React from 'react';
import { shallow } from 'enzyme';
import OrderDemo from '../index';

describe('test order-demo', () => {
  it('render correct', () => {
    expect(shallow(<OrderDemo />));
  });
});
