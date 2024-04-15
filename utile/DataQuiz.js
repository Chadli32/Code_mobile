import axios from "axios";

export default DataQuiz = async (cat) => {
  const options = {
    method: "GET",
    url: "https://quiz26.p.rapidapi.com/questions",
    params: {
      cat: cat,
      sort: "questions",
      limit: "10",
      page: "3",
    },
    headers: {
      "X-RapidAPI-Key": "e93e55bd45msh0d7bbb658bb6275p1312e8jsnbc2edb811e08",
      "X-RapidAPI-Host": "quiz26.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
