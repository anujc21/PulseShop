import React, {useState, useEffect} from "react";
import {Box, TextField, Button, Icon, Select, MenuItem, Card, Typography} from "@mui/material";

function Shop({setLoading, socket, products, setProducts, searchCategory, setSearchCategory, setCurrentProduct, setTabValue}){
	const [searchText, setSearchText] = useState("");

	const [sort, setSort] = useState("Low to High");

	const [productCards, setProductCards] = useState([]);

	const handleProductClick = (value) => {
		setCurrentProduct(value);

		setTabValue("product");
	}

	const cards = productCards.sort((a, b) => (sort === "Low to High") ? a.price - b.price : b.price - a.price).map((product, productIndex) => {
		return (
			<Card key={productIndex} onClick={() => handleProductClick(product)} style={{
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
					{product.name}
				</Box>

				<img src={product.image} draggable="false" style={{
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
					₹{product.price}
				</Box>
			</Card>
		);
	});

	const handleSearch = () => {
		socket.emit("getProducts", [searchText, searchCategory]);

		setLoading(true);
	};

	useEffect(() => {
		setProductCards(products);

		setLoading(false);
	}, [products]);

	useEffect(() => {
		socket.emit("getProducts", [searchText, searchCategory]);

		setLoading(true);

		return () => {
			setProductCards([]);

			setSearchCategory("All Categories");
		}
	}, []);

	return (
		<Box style={{
			margin: "5px 0px 5px 0px",
			width: "100%",
			display: "flex",
			flexGrow: "1",
			flexDirection: "column",
			alignItems: "center",
			padding: "20px 10px"
		}}>
			<Box style={{
				width: "100%",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				justifyContent: "center",
				gap: "10px",
				padding: "10px"
			}}>
				<Box style={{
					width: "800px",
					maxWidth: "90vw",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center"
				}}>
					<TextField id="outlined-basic" variant="outlined" color="secondary" placeholder="Search" value={searchText} onChange={() => {setSearchText(event.target.value)}} style={{
						flexGrow: "1",
						margin: "0px 5px",
						background: "#fff"
					}}/>

					<Button color="secondary" variant="contained" onClick={handleSearch} style={{
						height: "55px"
					}}>
						<Icon className="material-symbols-outlined" style={{
							color: "#fff",
							margin: "0px 0px 2px 0px",
							fontVariationSettings: "'FILL' 1"
						}}>
							search
						</Icon>
					</Button>
				</Box>

				<Select value={searchCategory} defaultValue="All Categories" color="secondary" onChange={(event) => {setSearchCategory(event.target.value)}} style={{
					width: "150px",
					background: "#fff"
				}}>
		        	<MenuItem value="All Categories"> All Categories </MenuItem>
		        	<MenuItem value="Electronics"> Electronics </MenuItem>
		        	<MenuItem value="Apparel and Accessories"> Apparel and Accessories </MenuItem>
		        	<MenuItem value="Home and Garden"> Home and Garden </MenuItem>
		        	<MenuItem value="Health and Beauty"> Health and Beauty </MenuItem>
		        	<MenuItem value="Sports and Outdoors"> Sports and Outdoors </MenuItem>
		        	<MenuItem value="Books and Media"> Books and Media </MenuItem>
				</Select>

				<Select value={sort} defaultValue="Low to High" color="secondary" onChange={(event) => {setSort(event.target.value)}} style={{
					width: "150px",
					background: "#fff"
				}}>
		        	<MenuItem value="Low to High"> Low to High </MenuItem>
		        	<MenuItem value="High to Low"> High to Low </MenuItem>
				</Select>
			</Box>

			<Box style={{
				margin: "15px 0px 0px 0px",
				padding: "30px 0px",
				width: "1000px",
				maxWidth: "80vw",
				height: "0px",
				display: "flex",
				flexWrap: "wrap",
				flexGrow: "1",
				gap: "20px",
				overflowY: "auto",
				justifyContent: "center"
			}}>
				{cards.length > 0 ? cards : 
					<Typography>
						No results found
					</Typography>
				}
			</Box>
		</Box>
	);
}

export default Shop;