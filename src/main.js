import React from 'react';
import {render} from 'react-dom';
import UrlForm from './components/url_form';


class App extends React.Component {
  render () {
    return (
      <div>
        <UrlForm />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
