export const byStartEnd = (a, b) => {
	if (a.start > b.start) return 1;
	if (b.start > a.start) return -1;
	if (a.start === b.start) {
		if (a.end > b.end) return -1;
		if (b.end > a.end) return 1;
	}
	return 0;
};


// export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
