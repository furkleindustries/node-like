import {
  IDocumentLike,
} from '../NodeLike/ParentNodeLike/DocumentLike/IDocumentLike';
import {
  INonDocumentTypeChildNodeLike,
} from '../NodeLike/INonDocumentTypeChildNodeLike';
import {
  TextLike,
} from '../NodeLike/CharacterDataLike/TextLike/TextLike';
import {
  TIndexableObject,
} from '../TypeAliases/TIndexableObject';

export function nodeFactory(
  value: string | TIndexableObject,
  document: IDocumentLike): INonDocumentTypeChildNodeLike
{
  if (typeof value === 'string') {
    return new TextLike(value, document);
  } /* TODO: Add other node types here. */

  const element = document.createElement(value.tagName);
  const attributes = value.attributes;
  if (Array.isArray(attributes)) {
    attributes.forEach((attr: TIndexableObject) => {
      element.setAttribute(attr.key, attr.value);
    });
  }

  const children = value.children;
  if (Array.isArray(children)) {
    const childNodes = children.map((child: TIndexableObject) => {
      return nodeFactory(child, document);
    });

    element.append(...childNodes);
  }

  return element;
}

export default nodeFactory;