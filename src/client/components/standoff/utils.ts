export const byStartEnd = (a, b) => {
	if (a.start > b.start) return 1;
	if (b.start > a.start) return -1;
	if (a.start === b.start) {
		if (a.end > b.end) return -1;
		if (b.end > a.end) return 1;
	}
	return 0;
};

export const byRowStartEnd = (a, b) => {
	if (a.row > b.row) return 1;
	if (b.row > a.row) return -1;
	if (a.row === b.row) {
		return byStartEnd(a, b);
	}
};

export const hasOverlap = (a, b) => !(a.end < b.start || a.start > b.end);

export const addRow = () => {
	const rows = [[]];
	return (annotation, index) => {
		if (index === 0) {
			annotation.row = 0;
			rows[0].push(annotation);
			return annotation;
		}

		for (let row = 0; row < rows.length; row++) {
			const annotationsInRow = rows[row];
			const isRowWithSpace = annotationsInRow.reduce((hasSpace, curr) => {
				return hasSpace && !hasOverlap(annotation, curr);
			}, true);

			if (isRowWithSpace) {
				annotationsInRow.push(annotation);
				// event.top = row * Constants.EVENT_ROW_HEIGHT;
				annotation.row = row;
				break;
			}
		}

		if (annotation.row == null) {
			const newLength = rows.push([annotation]);
			annotation.row = newLength - 1;
		}

		return annotation;
	}
};

// export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
