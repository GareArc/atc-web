import axios from "axios";

const instance = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 8000,
})

/**
 * 
 * @param url  
 * @param params  
 * @returns {Promise}
 */
export function get(url, params = {}, config = {}) {
    config = ({...config, params: params});
    return new Promise((resolve, reject) => {
        instance.get(url, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * 
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url, data, config) {
    return new Promise((resolve, reject) => {
        instance.post(url, data, config)
            .then((response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.put(url, data)
            .then((response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function deleteMethod(url, param = {}) {
    return new Promise((resolve, reject) => {
        instance.delete(url, param)
            .then((response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 * 
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.patch(url, data)
            .then((response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}