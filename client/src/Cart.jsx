import React, {useState, useEffect} from "react";
import {Card, Box, Typography, Button} from "@mui/material";

function Cart({cartItems, setCartItems, user, socket, setLoading, setBuyingProducts, setTabValue}){
	const [products, setProducts] = useState([]);

	const handleBuy = (data) => {
		if (data.length > 0){
			setBuyingProducts(data);

			setTabValue("checkout");
		}
	};

	const handleDelete = (name) => {
		socket.emit("deleteItem", [user.uid, name]);

		setLoading(true);
	};

	const cards = products.map((element, index) => {
		return (
			<Card key={index} style={{
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
					fontSize: "16px",
					fontWeight: "bold"
				}}>
					₹{element.price}
				</Box>

				<Box style={{
					width: "100%",
					height: "28px",
					background: "#fff",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "row",
					padding: "22px",
					fontSize: "16px",
					fontWeight: "bold",
					gap: "5px"
				}}>
					<Button variant="contained" color="secondary" onClick={() => handleBuy([element])} style={{
						width: "500px",
						maxWidth: "90%",
						height: "30px"
					}}> Buy </Button>

					<Button variant="contained" color="secondary" onClick={() => handleDelete(element.name)} style={{
						width: "500px",
						maxWidth: "90%",
						height: "30px"
					}}> Delete </Button>
				</Box>
			</Card>
		);
	});

	useEffect(() => {
		socket.emit("getCartItems", user.uid);

		setLoading(true);

		return () => {
			setCartItems(["NULL"]);
		}
	}, []);

	useEffect(() => {
		if (cartItems.length > 0){
			if (cartItems[0] !== "NULL"){
				setProducts(cartItems);

				setLoading(false);
			}
		}
		else{
			setProducts(cartItems);

			setLoading(false);
		}
	}, [cartItems]);

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
			<Box style={{
				margin: "5px 0px 5px 0px",
				width: "100%",
				height: "100%",
				display: "flex",
				flexGrow: "1",
				flexDirection: "row",
				flexWrap: "wrap",
				justifyContent: "center",
				gap: "10px",
				overflowY: "auto",
				padding: "20px 10px"
			}}>
				{cards}

				<Button variant="contained" color="secondary" onClick={() => handleBuy(products)} style={{
					width: "500px",
					maxWidth: "90%",
					height: "300px",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					overflowY: "auto"
				}}> Proceed to Checkout </Button>
			</Box>
		</Box>
	);
}

export default Cart;