import React from "react";
import notify from "./notify";
import {Card, Box, Typography, Button} from "@mui/material";

function Product({currentProduct, user, socket, setBuyingProducts, setTabValue}){
	const handleBuy = () => {
		setBuyingProducts([currentProduct]);

		setTabValue("checkout");
	};

	const handleAddToCart = () => {
		socket.emit("addItem", [user.uid, currentProduct.name]);

		notify("Item added!", 2000);
	};

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
			<Card style={{
				width: "500px",
				maxWidth: "90%",
				height: "300px",
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
					fontSize: "16px",
					fontWeight: "bold"
				}}>
					{currentProduct.name}
				</Box>

				<img src={currentProduct.image} draggable="false" style={{
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
					fontSize: "16px",
					fontWeight: "bold"
				}}>
					₹{currentProduct.price}
				</Box>
			</Card>

			<Card style={{
				margin: "20px 0px 0px 0px",
				width: "500px",
				maxWidth: "90%",
				height: "300px",
				display: "flex",
				alignItems: "center",
				overflowY: "auto",
				flexDirection: "column",
			}}>
				<Typography variant="body1" style={{
					margin: "12px 0px 0px 0px",
					fontWeight: "bold"
				}}>
					Description
				</Typography>

				<Typography variant="body2" style={{
					margin: "15px 0px 0px 0px"
				}}>
					Seller: {currentProduct.name} PVT Limited
				</Typography>

				<Typography variant="body2" style={{
					margin: "20px 0px 0px 0px"
				}}>
					Quantity: 1
				</Typography>

				<Typography variant="body2" style={{
					margin: "20px 0px 0px 0px"
				}}>
					Price: ₹{currentProduct.price}
				</Typography>

				<Button variant="contained" color="secondary" onClick={() => handleBuy()} style={{
					margin: "20px 0px 2px 0px"
				}}> Buy </Button>

				<Button variant="contained" color="secondary" onClick={() => handleAddToCart()} style={{
					margin: "2px 0px 2px 0px"
				}}> Add to Cart </Button>
			</Card>
		</Box>
	);
}

export default Product;