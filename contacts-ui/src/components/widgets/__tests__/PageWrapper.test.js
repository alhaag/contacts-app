import React from 'react'
import renderer from 'react-test-renderer'
import PageWrapper from '../PageWrapper';

test('Presentation PageWrapper component', () => {

  const component = renderer.create(
    <PageWrapper>
      <p>Testing content</p>
    </PageWrapper>,
  );
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

})