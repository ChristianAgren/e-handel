import React, { useState } from "react";
import { Container, Typography, Grid, Paper, Button } from "@material-ui/core";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { makeStyles } from "@material-ui/core/styles";
import ItemOverview from "./itemOverview/itemOverview";
import CustomerInformation from "./customerInformation/customerInformation";
import DeliveryOptions from "./deliveryOptions/deliveryOptions";
import PaymentOptions from "./paymentOptions/paymentOptions";
import CheckoutTotal from "./checkoutTotal";
import { ProductContext } from "../../../contexts/productContext";
import { DeliveryOption, baseDelivery } from "./deliveryOptions/deliveryAPI";
import { PaymentOption, basePayment } from "./paymentOptions/paymentAPI";
import { Product, Receipt } from "../../../interfaces&types/interfaces";
import { Link } from "react-router-dom";
import { RegisterInputValues } from "./registerAPI";

interface Props {
	confirmReceipt: (receipt: Receipt) => void;
	productList: { product: Product; amount: number }[];
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	wrapper: {
		minHeight: "100vh",
		height: "100%"
	},
	paper: {
		height: "100%",
		padding: theme.spacing(3),
		color: theme.palette.text.secondary
	},
	title: {
		padding: theme.spacing(2, 0)
	},
	totalWrapper: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}
}));

export default function Register(props: Props) {
	const classes = useStyles();
	const [deliveryOption, setDeliveryOption] = useState(baseDelivery);
	const [paymentOption, setPaymentOption] = useState(basePayment);
	const [subPayment, setSubPayment] = useState(basePayment);
	const [inputValues, setInputValues] = React.useState({
		firstName: {
			value: "",
			error: false
		},
		altFirstName: {
			value: "",
			error: false
		},
		lastName: {
			value: "",
			error: false
		},
		altLastName: {
			value: "",
			error: false
		},
		mobileNumber: {
			value: "",
			error: false
		},
		altMobileNumber: {
			value: "",
			error: false
		},
		address: {
			value: "",
			error: false
		},
		postal: {
			value: "",
			error: false
		},
		city: {
			value: "",
			error: false
		},
		cardNumber: {
			value: "",
			error: false
		},
		CVC: {
			value: "",
			error: false
		},
		cardMonth: {
			value: "",
			error: false
		},
		cardYear: {
			value: "",
			error: false
		}
	});
	const [useAltValues, setUseAltValues] = React.useState(false);

	const handleAlternateInput = () => {
		setUseAltValues(!useAltValues);
	};

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		id: string
	) => {
		if (event.target.value.length < 1) {
			setInputToState(event.target.value, id, true);
		} else {
			if (
				id === "firstName" ||
				id === "altFirstName" ||
				id === "lastName" ||
				id === "altLastName" ||
				id === "city"
			) {
				if (validateInputs(event.target.value, true)) {
					setInputToState(event.target.value, id, true);
				} else {
					setInputToState(event.target.value, id, false);
				}
			} else if (
				id === "mobileNumber" ||
				id === "altMobileNumber" ||
				id === "cardNumber" ||
				id === "postal" ||
				id === "CVC" ||
				id === "cardMonth" ||
				id === "cardYear"
			) {
				if (validateInputs(event.target.value, false)) {
					setInputToState(event.target.value, id, true);
				} else {
					setInputToState(event.target.value, id, false);
				}
			} else {
				setInputToState(event.target.value, id, true);
			}
		}
	};

	const setInputToState = (input: string, id: string, valid: boolean) => {
		setInputValues({
			...inputValues,
			[id]: {
				value: input,
				error: !valid
			}
		});
	};

	const setErrorToInput = (orderInputs: RegisterInputValues) => {
		setInputValues(orderInputs)
	}

	const validateInputs = (value: string, letter: boolean): boolean => {

		if (letter) {
			if (value.match(/^[A-ZÅÄÖa-zåäö]+$/)) {
				return true;
			} else {
				return false;
			}
		} else {
			if (value.match(/^\d+$/)) {
				return true;
			} else {
				return false;
			}
		}
	};

	const handleOptionItemClick = (
		identifier: DeliveryOption | PaymentOption
	) => {
		identifier.type === "del"
			? setDeliveryOption(identifier)
			: identifier.type === "pay"
			? setPaymentOption(identifier)
			: setSubPayment(identifier);
	};

	return (
		<>
			{props.productList.length !== 0 ? (
				<Container maxWidth="md" className={classes.wrapper}>
					<Typography variant="h3" className={classes.title} component="h1">
						Checkout <ShoppingCartRoundedIcon fontSize="large" />
					</Typography>
					<div className={classes.root}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<ItemOverview productList={props.productList} />
								</Paper>
							</Grid>
							<Grid item xs={12} sm={12} md={7}>
								<Paper className={classes.paper}>
									<CustomerInformation
										alternate={useAltValues}
										useAlternate={handleAlternateInput}
										values={inputValues}
										handleInputChange={handleInputChange}
									/>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={12} md={5}>
								<Paper className={classes.paper}>
									<DeliveryOptions
										selectedDelivery={deliveryOption}
										setSelectedDelivery={handleOptionItemClick}
									/>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<PaymentOptions
										alternate={useAltValues}
										values={inputValues}
										handleInputChange={handleInputChange}
										selectedPayment={paymentOption}
										selectedPayOpt={subPayment}
										setSelectedPayment={handleOptionItemClick}
									/>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<ProductContext.Consumer>
										{value => (
											<div className={classes.totalWrapper}>
												<CheckoutTotal
													cart={props.productList}
													useAlternate={useAltValues}
													orderInputs={inputValues}
													itemTotal={value.itemTotal}
													delivery={deliveryOption}
													payment={paymentOption}
                                                    subPayment={subPayment}
													confirmReceipt={props.confirmReceipt}
													setError={setErrorToInput}
												/>
											</div>
										)}
									</ProductContext.Consumer>
								</Paper>
							</Grid>
						</Grid>
					</div>
				</Container>
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginTop: "5rem"
					}}>
					<Typography
						variant="h6"
						style={{ color: "#989898", marginBottom: "2rem" }}>
						Can't find any items here...
					</Typography>
					<Link to="/">
						<Button variant="contained">Get me some products!</Button>
					</Link>
				</div>
			)}
		</>
	);
}
