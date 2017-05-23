import { expect } from 'chai';
import Node from '../scripts/Node.js';

describe('Node', () => {
  let node;
  
  beforeEach( () => {
    node = new Node();
  });
  
  it('should create a new instance of Node', () => {
    expect(node).to.be.an.instanceof(Node);
  });
  
  it('should start with "null" as its letter', () => {
    expect(node.letter).to.equal(null);
  });

  it('should start with an empty object as its children', () => {
    expect(node.children).to.deep.equal({});
  });

  it('should not be a complete word by default', () => {
    expect(node.isWord).to.equal(false);
  });
});