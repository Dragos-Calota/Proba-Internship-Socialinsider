const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getBrands = async (req, res) => {
  let timestamp = req.params.timestamp;
  let brands = [];

  const brandDataResponse = await fetch("https://app.socialinsider.io/api", {
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
  });

  const brandData = await brandDataResponse.json();

  for (const element of brandData.result) {
    const profiles = element.profiles;
    const brandName = element.brandname;
    const numberOfProfiles = profiles.length;
    let totalFans = 0;
    let totalEngagements = 0;

    for (const profile of profiles) {
      const profileDataResponse = await fetch(
        "https://app.socialinsider.io/api",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer API_KEY_TEST",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 0,
            method: "socialinsider_api.get_profile_data",
            params: {
              id: profile.id,
              profile_type: profile.profile_type,
              date: {
                start: timestamp,
                end: timestamp,
                timezone: "Europe/London",
              },
            },
          }),
        }
      );

      const profileData = await profileDataResponse.json();

      let convertedDate = null;
      const date = new Date(Math.floor(timestamp));

      convertedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;

      if (date.getDate() < 10) {
        convertedDate = `0${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`;
      }
      if (date.getMonth() + 1 < 10) {
        convertedDate = `${date.getDate()}-0${
          date.getMonth() + 1
        }-${date.getFullYear()}`;
      }
      if (date.getDate() < 10 && date.getMonth() + 1 < 10) {
        convertedDate = `0${date.getDate()}-0${
          date.getMonth() + 1
        }-${date.getFullYear()}`;
      }

      if (profileData.resp[profile.id][convertedDate].followers) {
        totalFans += profileData.resp[profile.id][convertedDate].followers;
      }

      if (profileData.resp[profile.id][convertedDate].engagement) {
        totalEngagements +=
          profileData.resp[profile.id][convertedDate].engagement;
      }
    }

    brands.push({
      brandName: brandName,
      numberOfProfiles: numberOfProfiles,
      totalFans: totalFans,
      totalEngagements: totalEngagements,
    });
  }

  res.json(brands);
};

module.exports = { getBrands };
