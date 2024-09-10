import React, {useState, useEffect} from "react";
import {Box, Card, Typography, Divider, Button} from "@mui/material";

function Home({setLoading, socket, items, setItems, setSearchCategory, setTabValue, setCurrentProduct}){
	const [categories, setCategories] = useState([]);

	const handleProductClick = (value, name) => {
		value.name = name;

		setCurrentProduct(value);

		setTabValue("product");
	}

	const handleMoreClick = (value) => {
		setSearchCategory(value);

		setTabValue("shop");
	};

	const cards = categories.map((value, valueIndex) => {
		return (
			<Box key={valueIndex} style={{
				width: "100%",
				maxWidth: "700px",
				padding: "20px 30px",
				display: "flex",
				flexDirection: "column"
			}}>
				<Typography variant="h6" color="#888">
					{value.category}
				</Typography>

				<Divider style={{background: "#888", height: "2px"}}/>

				<Box style={{
					padding: "20px 0px",
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
					gap: "10px"
				}}>
					{
						Object.keys(value.elements).map((element, elementIndex) => {
							if (elementIndex < 3){
								return (
									<Card key={elementIndex} onClick={() => handleProductClick(value.elements[element], element)} style={{
										width: "130px",
										height: "130px",
										display: "flex",
										alignItems: "center",
										flexDirection: "column",
										color: "#fff",
										cursor: "pointer"
									}}>
										<Box style={{
											width: "100%",
											height: "20px",
											background: "#000",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											padding: "12px",
											fontSize: "12px",
											fontWeight: "bold"
										}}>
											{element}
										</Box>

										<img src={value.elements[element].image} draggable="false" style={{
											margin: "5px 0px",
											width: "90%",
											height: "70px",
											objectFit: "contain",
											flexGrow: "1"
										}}/>

										<Box style={{
											width: "100%",
											height: "20px",
											background: "#000",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											padding: "12px",
											fontSize: "12px",
											fontWeight: "bold"
										}}>
											₹{value.elements[element].price}
										</Box>
									</Card>
								);
							}
						})
					}

					<Button variant="contained" color="secondary" onClick={() => handleMoreClick(value.category)} style={{
						width: "130px",
						height: "130px"
					}}>
						Show More
					</Button>
				</Box>
			</Box>
		);
	});

	useEffect(() => {
		setCategories(items);

		setLoading(false);
	}, [items]);

	useEffect(() => {
		socket.emit("getItems");

		setLoading(true);

        return () => {
            setItems([]);
        }
	}, []);

	return (
		<Box style={{
			margin: "5px 0px 5px 0px",
			width: "100%",
			display: "flex",
			flexGrow: "1",
			flexDirection: "row",
			flexWrap: "wrap",
			overflowY: "auto",
			padding: "20px 10px"
		}}>
			<Box style={{
				display: "flex",
				flexGrow: "1",
				flexDirection: "column",
				alignItems: "center"
			}}>
				{cards.slice(0, cards.length/2)}
			</Box>

			<Box style={{
				display: "flex",
				flexGrow: "1",
				flexDirection: "column",
				alignItems: "center"
			}}>
				{cards.slice(cards.length/2, cards.length)}
			</Box>
		</Box>
	);
}

export default Home;