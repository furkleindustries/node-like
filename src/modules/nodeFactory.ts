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
  TAbstractNode,
} from '../TypeAliases/TAbstractNode';

export function nodeFactory(
  value: string | TAbstractNode,
  document: IDocumentLike): INonDocumentTypeChildNodeLike
{
  if (typeof value === 'string') {
    return new TextLike(value, document);
  } else if (value.type === 'text') {
    return new TextLike(value.data, document);
  } else if (value.type === 'tag') {
    const element = document.createElement(<string>value.name);
    const attributes = value.attribs;
    if (Array.isArray(attributes)) {
      attributes.forEach((attr: { [key: string]: string }) => {
        element.setAttribute(attr.key, attr.value);
      });
    }

    const children = value.children;
    if (Array.isArray(children)) {
      const childNodes = children.map((child: TAbstractNode) => {
        return nodeFactory(child, document);
      });

      element.append(...childNodes);
    }

    return element;
  } else if (value.type === 'script') {
    const element = document.createElement('script');
    const attributes = value.attribs;
    if (Array.isArray(attributes)) {
      attributes.forEach((attr: { [key: string]: string }) => {
        element.setAttribute(attr.key, attr.value);
      });
    }

    element.textContent = value.data;
    return element;
  } else if (value.type === 'style') {
    const element = document.createElement('style');
    const attributes = value.attribs;
    if (Array.isArray(attributes)) {
      attributes.forEach((attr: { [key: string]: string }) => {
        element.setAttribute(attr.key, attr.value);
      });
    }

    element.textContent = value.data;
    return element;
  } else if (value.type === 'comment') {
    const comment = document.createComment(value.data);
    return comment;
  }
  
  throw new Error('Unknown node type.');
}

export default nodeFactory;