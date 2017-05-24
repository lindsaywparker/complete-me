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
    let currentNode = this.root;
    let inputStr = '';
    let suggestionsArr = [];
    
    [...input.toLowerCase()].forEach( letter => {
      inputStr += letter;      
      currentNode = currentNode.children[letter];      
    });
    
    if (currentNode.isWord) {
      suggestionsArr.push(inputStr);
    }
    
    return this.recurse(inputStr, currentNode, suggestionsArr);
  }
  
  recurse(str, currentNode, suggestionsArr) {
    
    let kids = Object.keys(currentNode.children);
    
    kids.forEach( child => {
      let word = str + currentNode.children[child].letter; 

      if (currentNode.children[child].isWord) {
        suggestionsArr.push(word);
      }
      word = this.recurse(word, currentNode.children[child], suggestionsArr);
    });
    
    return suggestionsArr;
    
  }
  
  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }
}