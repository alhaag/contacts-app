import React from 'react'
import renderer from 'react-test-renderer'
import ActionBarBottom from '../ActionBarBottom';

describe('AuthReducer', () => {

  test('Render AuthReducer default props', () => {
    const component = renderer.create(
      <ActionBarBottom>
        <buttom type="button">Test</buttom>
      </ActionBarBottom>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});