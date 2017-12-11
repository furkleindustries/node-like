export type TAbstractNode = {
  raw: string;
  data: string;
  type: 'text' | 'tag' | 'script' | 'style' | 'attr' | 'comment';
  name?: 'string';
  attribs?: { [key: string]: string };
  children?: Array<TAbstractNode>;
}

export default TAbstractNode;