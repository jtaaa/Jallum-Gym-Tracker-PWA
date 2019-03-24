export const ClassSet = (strs: TemplateStringsArray, ...conditionals: Array<boolean>) => {
  const classRoot = strs[strs.length - 1].trim();
  return strs.reduce((acc: string, cur: string, index: number) => {
    try {
      const conditional = cur.split(':', 1)[0].trim();
      if (conditionals[index]) return `${acc} ${classRoot}-${conditional}`;
    } catch (err) {
      console.warn(err);
    }
    return acc;
  }, classRoot);
}
