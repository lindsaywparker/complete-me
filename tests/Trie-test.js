import { expect } from 'chai';
import Trie from '../scripts/Trie.js';
import Node from '../scripts/Node.js';
import fs from 'fs'

describe('Trie', () => {
  let trie;
  let node;
  
  beforeEach( () => {
    trie = new Trie();
    node = new Node();
  });
  
  it('CLASS: should create a new instance of Trie', () => {
    expect(trie).to.be.an.instanceof(Trie);
  });
  
  it('CONSTRUCTOR: should start with a new node as its root', () => {
    expect(trie.root).to.deep.equal(node);
  });
  
  it('CONSTRUCTOR: should start with a word count of 0', () => {
    expect(trie.count()).to.equal(0);
  });
  
  it('INSERT: should insert a new letter', () => {
    trie.insert('H');
    expect(trie.root.children.h.letter).to.equal('h');
    
    trie.insert('k');
    expect(trie.root.children.k.letter).to.equal('k');
  });
  
  it('INSERT: should insert a new word', () => {    
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
  
  it.skip('POPULATE: should populate the built-in dictionary', () => {
    const text = '/usr/share/dict/words';
    let dictionary = fs.readFileSync(text).toString().toLowerCase().trim().
      split('\n');
    
    let uniqueWordsCount = 235886 - 1515;
    
    expect(trie.count()).to.equal(0);
    trie.populate(dictionary);
    expect(trie.count()).to.equal(uniqueWordsCount);
        
    expect(trie.suggest('piz')).deep.equal(['pize', 'pizza', 'pizzeria', 
      'pizzicato', 'pizzle']);
  });
  
  it('FIND: should find the correct node based on an input', () => {
    trie.insert('pizza');
    expect(trie.find('piz')).to.equal(trie.root.children.p.children.i.
      children.z);
  });

  it('RECURSE: should recurse', () => {
    trie.insert('pizza');
    let output = trie.recurse('p', trie.root.children.p, []);
    
    expect(output).to.deep.equal([['pizza', 0]]);
  });
  
  it('SUGGEST: should return an array of suggested words', () => {
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
  
  it('SUGGEST: should limit its suggestions to 15', () => {
    trie.populate(
      ['xanthamic',
        'xanthamide',
        'xanthane',
        'xanthate',
        'xanthation',
        'xanthein',
        'xanthelasma',
        'xanthelasmic',
        'xanthelasmoidea',
        'xanthene',
        'xanthian',
        'xanthic',
        'xanthide',
        'xanthidium',
        'xanthin',
        'xanthine',
        'xanthinuria',
        'xanthione',
        'xanthisma',
        'xanthite',
        'xanthium',
        'xanthiuria',
        'xanthocarpous',
        'xanthocephalus',
        'xanthoceras',
        'xanthochroi',
        'xanthochroia',
        'xanthochroic',
        'xanthochroid',
        'xanthochroism',
        'xanthochromia',
        'xanthochromic']);
    expect(trie.suggest('x').length).to.equal(15);
  });
  
  it('SELECT: should show selected suggestions first', () => {      
    trie.populate(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);

    expect(trie.suggest('piz')).deep.equal(['pize', 'pizza', 'pizzeria', 
      'pizzicato', 'pizzle']);
      
    trie.select('pizzeria');
    expect(trie.suggest('piz')).deep.equal(['pizzeria', 'pize', 'pizza', 
      'pizzicato', 'pizzle']);
      
    trie.select('pizzicato');
    expect(trie.suggest('piz')).deep.equal(['pizzeria', 'pizzicato', 'pize',
      'pizza', 'pizzle']);
      
    trie.select('pizzicato');
    expect(trie.suggest('piz')).deep.equal(['pizzicato', 'pizzeria', 'pize',
      'pizza', 'pizzle']);
  });

  it('COUNT: should count how many unique words have been inserted', () => {
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
    
    trie.insert('pi');
    expect(trie.count()).to.equal(11);
  });

  it('COUNT: should not count duplicate words', () => {
    expect(trie.count()).to.equal(0);
    
    trie.insert('pizza');
    expect(trie.count()).to.equal(1);
    
    trie.insert('pizza');
    expect(trie.count()).to.equal(1);
  });

  it('PREPARE OUTPUT: should sort, reduce and limit outputs', () => {
    expect(trie.prepareOutput([['pizza', 0]])).to.deep.equal(['pizza']);
  });

  it('should return error if suggest input is empty or non-string', () => {
    trie.populate(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
    expect(trie.suggest(8)).to.equal('Input a string');
    expect(trie.suggest('')).to.equal('Input a string');
    expect(trie.suggest()).to.equal('Input a string');
  });
  
  it('should return error if no suggestions are available', () => {
    trie.populate(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
    expect(trie.suggest('pa')).to.equal('No suggestions available');
  });
});
