import axios from 'axios';

export default function useAPI() {
    const instance = axios.create();

    async function fetch({ requestType, requestBody, requestURL }) {
        let response;
        const config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`
            }
        };
        if (requestType === 'get' || requestType === 'delete') {
            response = await instance[requestType](process.env.REACT_APP_API_URL + requestURL, config);
        } else {
            response = await instance[requestType](
                process.env.REACT_APP_API_URL + requestURL,
                requestBody,
                config
            );
        }
        const data = response.data ? response.data : true;

        return data;
    }
    return fetch;
}