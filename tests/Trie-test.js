import { expect } from 'chai';
import Trie from '../scripts/Trie.js';
import Node from '../scripts/Node.js';
import fs from 'fs'
require ('locus');
// const dictionary = '/usr/share/dict/words';




describe('Trie', () => {
  let trie;
  let node;
  
  beforeEach( () => {
    trie = new Trie();
    node = new Node();
  });
  
  it('should create a new instance of Trie', () => {
    expect(trie).to.be.an.instanceof(Trie);
  });
  
  it('should start with a new node as its root', () => {
    expect(trie.root).to.deep.equal(node);
  });
  
  it('should start with a word count of 0', () => {
    expect(trie.count()).to.equal(0);
  });
  
  it('should insert a new letter', () => {
    trie.insert('H');
    expect(trie.root.children.h.letter).to.equal('h');
    
    trie.insert('k');
    expect(trie.root.children.k.letter).to.equal('k');
  });
  
  it('should insert a new word', () => {    
    trie.insert('Hey');
    expect(trie.root.children.h.letter).to.equal('h');
    expect(trie.root.children.h.children.e.letter).to.equal('e');
    expect(trie.root.children.h.children.e.children.y.letter).to.equal('y');
    expect(trie.root.children.h.children.e.children.y.isWord).to.equal(true);
    expect(trie.root.children.h.children.e.isWord).to.equal(false);
    expect(trie.root.children.h.isWord).to.equal(false);
  
    trie.insert('hill');
    expect(trie.root.children.h.letter).to.equal('h');
    expect(trie.root.children.h.children.e.letter).to.equal('e');
    expect(trie.root.children.h.children.i.letter).to.equal('i');
    expect(trie.root.children.h.children.i.children.l.children.l.isWord).
      to.equal(true);
    expect(trie.root.children.h.children.i.isWord).to.equal(false);
  });
  
  it('should count how many unique words have been inserted', () => {
    expect(trie.count()).to.equal(0);
    
    trie.insert('pizza');
    expect(trie.count()).to.equal(1);
    
    trie.insert('suh');
    expect(trie.count()).to.equal(2);
    
    trie.insert('three');
    expect(trie.count()).to.equal(3);
    
    trie.insert('four');
    trie.insert('five');
    trie.insert('six');
    trie.insert('seven');
    trie.insert('eight');
    trie.insert('nine');
    trie.insert('ten');
    expect(trie.count()).to.equal(10);
    
    trie.insert('pizza');
    expect(trie.count()).to.equal(10);
    
    trie.insert('pi');
    expect(trie.count()).to.equal(11);
  });    
  
  // BUG: Test that 'pizza' is word, then insert 'pi' and it's a word
  
  it('should recurse', () => {
    trie.insert('pizza');
    let output = trie.recurse('p', trie.root.children.p, []);
    
    expect(output).to.deep.equal(['pizza']);
  });
  
  it('should return an array of suggested words based on input string', () => {
    trie.insert('pizza');
    trie.insert('pizzas');
    trie.insert('plaza');
    trie.insert('suh');
    trie.insert('a');
    trie.insert('and');
    
    expect(trie.suggest('piz')).to.deep.equal(['pizza', 'pizzas']);
    expect(trie.suggest('p')).to.deep.equal(['pizza', 'pizzas', 'plaza']);
    expect(trie.suggest('s')).to.deep.equal(['suh']);
    expect(trie.suggest('a')).to.deep.equal(['a', 'and']);
    
  });

  // BUG: test if there are no suggestions
  
  it.skip('should populate the built-in dictionary', () => {
    const text = '/usr/share/dict/words';
    let dictionary = fs.readFileSync(text).toString().toLowerCase().trim().
      split('\n');
    
    // reduce on dictionary to count each instance {word: count}
    // duplicates = object.keys().filter where count > 1
    
    // let uniqueCount = dictionary.length - duplicates.length;
    
    let uniqueCount = 235886 - 1515;
    
    expect(trie.count()).to.equal(0);
    trie.populate(dictionary);
    expect(trie.count()).to.equal(uniqueCount);
  });

  
});
