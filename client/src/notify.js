function notify(text, timeout){
	const notificationBox = document.createElement("div");

	notificationBox.classList.add("notificationBox");

	const notificationText = document.createElement("h5");

	notificationText.classList.add("notificationText");

	notificationText.innerText = text;

	notificationBox.appendChild(notificationText);

	notificationBox.style = `
    	position: fixed;
	    left: 50%;
	    bottom: 0;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    width: 300px;
	    max-width: 80%;
	    height: auto;
	    margin: 98px 0px;
	    padding: 5px 0px;
	    text-align: center;
	    border-radius: 10px;
	    background: #000;
	    z-index: 98;
	    transform: translate(-50%, 0);
	`;

	notificationText.style = `
	    margin: 5px;
    	color: #fff;
	`;

	document.body.appendChild(notificationBox);

	setTimeout(() => {
		notificationBox.remove();
	}, timeout);
}

export default notify;