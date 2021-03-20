// React
import React from 'react';

// Third party
import TestRenderer from 'react-test-renderer';
import sinon, {SinonSandbox} from 'sinon';
import {ThemeProvider} from 'styled-components/native';
import { Alert, TouchableHighlight } from "react-native";

// Themes
import themes from '../../../themes';

// Components
import EntityItem from './Item';
import { GhostSecondaryButton } from '../../Layout';

jest.mock('../../../translations');

describe('EntityItem', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    jest.useFakeTimers();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('Should render component', () => {
    const TestComponent = sandbox.stub().callsFake(() => null);
    const onChange = sandbox.stub();
    const item = {id: 'truc'};

    const testRenderer = TestRenderer.create(
      <ThemeProvider theme={themes.women}>
        <EntityItem value={item} component={TestComponent} onChange={onChange} />
      </ThemeProvider>,
    );

    const instance = testRenderer.root.findByType(TestComponent);

    expect(TestComponent.calledOnce).toBeTruthy();
    expect(instance).toBeDefined();
    expect(instance.props).toMatchObject({
      value: item,
      edit: false,
    });
  });

  it('Should render edit component when touching it', () => {
    const TestComponent = sandbox.stub().callsFake(() => null);
    const onChange = sandbox.stub();
    const item = {id: 'truc'};

    const testRenderer = TestRenderer.create(
      <ThemeProvider theme={themes.women}>
        <EntityItem value={item} component={TestComponent} onChange={onChange} />
      </ThemeProvider>,
    );

    const testInstance = testRenderer.root.findByType(TestComponent);
    const instance = testRenderer.root.findByType(TouchableHighlight);

    expect(instance).toBeDefined();

    TestRenderer.act(() => {
      instance.props.onPress();
    })

    expect(testInstance.props).toMatchObject({
      value: item,
      edit: true,
    });
  });
  
  it('Should render remove button', () => {
    const TestComponent = sandbox.stub().callsFake(() => null);
    const onChange = sandbox.stub();
    const item = {id: 'truc'};
    const alertSpy = sandbox.stub(Alert, 'alert');

    const testRenderer = TestRenderer.create(
      <ThemeProvider theme={themes.women}>
        <EntityItem value={item} component={TestComponent} onChange={onChange} />
      </ThemeProvider>,
    );

    const instance = testRenderer.root.findByType(GhostSecondaryButton);

    expect(instance).toBeDefined();
    expect(alertSpy.notCalled).toBeTruthy();

    instance.props.onPress();

    expect(alertSpy.calledOnce).toBeTruthy();
  });
});
