import { useState } from "react";
import { validations } from "../utils/validations";

//Hooks for text fields input
export function useInput(
  name,
  defaultValue = "",
  validate = () => {},
  regex = "",
  isClearInput = false
) {
  // set up the state for the inputs value prop and set it to the default value
  const [value, setValue] = useState(defaultValue);
  //set up state for the inputs error prop
  const [error, setError] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  // set up the event handler for onChange event
  function handleChange(e) {
    // set the state no matter what
    setValue(e.target.value);
    // handleValidate();
    // cancel any error
    setError(null);
    setErrorMessage("");
  }

  function clearInput() {
    setValue(defaultValue);
    setError(null);
  }

  // set up event handler for onBlur, if value is not set, setError to true
  function handleBlur() {
    // if (!value) return setError(true)
    handleValidate();
  }

  // call validate if supplied and set error appropriately
  function handleValidate() {
    if (validate === null) {
      return true;
    }
    if (!value) {
      setError(true);
      setErrorMessage(validations.EMPTY.message);
      return false;
    }
    const isValid = validate && validate(value, regex.pattern);
    if (isValid === true) {
      setError(false);
      setErrorMessage("");
    } else {
      setError(true);
      setErrorMessage(regex.message);
    }
    return isValid;
  }

  return {
    props: {
      name,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      valid: error === true ? false : error !== null ? true : null,
      invalid: error === true ? true : error !== null ? false : null
    },
    validate: handleValidate,
    helperText: errorMessage,
    clearInput,
    error
  };
}

// Hook for form submit button.
export function useSubmit(inputs, success) {
  // set up the state for the inputs causing errors
  const [errorItems, setErrorItems] = useState(null);

  // handle submit
  function handleSubmit(e) {
    e.preventDefault(); //prevent page refresh
    let data = {};
    //validate every input (in case there was no blur event)
    const errorItems = inputs.filter(input => input && input.validate() === false);
    console.log("Error items: ", errorItems);
    //persist the error items to state
    setErrorItems(errorItems);
    // if no errors, call success with name, value pairs as parameter
    if (errorItems && errorItems.length === 0) {
      inputs.forEach(({ props: { name, value } }) => {
        data = {
          ...data,
          [name]: value
        };
      });
      success &&
        success(
          // inputs.map(({ props: { name, value } }) => ({
          //     [name]: value,
          // }))
          data
        );
    }
  }

  return {
    props: {
      onSubmit: handleSubmit
    },
    errorItems
  };
}
