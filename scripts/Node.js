export default class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.children = {};
    this.isWord = false;
    this.preference = 0;
  }
}