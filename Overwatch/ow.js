function reqListener () {
      console.log(this.responseText);
    }
var oReq = new XMLHttpRequest(); //New request object
oReq.onload = function() {
    //This is where you handle what to do with the response.
    //The actual data is found on this.responseText
	var message = this.responseText;
    printStuff(message); //Will alert: 42
	console.log(message);
};
oReq.open("GET", "https://masonwilde.github.io/Overwatch/users.txt", true);
oReq.send();

function printStuff(string){
	console.log(string);
	var list = string.split('\n');
	var newList = [];
	list.forEach((x) => {
		if(x != ""){
			newList.push(x);
		}
	})
	console.log(newList);
	var sortedList = [];
	var p1 = []
	for (var name in newList){
		//var string = "<p>" + newList[name] + "</p>\n";
		//$("#table").append(string);
		p1.push(
			$.get(
			"https://overwatch-api-ku.herokuapp.com/profile/pc/us/" + newList[name],
	  	 	function(data) {sortedList.push({name: data.username, rank: data.competitive.rank});},
			"json")
		)
		console.log(sortedList)
	}
	//console.log(sortedList);
	Promise.all(p1).then(() => {console.log(sortedList); finish(sortedList);});

}

function finish(sortedList) {
	console.log(sortedList);
	sortedList.sort(function(a,b){return b.rank - a.rank});
	console.log(sortedList);
	sortedList.map(function(data) {$("#table").append("<p>" + data.name + " : " + data.rank + "</p>")})
}
