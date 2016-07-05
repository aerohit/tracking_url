import URI from 'urijs';

function normalize(param) {
  return param.trim().toLowerCase().replace(/ /g, '_');
}

function trackUrl (base_url, utm_params) {
  const utm_source = utm_params.utm_source.url_part || utm_params.utm_source;
  const utm_medium = utm_params.utm_medium || utm_params.utm_medium;
  const utm_campaign = utm_params.utm_campaign;
  const utm_content = utm_params.utm_content;
  const areValidParams = [base_url, utm_source, utm_medium, utm_campaign].every(p =>
    p !== undefined && p.trim().length > 0
  );
  if(areValidParams) {
    const url = new URI(base_url);
    url.addQuery("utm_source", normalize(utm_source));
    url.addQuery("utm_medium", normalize(utm_medium));
    url.addQuery("utm_campaign", normalize(utm_campaign));
    if (utm_content !== undefined && utm_content.trim().length > 0) {
      const content = normalize(utm_content);
      url.addQuery("utm_content", content);
    }
    return url.toString();
    console.log("check" + url);
  }

  return "Please fill in all required fields...";
}

module.exports = trackUrl;
