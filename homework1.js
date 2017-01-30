main = function()
{
	drawBox(10);
}

drawBox = function(var size)
{
	for(var i = 0; i < size; i++){
		for(var j = 0; j < size; j++)
		{
			if( i==0 || i==(size-1) || j==0 || j==(size-1))
			{
				chalk.print('*');
			}
			else
			{
				chalk.print(' ');
			}
		}
		chalk.newline();
	}
	chalk.newline();
}
