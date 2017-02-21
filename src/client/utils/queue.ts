export default class Queue {
	private elements: any[] = [];
	private maxSize: number = 10;

	constructor(maxSize?: number) {
		if (maxSize != null) {
			this.maxSize = maxSize;
		}
	}

	public add(element: any): Queue {
		if (this.elements.length === this.maxSize) {
			this.removeOldest();
		}
		this.elements = this.elements.concat(element);

		return this;
	}

	public first(): any {
		return this.elements[0];
	}

	public last(): any {
		return this.elements[this.elements.length - 1];
	}

	public removeOldest() {
		this.elements = this.elements.slice(1);
		return this;
	}

	public size(): number {
		return this.elements.length;
	}

	public values(): any[] {
		return this.elements;
	}
}
