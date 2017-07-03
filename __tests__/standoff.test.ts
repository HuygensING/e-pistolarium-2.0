import createTree from '../src/client/components/standoff/create-tree';
import {byStartEnd, hasOverlap, addRow, byRowStartEnd} from "../src/client/components/standoff/utils";
import {splitAnnotation, splitAnnotations, toSplitPoints} from "../src/client/components/standoff/split-annotations";

const annotations = [
	{
		start: 0,
		end: 19,
	},
	{
		start: 0,
		end: 3,
	},
	{
		start: 2,
		end: 9,
	},
	{
		start: 3,
		end: 4,
	},
	{
		start: 8,
		end: 11,
	},
	{
		start: 16,
		end: 19,
	}
];

const annotationsWithRow = [
	{
		start: 0,
		end: 19,
		row: 0,
	},
	{
		start: 0,
		end: 3,
		row: 1,
	},
	{
		start: 2,
		end: 9,
		row: 2,
	},
	{
		start: 3,
		end: 4,
		row: 3,
	},
	{
		start: 8,
		end: 11,
		row: 1,
	},
	{
		start: 16,
		end: 19,
		row: 1,
	}
];

const annotationsSortedByRow = [
	{
		start: 0,
		end: 19,
		row: 0,
	},
	{
		start: 0,
		end: 3,
		row: 1,
	},
	{
		start: 8,
		end: 11,
		row: 1,
	},
	{
		start: 16,
		end: 19,
		row: 1,
	},
	{
		start: 2,
		end: 9,
		row: 2,
	},
	{
		start: 3,
		end: 4,
		row: 3,
	},
];

const annotationsSplitted = [
	{
		start: 0,
		end: 19,
	},
	{
		start: 0,
		end: 3,
	},
	{
		start: 8,
		end: 11,
	},
	{
		start: 16,
		end: 19,
	},
	{
		start: 2,
		end: 3,
	},
	{
		start: 4,
		end: 7,
	},
	{
		start: 8,
		end: 9,
	},
	{
		start: 3,
		end: 3,
	},
	{
		start: 4,
		end: 4,
	},
];

describe('hasOverlap', () => {
	test('hasOverlap 1', () => {
		expect(hasOverlap({ start: 0, end: 5 }, { start : 6, end: 10 })).toBeFalsy();
	});

	test('hasOverlap 2', () => {
		expect(hasOverlap({ start: 6, end: 10 }, { start : 0, end: 5 })).toBeFalsy();
	});

	test('hasOverlap 3', () => {
		expect(hasOverlap({ start: 0, end: 5 }, { start : 5, end: 10 })).toBeTruthy();
	});

	test('hasOverlap 4', () => {
		expect(hasOverlap({ start: 0, end: 5 }, { start : 0, end: 5 })).toBeTruthy();
	});

	test('hasOverlap 5', () => {
		expect(hasOverlap({ start: 0, end: 5 }, { start : 3, end: 8 })).toBeTruthy();
	});

	test('hasOverlap 6', () => {
		expect(hasOverlap({ start: 5, end: 10 }, { start : 0, end: 7 })).toBeTruthy();
	});
});

describe('addRow', () => {
	test('addRow 1', () => {
		const received = annotations.map(addRow());
		expect(received).toEqual(annotationsWithRow);
	})
});

describe('byRowStartEnd', () => {
	test('byRowStartEnd 1', () => {
		const received = annotationsWithRow.sort(byRowStartEnd);
		expect(received).toEqual(annotationsSortedByRow);
	})
});

describe('toSplitPoints', () => {
	test('toSplitPoints 1', () => {
		const received = annotationsSortedByRow.reduce(toSplitPoints, []);
		const expected = [3, 7];
		expect(received).toEqual(expected);
	});
});

describe('splitAnnotation', () => {
	test('splitAnnotation: on start point', () => {
		const received = splitAnnotation({start: 3, end: 4}, [3]);
		const expected = [
			{ start: 3, end: 3 },
			{ start: 4, end: 4 },
		];
		expect(received).toEqual(expected);
	});

	test('splitAnnotation: point in between', () => {
		const received = splitAnnotation({start: 3, end: 5}, [4]);
		const expected = [
			{ start: 3, end: 4 },
			{ start: 5, end: 5 },
		];
		expect(received).toEqual(expected);
	});

	test('splitAnnotation: on end point', () => {
		const received = splitAnnotation({start: 3, end: 5}, [5]);
		const expected = [{ start: 3, end: 5 }];
		expect(received).toEqual(expected);
	});

	test('splitAnnotation: multiple split points 1', () => {
		const received = splitAnnotation({start: 0, end: 19}, [4, 11, 16]);
		const expected = [
			{ start: 0, end: 4 },
			{ start: 5, end: 11 },
			{ start: 12, end: 16 },
			{ start: 17, end: 19 },
		];
		expect(received).toEqual(expected);
	});

	test('splitAnnotation: multiple split points 2', () => {
		const received = splitAnnotation({start: 2, end: 9}, [3, 7]);
		const expected = [
			{ start: 2, end: 3 },
			{ start: 4, end: 7 },
			{ start: 8, end: 9 },
		];
		expect(received).toEqual(expected);
	});
});

describe('splitAnnotations', () => {
	test('splitAnnotations: second', () => {
		const received = annotationsSortedByRow
			.reduce(splitAnnotations(), [])
			.map((a) => { delete a.row; return a; });
		expect(received).toEqual(annotationsSplitted);
	});
});

describe('createTree', () => {
	test('createTree 1', () => {
		const received = annotationsSplitted
			.sort(byRowStartEnd)
			.reduce(createTree, []);

		const expected = [
			{
				start: 0,
				end: 19,
				children: [
					{
						start: 0,
						end: 3,
						children: [
							{
								start: 2,
								end: 3,
								children: [
									{
										start: 3,
										end: 3,
									},
								]
							}
						]
					},
					{
						start: 4,
						end: 7,
						children: [
							{
								start: 4,
								end: 4,
							}
						]
					},
					{
						start: 8,
						end: 11,
						children: [
							{
								start: 8,
								end: 9,
							},
						]
					},
					{
						start: 16,
						end: 19,
					},
				],
			},
		];
		expect(received).toEqual(expected);
	})
})

/*
<geel> 0 - 19
	<roze> 0 - 3
		ab
		<blauw> 2 - 9
			c
			<groen>d</groen> 3 - 4
		</blauw>
	</roze>
	<blauw>
		<groen>e</groen>
		fgh
		<roze>ij</roze> 8 - 11
	</blauw>
	<roze>kl</roze>
	mnop
	<roze>qrst</roze> 16 - 19
</geel>
 */
