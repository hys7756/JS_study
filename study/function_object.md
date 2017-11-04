* 유사배열 (연관배열)   
   배열처럼 접근이 가능하지만, 인덱스 값이 아닌 문자열로 접근.
  ```
  arr['a']
  ```


 * Arguments
    * 예약어로 등록안되있다는 것 주의
    * 유사배열로 값이 채워진다.  
     ```function func1(name, index, value) {
            console.log(arguments); 
          }
    
        func1('a', 'b', 'c'); // arguments['0'] = 'a' arguments['1'] = 'b' arguments['2'] = 'c' 
    ```
   * callee(실행되고 있는 함수 의미)라는 프로퍼티 갖고 있음.
 
 * prototype 프로퍼티
   함수 new 연산자로 생성될 때 값 할당.

 * 객체 인스턴스와 객체의 프로토타입 객체
모든 자바스크립트의 객체들은 Object로부터 유래
모든 객체들은 Object.prototype로부터 메소드들과 속성들을 상속받고, 그것들은 덮어씌워질 수 있다. 

```
var Person = function() {
  this.canTalk = true;
};

Person.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name);
  }
};

var Employee = function(name, title) {
  Person.call(this); // Person() 호출 
  this.name = name;
  this.title = title;
};

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name + ', the ' + this.title);
  }
};

var Mime = function(name) {
  Person.call(this); // canTalk 변수 true로 받음.
  this.name = name;
  this.canTalk = false; // 근데 여기서 false로 재할당.
};

Mime.prototype = Object.create(Person.prototype); // person
Mime.prototype.constructor = Mime;


var bob = new Employee('Bob', 'Builder');
bob.greet(); // Hi, I am Bob, the Builder
```



* 프로토타입
new 연산자로 빈 객체 생성시,
자신을 만들어낸 생성자의 prototype 프로퍼티 값을 자신의 프로토타입으로 설정.
모든 함수에는 prototype이라는 프로퍼티가 있는데, 함수 정의될 때 부터 자동적으로 생성되고 초기화됨.
prorype 프로퍼티의 초기값은 프로퍼티가 하나 있는 객체로 지정.
이 프로퍼티는 constructor(프로토타입이 연관되어 있는 생성자 함수를 의미)라고 불리움.


프로터타입 객체가 메서드나 상수 같은 프로퍼티들을 위치하기 좋은 곳.
상속하는 객체의 프로퍼티를 복사하는 것이 아님. 


* 생성자는 객체의 인스턴스 프로퍼티 초기화

* 클래스 메소드
```
Complex.sum = function() { ... }
```
* 인스턴스 메소드
```
Complex.property.valueOf = function() { ... }
```