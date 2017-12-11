import {
  AbstractNodeLike,
} from './AbstractNodeLike';
import {
  isIChildNodeLike,
} from '../TypeGuards/isIChildNodeLike';
jest.mock('../TypeGuards/isIChildNodeLike');
import {
  isIDocumentLike,
} from '../TypeGuards/isIDocumentLike';
jest.mock('../TypeGuards/isIDocumentLike');
import {
  isIParentNodeLike,
} from '../TypeGuards/isIParentNodeLike';
jest.mock('../TypeGuards/isIParentNodeLike');

describe('AbstractNodeLike.contains unit tests.', () => {
  const getANLSafe = () => {
    const anl = new AbstractNodeLike();
    return anl;
  };

  beforeEach(() => {
    isIChildNodeLike.mockClear();
    isIChildNodeLike.mockReturnValue(true);
    isIDocumentLike.mockClear();
    isIDocumentLike.mockReturnValue(true);
    isIParentNodeLike.mockClear();
    isIParentNodeLike.mockReturnValue(true);
  });

  it('Returns true if the argument node is the same node as the implementing node.', () => {
    const anl = getANLSafe();
    anl.isSameNode = jest.fn(() => true);
    expect(anl.contains(anl)).toEqual(true);
    expect(anl.isSameNode.mock.calls).toEqual([
      [ anl, ],
    ]);
  });
});