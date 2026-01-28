import axios from "axios";

const NETLIFY_FUNCTION_URL =
  "https://backendsendtelegram.netlify.app/.netlify/functions/SendTelegram";

const sendMessage = async (message) => {
  try {
    const res = await axios.post(NETLIFY_FUNCTION_URL, { message });
    console.log("Mensaje enviado:", res.data);
  } catch (err) {
    console.error("Error enviando mensaje:", err.response?.data || err.message);
  }
};

export default sendMessage;