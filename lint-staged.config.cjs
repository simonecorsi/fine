module.exports = {
  "*.{js,css,json,md,yaml,yml}": ["prettier --write"],
  "*.md": (filenames) => {
    const list = filenames.map((filename) => `'markdown-toc -i ${filename}`);
    return list;
  },
  "*.js": ["eslint --fix"],
};
