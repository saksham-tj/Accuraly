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
import { addQuestion } from "../../../actionCreator/questionActions";
import { contextQuestionTypes } from "../../../utils/constants";

export default function MCQ4(props) {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);
  const questionText = useInput(
    "questionText",
    "",
    handleValidation,
    validations.EMPTY
  );
  const option1 = useInput("option1", "", handleValidation, validations.EMPTY);
  const option2 = useInput("option2", "", handleValidation, validations.EMPTY);
  const option3 = useInput("option3", "", handleValidation, validations.EMPTY);
  const option4 = useInput("option4", "", handleValidation, validations.EMPTY);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [correctOption, setCorrectOption] = useState({
    key: option1.props.name,
    value: option1.props.value
  });
  const submit = useSubmit(
    [questionText, option1, option2, option3, option4],
    handleSuccess
  );

  function handleSuccess(formData) {

    setIsDisabled(true);

    let questionData = {
      questionType: Object.keys(contextQuestionTypes)[0],
      text: formData.questionText,
      correctOptionSequence: '',
      Options: []
    };

    questionData.Options.push({
      answer: option1.props.value,
      sequence: "1",
    });
    questionData.Options.push({
      answer: option2.props.value,
      sequence: "2",
    });
    questionData.Options.push({
      answer: option3.props.value,
      sequence: "3",
    });
    questionData.Options.push({
      answer: option4.props.value,
      sequence: "4",
    });

    if (correctOption.value) {
      questionData = {...questionData, correctOptionSequence: correctOption.key}
      dispatch(addQuestion(questionData));
    } else {
      setCorrectOption(correctOption => {
        correctOption = {
          ...correctOption,
          key: option1.props.name,
          value: option1.props.value
        };
        questionData = {...questionData, correctOptionSequence: correctOption.key}
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
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="question-input">Question</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
            disabled={isDisabled}
            type="text"
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
          <Label>Options</Label>
        </Col>
        <Col md="9">
          <FormGroup check inline>
            <Input
              disabled={isDisabled}
              //className="form-check-input"
              type="text"
              placeholder="option #1"
              //id="inline-radio2"
              //name="inline-radios"
              //value="option2"
              {...option1.props}
            />
            <FormFeedback>{option1.helperText}</FormFeedback>
          </FormGroup>
          <FormGroup check inline>
            <Input
              disabled={isDisabled}
              //className="form-check-input"
              type="text"
              placeholder="option #2"
              //id="inline-radio2"
              //name="inline-radios"
              //value="option2"
              {...option2.props}
            />
            <FormFeedback>{option2.helperText}</FormFeedback>
          </FormGroup>
          <FormGroup check inline>
            <Input
              disabled={isDisabled}
              //className="form-check-input"
              type="text"
              placeholder="option #3"
              //id="inline-radio2"
              //name="inline-radios"
              //value="option2"
              {...option3.props}
            />
            <FormFeedback>{option3.helperText}</FormFeedback>
          </FormGroup>

          <FormGroup check inline>
            <Input
              disabled={isDisabled}
              //className="form-check-input"
              type="text"
              placeholder="option #4"
              //id="inline-radio2"
              //name="inline-radios"
              //value="option2"
              {...option4.props}
            />
            <FormFeedback>{option4.helperText}</FormFeedback>
          </FormGroup>
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
                active={correctOption.key === option1.props.name}
                onClick={() =>
                  handleDropdownItem({
                    key: option1.props.name,
                    value: option1.props.value
                  })
                }
              >
                {option1.props.name}
              </DropdownItem>
              <DropdownItem
                active={correctOption.key === option2.props.name}
                onClick={() =>
                  handleDropdownItem({
                    key: option2.props.name,
                    value: option2.props.value
                  })
                }
              >
                {option2.props.name}
              </DropdownItem>
              <DropdownItem
                active={correctOption.key === option3.props.name}
                onClick={() =>
                  handleDropdownItem({
                    key: option3.props.name,
                    value: option3.props.value
                  })
                }
              >
                {option3.props.name}
              </DropdownItem>

              <DropdownItem
                active={correctOption.key === option4.props.name}
                onClick={() =>
                  handleDropdownItem({
                    key: option4.props.name,
                    value: option4.props.value
                  })
                }
              >
                {option4.props.name}
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
          onClick={(e) => {
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
    </div>
  );
}
