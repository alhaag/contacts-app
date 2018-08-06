import React from 'react'
import renderer from 'react-test-renderer'
import PageTitle from '../PageTitle';

test('Presentation PageTitle component', () => {

  const component = renderer.create(
    <PageTitle title="Test Title" />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  /*tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();*/
})