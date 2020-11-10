import React from 'react';
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
  it('show App component', (done) => {
    const component = shallow(<App />);  
    expect(component).toMatchSnapshot();
    done();
  });
})