import React from 'react';
import {render} from 'react-dom';
import UrlForm from './components/url_form';
import utmData from './utm_data';


class App extends React.Component {
  render () {
    return (
      <div>
        <UrlForm sources={utmData.sources} mediums={utmData.mediums} />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
