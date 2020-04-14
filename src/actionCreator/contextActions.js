// import axios from 'axios';
import { contextActions } from '../actions';

// export const uploadVideo = () => {
//     const action = {};
//     axios({
//         baseURL: backendRoutes.BASE_URL,
//         url: backendRoutes.LOGIN,
//         method: "POST",
//         data: {
//           username: formData.username,
//           password: formData.password
//         },
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }).then((response) => {
//         return  {...action, type: 'UPLOAD_VIDEO_SUCCESS',  payload: response.data} 
//       }).catch((ex) => {
//         return  {...action, type: 'UPLOAD_VIDEO_FAILURE',  payload: response.data}
//       }); 
// }

export const selectQuestionType = (payload) => {
    return {type: contextActions.questionType, payload};
}

