import React from "react";
import {Box, CircularProgress} from "@mui/material";

function Loader(){
	return (
		<Box style={{
			position: "fixed",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			background: "rgba(255, 255, 255, 0.7)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: "98"
		}}>
			<CircularProgress size={70} style={{
				color: "#000",
				opacity: "0.5"
			}}/>
		</Box>
	);
}

export default Loader;