exports.dynamicUpdateQuery = (query, data) => {
  const key = Object.keys(data);
  let finalQuery = "";

  for (let i = 1; i < key.length; i++) {
    if (i === 1) {
      finalQuery = finalQuery + `${key[i]}='${data[key[i]]}'`;
    } else {
      finalQuery = finalQuery + `, ${key[i]}='${data[key[i]]}'`;
    }
  }
  finalQuery = finalQuery + ` WHERE id=${data.id}`;
  return query + finalQuery;
};
