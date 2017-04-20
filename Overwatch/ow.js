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
oReq.open("GET", "./users.txt", true);

oReq.send();

function printStuff(string){
	var list = string.split('\n');
	var sortedList = [];
	var p1 = []
	for (var name in list){
		var string = "<p>" + list[name] + "</p>\n";
		//$("#table").append(string);
		p1.push($.get(
			"https://overwatch-api-ku.herokuapp.com/profile/pc/us/" + list[name],
	  	 	function(data) {sortedList.push({name: data.username, rank: data.competitive.rank});},
			"json"))
	}
	Promise.all(p1).then(finish);
	function finish() {
		sortedList.sort(function(a,b){return a.rank - b.rank});
		console.log(sortedList);
		sortedList.map(function(data) {$("#table").append("<p>" + data.name + " : " + data.rank + "</p>")})
	}
}
