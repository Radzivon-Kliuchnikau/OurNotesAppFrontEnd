// import useAuth from "./UseAuth.tsx";
// import {useEffect, useState} from "react";
// import API_URL from "../utils/Constants.tsx";
// import axios from "../services/api/axios.tsx";
//
// const useAuthCheck = () => {
//     const { setAuthUser} = useAuth();
//     const [loading, setLoading] = useState<boolean>(true);
//     const [internalError, setInternalError] = useState<boolean>(false);
//
//     const callAuthWithRetry = async () => {
//         let retryCount: number = 0;
//         const maxRetries: number = 2;
//         const delayTime: number = 1000
//         const waitForRetry = (delay: number) => {
//             return new Promise((resolve) => setTimeout(resolve, delay))
//         }
//         while (retryCount <= maxRetries) {
//             try {
//                 const response = await axios.get(API_URL.CHECK_AUTH);
//                 if (response.status == 200) {
//                     setAuthUser({Email: response.data.email, Name: response.data.name});
//                     setInternalError(false);
//                     break;
//                 }
//             } catch (error: any) {
//                 console.error("Error during auth check:", error);
//                 if (error.status == 401) {
//                     console.log("Unauthorized");
//                     setAuthUser(null);
//                     setInternalError(false);
//                     break;
//                 } else {
//                     retryCount++;
//                     if (retryCount > maxRetries) {
//                         setInternalError(true);
//                         setAuthUser(null);
//                         break;
//                     }
//                     await waitForRetry(delayTime);
//                 }
//             }
//         }
//         setLoading(false);
//     }
//
//     useEffect(() => {
//         callAuthWithRetry();
//     }, [])
//
//     return { loading, internalError };
// };
//
// export default useAuthCheck;
