import React, {useState, useEffect} from "react";
import {Card, Box, Typography, Button, Select, MenuItem} from "@mui/material";

function Checkout({user, socket, setLoading, buyingProducts, setTabValue}){
	const [totalPrice, setTotalPrice] = useState(0);

	const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");

	const handleBuy = () => {
		socket.emit("buyItems", [user.uid, buyingProducts]);

		setLoading(true);
	};

	const products = buyingProducts.map((element, index) => {
		return (
			<Card key={index} style={{
				width: "150px",
				maxWidth: "90%",
				height: "150px",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				overflowY: "auto",
				color: "#fff"
			}}>
				<Box style={{
					width: "100%",
					height: "28px",
					background: "#000",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "12px",
					fontSize: "14px",
					fontWeight: "bold"
				}}>
					{element.name}
				</Box>

				<img src={element.image} draggable="false" style={{
					margin: "5px 0px",
					width: "90%",
					height: "70px",
					objectFit: "contain",
					flexGrow: "1"
				}}/>

				<Box style={{
					width: "100%",
					height: "28px",
					background: "#000",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "12px",
					fontSize: "14px",
					fontWeight: "bold"
				}}>
					₹{element.price}
				</Box>
			</Card>
		);
	});

	useEffect(() => {
		let price = 0;

		buyingProducts.forEach((product) => {
			price += product.price;
		});

		setTotalPrice(price);
	}, [buyingProducts]);

	return (
		<Box style={{
			margin: "5px 0px 5px 0px",
			width: "100%",
			display: "flex",
			flexGrow: "1",
			flexDirection: "column",
			alignItems: "center",
			overflowY: "auto",
			padding: "20px 10px"
		}}>
			<Typography variant="h6" style={{
				margin: "10px 0px 10px 0px"
			}}>
				Items to buy
			</Typography>

			<Box style={{
				display: "flex",
				justifyContent: "center",
				width: "600px",
				maxWidth: "95%",
				height: "170px",
				flexWrap: "wrap",
				gap: "10px",
				padding: "10px",
				overflowY: "auto"
			}}>
				{products}
			</Box>

			<Typography variant="h6" style={{
				margin: "20px 0px 10px 0px"
			}}>
				Payment method
			</Typography>

			<Select value={paymentMethod} defaultValue="All Categories" color="secondary" onChange={(event) => {setPaymentMethod(event.target.value)}} style={{
				width: "150px",
				background: "#fff"
			}}>
	        	<MenuItem value="Bank Transfer"> Bank Transfer </MenuItem>
	        	<MenuItem value="PayTM (Online)"> PayTM (Online) </MenuItem>
	        	<MenuItem value="GooglePay (Online)"> GooglePay (Online) </MenuItem>
			</Select>

			<Typography variant="h6" style={{
				margin: "20px 0px 10px 0px"
			}}>
				Total Price
			</Typography>

			<Typography variant="body1">
				₹{totalPrice}
			</Typography>

			<Button variant="contained" color="secondary" onClick={() => handleBuy(buyingProducts)} style={{
				margin: "10px 0px 10px 0px",
				width: "150px",
				height: "50px",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				overflowY: "auto"
			}}> Buy Items </Button>

			<Typography variant="body2">
				(Demo Only)
			</Typography>
		</Box>
	);
}

export default Checkout;