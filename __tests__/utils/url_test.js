jest.unmock('../../src/utils/url'); // unmock to use the actual implementation of sum

describe('sum', () => {
  const trackUrl = require('../../src/utils/url');
  const base_url = "http://www.abc.com";
  const utm_params = {
    utm_source: 'utm_source',
    utm_medium: 'utm_medium',
    utm_campaign: 'utm_campaign'
  }

  it('Tracking url should be undefined if base url is undefined', () => {
    expect(trackUrl(undefined, utm_params)).toBe(undefined);
  });

  it('Tracking url should be undefined if base url is empty', () => {
    expect(trackUrl("  ", utm_params)).toBe(undefined);
  });

  it('Tracking url should be undefined if utm_source is empty or undefined', () => {
    const expectedUrl = trackUrl(base_url, {
      utm_medium: 'utm_medium',
      utm_campaign: 'utm_campaign'
    });
    expect(expectedUrl).toBe(undefined);
  });

  it('Tracking url should be undefined if utm_medium is empty or undefined', () => {
    const expectedUrl = trackUrl(base_url, {
      utm_source: 'utm_source',
      utm_medium: undefined,
      utm_campaign: 'utm_campaign'
    });
    expect(expectedUrl).toBe(undefined);
  });

  it('Tracking url should be undefined if utm_source is empty or undefined', () => {
    const expectedUrl = trackUrl(base_url, {
      utm_source: 'utm_source',
      utm_medium: 'utm_medium',
      utm_campaign: '   '
    });
    expect(expectedUrl).toBe(undefined);
  });

  it('Tracking url should not contain utm_content if empty or undefined', () => {
    const expectedUrl = trackUrl(base_url, {
      utm_source: 'utm_source',
      utm_medium: 'utm_medium',
      utm_campaign: 'utm_campaign'
    });
    expect(expectedUrl).toBe('http://www.abc.com/?utm_source=utm_source&utm_medium=utm_medium&utm_campaign=utm_campaign');
  });

});
