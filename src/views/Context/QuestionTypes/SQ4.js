import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Col,
  FormGroup,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";
import "../Context.css";
import { useInput, useSubmit } from "../../../hooks/form";
import { handleValidation, validations } from "../../../utils/validations";
import { contextQuestionTypes } from "../../../utils/constants";
import { addQuestion } from "../../../actionCreator/questionActions";

export default function SQ4(props) {
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

  const submit = useSubmit(
    [questionText, option1, option2, option3, option4],

    handleSuccess
  );

  function handleSuccess(formData) {
    // console.log("Data of add question==> ", formData);
    setIsDisabled(true);

    let questionData = {
      questionType: Object.keys(contextQuestionTypes)[3],
      text: formData.questionText,
      correctOptionSequence: "",
      Options: []
    };

    questionData.Options.push({
      answer: option1.props.value,
      sequence: "1"
    });
    questionData.Options.push({
      answer: option2.props.value,
      sequence: "2"
    });
    questionData.Options.push({
      answer: option3.props.value,
      sequence: "3"
    });
    questionData.Options.push({
      answer: option4.props.value,
      sequence: "4"
    });

    dispatch(addQuestion(questionData));
  }

  return (
    <div className="questionContainer">

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
          <Label>Options</Label>
        </Col>
        <Col md="9">
          <FormGroup check inline>
            <Input
              //className="form-check-input"
              disabled={isDisabled}
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
              //className="form-check-input"
              disabled={isDisabled}
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
              //className="form-check-input"
              disabled={isDisabled}
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
              //className="form-check-input"
              disabled={isDisabled}
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
    </div>
  );
}
