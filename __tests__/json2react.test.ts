import createTree from '../src/client/components/json2react/create-tree';
import {byStartEnd} from "../src/client/components/json2react/utils";
import {splitAnnotation, splitAnnotations, toSplitPoints} from "../src/client/components/json2react/split-annotations";

const annotations1 = [
	{
		start: 6,
		end: 29,
	},
	{
		start: 8,
		end: 16,
	},
	{
		start: 23,
		end: 38,
	},
	{
		start: 31,
		end: 71,
	},
	{
		start: 34,
		end: 35,
	}
];

const annotations2 = [
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

const annotations3 = [
	{ start: 1, end: 3 },
	{ start: 0, end: 4 },
	{ start: 1, end: 2 },
	{ start: 0, end: 6 },
];

describe('createTree', () => {
	test('byStartEnd: sorting by start and end', () => {
		const received = annotations3.sort(byStartEnd);
		const expected = [
			{ start: 0, end: 6 },
			{ start: 0, end: 4 },
			{ start: 1, end: 3 },
			{ start: 1, end: 2 },
		];
		expect(received).toEqual(expected)
	});

	test('toSplitPoints: second', () => {
		const received = annotations2.reduce(toSplitPoints, []);
		const expected = [3, 9];
		expect(received).toEqual(expected);
	});

	test('toSplitPoints: on end point', () => {
		const received = [
			{ start: 0, end: 5, },
			{ start: 5, end: 9, }
		].reduce(toSplitPoints, []);
		const expected = [5];

		expect(received).toEqual(expected);
	});

	test('toSplitPoints: no split point', () => {
		const received = [
			{ start: 0, end: 5, },
			{ start: 6, end: 9, }
		].reduce(toSplitPoints, []);

		expect(received).toHaveLength(0);
	});

	test('toSplitPoints: no split point 2', () => {
		const received = [
			{ start: 0, end: 5, },
			{ start: 0, end: 5, }
		].reduce(toSplitPoints, []);

		expect(received).toHaveLength(0);
	});

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

	test('splitAnnotation: multiple split points', () => {
		const received = splitAnnotation({start: 0, end: 19}, [4, 11, 16]);
		const expected = [
			{ start: 0, end: 4 },
			{ start: 5, end: 11 },
			{ start: 12, end: 16 },
			{ start: 17, end: 19 },
		];
		expect(received).toEqual(expected);
	});

	test('splitAnnotations: second', () => {
		const received = splitAnnotations(annotations2);
		const expected = [
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
				end: 3,
			},
			{
				start: 3,
				end: 3,
			},
			{
				start: 4,
				end: 9,
			},
			{
				start: 4,
				end: 4,
			},
			{
				start: 8,
				end: 9,
			},
			{
				start: 10,
				end: 11,
			},
			{
				start: 16,
				end: 19,
			}
		];
		expect(received).toEqual(expected);

	});

	test('splitAnnotations: first', () => {
		const received = splitAnnotations(annotations1);
		const expected = [
			{
				start: 6,
				end: 29,
			},
			{
				start: 8,
				end: 16,
			},
			{
				start: 23,
				end: 29,
			},
			{
				start: 30,
				end: 38,
			},
			{
				start: 31,
				end: 38,
			},
			{
				start: 34,
				end: 35,
			},
			{
				start: 39,
				end: 71,
			},
		];
		expect(received).toEqual(expected);

	});

	test('createTree: first', () => {
		const received = splitAnnotations(annotations1)
			.reduce(createTree, []);
		const expected = [
			{
				start: 6,
				end: 29,
				children: [
					{
						start: 8,
						end: 16,
					},
					{
						start: 23,
						end: 29,
					},
				],
			},
			{
				start: 30,
				end: 38,
				children: [
					{
						start: 31,
						end: 38,
						children: [
							{
								start: 34,
								end: 35,
							},
						],
					},
				],
			},
			{
				start: 39,
				end: 71,
			}
		];
		expect(received).toEqual(expected);
	});

	test('createTree: second', () => {
		const received = splitAnnotations(annotations2)
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
						end: 9,
						children: [
							{
								start: 4,
								end: 4,
							},
							{
								start: 8,
								end: 9,
							}
						]
					},
					{
						start: 10,
						end: 11,
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
});

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
