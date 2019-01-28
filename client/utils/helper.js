export function	getPrettyTime(timeMs) {
	let hour;
	let minute = Math.floor(timeMs / 60000);
	let second = (timeMs - (minute * 60000)) / 1000;
	let prettyTimeStr = `${minute} minutes, ${second} seconds`;


	console.log('prettyTimeStr', prettyTimeStr);
	return prettyTimeStr;
}

export function	getPrettyDate(date) {

}
