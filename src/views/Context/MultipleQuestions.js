import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row
} from "reactstrap";
import "./Context.css";
import { useInput, useSubmit } from "../../hooks/form";
import { handleValidation, validations } from "../../utils/validations";

export default function MultipleQuestions(props) {
  const questionText = useInput(
    "questionText-" + props.id,
    "",
    handleValidation,
    validations.EMPTY
  );
  const option1 = useInput("option1", "", handleValidation, validations.EMPTY);
  const option2 = useInput("option2", "", handleValidation, validations.EMPTY);
  const option3 = useInput("option3", "", null, validations.EMPTY);
  const option4 = useInput("option4", "", null, validations.EMPTY);


  // const [questionType, setQuestionType] = useState("");

  // const [questionData, setQuestionData] = useState({
  //   questionText: "",
  //   options: []
  // });

  // const questionProps = {
  //   questionId: questionArr.length,
  //   question: {},
  //   options: []
  // };

  // const handleOnDelete = id => {
  //   setQuestionArr(
  //     questionArr.filter(data => {
  //       console.log("delete id: ", id);
  //       return data.questionId !== id;
  //     })
  //   );
  // };

  // const handleAddQuestion = questionData => {
  //   setQuestionArr(
  //     questionArr.map(data => {
  //       // console.log("data id inside if: ", questionData.questionId);
  //       if (data.questionId === questionData.questionId) {
  //         // console.log("question id inside if: ", questionData.questionId);
  //         data = questionData;
  //         return data;
  //       }
  //       return data;
  //     })
  //   );
  // };

  // const handleAddQuestions = () => {
  //   // const username = useInput("username", "", handleValidation, validations.EMPTY);
  //   setQuestionArr([...questionArr, questionProps]);
  // };

  const handleQuestionDelete = () => {
    console.log("on delete working in questions", props);
    props.handleOnDelete(props.id);
  };

  const handleAddQuestion = e => {
    e.preventDefault();
    console.log("Data in field", questionText);

    if (
      questionText.error ||
      option1.error ||
      option2.error ||
      questionText.props.value === "" ||
      option1.props.value === "" ||
      option2.props.value === ""
    ) {
      return;
    }

    props.addQuestion({
      questionId: props.id,
      question: questionText.props.value,
      options: [option1.props.value, option2.props.value, option3.props.value, option4.props.value]
    });
  };

  return (
    <div className="questionContainer">
      #{props.id + 1}
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="question-input">Question</Label>
        </Col>
        <Col xs="12" md="9">
          <Input
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
              //className="form-check-input"
              type="text"
              placeholder="option #3"
              //id="inline-radio2"
              //name="inline-radios"
              //value="option2"
              {...option3.props}
            />
          </FormGroup>
          <FormGroup check inline>
            <Input
              //className="form-check-input"
              type="text"
              placeholder="option #4"
              //id="inline-radio2"
              //name="inline-radios"
              //value="option2"
              {...option4.props}
            />
          </FormGroup>
        </Col>
      </FormGroup>
      <Button
        type="submit"
        size="sm"
        color="primary"
        onClick={handleAddQuestion}
      >
        <i className="fa fa-dot-circle-o"></i> Add
      </Button>
      <Button
        type="reset"
        size="sm"
        color="danger"
        onClick={handleQuestionDelete}
      >
        <i className="fa fa-ban"></i> Delete
      </Button>
    </div>
  );
}
