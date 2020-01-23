module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  }, // 프로젝트의 사용환경 입력
  extends: ["airbnb-base", "plugin:prettier-recommended"], //확장 부분을 설정
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  }, //전역 변수들 넣어줌, 기본적으로 eslint는 전역변수의 사용을 에러로 처리해, 외부 lib 사용시 여기에 넣어 에러 표시를 방지해야됨
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  }, //js버전 , 모듈 사용 여부 등을 설정 가능
  rules: {
    "no-console": "off",
    "comma-dangle": ["error", "never"],
    quotes: ["error", "double"]
  } //extends, plugins에 대한 세부 설정을 변경하는 코드 입력  0:아무것도 안함, 1:경고, 2:에러 표시
};
