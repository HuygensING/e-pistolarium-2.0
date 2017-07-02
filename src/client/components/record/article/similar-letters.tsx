import * as React from 'react';
import { Link } from 'react-router-dom';

export default ({ similarLetters }) =>
	<div className="similar-letters">
		<h4>Similar letters</h4>
		<ul>
			{
				similarLetters &&
				similarLetters.letters
					.slice(1)
					.sort((a, b) => {
						if (a.title < b.title) return -1;
						if (a.title > b.title) return 1;
						return 0;
					})
					.map((l, i) => {
						const [date, name] = l.title.split(' (');
						return (
							<li key={i}>
								<Link to={`/letters/${l.id}`}>
									<span className="date">{date}</span>
									<span className="name">{name.slice(0, -1)}</span>
								</Link>
							</li>
						);
					})
			}
		</ul>
	</div>
