const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");
const {MongoClient} = require("mongodb");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const uri = "mongodb+srv://Sparkoder:Mongo21022005@pulsecluster.a8ej44i.mongodb.net/?retryWrites=true&w=majority&appName=pulseCluster";

const client = new MongoClient(uri);

async function connect(){
    try{
        await client.connect();

		server.listen(process.env.PORT || 3000, () => {
			console.log("Listening to port 3000...");
		});
    }
    catch (error){
        console.log(error);
    }
}

io.on("connection", async (socket) => {
	console.log("Client connected...");

	const database = client.db("shop");
	const items = database.collection("items");

	socket.on("getUser", async (data) => {
		const users = database.collection("users");

		const user = await users.find({id: data}).toArray();

		if (user.length === 0){
			users.insertOne({
				id: data,
				cart: [],
				bought: []
			});
		}
	});

	socket.on("addItem", async (data) => {
		const users = database.collection("users");

		const user = await users.find({id: data[0]}).toArray();

		const cartItems = user[0].cart;

		if (!(cartItems.includes(data[1]))){
			users.updateOne({id: data[0]}, {$set: 
					{
						cart: [...cartItems, data[1]]
					}
				}
			);
		}
	});

	socket.on("deleteItem", async (data) => {
		const users = database.collection("users");

		const user = await users.find({id: data[0]}).toArray();

		const cartItems = user[0].cart;

		cartItems.splice(cartItems.indexOf(data[1]), 1);

		users.updateOne({id: data[0]}, {$set: 
				{
					cart: cartItems
				}
			}
		).then(async () => {
			const allItems = await items.find({}).toArray();

			let products = [];

			allItems.forEach((item) => {
				Object.keys(item.elements).forEach((element) => {
					const newItem = item.elements[element];

					newItem.name = element;

					if (cartItems.includes(newItem.name)){
						products.push(newItem);
					}
				});
			});

			socket.emit("getCartItems", products);
		});
	});

	socket.on("buyItems", async (data) => {
		const users = database.collection("users");

		const user = await users.find({id: data[0]}).toArray();

		const boughtItems = user[0].bought;

		users.updateOne({id: data[0]}, {$set: 
				{
					bought: [...boughtItems, ...data[1]]
				}
			}
		).then(() => {
			socket.emit("boughtItems", boughtItems);
		});
	});

	socket.on("getBoughtItems", async (data) => {
		const users = database.collection("users");

		const user = await users.find({id: data}).toArray();

		const boughtItems = user[0].bought;

		socket.emit("getBoughtItems", boughtItems);
	});

	socket.on("getCartItems", async (data) => {
		const users = database.collection("users");

		const user = await users.find({id: data}).toArray();

		const cartItems = user[0].cart;

		const allItems = await items.find({}).toArray();

		let products = [];

		allItems.forEach((item) => {
			Object.keys(item.elements).forEach((element) => {
				const newItem = item.elements[element];

				newItem.name = element;

				if (cartItems.includes(newItem.name)){
					products.push(newItem);
				}
			});
		});

		socket.emit("getCartItems", products);
	});

	socket.on("getItems", async () => {
		const allItems = await items.find({}).toArray();

		socket.emit("getItems", allItems);
	});

	socket.on("getProducts", async (data) => {
		let allItems;

		if (data[1] === "All Categories"){
			allItems = await items.find({}).toArray();
		}
		else{
			allItems = await items.find({category: data[1]}).toArray();
		}

		let products = [];

		allItems.forEach((item) => {
			Object.keys(item.elements).forEach((element) => {
				const newItem = item.elements[element];

				newItem.name = element;

				products.push(newItem);
			});
		});

		if (data[0]){
			const searchText = data[0].split(" ");

			products = products.filter((product) => {
				for (let i = 0; i < searchText.length; ++i){
					if (searchText.length > 1){
						if (searchText[i].length > 2){
							if (product.name.toLowerCase().includes(searchText[i].toLowerCase())){
								return true;
							}
						}
					}
					else{
						if (product.name.toLowerCase().includes(searchText[i].toLowerCase())){
							return true;
						}
					}
				}
			});
		}

		socket.emit("getProducts", products);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected...");
	});
});

connect();