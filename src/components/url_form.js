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

  handleUtmCampaignButton(event) {
    const today = new Date().toISOString().substring(0, 10).replace(/-/g, '');
    const utm_campaign = `${this.state.utm_campaign}-${today}`;
    this.setState({utm_campaign});
    event.preventDefault();
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
          <label for="base-url">Landing page URL<span>*</span></label>
          <input
            id="base-url"
            className="u-full-width"
            type="text"
            placeholder="Copy/paste landing page here..."
            value={this.state.url}
            onChange={event => this.handleUrlChange(event.target.value)}
          />
          <div className="row">
            <div className="six columns">
              <label for="utm-source">UTM Source<span>*</span></label>
              <select
                id="utm-source"
                value={this.state.utm_source}
                onChange={event => this.handleUtmSourceChange(event.target.value)}>
                  <option value=''></option>
                  {
                    this.props.sources.map(function (source) {
                      return <option value={source.url_part} key={source.id} >{source.name}</option>
                    })
                  }
              </select>
            </div>
            <div className="six columns">
              <label for="utm-medium">UTM Medium<span>*</span></label>
              <select
                id="utm-medium"
                value={this.state.utm_medium}
                onChange={event => this.handleUtmMediumChange(event.target.value)}>
                  <option value=''></option>
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
              <label for="utm-campaign">UTM Campaign<span>*</span></label>
              <input
                id="utm-campaign"
                className="u-full-width"
                type="text"
                value={this.state.utm_campaign}
                onChange={event => this.handleUtmCampaignChange(event.target.value)}
              />
            </div>
            <div className="six columns">
              <label for="utm-campaign-button">Date suffix</label>
              <input type="submit" value="Add" onClick={event => this.handleUtmCampaignButton(event)} />
            </div>
          </div>
          <label for="utm-content">UTM Content</label>
          <input
            id="utm-content"
            className="u-full-width"
            type="text"
            placeholder="Optional..."
            value={this.state.utm_content}
            onChange={event => this.handleUtmContentChange(event.target.value)}
          />
        <div className="row">
          <div className="twelve columns">
          <label for="utm-output">Final Tracking URL</label>
            <input
              id="utm-output"
              className="u-full-width"
              type="text"
              value={this.utmUrl()}
              style={{ background: "lightyellow"}}
              readonly
            />
          </div>
        </div>
        </form>


      </div>
    );
  }
};
