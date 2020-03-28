const axios = require("axios");
import config from "../../config.json";

/**
 * Function get all countries data from the api
 */
export function getCasesByCountry() {
  return new Promise((resolve, reject) => {
    console.log(config);
    axios
      .get(config.RAPIDAPI.URL + "/cases_by_country.php", {
        headers: {
          "x-rapidapi-host": config.RAPIDAPI.HOST,
          "x-rapidapi-key": config.RAPIDAPI.API_KEY
        }
      })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });

}

/**
 * Function get world data from the api
 */
export function getWorldStats() {
  return new Promise((resolve, reject) => {
    axios
      .get(config.RAPIDAPI.URL + "/worldstat.php", {
        headers: {
          "x-rapidapi-host": config.RAPIDAPI.HOST,
          "x-rapidapi-key": config.RAPIDAPI.API_KEY
        }
      })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
}
