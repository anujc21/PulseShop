import React from "react";
import {AppBar, Toolbar, Typography, Icon, IconButton} from "@mui/material";

function Header({setMenuOpen}){
	return (
		<AppBar position="static" style={{
			background: "#000",
			zIndex: "99"
		}}>
			<Toolbar>
				<Icon className="material-symbols-outlined" style={{
					color: "#fff",
					margin: "0px 0px 2px 0px",
					fontVariationSettings: "'FILL' 1"
				}}>
					shopping_cart
				</Icon>

				<Typography variant="h6" style={{
					color: "#fff"
				}}>
					PulseShop
				</Typography>

				<IconButton className="material-symbols-outlined" style={{
					margin: "0px 0px 0px auto",
					color: "#fff"
				}} onClick={() => {setMenuOpen(true)}}>
					menu
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}

export default Header;