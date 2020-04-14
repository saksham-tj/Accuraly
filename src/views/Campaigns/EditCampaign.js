import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
  FormFeedback,
  Alert,
} from "reactstrap";
import { handleValidation, validations } from '../../utils/validations';
import { useInput, useSubmit } from '../../hooks/form';
import useAlert from '../../hooks/useAlert';
import DatePicker from "react-datepicker";
import { apiPost } from '../../utils/serviceManager';
import { backendRoutes, messages } from '../../utils/constants';



export default function EditCampaign(props) {
	let name, description;
	console.log("Selected campaign data: ", props.location.state)
	const campaignData = props.location.state.data
	name = useInput("name", campaignData.name, handleValidation, validations.EMPTY);
	description = useInput("description", campaignData.description, handleValidation, validations.EMPTY);

	const [startDate, setStartDate] = useState(new Date(campaignData.start_time))
	const [endDate, setEndDate] = useState(new Date(campaignData.end_time))

	const alert = useAlert(false);
	const submit = useSubmit([name, description], handleSuccess);

	function handleSuccess(formData) {
		formData = { ...formData, start: startDate.toISOString(), end: endDate.toISOString(), campaign_id: campaignData.campaign_id }
		console.log("Data Length==> ", formData);
		editCampaign(formData)
		// name.clearInput();
		// description.clearInput();
		// setStartDate(new Date())
		// setEndDate(new Date())
	}

	function editCampaign(formData) {
    apiPost(
      backendRoutes.CAMPAIGN + 'update',
      {data: formData},
      {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      successRes => {
        console.log("campaign edit success: ", successRes);
        alert.changeVisibility(true);
        alert.handleMessage("campaign edit successfully");
        setTimeout(() => {
          alert.changeVisibility(false);
        }, 5000);
      },
      errorRes => {
        console.log("campaign edit error: ", errorRes);
        if (errorRes.response && errorRes.response.data) {
          alert.handleMessage(errorRes.response.data.message);
        } else {
          alert.handleMessage(messages.NETWORK_FAILURE);
        }
        setTimeout(() => {
          alert.changeVisibility(false);
        }, 5000);
      }
    )
  }

	function handleAlertVisibility() {
		alert.changeVisibility(false);
	}

	function handleStartDate(date) {
		console.log("Start date selected: ", date.toISOString())
		setStartDate(date)
	}

	function handleEndDate(date) {
		console.log("End date selected: ", date.toISOString())
		setEndDate(date)
	}


	return (
		<div className="animated fadeIn">
			<Row>
				<Col lg={6}>
					<Card>
						<CardHeader>
							<strong><i className="icon-info pr-1"></i>Campaign id: {campaignData.campaign_id}</strong>
						</CardHeader>
						<CardBody>
							<Alert
								color="danger"
								isOpen={alert.isVisible}
								toggle={handleAlertVisibility}
							>
								{alert.message}
							</Alert>
							<Form noValidate {...submit.props}>
								<h1>Edit campaign</h1>
								<p className="text-muted"></p>
								<InputGroup className="mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-user"></i>
										</InputGroupText>
									</InputGroupAddon>
									<Input
										type="text"
										placeholder="Name"
										autoComplete="on"
										{...name.props}
									/>
									<FormFeedback>{name.helperText}</FormFeedback>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-info"></i>
										</InputGroupText>
									</InputGroupAddon>
									<Input
										type="text"
										placeholder="Description"
										autoComplete="off"
										{...description.props}
									/>
									<FormFeedback>{description.helperText}</FormFeedback>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-calendar"></i>
										</InputGroupText>
									</InputGroupAddon>
									<DatePicker
										selected={startDate}
										onChange={handleStartDate}
										showTimeSelect
									//dateFormat="ISO"
									/>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-calendar"></i>
										</InputGroupText>
									</InputGroupAddon>
									<DatePicker
										selected={endDate}
										onChange={handleEndDate}
										showTimeSelect
									//dateFormat="ISO"
									/>
								</InputGroup>
								<Button color="success" block>
									Edit Campaign
                </Button>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
