import * as React from 'react';
import styled from 'styled-components'
import fillGaps from "./fill-gaps";
import createTree from "./create-tree";
import {byStartEnd} from "./utils";
import {splitAnnotations} from "./split-annotations";

const data = {
	annotations: [
		{
			id: 1,
			type: 'paragraph',
			start: 6,
			end: 29,
		},
		{
			id: 2,
			type: 'paragraph',
			start: 31,
			end: 71,
		},
		{
			id: 3,
			type: 'bold',
			start: 8,
			end: 16,
		},
		{
			id: 4,
			type: 'underline',
			start: 23,
			end: 38,
		},
		{
			id: 5,
			type: 'italic',
			start: 34,
			end: 35,
		}
	],
	text: "Hunger, endurance, and horror. Swabbies wave from strengths like stormy furners."
};

const BaseDiv = styled.div`
	display: inline;
`;

const Paragraph = styled(BaseDiv)`
	color: blue;
`;

const Text = styled(BaseDiv)`
	color: green;
`;

const Bold = styled(BaseDiv)`
	font-weight: bold;
`;

const Italic = styled(BaseDiv)`
	font-style: italic;
`;

const Underline = styled(BaseDiv)`
	text-decoration: underline;
`;

const Doc = styled(BaseDiv)`
	background: light-yellow;
`;

const componentByTag = {
	bold: Bold,
	doc: Doc,
	italic: Italic,
	paragraph: Paragraph,
	text: Text,
	underline: Underline,
};

const renderNode = (node, index?) => {
	const Comp = componentByTag[node.type];
	return node.hasOwnProperty('children') ?
		<Comp
			end={node.end}
			id={node.id}
			start={node.start}
			type={node.type}
		  key={index}
		>
			{
				node.children
					.reduce(fillGaps(node), [])
					.map(renderNode)
			}
		</Comp>	:
		<Comp
			end={node.end}
			id={node.id}
			key={index}
			start={node.start}
		  type={node.type}
		>
			{data.text.slice(node.start, node.end + 1)}
		</Comp>;
};

class Json2react extends React.Component<any, any> {
	private standoff2react() {
		const annotations = data.annotations.sort(byStartEnd);
		const annotationTree = splitAnnotations(annotations)
			.reduce(createTree, []);
		console.log(annotationTree);

		const root = {
			start: 0,
			end: data.text.length - 1,
			id: 'some-random-root-id',
			type: 'doc',
			children: annotationTree,
		};

		return renderNode(root);
	}

	public render() {
		return (
			<div>
				{this.standoff2react()}
			</div>
		);
	}
}

export default Json2react;