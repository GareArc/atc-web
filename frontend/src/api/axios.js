import axios from "axios";

const instance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:3000/api",
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
 export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance.get(url, { params: params })
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

 export function post(url, data) {
    return new Promise((resolve, reject) => {
        instance.post(url, data)
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