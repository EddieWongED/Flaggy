const wrapPromise = (promise) => {
    let status = "pending";
    let result = "";
    let suspender = promise.then(res => {
        status = "success";
        result = res;
    }, err => {
        status = "error";
        result = err;
    });

    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else {
                return result;
            }
        }
    }
}

export const randomNumber = () => {
    return new Promise(res => setTimeout(() => res(Math.random()), 3000));
}

export const createResource = () => {
    return {
        num: wrapPromise(randomNumber()),
        countries: require('./Countries.json')
    }
}

