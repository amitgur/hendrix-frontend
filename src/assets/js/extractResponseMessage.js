export default function extractResponseMessage(e) {
  let message;
  if (
    e.hasOwnProperty("response") &&
    e.response.hasOwnProperty("data") &&
    e.response.data.hasOwnProperty("message")
  ) {
    message = e.response.data.message;
  } else if (
    e.hasOwnProperty("response") &&
    e.response.hasOwnProperty("data") &&
    e.response.data.hasOwnProperty("error") &&
    e.response.data.error.hasOwnProperty("message")
  ) {
    message = e.response.data.error.message;
  } else if (
    e.hasOwnProperty("response") &&
    e.response.hasOwnProperty("status")
  ) {
    if (e.response.status === 404) {
      message = "404 - הנתונים לא נמצאו";
    } else {
      message = e.response.statusText;
    }
  } else {
    message = e.hasOwnProperty("message") ? e.message : e;
  }

  if (process.env.DEVELOP) {
    console.error(JSON.stringify(e, null, 2));
  }
  return message;
}
