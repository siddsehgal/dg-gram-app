import axios from "axios";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";

type enqueueSnackbar = (
  message: SnackbarMessage,
  options?: OptionsObject
) => SnackbarKey;

type messageType = {
  success: boolean;
  error: boolean;
};
interface ApiCallType {
  endpoint?: string;
  URL: string;
  METHOD: string;
  body?: any;
  query?: any;
  headers?: any;
  PROTECTED: boolean;
  enqueueSnackbar: enqueueSnackbar;
  message: messageType;
}

export async function APICall({
  endpoint,
  URL,
  METHOD,
  body,
  query,
  headers,
  PROTECTED,
  enqueueSnackbar,
  message,
}: ApiCallType) {
  //
  let headersList = {
    "Content-Type": "application/json",
    ...headers,
    ...(PROTECTED
      ? { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
      : {}),
  };

  let bodyContent = JSON.stringify({
    ...body,
  });

  let queryStringUrl = query ? new URLSearchParams(query).toString() : null;
  console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL);

  if (!endpoint) endpoint = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  let reqOptions = {
    url: `${!endpoint ? "" : endpoint}${URL}${
      queryStringUrl ? `?${queryStringUrl}` : ""
    }`,
    method: METHOD,
    headers: headersList,
    data: bodyContent,
  };

  const AX: any = axios;
  let apiResponse: any;
  try {
    apiResponse = await AX.request(reqOptions);
    const res = apiResponse.data;
    popUpMessage(enqueueSnackbar, res, message);
    return res;
  } catch (err: any) {
    if (!err.response) {
      const res = {
        success: false,
        status: 500,
        message: "No Response from Server!!",
        errorCode: "",
        error: err,
        serverError: true,
      };

      popUpMessage(enqueueSnackbar, res, message);
      return res;
    }
    popUpMessage(enqueueSnackbar, err.response.data, message);
    return err.response.data;
  }
}

function popUpMessage(
  enqueueSnackbar: enqueueSnackbar,
  res: any,
  popUpOrNot: messageType
) {
  const { success, message, response } = res;

  if (!success && popUpOrNot.error)
    enqueueSnackbar(message, { variant: "error" });
  else if (success && popUpOrNot.success)
    enqueueSnackbar(message, { variant: "success" });
}
