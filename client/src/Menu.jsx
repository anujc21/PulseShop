import React from "react";
import {Drawer, Box, Typography, Button} from "@mui/material";

function Menu({menuOpen, setMenuOpen, setUser, setTabValue}){
	return (
		<Drawer open={menuOpen} onClose={() => {setMenuOpen(false)}} anchor="right" style={{
			zIndex: "100"
		}}>
			<Box style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "10px",
				padding: "10px 30px",
				height: "100%"
			}}>
				<Typography variant="h6" style={{
					margin: "0px 0px 10px 0px"
				}}>
					PulseShop
				</Typography>

				<Button variant="contained" onClick={() => {setTabValue("home")}} style={{
					width: "100px"
				}}> Home </Button>

				<Button variant="contained" onClick={() => {setTabValue("shop")}} style={{
					width: "100px"
				}}> Shop </Button>

				<Button variant="contained" onClick={() => {setTabValue("cart")}} style={{
					width: "100px"
				}}> Cart </Button>

				<Button variant="contained" onClick={() => {setTabValue("account")}} style={{
					width: "100px"
				}}> Account </Button>

				<Button variant="contained" color="secondary" onClick={() => {setUser({}); setTabValue("login")}} style={{
					margin: "auto 0px 10px 0px",
					width: "100px"
				}}> Logout </Button>
			</Box>
		</Drawer>
	);
}

export default Menu;