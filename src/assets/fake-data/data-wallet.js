// src/assets/fake-data/data-wallet.js
// 지갑 주소/문구/옵션을 한 군데(데이터 파일)에서 관리
const datawallet = {
  // 44자 솔라나 예시(아무 문자열 OK)
  address: "11111111111111111111111111111111111111111111",

  // 떠다니는 문구
  quotes: [
    "Design is intelligence made visible",
    "Every pixel has a purpose",
    "Imagination is power",
    "Code is poetry",
    "Creativity takes courage",
    "Simplicity is the ultimate sophistication"
  ],

  // Scramble 옵션
  scrambleChars: "upperAndLowerCase",
  buttonEncryptLabel: "Encrypt",
  buttonDecryptLabel: "Decrypt"
};

export default datawallet;
