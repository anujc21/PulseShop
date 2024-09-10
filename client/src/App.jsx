import React, {useState, useEffect} from "react";
import {io} from "socket.io-client";
import {initializeApp} from "firebase/app";
import {ThemeProvider, createTheme, Box, CssBaseline} from "@mui/material";
import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Shop from "./Shop.jsx";
import Product from "./Product";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Account from "./Account";
import TabBox from "./TabBox.jsx";
import Loader from "./Loader.jsx";
import "./App.css";

const app = initializeApp({
    apiKey: "AIzaSyDMJpX2ea3GSE1wmDxDY6LCqrfgHfXLotA",
    authDomain: "pulse-shop.firebaseapp.com",
    projectId: "pulse-shop",
    storageBucket: "pulse-shop.appspot.com",
    messagingSenderId: "140350733189",
    appId: "1:140350733189:web:194b0b03fedb6a53c362ec"
});

const theme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        },
        secondary: {
            main: "#000"
        },
        text: {
            primary: "#000",
            secondary: "#fff"
        }
    }
});

const socket = new io("localhost:3000");

function App(){
    const [loading, setLoading] = useState(true);

    const [menuOpen, setMenuOpen] = useState(false);

    const [tabValue, setTabValue] = useState("login");

    const [page, setPage] = useState("login");

    const [items, setItems] = useState([]);

    const [cartItems, setCartItems] = useState(["NULL"]);

    const [products, setProducts] = useState([]);

    const [searchCategory, setSearchCategory] = useState("All Categories");

    const [currentProduct, setCurrentProduct] = useState();

    const [buyingProducts, setBuyingProducts] = useState([]);

    const [boughtProducts, setBoughtProducts] = useState([]);

    const [user, setUser] = useState({});

    useEffect(() => {
        setPage(tabValue);
    }, [tabValue]);

    useEffect(() => {
        socket.on("connect", () => {
            setLoading(false);
        });

        socket.on("getItems", (data) => {
            setItems(data);
        });

        socket.on("getProducts", (data) => {
            setProducts(data);
        });

        socket.on("getCartItems", (data) => {
            setCartItems(data);
        });

        socket.on("getBoughtItems", (data) => {
            setBoughtProducts(data);
        });

        socket.on("boughtItems", (data) => {
            setBoughtProducts(data);

            setTabValue("account");
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            
            <Box style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <Header setMenuOpen={setMenuOpen}/>

                <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} setUser={setUser} setTabValue={setTabValue}/>

                {(page === "login") &&
                    <Login setTabValue={setTabValue} setUser={setUser} socket={socket}/>
                }

                {(page === "home") &&
                    <Home setLoading={setLoading} socket={socket} items={items} setItems={setItems} setSearchCategory={setSearchCategory} setTabValue={setTabValue} setCurrentProduct={setCurrentProduct}/>
                }

                {(page === "shop") &&
                    <Shop setLoading={setLoading} socket={socket} products={products} setProducts={setProducts} searchCategory={searchCategory} setSearchCategory={setSearchCategory} setCurrentProduct={setCurrentProduct} setTabValue={setTabValue}/>
                }

                {(page === "product") &&
                    <Product currentProduct={currentProduct} user={user} socket={socket} setBuyingProducts={setBuyingProducts} setTabValue={setTabValue}/>
                }

                {(page === "cart") &&
                    <Cart cartItems={cartItems} setCartItems={setCartItems} user={user} socket={socket} setLoading={setLoading} setBuyingProducts={setBuyingProducts} setTabValue={setTabValue}/>
                }

                {(page === "checkout") &&
                    <Checkout user={user} socket={socket} setLoading={setLoading} buyingProducts={buyingProducts} setTabValue={setTabValue}/>
                }

                {(page === "account") &&
                    <Account user={user} socket={socket} setLoading={setLoading} boughtProducts={boughtProducts}/>
                }

                {(page !== "login") &&
                    <TabBox tabValue={tabValue} setTabValue={setTabValue}/>
                }

                {(loading) &&
                    <Loader/>
                }
            </Box>
        </ThemeProvider>
    );
}

export default App;