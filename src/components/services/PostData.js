export function PostData(type, userData) {
    let BaseURL = 'http://dearjean.ddns.net:44301/api/';


    return new Promise((resolve, reject) => {


        fetch(BaseURL + type, {
            method: 'POST',
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });


    });
}