export function	getPrettyTime(timeMs) {
	let curTimeMs = timeMs;
	let hourStr = '';
	let connectorStr = '';
	let minuteStr = '';

	let hour = Math.floor(curTimeMs / (60 * 60 * 1000));

	if (hour === 1) {
		hourStr = `${hour} hour`;
	} else if (hour > 1) {
		hourStr = `${hour} hours`;
	}

	curTimeMs = curTimeMs - (hour * (60 * 60 * 1000));
	let minute = Math.floor(curTimeMs / (60 * 1000));

	if (minute === 1) {
		minuteStr = `${minute} minute`;
	} else if (minute > 1) {
		minuteStr = `${minute} minutes`;
	}

	if (hour >= 1 && minute >= 1) {
		connectorStr = `, `;
	}
	// TODO improve things like 0 value, singular/plural display
	let prettyTimeStr = `${hourStr}${connectorStr}${minuteStr}`;

	return prettyTimeStr;
}

export function	getPrettyDate(date) {
	let dateClass = new Date(date);
	let dateStr = '';

	// format like mm-dd-yyyy
	// TODO add leading 0 if single digit month or day
	let month = dateClass.getMonth() + 1;
	let day = dateClass.getDate();
	let year = dateClass.getFullYear();

	return `${month}-${day}-${year}`;
}

// not inclusive of max
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomlyOrderedList(ar) {
	let randomAr = [];
	let randomIdxAr = [];
	let listLen = ar.length;
	let idx = 0;

	// make sure don't create repeats
	while (randomAr.length < ar.length) {
		let randomIdx = getRandomArbitrary(0, listLen);
		while (randomAr.indexOf(ar[randomIdx]) > -1) {
			randomIdx = getRandomArbitrary(0, listLen);
		}
		ar[randomIdx]['sort_order'] = idx;
		ar[randomIdx]['status'] = 'not_visited';
		randomAr.push(ar[randomIdx]);
		idx += 1;
	}

	console.log('randomAr', randomAr);
	return randomAr;
}
