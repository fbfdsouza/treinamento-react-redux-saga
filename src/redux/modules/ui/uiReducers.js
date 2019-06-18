import { asImmutable } from '../../../utils';
// import * as actions from './uiActions';

const initialState = asImmutable({
  sidebarIsOpen: false
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
