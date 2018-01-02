# prototype vs getPrototypeOf, __proto__
```
function User(name, passwd) {
    this.name = name;
    this.passwd = passwd;
}

User.prototype.toString = function() {
    return '[USER' + this.name + ']';
}

User.prototype.checkPasswd = function(inputPW) {
    return this.passwd == inputPW;
}

var user = new User('hahaha', 1234);
```

#### 위 코드 해석
* User 클래스는 prototype이라는 프로퍼티를 갖고 있다.
> 이 프로퍼티는 처음 생성 시 비어있는 객체다.

* User의 prototype 객체 안에 toString과 checkPasswd라는 메소드를 선언해두었다.

* user라는 객체는 User 클래스의 인스턴스로 내부적으로 name과 passwd라는 프로퍼티를 갖고 있다.
> 추가적으로 User.prototype 객체도 자동으로 할당되어진다.



### 프로퍼티 탐색은 객체 스스로 부터 탐색을 시작.
> 객체 스스로에게 해당 프로퍼티가 없으면 상위에게 상속 받은 prototype 내부로 탐색을 이어간다.

### Object.getPrototypeOf()
현재 객체의 프로토타입을 가져온다.
```
Object.getPrototypeOf(user) === User.prototype; // true
```

### __proto__
객체의 프로토타입을 가져오는 비표준 방법
```
user.__proto__ === User.prototype; // true
```
* ES5에서 __proto__로 접근하는 것은 비표준 방법이므로 __proto__ 보다 getPrototypeOf() 메소드를 활용하자.
* 함부로 __proto__ 객체 내부를 수정하지 말자. 어떤 버그가 초래될지 모른다.

## 클래스란
> 생성자 함수와 클래스 인스턴스 간의 메서드 공유를 위해 사용되는 프로토타입 객체의 조합.

위의 예시 코드에서 User 클래스는 function User로 선언된 부분이 생성자 함수이며,
인스턴스 간 공유되는 내부 구현체는 User.prototype으로 선언된 부분인 것.

### prototype에 메소드 선언하기
위의 코드는 prototype을 활용하지 않도록 수정이 가능하다.

```
function User(name, passwd) {
    this.name = name;
    this.passwd = passwd;
    this.toString = function() {
    return '[USER' + this.name + ']';
};

this.checkPasswd = function() {
    return this.passwd == inputPW;
}
}

var user1 = new User('hahaha1', 1234);
var user2 = new User('hahaha2', 1234);
var user3 = new User('hahaha3', 1234);
```

위와 같이 선언하여도 동일하게 실행이 되나,
성능 상의 이슈가 있다.

위와 같은 방식은 toString, checkPasswd 메소드는 각 인스턴스에 저장하는 방식이기 때문에,
새로운 인스턴스 생성 시 불필요하게 (prototype에 선언하는 것 대비) 메소드 복사를 해야하는 작업이 필요하기 때문이다.

또한 인스턴스 메소드는 프로토타입 메소드에 비해 많은 메모리를 사용한다.


​