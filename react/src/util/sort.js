export const sortByDate = (data, sortKey) => { // deprecated
  return data.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return -1;
    }

    if (a[sortKey] > b[sortKey]) {
      return 1;
    }

    return 0;
  });
}

export default sortByDate;