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
import { apiPost } from '../../utils/serviceManager';
import { backendRoutes, messages } from '../../utils/constants';



export default function EditAd(props) {
	let name, vastUrl, width, height;

	console.log("Selected Ad data: ", props.location.state)
	const AdData = props.location.state.data
	name = useInput("name", AdData.name, handleValidation, validations.EMPTY);
	vastUrl = useInput("vast_url", AdData.vast_url, handleValidation, validations.EMPTY);
	width = useInput("width", String(AdData.width), handleValidation, validations.NUMBER);
	height = useInput("height", String(AdData.height), handleValidation, validations.NUMBER);

	const alert = useAlert(false);
	const submit = useSubmit([name, vastUrl, height, width], handleSuccess);

	function handleSuccess(formData) {
		formData = { ...formData, ad_id: AdData.ad_id, height: parseInt(formData.height), width: parseInt(formData.width) }
		console.log("Data Length==> ", formData);
		editAds(formData)
		// name.clearInput();
		// description.clearInput();
		// setStartDate(new Date())
		// setEndDate(new Date())
	}

	function editAds(formData) {
		apiPost(
			backendRoutes.ADS + 'update',
			{ data: formData },
			{
				"Content-Type": "application/json",
				//Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			successRes => {
				console.log("Ad edit success: ", successRes);
				alert.changeVisibility(true);
				alert.handleMessage("Ad edit successfully");
				setTimeout(() => {
					alert.changeVisibility(false);
				}, 5000);
			},
			errorRes => {
				console.log("Ad edit error: ", errorRes);
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


	return (
		<div className="animated fadeIn">
			<Row>
				<Col lg={6}>
					<Card>
						<CardHeader>
							<strong><i className="icon-info pr-1"></i>Ad id: {AdData.ad_id}</strong>
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
											<i className="icon-screen-desktop"></i>
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
											<i className="icon-calendar"></i>
										</InputGroupText>
									</InputGroupAddon>
									<Input
										type="text"
										placeholder="Vast url"
										autoComplete="off"
										{...vastUrl.props}
									/>
									<FormFeedback>{vastUrl.helperText}</FormFeedback>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-chart"></i>
										</InputGroupText>
									</InputGroupAddon>
									<Input
										type="text"
										placeholder="Ad Width"
										autoComplete="off"
										{...width.props}
									/>
									<FormFeedback>{width.helperText}</FormFeedback>
								</InputGroup>
								<InputGroup className="mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-chart"></i>
										</InputGroupText>
									</InputGroupAddon>
									<Input
										type="text"
										placeholder="Ad Height"
										autoComplete="off"
										{...height.props}
									/>
									<FormFeedback>{height.helperText}</FormFeedback>
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
