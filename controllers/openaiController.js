const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
  try {
    const response = await openai.createImage({
      prompt, // openai에 전달할 프롬프트
      n: 1, // image create 개수
      size: imageSize, // image size
    });
    const imgURI = response.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imgURI,
    });
  } catch (e) {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      console.log(e.message);
    }
  }
};
module.exports = { generateImage };
