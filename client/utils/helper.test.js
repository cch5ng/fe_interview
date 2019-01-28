import { getPrettyTime } from './helper'; //, getPrettyDate

describe('helper getPrettyTime()', () => {

	it('should convert minutes', () => {
		const timeMs = 1800000;
		expect(getPrettyTime(timeMs)).toEqual(`30 minutes, 0 seconds`);
	});

	// it('should convert hours/minutes', () => {

	// });

	// it('should convert even hours/minutes/seconds', () => {

	// });

	// it('should convert even hours/minutes/seconds', () => {

	// });

});
