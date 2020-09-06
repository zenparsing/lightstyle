import { classNames, css } from '../lightstyle.js';

export const { root, header, main } = classNames();

console.log({ root, header, main });

console.log(String(css`

${root} {
  display: flex;
}

${header} {
  font-weight: bold;
}

${main} {
  flex: 1 1 auto;
  content: "${'Hello world'}";
}

${css`
  .foo { color: red; }
`}

`))
