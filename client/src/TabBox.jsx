import React, {useState, useEffect} from "react";
import {Tabs, Tab} from "@mui/material";

function TabBox({tabValue, setTabValue}){
	const [tabValueUpdated, setTabValueUpdated] = useState("home");

	useEffect(() => {
		if (["home", "shop", "cart", "account"].includes(tabValue)){
			setTabValueUpdated(tabValue);
		}
		else{
			setTabValueUpdated(false);
		}
	}, [tabValue]);

	return (
		<Tabs value={tabValueUpdated} variant="fullWidth" onChange={(event, value) => {setTabValue(value)}} style={{
			margin: "0px 0px 2px 0px",
			width: "100%",
			background: "#000",
			boxShadow: "0px 2px 8px 4px rgba(0, 0, 0, 0.3)",
			zIndex: "99"
		}}>
			<Tab value="home" label="Home"/>

			<Tab value="shop" label="Shop"/>

			<Tab value="cart" label="Cart"/>

			<Tab value="account" label="Account"/>
		</Tabs>
	);
}

export default TabBox;