function groupBy(data, key) {
  return data.reduce((acc, cur) => {
    acc[cur[key]] = acc[cur[key]] || []; // if the key is new, initiate its value to an array, otherwise keep its own array value
    acc[cur[key]].push(cur);
    return acc;
  }, {});
}

export { groupBy };
