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
  
  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }
  
  find(str) {
    let currentNode = this.root;
    
    [...str.toLowerCase()].forEach( letter => {
      currentNode = currentNode.children[letter];      
    });
    
    return currentNode;
  }
  
  suggest(input) {
    let suggestionsArr = [];
    
    if (typeof input !== 'string' || input === '') {
      return 'Input a string';
    }
    
    let currentNode = this.find(input);
    
    if (!currentNode) {
      return 'No suggestions available';
    }
    
    if (currentNode.isWord) {
      suggestionsArr.push([input, currentNode.preference]);
    }
    
    let output = this.recurse(input, currentNode, suggestionsArr);
    let finalOutput = this.prepareOutput(output);
    
    return finalOutput;
  }
  
  recurse(str, currentNode, suggestionsArr) {
    let kids = Object.keys(currentNode.children);
    
    kids.forEach( child => {
      let word = str + currentNode.children[child].letter; 

      if (currentNode.children[child].isWord) {
        suggestionsArr.push([word, currentNode.children[child].preference]);
      }
      
      word = this.recurse(word, currentNode.children[child], suggestionsArr);
    });
    
    return suggestionsArr;
  }
  
  select(wordPreference) {
    let currentNode = this.find(wordPreference);
    
    currentNode.preference++;
  }

  count() {
    return this.wordCount;
  }
  
  prepareOutput(array) {
    return array.sort( (a, b) => {
      return b[1] - a[1];
    })
    .reduce( (acc, wordArr) => {
      acc.push(wordArr[0]);
      return acc;
    }, [])
    .slice(0, 15);
  }
}