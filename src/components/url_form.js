import React, { Component } from 'react';
import trackUrl from '../utils/url';
import Select from 'react-select';
import CopyToClipboard from 'react-copy-to-clipboard';
import 'react-select/dist/react-select.css';

export default class UrlForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
      copied: false
    };
  }

  logChange(val) {
    console.log("Selected: " + val);
  }

  handleCopy() {
      this.setState({copied: true});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleSelect(choice) {
  // returns choice.value and choice.index
    if (choice.index>=0) {
      this.setState({utm_source: choice.value + ' is a nice choice'});
    } else {
      this.setState({utm_source: choice.value + ' isn\'t on the list!'});
    }
  }

  handleUrlChange(url) {
    this.setState({url});
    this.setState({copied: false});
  }

  handleUtmSourceChange(utm_source) {
    this.setState({utm_source});
    this.setState({copied: false});
    console.log("Selected: " + utm_source.url_part || utm_source);
  }

  handleUtmMediumChange(utm_medium) {
    this.setState({utm_medium});
    this.setState({copied: false});
  }

  handleCombo(open) {
    this.setState({open});
    this.setState({copied: false});
  }

  handleUtmCampaignChange(utm_campaign) {
    this.setState({utm_campaign});
    this.setState({copied: false});

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

  noop() {
    return {};
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label for="base-url">Landing page URL*</label>
          <input
            id="base-url"
            className="u-full-width"
            type="text"
            pattern="^http(s)?://.*"
            value={this.state.url}
            onChange={event => this.handleUrlChange(event.target.value)}
            placeholder="Paste URL here.."
            autofocus
          />
          <div className="row">
            <div className="six columns">
              <label for="utm-source">UTM Source*</label>
                <Select
                  name="utm-source"
                  value={this.state.utm_source}
                  onChange={v => this.handleUtmSourceChange(v)}
                  labelKey='name'
                  resetValue=''
                  openOnFocus
                  searchable
                  onBlurResetsInput={false}
                  allowCreate={true}
                  valueKey='url_part'
                  noResultsText={false}
                  options={this.props.sources}

                  />
            </div>
            <div className="six columns">
              <label for="utm-medium">UTM Medium*</label>
                <Select
                  name="utm-medium"
                  value={this.state.utm_medium}
                  onChange={v => this.handleUtmMediumChange(v)}
                  openOnFocus
                  searchable
                  labelKey='name'
                  resetValue=''
                  onBlurResetsInput={true}
                  valueKey='url_part'
                  noResultsText='Try another one'
                  options={this.props.mediums}
                  />
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <label for="utm-campaign">UTM Campaign*</label>
              <input
                id="utm-campaign"
                className="u-full-width"
                type="text"
                value={this.state.utm_campaign}
                onChange={event => this.handleUtmCampaignChange(event.target.value)}
              />
            </div>
            <div className="six columns">
              <label for="utm-campaign-button">&nbsp;</label>
              <input type="submit" value="Add Date" onClick={event => this.handleUtmCampaignButton(event)} />
            </div>
          </div>
          <div class="row">
           <div className="six columns">
            <label for="utm-content">UTM Content</label>
            <input
              id="utm-content"
              className="u-full-width"
              type="text"
              value={this.state.utm_content}
              onChange={event => this.handleUtmContentChange(event.target.value)}
              placeholder="Optional"
            />
            </div>
          </div>
          <div className="row">
          <div className="twelve columns">
          <label for="utm-output">Final Tracking URL</label>
            <input
              id="utm-output"
              className="u-full-width"
              type="text"
              value={this.utmUrl()}
              style={{ background: "lightyellow"}}
              disabled
            />

          </div>
        </div>
        <CopyToClipboard text={this.utmUrl()}
              onCopy={event => this.handleCopy(event)}>
              <button className="button-primary">Copy to clipboard</button>
            </CopyToClipboard>
           {this.state.copied ? <span style={{color: 'darkgreen'}}><strong> Copied!</strong></span> : null}
        </form>


      </div>
    );
  }
};