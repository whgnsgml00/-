"use strict";

const inputUserId = document.getElementById('inputEmail');
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');
const confirmPassword = document.getElementById('confirmPassword');

inputUserId.addEventListener('keyup', emailCheck);
inputUsername.addEventListener('keyup', checkValidation);
inputPassword.addEventListener('keyup', checkValidation);
confirmPassword.addEventListener('keyup', checkValidation);

function isValid (resDataProp, validator) {
  if (resDataProp) {
    if ((validator.min <= resDataProp) && (resDataProp <= validator.max)) {
      validator.selector.innerHTML = `유효합니다.`;
      validator.selector.style.color = `rgba(90 187 83)`;
    } else {
      validator.selector.innerHTML = `${validator.min} ~ ${validator.max}자이어야 합니다.`;
      validator.selector.style.color = `rgba(233 50 35)`;
    }  
  }
}
const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

// email 유효성 검사
function emailCheck() {
  if (emailReg.test(inputUserId.value) === true) {
    document.querySelector('.userId').innerHTML = `유효합니다.`;
    document.querySelector('.userId').style.color = `rgba(90 187 83)`;
  } else {
    document.querySelector('.userId').innerHTML = `이메일 형식이 올바르지 않습니다.`;
    document.querySelector('.userId').style.color = `rgba(233 50 35)`;
  }
}

function checkValidation () {
  /* 현재 기능 외에 구현해야할 것들
   * 1. email validation check(아래 코드들 참고). (나중에)
   * 2. username, password, isSamePw(비밀번호가 일치하는지 확인하는 변수)가 모두 AND 조건을 만족할 때만 (이것만)
   * '동의하고 시작하기'버튼이 활성화 될 수 있게 하기.
  */
  const lengthValidator = {
    username: {
      selector: document.querySelector('.validator.username'),
      min: 2,
      max: 16,
    },
    password: {
      selector: document.querySelector('.validator.password'),
      min: 8,
      max: 20,
    },
  };
  let usernameLength = inputUsername.value.length;
  let ipw = inputPassword.value;
  let cpw = confirmPassword.value;
  let isSamePw = (ipw === cpw);

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      "Access-Control-Origin": "*",
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // "email": email,
      "usernameLength": usernameLength,
      "pwlen": ipw.length,
      "isSamePw": isSamePw,
    }),
  }).then((res) => {
    return res.json();
  }).then((res) => {
    // isEmailForm(res.email, );
    isValid(res.usernameLength, lengthValidator.username);
    isValid(res.pwlen, lengthValidator.password);
    const validText = document.querySelector('.validator.confirm');
    if (cpw) {
      if (isSamePw) {
        validText.innerHTML = `비밀번호가 일치합니다.`; //비밀번호가 8자리 이상을 만족하면서 ipw와 같을 때?
        validText.style.color = `rgba(90 187 83)`;
      } else {
        validText.innerHTML = `비밀번호가 일치하지 않습니다.`;
        validText.style.color = `rgba(233 50 35)`;
      }
    }
  }).catch((error) => {
    console.log(error);
  });
  //닉네임, 비밀번호, 확인 일치 >> 동의하고 시작하기 버튼 활성화
  const btnActive = document.querySelector('.btn-primary');
  
  if ((usernameLength >= 2 && usernameLength <= 16) && (ipw.length >= 8 && ipw.length <= 20) && isSamePw && (emailReg.test(inputUserId.value) === true)) {
    btnActive.disabled = false;
  } else {
    btnActive.disabled = true;
  }
}
