import React from 'react';


const useAlert = (visibility) => {

    const [isVisible, setIsVisible] = React.useState(visibility);
    const [message, setMessage] = React.useState('');


    const changeVisibility = (bool) => {
        setIsVisible(bool);
    }

    const handleMessage = (message) => {
        setMessage(message); 
    }

    return {
        isVisible,
        message,
        handleMessage,
        changeVisibility
    }

}

export default useAlert