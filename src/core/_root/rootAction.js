import appActions from '../modules/app/actions';
import peopleActions from '../modules/people/actions';

let combinedActions;
export default (combinedActions = dispatch => {
  return {
    app: {...appActions(dispatch)},
    people: {...peopleActions(dispatch)},
  };
});
