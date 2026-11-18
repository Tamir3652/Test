// String-ийн уртыг олох функц
// .length ашиглахгүйгээр тэмдэгт бүрийг тоолно.
// for...of нь Unicode тэмдэгтийг (emoji гэх мэт) нэг тэмдэгт гэж тоолдог.
function stringLength(str) {
  if (typeof str !== "string") {
    throw new TypeError("String утга оруулна уу");
  }
  let count = 0;
  for (const _ of str) {
    count++;
  }
  return count;
}

// Жишээ
console.log(stringLength("Сайн байна уу")); // 13
console.log(stringLength("hello"));         // 5
console.log(stringLength(""));              // 0
console.log(stringLength("😀ab"));          // 3

if (typeof module !== "undefined") {
  module.exports = stringLength;
}
