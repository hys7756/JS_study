# 프로토타입
함수의 기능.
복잡한 객체를 생성하기 위한 청사진.

prototype 프로퍼티는 처음에 빈 객체 참조.
생서자는 객체를 우리가 알고 있는 상태로 초기화하는 역할의 함수
new 연산자는 단지 비어 있는 객체를 생성한다.

```
function Ninja() {}
Ninja.prototype.swingSword = function() { 
    console.log('prototype sing sing~~');
    return true; 
};

var v1 = Ninja();
var v2 = new Ninja();

console.log(v1); // undefined
console.log(v2); // Ninja {}
```

```
function Ninja() {
    this.swingSword = function() {
        console.log('this.swingSword sing sing~~');
    }
}
Ninja.prototype.swingSword = function() { 
    console.log('prototype sing sing~~');
    return true; 
};

var ninja = new Ninja();

console.log(ninja.swingSword()); // this.swingSword sing sing~~
```
인스턴스 멤버가 프로토타입에 정의된 같은 이름의 프로퍼티를 재정의하므로 인스턴스 메소드가 실행됨.


```
function Ninja() {
    this.swingSword1 = function() {
        console.log('this.swingSword sing sing~~');
    }
}

var ninja = new Ninja();
console.log(ninja.swingSword1()); // this.swingSword sing sing~~


Ninja.prototype.swingSword1 = function() { 
    console.log('prototype sing sing~~');
    return true; 
};

console.log(ninja.swingSword1()); // this.swingSword sing sing~~


```

프로토타입의 property는 복사되지 않고 생성된 객체에 덧붙는다.
프로퍼티 체이닝...
객체의 constructor > 생성자 함수의 prototype > prototype 객체

모든 객체는 constructor라는 property가 있으며,
객체를 만드는 데 사용한 생성자를 참조.
ninja.constructor.prototype.swingSword1 //  function () { console.log('prototype sing sing~~');    return true; }

```
function Song() {
	this.name = 'Hi!';
}

Song.prototype.age = 100;
var songsong = new Song()
songsong.age = 200;

console.log(songsong.age); // 200
console.log(songsong.constructor.prototype.age); // 100
```

마지막에 생성된 것과 무관하게 
무조건 인스턴스에 있는으면 해당 값 참조
없으면 prototype 조사해서 값 참조
없으면 undefined


instanceof
어떤 생성자 함수를 사용하여 인스턴스를 만들었는지 알려줌.

```
function Ninja() {
}

var ninja = new Ninja();
console.log(ninja.constructor);
var ninja2 = new ninja.constructor();

console.log(typeof ninja); // "object"
console.log(typeof ninja2); // "object"


console.log(ninja instanceof Ninja); // true
console.log(ninja2 instanceof Ninja); // true
console.log(ninja !== ninja2); // true 다른 객체 생성.
```
Ninja 생성자 함수를 사용하지 않고 호출 가능하다.

### 상속과 프로토타입 체인

```
function Person() {}
Person.prototype.dance = function() { console.log('person dance');};

function Ninja() {}
Ninja.prototype = {dance : Person.prototype.dance};

var ninja = new Ninja();
console.log(ninja instanceof Ninja); // true
console.log(ninja instanceof Person); // false
console.log(ninja instanceof Object); // true
```

위의 방식은 단순 값 복사이므로 제대로 실행하지 못한다.

그럼 Ninja를 Person의 하위 클래스로 두려면 어떻게 해야할까?
Ninja.prototype = new Person();
이렇게 하면 프로토타입 체인을 따른다.

```
function Person() {}
Person.prototype.dance = function() { console.log('person dance');};

function Ninja() {}
Ninja.prototype = new Person();

var ninja = new Ninja();
console.log(ninja instanceof Ninja); // true
console.log(ninja instanceof Person); // true
console.log(ninja instanceof Object); // true

```

Ninja constrictor 프로퍼티 > Ninja prototype 프로퍼티 > Person constrictor 프로퍼티 > Person prototype 프로퍼티
