### Array 객체 분석

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array

Array 내장 객체 스터디


* reduce()
 배열을 돌면서 연산을 한 값을 리턴한다.

- 매개변수 
 - 콜백 function
   콜백 function 내부에도 매개변수가 있음
    - 콜백 function 리턴 값
    - array 현재 요소 값
    - array 현재 요소 인덱스
    - array
 - 콜백 function의 첫번째 인수 초기값 (생략 가능)

콜백 function의 첫번째 인수 초기값이 생략된 경우 보통 콜백 function 내부 매개변수는 배열의 첫째, 둘째 요소 값이 들어간다.

reduce 써서 하나의 배열 리턴할 수 있음.
```
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b);
}, []);
```

* reduceRight() 
 reduce와 동일한데 오른쪽부터 요소 확인

* splice()
  배열 내용을 추가/삭제

  - 매개변수 
   - startIndex
   - 삭제할 갯수
   - 추가할 요소

```
 var array = [1, 2, 3, 4, 5];
 array.splice(1, 1); // [1, 3, 4, 5]
 array.splice(1, 0, 20); // [1, 20, 3, 4, 5]
 array.splice(0, 1, 40); // [40, 20, 3, 4, 5]
 
```