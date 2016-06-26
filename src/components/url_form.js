import React, { Component } from 'react';
import trackUrl from '../utils/url';

export default class UrlForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: ''
    };
  }

  handleUrlChange(url) {
    this.setState({url});
  }

  handleUtmSourceChange(utm_source) {
    this.setState({utm_source});
  }

  handleUtmMediumChange(utm_medium) {
    this.setState({utm_medium});
  }

  handleUtmCampaignChange(utm_campaign) {
    this.setState({utm_campaign});
  }

  handleUtmContentChange(utm_content) {
    this.setState({utm_content});
  }

  utmUrl() {
    const utm_params = Object.assign({}, this.state);
    return trackUrl(this.state.url, utm_params);
  }

  render() {
    return (
      <div>
        <form>
          <label for="base-url">Base Url</label>
          <input
            id="base-url"
            className="u-full-width"
            type="text"
            value={this.state.url}
            onChange={event => this.handleUrlChange(event.target.value)}
          />
          <div className="row">
            <div className="six columns">
              <label for="utm-source">UTM Source</label>
              <select
                id="utm-source"
                value={this.state.utm_source}
                onChange={event => this.handleUtmSourceChange(event.target.value)}>
                  {
                    this.props.sources.map(function (source) {
                      return <option value={source.url_part} key={source.id} >{source.name}</option>
                    })
                  }
              </select>
            </div>
            <div className="six columns">
              <label for="utm-medium">UTM Medium</label>
              <select
                id="utm-medium"
                value={this.state.utm_medium}
                onChange={event => this.handleUtmMediumChange(event.target.value)}>
                  {
                    this.props.mediums.map(function (medium) {
                      return <option value={medium.url_part} key={medium.id} >{medium.name}</option>
                    })
                  }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <label for="utm-campaign">UTM Campaign</label>
              <input
                id="utm-campaign"
                className="u-full-width"
                type="text"
                value={this.state.utm_campaign}
                onChange={event => this.handleUtmCampaignChange(event.target.value)}
              />
            </div>
            <div className="six columns">
              <label for="utm-content">UTM Content</label>
              <input
                id="utm-content"
                className="u-full-width"
                type="text"
                value={this.state.utm_content}
                onChange={event => this.handleUtmContentChange(event.target.value)}
              />
            </div>
          </div>
        </form>
        <div>Output: {this.utmUrl()}</div>
      </div>
    );
  }
};
