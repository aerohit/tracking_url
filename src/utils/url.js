import URI from 'urijs';

function trackUrl (base_url, utm_params) {
  const utm_source = utm_params.utm_source;
  const utm_medium = utm_params.utm_medium;
  const utm_campaign = utm_params.utm_campaign;
  const utm_content = utm_params.utm_content;
  const areValidParams = [base_url, utm_source, utm_medium, utm_campaign].every(p =>
    p !== undefined && p.trim().length > 0
  );
  if(areValidParams) {
    const url = new URI(base_url);
    url.addQuery("utm_source", utm_source);
    url.addQuery("utm_medium", utm_medium);
    url.addQuery("utm_campaign", utm_campaign);
    if (utm_content !== undefined && utm_content.trim().length > 0)
    url.addQuery("utm_content", utm_content);
    return url.toString();
  }
  return "not-all-params";
}

module.exports = trackUrl;
