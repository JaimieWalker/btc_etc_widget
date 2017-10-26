var bitcoinSocket = new WebSocket("wss://ws-feed.gdax.com");

var request = {
    "type": "subscribe",
    "product_ids": [
        "BTC-USD"
        ],
    "channels": [
        {
            "name": "ticker",
            "product_ids": [
                "BTC-USD",
            ]
        },
    ]
}

bitcoinSocket.onopen = function(event){
	bitcoinSocket.send(JSON.stringify(request));
}

function decimal_places(jsonNum){
	return Number(jsonNum).toFixed(2);
}

$( document ).ready(function(){
var obj, high, low, open, price, change, percent,time;
	bitcoinSocket.onmessage = function(event){
		obj = JSON.parse(event.data);
		if (obj.type == "subscriptions") {

		}
		else{
			high = decimal_places(obj.high_24h);
			low = decimal_places(obj.low_24h);
			open = decimal_places(obj.open_24h);
			price = decimal_places(obj.price);
			change = price - open;
			percent = decimal_places((change/open) * 100);
			time = (new Date(obj.time).toLocaleString()) 
			if (time === "Invalid Date") {
				time = (new Date(Date.now()).toLocaleString());
			}

			if (price < open) {
				low = price;
			}
			else if (price > high) {
				high = price;
			}

			$("#productId").text(obj.product_id)
			$("#price").text(price);
			$("#high").text("H:" + high);
			$("#low").text("L:" + open);
			$("#percent").text(percent + "%");
			$("#timeDate").text(time)
			console.log(event.data);
		}
	}

});

