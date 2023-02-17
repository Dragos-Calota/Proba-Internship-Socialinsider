const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getBrands = (req, res) => {
  fetch("https://app.socialinsider.io/api", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer API_KEY_TEST",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 0,
      method: "socialinsider_api.get_brands",
      params: {
        projectname: "API_test",
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => res.send(data.result));
};

module.exports = { getBrands };
