import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
  }
  
  insert(word) {
    let currentNode = this.root;
    
    [...word.toLowerCase()].forEach( letter => {
      if ( !currentNode.children[letter] ) {
        currentNode.children[letter] = new Node(letter);
      }
      
      currentNode = currentNode.children[letter];      
    });
    
    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++;
    }
  }
  
  count() {
    return this.wordCount;
  }
  
  suggest(input) {
    // TODO: some error statement if it's not in the trie
    
    let currentNode = this.root;
    let tempStr = '';
    const suggestionsArr = [];
    
    while (!currentNode.isWord) {
      console.log(currentNode);
      // tempStr += ???;
      currentNode = currentNode.children;      
    }
    
    suggestionsArr.push(tempStr);
    
    return suggestionsArr;
  }
}