import appActions from '../modules/app/actions';

let combinedActions;
export default (combinedActions = dispatch => {
  return {
    app: {...appActions(dispatch)},
  };
});
