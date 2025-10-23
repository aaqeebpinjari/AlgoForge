// src/algorithms/linkedList.js

export class ListNode {
	constructor(data, next = null) {
		this.data = data;
		this.next = next;
	}
	// keep a method to satisfy linter (not constructor-only)
	value() { return this.data; }
}

export class LinkedList {
	constructor() {
		this.head = null;
		this.size = 0;
	}

	toArray() {
		const arr = [];
		let curr = this.head;
		while (curr) {
			arr.push(curr.data);
			curr = curr.next;
		}
		return arr;
	}

	insertHead(data) {
		const n = new ListNode(data, this.head);
		this.head = n;
		this.size++;
	}

	insertTail(data) {
		const n = new ListNode(data);
		if (!this.head) {
			this.head = n;
			this.size++;
			return;
		}
		let curr = this.head;
		while (curr.next) curr = curr.next;
		curr.next = n;
		this.size++;
	}

	insertAt(index, data) {
		if (index <= 0) return this.insertHead(data);
		if (index >= this.size) return this.insertTail(data);
		let curr = this.head;
		let prev = null;
		let i = 0;
		while (i < index) {
			prev = curr;
			curr = curr.next;
			i++;
		}
		const n = new ListNode(data, curr);
		prev.next = n;
		this.size++;
	}

	deleteHead() {
		if (!this.head) return null;
		const val = this.head.data;
		this.head = this.head.next;
		this.size--;
		return val;
	}

	deleteTail() {
		if (!this.head) return null;
		if (!this.head.next) {
			const val = this.head.data;
			this.head = null;
			this.size = 0;
			return val;
		}
		let curr = this.head;
		let prev = null;
		while (curr.next) {
			prev = curr;
			curr = curr.next;
		}
		const val = curr.data;
		prev.next = null;
		this.size--;
		return val;
	}

	deleteAt(index) {
		if (index <= 0) return this.deleteHead();
		if (index >= this.size - 1) return this.deleteTail();
		let curr = this.head;
		let prev = null;
		let i = 0;
		while (i < index) {
			prev = curr;
			curr = curr.next;
			i++;
		}
		const val = curr.data;
		prev.next = curr.next;
		this.size--;
		return val;
	}

	search(value) {
		let curr = this.head;
		let idx = 0;
		while (curr) {
			if (curr.data === value) return idx;
			curr = curr.next;
			idx++;
		}
		return -1;
	}

	reverse() {
		let prev = null;
		let curr = this.head;
		while (curr) {
			const next = curr.next;
			curr.next = prev;
			prev = curr;
			curr = next;
		}
		this.head = prev;
	}

	// Simple insertion sort on linked list
	sort() {
		let sorted = null;
		let curr = this.head;
		while (curr) {
			const next = curr.next;
			if (!sorted || curr.data < sorted.data) {
				curr.next = sorted;
				sorted = curr;
			} else {
				let s = sorted;
				while (s.next && s.next.data < curr.data) s = s.next;
				curr.next = s.next;
				s.next = curr;
			}
			curr = next;
		}
		this.head = sorted;
	}
}

