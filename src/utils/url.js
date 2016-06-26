function trackUrl (base_url, utm_params) {
  const utm_source = utm_params.utm_source;
  const utm_medium = utm_params.utm_medium;
  const utm_campaign = utm_params.utm_campaign;
  const areValidParams = [base_url, utm_source, utm_medium, utm_campaign].every(p =>
    p !== undefined && p.trim().length > 0
  );
  if(areValidParams) {
    return `${base_url}/?utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}`;
  }
  return undefined;
}

module.exports = trackUrl;
