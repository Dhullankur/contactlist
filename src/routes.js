import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './home';
import EditContact from './editContact';
import AddContact from './addContact';
const Routes = () => {
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path="/edit-contact/:id" component={EditContact} />
        <Route exact path="/add-contact" component={AddContact} />
        <Route exact path="/" component={Home} />
      </Switch>

    </BrowserRouter>
  );
}

export default Routes;
