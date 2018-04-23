export const urlParams = (params) => { 
  const query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&');
  return '?' + query;
}

export default urlParams;