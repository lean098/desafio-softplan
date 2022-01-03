// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Router DOM
import { Router } from 'react-router-dom';

// RTL
import { render as rtlRender } from '@testing-library/react';
import '@testing-library/jest-dom';

// Types
import { history } from 'store';

// Root Reducer
import rootReducer from 'store/ducks/rootReducer';

function render(
  ui,
  {
    initialState,
    store = createStore(rootReducer(history), initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
