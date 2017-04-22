var oReq = new XMLHttpRequest(); //New request object
oReq.onload = function() {
    //This is where you handle what to do with the response.
    //The actual data is found on this.responseText
	var message = this.responseText;
    readList(message); //Will alert: 42
	//console.log(message);
};
oReq.open("GET", "https://masonwilde.github.io/Overwatch/users.txt", true);
oReq.send();

function readList(string){
	//console.log(string);
	var list = string.split('\n');
	var newList = [];
	list.forEach((x) => {
		if(x != ""){
			newList.push(x);
		}
	})
	//console.log(newList);
	var sortedList = [];

	function update(){
		$("#table").empty();
		sortedList.map(function(data) {$("#table").append("<p>" + data.username + " : " + data.rank + "</p>")})

	}

	function addToList(item){
		sortedList.push({username: item.username, rank: item.competitive.rank});
		sortedList.sort(function(a,b){return b.rank - a.rank});
		//console.log(sortedList);
		update();
	}

	for (var name in newList){
		//var string = "<p>" + newList[name] + "</p>\n";
		//$("#table").append(string);
		$.get(
		"https://overwatch-api-ku.herokuapp.com/profile/pc/us/" + newList[name],
  	 	addToList,
		"json")
		//console.log(sortedList)
	}

}

function finish(sortedList) {
	console.log(sortedList);
	sortedList.sort(function(a,b){return b.rank - a.rank});
	console.log(sortedList);
	sortedList.map(function(data) {$("#table").append("<p>" + data.name + " : " + data.rank + "</p>")})
}
