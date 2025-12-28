![image](https://github.com/user-attachments/assets/ada3afb4-cfc9-4bb4-8a41-ecb4a83e258a)

<div align="center">
   <h1> 🐳 LearnDocker 🐳 </h1>
   <h3> Docker에 대해서 알고싶으신가요? 샌드박스 환경을 통해 단계별 학습을 해봅시다. 시각화는 덤입니다! </h3>

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

## Spring WebFlux로의 기술 이전
![image](https://github.com/user-attachments/assets/8595df29-e818-45b7-a1d9-92f636b746f9)

출처) https://speakerdeck.com/kakao/github-actions-runner-bildeu-siljeon-jeogyonggi?slide=37

### 도전 계기
- 트래픽이 증가하는 상황 속 싱글 스레드인 NestJS기반 Proxy Server는 인메모리 세션 테이블 정리 및 API요청 및 응답 처리 한계 예상

### 도전
- 싱글 레드 기반 NestJS 프록시 서버를 멀티 스레드 기반 Spring WebFlux로의 기술 이전 수행

## 공용 저장소를 활용한 세션 테이블 구축
![image](https://github.com/user-attachments/assets/1ff799dd-9c34-409b-b00c-f482be5370ee)

### 도전 계기
- 서버 내 인메모리에 존재하는 기존의 세션 테이블 저장 방식의 서버 확장성 문제 존재

### 도전
- 공유 저장소(Redis)를 활용한 세션 테이블 저장 및 관리를 통한 확장성 향상

## SandBox Server(Docker Server) 병렬 구축 및 LoadBalancer구축
![image](https://github.com/user-attachments/assets/04c2270a-f500-4211-8a46-4fd9268423a2)

### 도전 계기
순간적인 다수의 트래픽 발생 시 SandBox Server(Docker Server)의 처리 속도 감소 및 서버 중단 문제 발생

### 도전
- SandBox Server를 서로 다른 인스턴스에 병렬 구축
- 프록시 서버 내 RR(Round Robin)기반 LoadBalancer구축을 통한 도커 서버 트래픽 부하 분산

# ⚒️ 기술 스택 
| 분류 | 기술 |
| ---- | ---- |
| 🎨 프론트엔드 | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/Tailwind_CSS-grey?style=flat-square&logo=tailwind-css&logoColor=38B2AC"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/>|
| 🔧 백엔드 | <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/TypeORM-FF4716?style=flat-square&logo=typeorm&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" /> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white">|
| 🔨 공통 | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=ffffff"> |
<br>

# 🏗️ 아키텍처 설계

![image](https://github.com/user-attachments/assets/04c2270a-f500-4211-8a46-4fd9268423a2)
