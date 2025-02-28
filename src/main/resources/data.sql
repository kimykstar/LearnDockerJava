INSERT INTO quiz (title, content) VALUES (
    'Docker Image 가져오기',
    CONCAT(
        'Docker의 첫 걸음을 시작해볼까요?\n',
        'learndocker.io에서 제공하는 hello-world 이미지를 가져와보세요.\n\n',
        '1. docker pull 명령어를 사용하여 learndocker.io/hello-world 이미지를 다운로드하세요.\n',
        '2. 이미지가 성공적으로 다운로드되면 자동으로 로컬 시스템에 저장됩니다.\n'
    )
);

INSERT INTO quiz (title, content) VALUES (
    'Docker image 목록 확인하기',
    CONCAT(
        '로컬 시스템에 저장된 Docker 이미지들을 확인해볼까요?\n\n',
        '1. docker images 명령어를 사용하여 현재 시스템에 있는 모든 Docker 이미지를 조회하세요.\n',
        '2. 명령어 실행 후 출력된 결과에서 learndocker.io/hello-world 이미지 ID를 앞 4자리 이상 입력하세요.\n',
        '3. 답안란은 페이지 우측 하단에 있습니다.\n'
    )
);

INSERT INTO quiz (title, content) VALUES (
    'Docker Image 삭제하기',
    CONCAT(
        '더 이상 필요하지 않은 Docker 이미지를 삭제하는 방법을 알아봅시다.\n\n',
        '1. docker rmi 명령어를 사용하여 learndocker.io/hello-world 이미지를 삭제하세요.\n',
        '2. 삭제 후 docker images 명령어로 이미지가 정상적으로 삭제되었는지 확인하세요.\n'
    )
);

INSERT INTO quiz (title, content) VALUES (
    'Container 생성하기',
    CONCAT(
        'Docker 이미지를 기반으로 컨테이너를 생성해봅시다.\n\n',
        '1. docker create 명령어를 사용하여 learndocker.io/hello-world 이미지로부터 컨테이너를 생성하세요.\n'
    )
);

INSERT INTO quiz (title, content) VALUES (
    'Container 실행하기',
    CONCAT(
        '생성된 컨테이너를 실행해보겠습니다.\n\n',
        '1. docker start 명령어를 사용하여 이전 단계에서 생성한 컨테이너를 실행하세요.\n',
        '2. 컨테이너 ID나 이름을 사용하여 실행할 수 있습니다.\n',
        '3. 실행 후 터미널에 표시되는 "Answer: " 다음에 나오는 값을 입력해주세요.\n',
        '4. 답안란은 페이지 우측 하단에 있습니다.\n'
    )
);


INSERT INTO quiz (title, content) VALUES (
    'Container 생성 및 실행하기',
    CONCAT(
        '컨테이너의 생성과 실행을 한 번에 수행해봅시다.\n\n',
        '1. docker run 명령어를 사용하여 learndocker.io/joke 이미지로 컨테이너를 생성하고 실행하세요.\n',
        '2. 단 detach 모드로 실행해야 합니다.\n',
        '3. 이 명령어는 create와 start를 연속으로 실행하는 것과 같은 효과입니다.\n'
    )
);

INSERT INTO quiz (title, content) VALUES (
    'Container 로그 확인하기',
    CONCAT(
        'detach로 실행 된 container 로그를 확인해보겠습니다.\n\n',
        '1. docker ps -a 명령어를 사용하여 모든 컨테이너 목록을 확인하세요.\n',
        '2. learndocker.io/joke 컨테이너의 로그를 확인하세요\n',
        '3. 실행 후 터미널에 표시되는 문제를 보고, 띄어쓰기 없이 한글로 답을 입력해주세요.\n',
        '4. 답안란은 페이지 우측 하단에 있습니다.\n'
    )
);

INSERT INTO quiz (title, content) VALUES (
    'Container 목록 확인하기',
    CONCAT(
        '실행 중이거나 중지된 모든 컨테이너를 확인해봅시다.\n\n',
        '1. docker ps -a 명령어를 사용하여 모든 컨테이너 목록을 확인하세요.\n',
        '2. joke 이미지로 만든 컨테이너의 ID 최소 앞 4자리를 입력하세요.\n',
        '3. 답안란은 페이지 우측 하단에 있습니다.\n'
    )
);

INSERT INTO quiz (title, content) VALUES (
    'Container 중지하기',
    CONCAT(
        '실행 중인 컨테이너를 중지해보겠습니다.\n\n',
        '1. docker stop 명령어를 사용하여 실행 중인 모든 컨테이너를 중지하세요.\n',
        '2. 컨테이너가 중지되면 상태가 Exited로 변경됩니다.\n'
    )
);

INSERT INTO quiz (title, content) VALUES (
    'Container 삭제하기',
    CONCAT(
        '더 이상 필요하지 않은 컨테이너를 삭제해봅시다.\n\n',
        '1. docker rm 명령어를 사용하여 모든 컨테이너를 삭제하세요.\n',
        '2. 컨테이너가 실행 중인 경우 먼저 중지한 후 삭제해야 합니다.\n',
        '3. 삭제 후 docker ps -a로 확인해보세요.\n'
    )
);
