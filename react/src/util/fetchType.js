export const fetchType = (body) => { 
  return {
    get: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    post: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    },
  };
}

export default fetchType;