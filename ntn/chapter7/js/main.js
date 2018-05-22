function doSomething(event) {
	console.log("Something Happened!");
	console.log(event.type);
	console.log(event.target);
	console.log("screen: (${event.screenX}, ${event.screenY}), page: (${event.pageX}, ${event.pageY}), client: (${event.screenX}, ${event.screenY})");
}

addEventListener("click", doSomething);
