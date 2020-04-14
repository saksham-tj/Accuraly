import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Col,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import "../Context.css";
import { useInput, useSubmit } from "../../../hooks/form";
import { handleValidation, validations } from "../../../utils/validations";
import { contextQuestionTypes } from "../../../utils/constants";
import { addQuestion } from "../../../actionCreator/questionActions";


export default function TRUE_FALSE(props) {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const questionText = useInput(
    "questionText",
    "",
    handleValidation,
    validations.EMPTY
  );
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [correctOption, setCorrectOption] = useState({
    key: "true",
    value: "true"
  });
  const submit = useSubmit(
    [questionText],

    handleSuccess
  );

  function handleSuccess(formData) {
    console.log("Data of add question==> ", formData);

    setIsDisabled(true);

    let questionData = {
      questionType: Object.keys(contextQuestionTypes)[2],
      text: formData.questionText,
      correctOptionSequence: "",
      Options: []
    };

    questionData.Options.push({
      answer: "true",
      sequence: "1"
    });
    questionData.Options.push({
      answer: "false",
      sequence: "2"
    });

    if (correctOption.value) {
      questionData = {
        ...questionData,
        correctOptionSequence: correctOption.key
      };
      // console.log("questionData for api: ", questionData);
      dispatch(addQuestion(questionData));
    } else {
      setCorrectOption(correctOption => {
        questionData = {
          ...questionData,
          correctOptionSequence: correctOption.key
        };
        // console.log("questionData for api----: ", questionData);
        dispatch(addQuestion(questionData));
        return correctOption;
      });
    }
  }

  function handleDropdownItem(option) {
    setCorrectOption(option);
  }

  const handleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <div className="questionContainer">
      {/* <Form {...submit.props} noValidate> */}
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="question-input">Question</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            type="text"
            disabled={isDisabled}
            //id="question-input"
            //name="question-input"
            placeholder="Question text goes here..."
            {...questionText.props}
          />
          <FormFeedback>{questionText.helperText}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="question-input">Select correct answer:</Label>
        </Col>
        <Col xs="12" md="9">
          <Dropdown
            isOpen={isDropDownOpen}
            toggle={handleDropDown}
            disabled={isDisabled}
          >
            <DropdownToggle caret>{correctOption.key}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                active={correctOption.value === 'true'}
                onClick={() =>
                  handleDropdownItem({
                    key: "true",
                    value: true
                  })
                }
              >
                {"true"}
              </DropdownItem>
              <DropdownItem
                active={correctOption.value === 'false'}
                onClick={() =>
                  handleDropdownItem({
                    key: "false",
                    value: false
                  })
                }
              >
                {"false"}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </FormGroup>
      {isDisabled ? (
        <Button
          type="button"
          size="sm"
          color="primary"
          onClick={e => {
            e.preventDefault();
            setIsDisabled(false);
          }}
        >
          <i className="fa fa-dot-circle-o"></i> Edit
        </Button>
      ) : (
        <Button
          type="submit"
          size="sm"
          color="primary"
          onClick={submit.props.onSubmit}
        >
          <i className="fa fa-dot-circle-o"></i> Add
        </Button>
      )}
      {/* <Button
        type="reset"
        size="sm"
        color="danger"
        //onClick={handleQuestionDelete}
      >
        <i className="fa fa-ban"></i> Delete
      </Button> */}
      {/* </Form> */}
    </div>
  );
}
