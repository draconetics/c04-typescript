import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from '../App';

/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Add Todo/i);
  expect(linkElement).toBeInTheDocument();
});

*/
describe("#App component",()=>{
  it('show App component', () => {
    const component = shallow(<App />);  
    expect(component).toMatchSnapshot();
  });
})