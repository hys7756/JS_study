* electron 
Node.js에 기반을 둔 데스크톱 애플리케이션 플랫폼 
HTML, CSS, JavaScript를 이용해서 크로스 플랫폼에서 돌아가는 데스크톱 애플리케이션을 만들 수 있다. 
https://github.com/electron/electron/blob/master/docs-translations/ko-KR/tutorial/quick-start.md
https://blog.outsider.ne.kr/1169 
https://github.com/electron/electron/blob/master/docs-translations/ko-KR/development/atom-shell-vs-node-webkit.md


# 메인 프로세스

Electron은 실행될 때 메인 프로세스 로 불리는 package.json의 main 스크립트를 호출합니다. 이 스크립트는 메인 프로세스에서 작동합니다. GUI 컴포넌트를 조작하거나 웹 페이지 창을 생성할 수 있습니다.

# 렌더러 프로세스

Electron이 웹페이지를 보여줄 때 Chromium의 multi-processes 구조도 같이 사용됩니다. Electron 프로세스 내에서 작동하는 웹 페이지를 렌더러 프로세스 라고 불립니다.

보통 일반 브라우저의 웹 페이지들은 샌드박스가 적용된 환경에서 작동하며 네이티브 리소스에는 접근할 수 없도록 되어 있습니다. 하지만 Electron은 웹 페이지 내에서 Node.js API를 사용하여 low-level 수준으로 운영체제와 상호작용할 수 있습니다.

# 메인 프로세스와 렌더러 프로세스의 차이점

메인 프로세스는 BrowserWindow Class를 사용하여 새로운 창을 만들 수 있습니다. BrowserWindow 인스턴스는 따로 분리된 프로세스에서 렌더링 되며 이 프로세스를 렌더러 프로세스라고 합니다. BrowserWindow 인스턴스가 소멸할 때 그 창의 렌더러 프로세스도 같이 소멸합니다.

메인 프로세스는 모든 웹 페이지와 렌더러 프로세스를 관리하며 렌더러 프로세스는 각각의 프로세스에 고립되며 웹 페이지의 작동에만 영향을 끼칩니다.

웹 페이지 내에선 기본적으로 네이티브 GUI와 관련된 API를 호출할 수 없도록 설계 되어 있습니다. 왜냐하면 웹 페이지 내에서 네이티브 GUI 리소스를 관리하는 것은 보안에 취약하고 리소스를 누수시킬 수 있기 때문입니다. 꼭 웹 페이지 내에서 API를 사용해야 한다면 메인 프로세스에서 그 작업을 처리할 수 있도록 메인 프로세스와 통신을 해야 합니다.

Electron에는 메인 프로세스와 렌더러 프로세스 사이에 통신을 할 수 있도록 ipc 모듈을 제공하고 있습니다. 또는 remote 모듈을 사용하여 RPC 스타일로 통신할 수도 있습니다. 또한 FAQ에서 다양한 객체를 공유하는 방법도 소개하고 있습니다.

# ipcMain

메인 프로세스에서 렌더러 프로세스로 비동기 통신