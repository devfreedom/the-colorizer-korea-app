// @ts-ignore
// @ts-nocheck

import axios from "axios";

// [테스트] Mock API가 필요하다면 json-server를 사용합니다.
// 실행 명령어: $ npx json-server ./db.json --port 5001

// 이 주소는 dev 브랜치에 있는 로컬 백엔드 서버입니다.
const backendPortNumber = "5000";
const serverUrl = "http://" + window.location.hostname + ":" + backendPortNumber;


async function postData(data, endpoint, params = "", other = "") {
  // Convert JavaScript object into JSON
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST request: ${serverUrl + endpoint + params + other}`, "color: #296aba;");
  console.log(`%cPOST request data: ${data}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint + params + other, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}


async function getData(endpoint, params = "", other = "") {
  console.log(`%cGET request: ${serverUrl + endpoint + params + other}`, "color: #a25cd1;");

  return axios.get(serverUrl + endpoint + params + other, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
};


async function putData(data, endpoint, params = "", other = "") {
  // Convert JavaScript object into JSON
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT request: ${serverUrl + endpoint + params + other}`, "color: #059c4b;");
  console.log(`%cPUT request data: ${bodyData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint + params + other, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}


async function putMulter(endpoint, formData) {
  return axios.put(serverUrl + endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}


// delete라는 문자열은 자바스크립트가 자체적으로 선점한(reserved) 키워드라서 변수명이나 함수명으로 사용할 수 없습니다.
async function deleteData(endpoint, params = "", other = "") {
  console.log(`DELETE request ${serverUrl + endpoint + params + other}`);

  return axios.delete(serverUrl + endpoint + params + other, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}


export { getData, postData, putData, putMulter, deleteData };
