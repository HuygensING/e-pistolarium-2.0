import * as React from 'react';
require('codemirror/mode/javascript/javascript');
import * as CodeMirror from 'react-codemirror';
import styled from 'styled-components'
import fillGaps from "./fill-gaps";
import createTree from "./create-tree";
import {addRow, byRowStartEnd, byStartEnd} from "./utils";
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

const InlineDiv = styled.div`
	display: inline;
`;

const Doc = styled.div`
	background: lightyellow;
	border: 2px dotted orange;
	margin: 1em;
	padding: 1em;
`;

const Paragraph = styled.div`
	color: blue;
	background: rgba(255, 182, 193, 0.2);
	border: 2px dotted pink;
	margin: 1em;
	padding: 1em;
`;

const Text = styled(InlineDiv)`
	color: green;
`;

const Bold = styled(InlineDiv)`
	font-weight: bold;
`;

const Italic = styled(InlineDiv)`
	font-style: italic;
`;

const Underline = styled(InlineDiv)`
	text-decoration: underline;
`;

const Head = styled.h2`
	margin-top: 2em;
`;

const componentByTag = {
	bold: Bold,
	doc: Doc,
	italic: Italic,
	paragraph: Paragraph,
	text: Text,
	underline: Underline,
};


class Json2react extends React.Component<any, any> {
	public state = {
		annotations: JSON.stringify(data.annotations, null, 4),
		text: data.text,
	};

	private renderNode = (node, index?) => {
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
						.map(this.renderNode)
				}
			</Comp>	:
			<Comp
				end={node.end}
				id={node.id}
				key={index}
				start={node.start}
				type={node.type}
			>
				{this.state.text.slice(node.start, node.end + 1)}
			</Comp>;
	};

	private standoff2react() {
		const annotations = JSON.parse(this.state.annotations)
			.map(addRow())
			.sort(byRowStartEnd)
			.reduce(splitAnnotations(), [])
			.sort(byRowStartEnd)
			.reduce(createTree, []);

		const root = {
			start: 0,
			end: this.state.text.length - 1,
			id: 'some-random-root-id',
			type: 'doc',
			children: annotations,
		};

		return this.renderNode(root);
	}

	public render() {
		return (
			<div>
				<Head>Text</Head>
				<CodeMirror
					className="text"
					value={this.state.text}
					onChange={(text) => this.setState({text})}
				/>
				<Head>Annotations</Head>
				<CodeMirror
					value={this.state.annotations}
					onChange={(annotations) => this.setState({annotations})}
				  options={{
				  	lineNumbers: true,
				  	mode: 'javascript',
				  }}
				/>
				<Head>Output</Head>
				{this.standoff2react()}
			</div>
		);
	}
}

export default Json2react;