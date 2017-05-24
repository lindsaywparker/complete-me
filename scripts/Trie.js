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
    // PSEUDOCODE THIS....
    // Recursively call *separate* function (more easily tested) to build suggestions
    
    // 1) get to node of last char of input
    // 2) recurse all branches
    // 3) push to array if isWord
    // 4) return array
    
    let currentNode = this.root;
    let tempStr = '';
    
    [...input.toLowerCase()].forEach( letter => {
      tempStr += letter;      
      currentNode = currentNode.children[letter];      
    });
    
    return this.recurse(tempStr, currentNode);
    
    // BUG: some error statement if it's not in the trie
  }
  
  recurse(str, currentNode) {    
    let tempStr = str;
    let suggestionsArr;

    if (!suggestionsArr) {
      suggestionsArr = [];
    } else {
      suggestionsArr = suggestionsArr;
    }
      
    if (Object.keys(currentNode.children).length === 0 ) {
      suggestionsArr.push(tempStr);
      return suggestionsArr;
    } else {
      
      let kids = Object.keys(currentNode.children);
      
      kids.forEach( child => {
        tempStr += currentNode.children[child].letter;
        tempStr = this.recurse(tempStr, currentNode.children[child]);
      });
      
      return tempStr;
    }
  }
  
}