// export class LinkedListNode {
//   constructor(data) {
//     this.data = data;
//     this.next = null;
//     this.id = Math.random().toString(36);
//   }
// }

// export const linkedListOperations = {
//   insertAtBeginning: (list, value) => { /* implementation */ },
//   insertAtEnd: (list, value) => { /* implementation */ },
//   insertAtPosition: (list, value, position) => { /* implementation */ },
//   search: (list, value) => { /* implementation */ },
//   traverse: (list) => { /* implementation */ },
//   reverse: (list) => { /* implementation */ }
// };
// src/algorithms/linkedListOperations.js

export class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.id = Math.random().toString(36); // unique id for visualization/tracking
  }
}

export const linkedListOperations = {
  // Insert at the beginning (like insertHead)
  insertAtBeginning: (list, value) => {
    const newNode = new LinkedListNode(value);
    newNode.next = list.head || null;
    list.head = newNode;
    list.size = (list.size || 0) + 1;
    return list;
  },

  // Insert at the end (like insertTail)
  insertAtEnd: (list, value) => {
    const newNode = new LinkedListNode(value);
    if (!list.head) {
      list.head = newNode;
    } else {
      let curr = list.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = newNode;
    }
    list.size = (list.size || 0) + 1;
    return list;
  },

  // Insert at a given position (like insertAt)
  insertAtPosition: (list, value, position) => {
    if (position <= 0 || !list.head) {
      return linkedListOperations.insertAtBeginning(list, value);
    }

    if (position >= (list.size || 0)) {
      return linkedListOperations.insertAtEnd(list, value);
    }

    const newNode = new LinkedListNode(value);
    let curr = list.head;
    let prev = null;
    let i = 0;

    while (i < position) {
      prev = curr;
      curr = curr.next;
      i++;
    }

    newNode.next = curr;
    prev.next = newNode;
    list.size++;
    return list;
  },

  // Search a value and return its index (or -1 if not found)
  search: (list, value) => {
    let curr = list.head;
    let index = 0;
    while (curr) {
      if (curr.data === value) return index;
      curr = curr.next;
      index++;
    }
    return -1;
  },

  // Traverse the list and return an array of node values
  traverse: (list) => {
    const result = [];
    let curr = list.head;
    while (curr) {
      result.push(curr.data);
      curr = curr.next;
    }
    return result;
  },

  // Reverse the list in-place (like reverse)
  reverse: (list) => {
    let prev = null;
    let curr = list.head;

    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    list.head = prev;
    return list;
  }
};
