const fillGaps = (parent) => {
	let prevEnd = parent.start;

	return (agg, curr, index, arr) => {
		const prev = agg[agg.length - 1];
		curr = {...curr}; // Shallow copy curr to get rid of reference
		curr.start = curr.start < parent.start ? parent.start : curr.start;
		curr.end = curr.end > parent.end ? parent.end : curr.end;

		// If the first annotation does not start at 0, add a text component
		// from 0 until the start of the first annotation.
		if (prev == null && curr.start > parent.start) {
			const end = curr.start - 1;
			agg.push({
				end,
				id: 'some-random-first-id',
				start: parent.start,
				// text: data.text.slice(0, end),
				type: 'text',
			});
			prevEnd = end;
		}

		// If the current start is bigger than the prevEnd, it means there
		// are some 'untagged' chars. Add a text component to the 'untagged' chars.
		// If "This {prevEnd}is{curr.start} an example", than "is" is untagged.
		if (curr.start > prevEnd + 1) {
			const start = prevEnd + 1;
			const end = curr.start - 1;
			agg.push({
				end,
				id: `some-random-id-${index}`,
				start,
				// text: data.text.slice(start - 1, end),
				type: 'text',
			});
		}

		// Add current annotation to the aggregate.
		// curr.text = data.text.slice(curr.start - 1, curr.end);
		agg.push(curr);

		// Update the prevEnd if the curr.end is bigger than prevEnd.
		// If curr.end is smaller, the current annotation is a child.
		prevEnd = curr.end > prevEnd ? curr.end : prevEnd;

		// If the last annotation does not end at the end of the text,
		// wrap the last chars in a text component.
		if (index === arr.length - 1 && prevEnd < parent.end) {
			agg.push({
				end: parent.end,
				id: 'some-random-last-id',
				start: prevEnd + 1,
				type: 'text',
			});
		}

		return agg;
	}
};

export default fillGaps;
