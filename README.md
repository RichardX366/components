# Richard X Component Library

This is my personal components library I use built on DaisyUI with react components. Feel free to use or contribute to it!

If you use tailwind (tailwind.config.js):

```js
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./node_modules/@richardx/components/dist/**/*.js'],
  theme: {
    extend: {
      colors: {
        THEME: colors.YOUR_COLOR,
      },
    },
  },
};
```

If you don't:

```js
// app.tsx
import '@richardx/components/dist/styles.css';
```
