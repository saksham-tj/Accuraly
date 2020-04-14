import axios from "axios";
import { backendRoutes } from "./constants";

export const onInitialNetConnection = () => {
  // NetInfo.isConnected.removeEventListener(onInitialNetConnection);
  console.log("onInitialNetConnection CALLED");
};

/**
 * Genric function to make api calls with method post
 * @param {apiPost} url  API end point to call
 * @param {apiPost} responseSuccess  Call-back function to get success response from api call
 * @param {apiPost} responseErr  Call-back function to get error response from api call
 * @param {apiPost} requestHeader  Request header to be send to api
 * @param {apiPost} body data to be send through api
*/

export function apiGet(
    url, 
    requestHeader,
    responseSuccess,
    responseErr,
){
    axios({
        baseURL: backendRoutes.BASE_URL,
        url: url,
        method: "GET",
        headers: requestHeader
    })
    .then((res) =>{
        responseSuccess(res)
    })
    .catch((err) => {
        responseErr(err)
    })  
}

export function apiPost(
  url,
  body,
  requestHeader,
  responseSuccess,
  responseErr,
) {
  axios({
    baseURL: backendRoutes.BASE_URL,
    url: url,
    method: "POST",
    data: body,
    headers: requestHeader
  })
    .then(response => {
      responseSuccess(response);
    })
    .catch(err => {
      responseErr(err);
    });

  //   fetch(url, {
  //     method: "POST",
  //     headers: requestHeader,
  //     body: body
  //   })
  //     .then(errorHandler)
  //     .then(response => response.json())
  //     .then(responseFetched => checkAPIStatus(responseFetched))
  //     .then(responseProcessed =>
  //       responseSuccess(responseProcessed.data, responseProcessed.message)
  //     )
  //     .catch(err => responseErr(err));
}

export async function apiPostForFileUpload(
  url,
  body,
  imageURI,
  responseSuccess,
  responseErr
) {
  let formdata = new FormData();

  formdata.append("data", JSON.stringify(body));
  formdata.append("encrypt_flag", 0);

  const uriParts = imageURI.split(".");
  const fileType = uriParts.length > 0 ? uriParts[uriParts.length - 1] : "jpeg";
  formdata.append("fileName", {
    uri: imageURI,
    name: `testPhotoName.${fileType}`,
    type: `image/${fileType}`
  });

  fetch(url, {
    method: "POST",
    body: formdata,
    headers: {
      Sessiontoken: "vMoDbd5W5Z3JJVhRPhZbIpnWIlR1MX",
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  })
    .then(errorHandler)
    .then(response => response.json())
    .then(responseFetched => checkAPIStatus(responseFetched))
    .then(responseProcessed =>
      responseSuccess(responseProcessed.data, responseProcessed.message)
    )
    .catch(err => responseErr(err));
}

//Error Handler
/**
 *
 * @param {errorHandler} response Generic function to handle error occur in api
 */
const errorHandler = response => {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 401 ||
    response.status === 400
  ) {
    return Promise.resolve(response);
  } else {
    var error = new Error(response.statusText || response.status);
    error.response = response;
    return Promise.reject(error);
  }
};

const checkAPIStatus = reponseFetched => {
  if (
    reponseFetched.res_data !== undefined &&
    reponseFetched.res_data.data !== undefined
  ) {
    let actualResponse = reponseFetched.res_data;
    let status = actualResponse.status || false;
    if (status) {
      return Promise.resolve({
        data: actualResponse.data,
        message: actualResponse.message
      });
    } else {
      return Promise.reject(actualResponse);
    }
  } else {
    return Promise.reject(reponseFetched);
  }
};
