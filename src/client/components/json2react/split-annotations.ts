import {byStartEnd} from "./utils";
export const toSplitPoints = (splitPoints, curr, index, arr) => {
	if (index === 0) return splitPoints;
	const prevAnnotations = arr.slice(0, index);
	prevAnnotations.forEach((prev) => {
		if (
			splitPoints.indexOf(prev.end) === -1 &&
			curr.start <= prev.end &&
			curr.end > prev.end
		) {
			splitPoints.push(prev.end);
		}
	});

	return splitPoints;
};

export const splitAnnotation = (annotation, splitPoints) => {
	let points = [annotation.start].concat(splitPoints);
	if (annotation.end !== splitPoints[splitPoints.length - 1]) {
		points = points.concat(annotation.end);
	}

	return points.reduce((agg, curr, index, arr) => {
		if (index === arr.length - 1) return agg;

		let to = arr[index + 1];
		if (index > 0) curr += 1;
		agg.push({...annotation, ...{start: curr, end: to}});
		return agg;
	}, []);
};

export const splitAnnotations = (annotations) => {
	let splitPoints = annotations
		.reduce(toSplitPoints, [])
		.map((sp) => ({
			value: sp,
			active: false,
		}));

	let splitPointIndex = 0;

	return annotations
		.reduce((agg, curr, index, arr) => {
			let currSplitPoint = splitPoints[splitPointIndex];
			if (curr.start > currSplitPoint.value) {
				splitPointIndex += 1;
				currSplitPoint = splitPoints[splitPointIndex];
			}
			if (currSplitPoint == null) {
				agg.push(curr);
				return agg;
			}

			for (let i = 0; i < splitPoints.length; i++) {
				const sp = splitPoints[i];
				if (sp.value === curr.end) sp.active = true;
			}

			const splitPointsInCurr = splitPoints.filter((sp) =>
				sp.active && sp.value >= curr.start && sp.value < curr.end
			);

			if (splitPointsInCurr.length)	{
				agg = agg.concat(splitAnnotation(
					curr,
					splitPointsInCurr.map((sp) => sp.value)
				));
			} else {
				agg.push(curr);
			}

			return agg;
		}, [])
		.sort(byStartEnd);
};