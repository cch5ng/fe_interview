import { getPrettyTime } from './helper'; //, getPrettyDate

describe('helper getPrettyTime()', () => {

	it('should convert minutes', () => {
		const timeMs = 1800000;
		const timeStr = `30 minutes`;
		expect(getPrettyTime(timeMs)).toEqual(timeStr);
	});

	it('should convert hours/minutes', () => {
		const timeMs2 = 4800000;
		const timeStr2 = `1 hour, 20 minutes`;
		expect(getPrettyTime(timeMs2)).toEqual(timeStr2);
	});

	it('should convert hours', () => {
		const timeMs3 = 7200000;
		const timeStr3 = `2 hours`;
		expect(getPrettyTime(timeMs3)).toEqual(timeStr3);
	});

});
