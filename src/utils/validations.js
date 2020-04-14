export const validations = {
    // eslint-disable-next-line
    EMAIL: {
        pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Invalid Email address"
    },
    NUMBER: {
        pattern: /^\d*$/,
        message: "Please enter numeric values."
    },
    EMPTY: {
        pattern: /^(.|\s)*\S(.|\s)*/,
        message: "This field is required"
    },
    PASSWORD: {
        pattern: /^(?=\S*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()+_\-=}{[\]|:;"\/?.><,`~]).{8,15}$/,
        message: "Password must have at least 1 uppercase, 1 lowercase, 1 special character pattern."
    }
};

export function handleValidation(value, regex) {
    // we could get fancy here with validations based on type of input
    // could be put in a form hook library and imported
    if (value) {
        if (value && regex && value.match(regex)) return true;
        return false;
    }
    else {
        return false;
    }

    // console.log("value && regex && value.match(regex): ", !!(value && regex && value.match(regex)))
    // return !!(value && regex && value.match(regex))
}

export function handleCustomValidation(value, regex) {
    // we could get fancy here with validations based on type of input
    // could be put in a form hook library and imported
    if (value) {
        if (value && regex && value.match(regex)) return true;
        return false;
    }
    else if(value === '') {
        return false;
    }
    return true
    // console.log("value && regex && value.match(regex): ", !!(value && regex && value.match(regex)))
    // return !!(value && regex && value.match(regex))
}

export function isObjectEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}