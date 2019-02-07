export function	getPrettyTime(timeMs) {
	let curTimeMs = timeMs;
	let hourStr = '';
	let connectorStr = '';
	let connectorStr2 = '';
	let minuteStr = '';
	let secondStr = '';

	let hour = Math.floor(curTimeMs / (60 * 60 * 1000));

	if (hour === 1) {
		hourStr = `${hour} hr`;
	} else if (hour > 1) {
		hourStr = `${hour} hr`;
	}

	curTimeMs = curTimeMs - (hour * (60 * 60 * 1000));
	let minute = Math.floor(curTimeMs / (60 * 1000));

	if (minute === 1) {
		minuteStr = `${minute} min`;
	} else if (minute > 1) {
		minuteStr = `${minute} min`;
	}

	curTimeMs = curTimeMs - (minute * (60 * 1000));
	let second = Math.floor(curTimeMs / 1000);

	if (second === 1) {
		secondStr = `${second} sec`;
	} else if (second > 1) {
		secondStr = `${second} sec`;
	}

	if (hour >= 1 && minute >= 1) {
		connectorStr = `:`;
	}
	if (minute >= 1 && second >= 1) {
		connectorStr2 = `:`;
	}
	// TODO improve things like 0 value, singular/plural display
	let prettyTimeStr = `${hourStr}${connectorStr}${minuteStr}${connectorStr2}${secondStr}`;

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

export function formatDateTwoChar(dateStr) {
	if (dateStr.length === 2) {
		return dateStr;
	}

	return `0${dateStr}`;
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

	return randomAr;
}

export function dictToRandomAr(objects) {
	let resultAr = [];

	Object.keys(objects).forEach((id, idx) => {
		let sortOrder = objects[id].sort_order;
		resultAr[sortOrder] = objects[id];
	});

	return resultAr;
}


// return an array of objects given one object (like a set; where keys are id's and values are objects)
export function dictToAr(objects) {
	let resultAr = [];

	Object.keys(objects).forEach(id => {
		resultAr.push(objects[id]);
	});

	return resultAr;
}

export function objRandomArReducer(accum, curVal, curIdx) {
  let id = curVal.id;
  accum[id] = curVal;
  accum['display_order'] = curIdx;
  return accum;
}

// return an object where keys are object id's and values are objects
export function randomArToDict(ar) {
	const obj = ar.reduce(objRandomArReducer, {});

	return obj;
}

export function objArReducer(accum, curVal) {
  let id = curVal.id;
  accum[id] = curVal;
  return accum;
}

// return an object where keys are object id's and values are objects
export function arToDict(ar) {
	const obj = ar.reduce(objArReducer, {});

	return obj;
}
