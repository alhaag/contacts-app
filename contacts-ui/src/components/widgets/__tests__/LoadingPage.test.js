import React from 'react'
import renderer from 'react-test-renderer'
import LoadingPage from '../LoadingPage';

test('Presentation LoadingPage component', () => {

  const component = renderer.create(
    <LoadingPage />,
  );
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

})