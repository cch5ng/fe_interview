import { getPrettyTime, getPrettyDate, getRandomlyOrderedList } from './helper'; 

describe('helper getPrettyTime()', () => {

	it('should convert minutes', () => {
		const timeMs = 1800000;
		const timeStr = `30 min`;
		expect(getPrettyTime(timeMs)).toEqual(timeStr);
	});

	it('should convert hours/minutes', () => {
		const timeMs2 = 4800000;
		const timeStr2 = `1 hr:20 min`;
		expect(getPrettyTime(timeMs2)).toEqual(timeStr2);
	});

	it('should convert hours', () => {
		const timeMs3 = 7200000;
		const timeStr3 = `2 hr`;
		expect(getPrettyTime(timeMs3)).toEqual(timeStr3);
	});

});

// TODO set of tests for getPrettyDate()

describe('helper getRandomlyOrderedList()', () => {



	it('should return a different list', () => {
		const origList = [
			{
				category: "... Questions",
				child_content: null,
				content: "Who?",
				id: 5,
				sort_order: 0,
				status: "not_visited"
			},
			{
				category: "... Questions",
				child_content: null,
				content: "When?",
				id: 6,
				sort_order: 1,
				status: "not_visited"	
			}
		];

		expect(getRandomlyOrderedList(origList)).not.toEqual(origList);

	})
})