export const LINKED_LIST_PSEUDOCODE = {
	insertHead: [
		{ code: 'newNode.next = head', explain: 'Point new node to current head' },
		{ code: 'head = newNode', explain: 'Update head to new node' }
	],
	insertTail: [
		{ code: 'walk to tail', explain: 'Find last node' },
		{ code: 'tail.next = newNode', explain: 'Append at the end' }
	],
	insertAt: [
		{ code: 'walk to index-1', explain: 'Find previous node' },
		{ code: 'newNode.next = prev.next', explain: 'Link new node' },
		{ code: 'prev.next = newNode', explain: 'Insert into list' }
	],
	deleteHead: [
		{ code: 'head = head.next', explain: 'Drop first node' }
	],
	deleteTail: [
		{ code: 'walk to tail-1', explain: 'Find previous to last' },
		{ code: 'prev.next = null', explain: 'Remove last node' }
	],
	deleteAt: [
		{ code: 'walk to index-1', explain: 'Find previous node' },
		{ code: 'prev.next = prev.next.next', explain: 'Bypass node' }
	],
	search: [
		{ code: 'for node in list', explain: 'Traverse each node' },
		{ code: 'if node.data == value', explain: 'Return index' }
	],
	traverse: [
		{ code: 'curr = head', explain: 'Start from head' },
		{ code: 'while curr', explain: 'Visit each node' }
	],
	reverse: [
		{ code: 'prev=null, curr=head', explain: 'Init pointers' },
		{ code: 'while curr: next=curr.next; curr.next=prev', explain: 'Reverse link' },
		{ code: 'prev=curr; curr=next', explain: 'Advance pointers' },
		{ code: 'head=prev', explain: 'New head' }
	],
	sort: [
		{ code: 'insertion sort by re-linking', explain: 'Build sorted list' }
	]
};

// Build step descriptors for visualization
export const getLinkedListSteps = (operation, listInstance, params = {}) => {
	const steps = [];
	const arr = listInstance.toArray();
	const pushState = (type, highlightIndex = -1, pseudoLine = 0, description = '') => {
		steps.push({ type, list: [...arr], highlightIndex, pseudoLine, description });
	};

	const value = params.data !== undefined ? parseInt(params.data, 10) : undefined;
	const index = params.index !== undefined ? parseInt(params.index, 10) : undefined;

	const ops = {
		insertHead: () => { pushState('highlight', -1, 0, `Insert ${value} at head.`); arr.unshift(value); pushState('insert', 0, 1, `Inserted ${value} at head.`); },
		insertTail: () => { pushState('highlight', -1, 0, `Insert ${value} at tail.`); arr.push(value); pushState('insert', arr.length - 1, 1, `Inserted ${value} at tail.`); },
		insertAt: () => { const idx = Math.max(0, Math.min(index ?? 0, arr.length)); pushState('highlight', Math.max(idx - 1, 0), 0, `Insert ${value} at index ${idx}.`); arr.splice(idx, 0, value); pushState('insert', idx, 2, `Inserted ${value} at index ${idx}.`); },
		deleteHead: () => { if (arr.length > 0) { pushState('highlight', 0, 0, 'Delete head.'); arr.shift(); pushState('delete', 0, 0, 'Deleted head.'); } },
		deleteTail: () => { if (arr.length > 0) { pushState('highlight', arr.length - 1, 0, 'Delete tail.'); arr.pop(); pushState('delete', arr.length, 1, 'Deleted tail.'); } },
		deleteAt: () => { const idx = Math.max(0, Math.min(index ?? 0, arr.length - 1)); if (arr.length > 0) { pushState('highlight', idx, 0, `Delete at index ${idx}.`); arr.splice(idx, 1); pushState('delete', idx, 1, `Deleted index ${idx}.`); } },
		search: () => { const val = value; let found = -1; for (let i = 0; i < arr.length; i++) { pushState('traverse', i, 0, `Check index ${i}.`); if (arr[i] === val) { found = i; pushState('found', i, 1, `Found ${val} at index ${i}.`); break; } } if (found === -1) pushState('notFound', -1, 1, `${val} not found.`); },
		traverse: () => { for (let i = 0; i < arr.length; i++) pushState('visit', i, 1, `Visit ${arr[i]} at index ${i}.`); },
		reverse: () => { pushState('highlight', -1, 0, 'Reverse list.'); arr.reverse(); pushState('reversed', 0, 3, 'List reversed.'); },
		sort: () => { pushState('highlight', -1, 0, 'Sort list.'); arr.sort((a, b) => a - b); pushState('sorted', 0, 0, 'List sorted.'); }
	};

	(ops[operation] || (() => pushState('initial', -1, 0, 'Initial state.')))();
	return steps;
};

