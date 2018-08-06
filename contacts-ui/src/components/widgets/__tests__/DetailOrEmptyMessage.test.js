import React from 'react'
import renderer from 'react-test-renderer'
import DetailOrEmptyMessage from '../DetailOrEmptyMessage';

test('Presentation DetailOrEmptyMessage component has data text', () => {
  const component = renderer.create(
    <DetailOrEmptyMessage data="testing text" />
  );
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Presentation DetailOrEmptyMessage component empty data text', () => {
  const component = renderer.create(
    <DetailOrEmptyMessage data={undefined} />
  );
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Presentation DetailOrEmptyMessage component empty data text and custom error', () => {
  const component = renderer.create(
    <DetailOrEmptyMessage data={undefined} emptyText='Não informado' />
  );
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})