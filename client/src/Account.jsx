import React, {useState, useEffect} from "react";
import {Box, Card, Typography} from "@mui/material";

function Account({user, socket, setLoading, boughtProducts}){
	const [totalMoney, setTotalMoney] = useState(0);

	const products = boughtProducts.map((element, index) => {
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
		let money = 0;

		boughtProducts.forEach((product) => {
			money += product.price;
		});

		setTotalMoney(money);

		setLoading(false);
	}, [boughtProducts]);

	useEffect(() => {
		socket.emit("getBoughtItems", user.uid);

		setLoading(true);
	}, []);

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
				Username
			</Typography>

			<Typography variant="body1">
				{user.displayName}
			</Typography>

			<Typography variant="h6" style={{
				margin: "20px 0px 10px 0px"
			}}>
				Items bought to date
			</Typography>

			<Box style={{
				display: "flex",
				justifyContent: "center",
				width: "600px",
				maxWidth: "95%",
				height: "320px",
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
				Money spent to date
			</Typography>

			<Typography variant="body1">
				₹{totalMoney}
			</Typography>
		</Box>
	);
}

export default Account;