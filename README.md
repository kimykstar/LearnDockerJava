![image](https://github.com/user-attachments/assets/ada3afb4-cfc9-4bb4-8a41-ecb4a83e258a)

<div align="center">
   <h1> 🐳 LearnDocker 🐳 </h1>
   <h3> Docker에 대해서 알고싶으신가요? 샌드박스 환경을 통해 단계별 학습을 해봅시다. 시각화는 덤입니다! </h3>
<p>
  <a href="https://learndocker.site">LearnDocker 홈페이지</a>
</p>
  <p>
  <a href="https://github.com/boostcampwm-2024/web34-LearnDocker/wiki">📚 프로젝트 위키</a>
  &nbsp; | &nbsp; 
  <a href="https://www.figma.com/design/ClXaOWYkYfv4tgEanGfBq6/%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83-%EC%84%A4%EA%B3%84?node-id=5-2&t=q44ZHiTVNWr6VRPU-1">🎨 디자인</a>
  &nbsp; | &nbsp; 
  <a href="https://github.com/orgs/boostcampwm-2024/projects/133/views/1">📋 백로그</a>
</p>
</div>

# 🚀 프로젝트 개요
## 💡 LearnDocker란 무엇인가?
> LearnDocker는 웹 브라우저만으로 Docker의 핵심 개념과 명령어를 학습할 수 있는 온라인 플랫폼입니다.
>
실제 Docker 환경의 동작을 실시간 애니메이션으로 보여주며, 직관적인 시각화를 통해 복잡한 Docker의 개념을 쉽게 이해할 수 있습니다.
<br/><br/>
📅 개발 기간: 2024-10-28(월) ~

## 🎯 프로젝트를 시작하게 된 계기 
“Docker를 처음 접하는 사람이Docker 설치를 안하고 안전한 환경에서 Docker 명령어들을 학습할 수는 없을까?”, “내가 작성한 명령어에 따라 실시간으로 업데이트되는 도커 환경을 시각화해서 볼 수는 없을까?”. 이런 고민을 해결하기 위해 LearnDocker 서비스를 시작하게 되었습니다.<br/><br/>
Play with Docker는 안전한 환경을 제공하지만 체계적인 학습 커리큘럼이 없고, 명령어 실행 결과를 시각적으로 확인할 수 없다는 한계가 있습니다. 또한 단순히 실행 환경만 제공할 뿐, 사용자의 학습 진도나 이해도를 확인할 수 있는 상호작용이 부족합니다. LearnDocker는 이러한 한계점들을 개선하여 더 나은 Docker 학습 경험을 제공하고자 합니다.<br/>

> LearnDocker 서비스는 Play with Docker의 한계를 넘어선 docker 계의 code academy를 목표로 합니다
>

# ✨ 주요 기능
## 🐋 개별 도커 실습 환경 제공
> 사용자는 "학습 시작하기" 버튼만 누르면  자신만의 샌드박스 환경을 안전하고 편리하게 제공 받을 수 있습니다.
>
![도커 실습 환경](https://github.com/user-attachments/assets/a29e48f5-19b0-433b-bfbe-24185dcef13e)

## 🎯 실시간 시각화
> 사용자는 자신의 명령어가 컨테이너와 이미지에 어떤 영향을 미치는지 실시간으로 볼 수 있습니다.
>
![최종_시각화_03](https://github.com/user-attachments/assets/b7e34106-4f71-4974-8ce2-1790e63e1581)


## 🔄 퀴즈 풀이
> 사용자는 주어진 문제를 읽고 도커 명령어를 입력하여 문제를 풀고 채점할 수 있습니다.
>
![최종_시각화_04](https://github.com/user-attachments/assets/fa8a079b-6e81-45f8-ab87-dda7af3d5c3b)

# 🤔기술적 도전

## docker 실행 가능한 격리된 환경 제공

![image](https://github.com/user-attachments/assets/ca1cd109-f573-4be4-938d-02bc25ecac34)
출처) https://speakerdeck.com/kakao/github-actions-runner-bildeu-siljeon-jeogyonggi?slide=37

사용자에게 격리된 환경을 효율적으로 제공하기 위해 컨테이너 기술을 사용하고자 하였으나, Docker 컨테이너 안에서 Docker를 실행시키는 목적을 달성시키는 명확히 더 나은 해결책이 없었습니다.

Docker 컨테이너 내부에서 Docker를 실행시키는 방법으로 DinD(Docker in Docker)와 DooD(Docker out of Docker)가 있다는 것을 알아내었습니다. DinD는 보안 위험성이 존재했고, DooD는 사용자별로 완전히 격리된 환경을 제공하지 못한다는 단점이 있었습니다. 서비스의 목적을 달성하기 위해 DinD를 선택하고, 사용자에게 제한된 명령어만 허용하는 방식을 적용하기로 결정했습니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/docker-%EC%8B%A4%ED%96%89-%EA%B0%80%EB%8A%A5%ED%95%9C-%EA%B2%A9%EB%A6%AC%EB%90%9C-%ED%99%98%EA%B2%BD-%EC%A0%9C%EA%B3%B5)
> 

## 악의적인 명령어 필터링

![image](https://github.com/user-attachments/assets/98e86f77-b86f-4c97-854f-283ee151f72f)

컨테이너 내부에서 호스트에 접근이 가능한 DinD 방식의 특성으로 인해 발생하는 보안 위험성을 막아야 합니다. `docker run -v /:/host ubuntu cat /host/etc/passwd` 와 같은 방식으로 호스트 환경에 접근이 가능합니다.

컨테이너에 전달되는 명령어를 검사하는 프록시 서버를 두어, 위험한 명령어를 식별하고 요청을 거부하도록 만들었습니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/%EC%95%85%EC%9D%98%EC%A0%81%EC%9D%B8-%EB%AA%85%EB%A0%B9%EC%96%B4-%ED%95%84%ED%84%B0%EB%A7%81)
> 

## 시각화 설계 및 구현

저희 모두 리액트가 처음인 백엔드 개발자였습니다. 또한 도커 명령어에 대한 시각화는 인터넷에 참고할 만한 사례를 찾기 어려워서 어떻게 설계를 해야할지 부터 고민이 있었습니다. 

네부캠에서 배운 대로 시각화 문제를 최대한 작게 쪼개고 체크리스트를 만들면서 해결 했습니다. 부족한 리액트 지식은 구현-검토-개선의 반복을 통해 보완했고, Learning by doing 방식으로 실제 개발을 진행하면서 배웠습니다. 커스텀 훅, useRef, react-query 등의 새로운 기능을 알게 될 때마다 적용하며 점진적으로 리팩토링을 수행했습니다. 잘못된 개념으로 인해 발생한 버그들이 있었지만 원인을 찾고 해결하는 과정에서 오히려 더 깊은 이해를 얻는 계기가 되었습니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/시각화)
> 

## 서버에서 사용자 데이터 관리

서버에서 사용자의 연결 정보를 관리하는 방식으로 세션과 토큰 중 어떤 것을 사용해야 할까에 대해서 고민이 되었습니다.

저희 서비스는 각 사용자마다 도커 컨테이너를 하나씩 할당해주기 때문에 리소스 관리가 매우 중요합니다. 사용자의 상태에 따라 컨테이너를 주기적으로 정리할 필요가 있었고, 사용자의 상태를 서버가 알기 위해서는 세션을 활용해야 한다고 판단하여 세션 방식을 채택하였습니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/[2024‐11‐03]-팀-회의)
> 

## 17초 지연 이슈 해결

![예전 docker 명령 오류 메시지](https://github.com/user-attachments/assets/e5b96ffd-8454-40dc-b3de-c14850c3e12c)

사용자가 학습 시작 버튼을 누르고 터미널 환경에 정상적인 docker 명령어 요청을 보내기까지 17초의 지연 시간이 발생했습니다. docker daemon이 api 요청을 거부하는 상태가 발생했기 때문이었는데, 처음에는 daemon 자체의 문제라고 판단하고 어떻게 17초 동안 사용자 경험을 개선할 수 있을지 고민했습니다.

사용자가 도커 호스트 컨테이너가 준비중이라는 것을 알 수 있도록 터미널에 로딩 화면을 보여주고 SSE(Server Sent Event)로 컨테이너 준비가 완료되었다는 것을 알려주었습니다.
하지만 근본적으로 사용자가 17초동안 기다려야 한다는 사실은 변하지 않았는데, docker daemon의 로그를 분석해본 결과 의도적으로 startup이 지연된다는 것을 확인했습니다. docker daemon이 기본적으로 https를 수신하도록 설정되어 있기 때문이었는데, 별도로 —tls=false 옵션을 추가하여 지연시간을 3초 이내로 단축시킬 수 있었습니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/17초-지연-이슈-해결)
> 

## 악성 docker image 다운로드 제한

![image](https://github.com/user-attachments/assets/521a6c3d-20c7-4053-b640-ea83040f8995)

외부에서 가져온 악의적인 실행 파일로 컨테이너를 탈출하거나 서버 리소스를 과하게 사용하는 일을 막아야 합니다. 개인이 만든 퍼블릭 레지스트리에서 이미지를 다운로드하는 것을 막지 못하고 있었습니다.

컨테이너가 실행되는 샌드박스 서버를 프라이빗 서브넷에 두어 외부 네트워크와의 연결을 차단하는 방식으로 문제를 해결했습니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/%EC%95%85%EC%84%B1-docker-image-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EC%A0%9C%ED%95%9C)
> 

## 상호작용이 없는 사용자의 리소스 정리

![image](https://github.com/user-attachments/assets/0a2c60fb-6e36-4336-9b5d-b142382ded99)

각각의 사용자에게는 도커 컨테이너를 하나씩 할당합니다. 사용자가 컨테이너를 할당받고, 학습 종료버튼을 누르지 않고(세션 종료 및 컨테이너 해제) 탭을 닫아버린다면, 도커 컨테이너는 세션 만료시간이 될 때까지 서버의 리소스를 점유하게 됩니다.

위 문제를 해결하기 위해서 사용자가 서버에 보낸 모든 요청 시간을 세션 테이블에 저장합니다. 세션을 주기적으로 정리해주는 세션 청소기를 구현하였습니다. 세션 청소기는 세션에 기록된 사용자의 마지막 요청 시간 기준 30분을 초과하면 해당 세션을 삭제하며, 사용자에게 할당된 도커 컨테이너 또한 삭제합니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/[5주-6일차-‐-J048-김영관]-개발-일지(탭-닫을-시-세션-해제-및-세션-관리2))
> 

## 만료된 세션에 대한 서버 리소스 정리

![image](https://github.com/user-attachments/assets/98f77df5-f27e-458b-8ab1-e7ef6dbaa893)

세션 테이블에 저장된 사용자의 세션 정보들 중 만료된 세션을 해제하고, 세션에 해당하는 도커 컨테이너를 삭제해야 합니다. 

상호작용이 없는 사용자의 리소스 정리 의 해결 방법과 동일하게 세션 청소기에 기능을 더 추가하는 방식으로 해결하였습니다. 세션 청소기는 세션 테이블을 10분 주기마다 돌면서 만료된 세션에 대해서 세션 테이블에서 삭제하며, 세션에 매핑된 도커 컨테이너 또한 해제합니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/[5주-2일차-‐-J048-김영관]-개발-일지(세션해제-및-IP를-통한-세션관리))
> 

## 악의적 사용자의 연속 요청에 대한 리소스 관리

![image](https://github.com/user-attachments/assets/a864a4c1-c783-4e4d-9ff9-9ab071ff8aca)

악의적인 사용자가 서버에 짧은 시간에 많은 요청을 보내게 된다면 서버의 부하는 증가하게 됩니다.

위의 문제를 방지하기 위해 세션 테이블에 저장된 마지막 요청 시간을 기준으로 0.5초 내에 발생한 요청에 대해서 Block합니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/[5주-3일차-‐-J048-김영관]-개발-일지(연속요청-처리-및-세션관리))
> 

## 다수의 컨테이너를 할당받으려는 악의적 사용자 차단

![image](https://github.com/user-attachments/assets/ce6a757c-fc53-412c-b4cb-2a3c71fb76ee)

악의적 사용자가 웹 브라우저 여러개를 활용해 도커 컨테이너를 할당받을 수 있는 문제가 있었습니다. 이런 악성 사용자가 많이 발생하게 되면, 서버의 리소스 점유율은 증가하게 되고, 정상적인 사용자가 사용할 수 없는 문제가 발생하리라 생각이 들었습니다.

사용자의 도커 컨테이너를 할당하는 트리거는 학습 시작 버튼 을 눌렀을 때 해당 클라이언트가 세션이 할당됐는지 여부에 따라서 도커 컨테이너를 할당해줍니다. 결국 쿠키에 저장된 세션이 없고 버튼만 누르면 컨테이너가 할당되는 상황이었습니다. 이를 방지하기 위해서 요청을 보낸 클라이언트의 IP를 해시화하여 세션 테이블에 저장하고 사용자가 쿠키를 삭제하고 다시 접속하더라도 IP를 기반으로 이전에 생성된 컨테이너를 할당해주도록 하였습니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/[5주-2일차-‐-J048-김영관]-개발-일지(세션해제-및-IP를-통한-세션관리))
> 

## 명령창에 나오는 알 수 없는 문자에 대한 처리

가끔 사용자 명령창에 알 수 없는 문자가 같이 출력되는 현상이 있었습니다.

![이상한 문자 01](https://github.com/user-attachments/assets/37d1ff4f-1c3c-43e8-98bc-81dcd50cf75c)

![이상한 문자 02](https://github.com/user-attachments/assets/de12f08d-8748-40ed-9663-b2e4cc1698af)


docker api tty 옵션에 따라 알 수 없는 문자가 다르게 나오는 것을 파악했습니다. 문제를 해결하기 위하여 docker api 공식문서를 참고해서 원인을 파악하였고 터미널 제어문자를 처리하기 위해 xterm.js를 도입했습니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/[4주-3일차-‐-J278-홍규선]-학습-일지(docker-api-exec-tty-옵션))
> 

## 커스텀 이미지 컨테이너 stop시 타임 아웃 나는 문제

커스텀 이미지 중 joke의 컨테이너 중지 명령어 실행 시 응답 대기 시간이 10초를 초과하여 타임아웃이 발생하는 문제가 있었습니다. 이는 배포 환경뿐만 아니라 로컬 환경에서도 동일하게 발생했습니다.

Docker의 컨테이너 종료 프로세스를 분석한 결과, SIGTERM 신호를 처리하지 못하면 SIGKILL을 보낸다는 것을 알게 되었습니다. joke Dockerfile에 SIGTERM 시그널 핸들링을 구현하여 정상적인 종료가 가능하도록 해결했습니다.

> 자세히 보기: [관련 개발 기록](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/joke-이미지-컨테이너-stop시-타임-아웃-나는-문제) [](https://github.com/boostcampwm-2024/web34-LearnDocker/wiki/joke-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-stop%EC%8B%9C-%ED%83%80%EC%9E%84-%EC%95%84%EC%9B%83-%EB%82%98%EB%8A%94-%EB%AC%B8%EC%A0%9C)
>


# ⚒️ 기술 스택 
| 분류 | 기술 |
| ---- | ---- |
| 🎨 프론트엔드 | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/Tailwind_CSS-grey?style=flat-square&logo=tailwind-css&logoColor=38B2AC"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/>|
| 🔧 백엔드 | <img src="https://img.shields.io/badge/Nest.js-E0234E?style=flat-square&logo=NestJS&logoColor=white"/> <img src="https://img.shields.io/badge/TypeORM-FF4716?style=flat-square&logo=typeorm&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" /> <img src="https://img.shields.io/badge/Naver Cloud Platform-03C75A?style=flat-square&logo=naver&logoColor=ffffff"> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white">|
| 🔨 공통 | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=ffffff"> |
<br>

# 🏗️ 아키텍처 설계
## 간단한 서버 구조
![image](https://github.com/user-attachments/assets/41d78b17-9b07-4195-930c-aa10d2cfcd87)

## 백엔드 서버 아키텍처
![아키텍처2](https://github.com/user-attachments/assets/0b9fda36-8628-4a59-a1c7-b431a7b32b60)

