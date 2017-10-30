싱글 스레드이기 때문에
메인 JS 코드가 실행되는 동안 이벤트 발생 및 인터벌, 타임아웃이 실행되면
발생 순서대로 큐에 저장되고, 
JS가 끝나는 순서대로 큐에 저장된 내용들이 차례로 실행된다.
(인터벌 인스턴스의 경우 같은 내용이 계속 저장되진 않는다. 중복되어 실행 못한 부분은 이전에 저장되어 있기 때문에 무시됨)

### setInterval() vs setTimeout()
setTimeout 
```
setTimeout(functionrepeatMe() {
    setTimeout(repeatMe, 10);
}, 10)
```
매 10ms마다 타임아웃을 설정해서 자기 자신 재실행
이전 콜백의 실행 후 10ms의 지연 생김.

```
setInterval(function() {
    // blah blah
}, 10);
```
마지막 콜백과 관계 없이 10ms마다 콜백 실행.

인터벌은 매 10ms마다 발생하지만,
타임아웃은 이전 콜백 실행 후 10ms 이후에 실행하도록 예약
