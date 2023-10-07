import axios from "axios";

export const getChat = async () => {
  let retries = 3;
  while (retries) {
    return await axios
      .get("https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a")
      .then((res) => {
        retries = 0;
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {}, 1000);
        retries--;
      });
  }
};
