import React from 'react';
import { mount } from 'enzyme';
import App from '../App.js';

describe('app test', () => {
  it('render correct', () => {
    expect(mount(<App />));
  });
});
