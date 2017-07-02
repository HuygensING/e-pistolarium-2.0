const hasOverlap = (curr, prev) => curr.start <= prev.end || curr.end >= prev.start;
const findOverlap = () => {
	let parent;

	return (curr, children) => {

	}
} ;


const fixPrevChildren = (prev) => {
	if (prev.hasOwnProperty('children')) {
		prev.children = prev.children.reduce(createTree, []);
	}
};


const createTree = (agg, curr, index, arr) => {
	curr = {...curr};
	if (agg.length === 0) {
		agg.push(curr);
		return agg;
	}

	const prev = agg[agg.length - 1];

	// The current annotation overlaps with the previous annotation
	// and thus curr is (partly) a child of prev.
	// The current annotation does not have to be a direct child of
	// prev, so all the children (and their children) have to be checked.
	if (curr.start <= prev.end) {
		if (!prev.hasOwnProperty('children')) prev.children = [];
		prev.children.push(curr);

	// The current annotation comes after the previous annotation and
	// does not overlap. This does not mean the current annotation is not
	// a child of any of the previous annotations, so all annotations up
	// to the current annotation are checked on overlap.
	} else {
		fixPrevChildren(prev);
		const prevAnnotations = arr.slice(0, index);
		const children = prevAnnotations.filter((a) => a.end >= curr.start);
		if (children.length) curr.children = children;
		agg.push(curr);
	}

	if (index + 1 === arr.length) {
		fixPrevChildren(prev);
	}

	return agg;
};

export default createTree;
