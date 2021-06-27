let url = 'http://localhost:60812/'
exports.Api = async (urlName, getOrPost, reqData) => {
  const data = await fetch(url + urlName, {
    method: getOrPost,
    body: reqData ? JSON.stringify(reqData) : null,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const jsonData = await data.json();
  return jsonData;
}