

### 참조
 재귀 호출하는 함수의 참조가 객체의 프로퍼티에 할당된 경우.  
 실제 이름과 달리 참조는 변할 수 있다. 

 * 이름이 있는 재귀 함수 
 ```
 function chirp(n) {
  return n > 1 ? chirp(n-1) + '-chirp' : 'chirp';
 }

 chirp(3);
 ```

* 메소드를 이용한 재귀 함수
```
  var ninja = {
    chirp : function(n) {
        return n > 1 ? ninja.chirp(n-1) + '-chirp' : 'chirp';
    }
  }

  ninja.chirp(3);
```
chirp 메소드는 익명 함수가 chirp라는 property에 참조하여 호출되는 구조.
따라서 내부에서 다시 호출할 때 ninja.chirp()로 호출해주고 있다.

* 새로운 객체를 추가해서 재귀 메소드를 해보자.
```
  var ninja = {
    chirp : function(n) {
        return n > 1 ? ninja.chirp(n-1) + '-chirp' : 'chirp';
    }
  }

  var samurai = { chirp : ninja.chirp};
  ninja = {}; // 이전의 객체를 초기화함으로써 문제 발생.

  samurai.chirp(3);  
```
 ninja.chirp와 samurai.chirp는 동일한 익명함수를 참조.
하지만 samurai에서 참조하던 ninja 객체가 초기화함으로써 문제가 발생된다.

메소드의 컨텍스트는 해당 메소드의 객체를 가리키므로 
재귀 호출 시 this.func() 형식으로 작성하면 문제가 발생되지 않는다.

* 인라인 함수로 재귀 호출을 하면?
```
  var ninja = {
    chirp : function signal(n) {
        return n > 1 ? signal(n-1) + '-chirp' : 'chirp';
    }
  }

  var samurai = { chirp : ninja.chirp};
  ninja = {}; // 이전의 객체를 초기화했지만, samurai 객체는 signal이라는 함수를 갖고 있으므로 문제가 발생되지 않는다.

  samurai.chirp(3);  // ninja의 chrip 프로퍼티를 삭제하는 것은 인라인 함수에 지정한 이름과 인라인 함수를 호출하는데 영향을 주지 않기 때문이다.

```


```
  var ninja = function myNinja() { 
    console.log(ninja == myNinja, "이 함수는 동시에 두 가지 이름을 갖고 있다.");
  }
  
  ninja(); // 호출됨.
  
  console.log(typeof myNinja == "undefined", "myNinja는 해당 인라인 함수의 외부에서는 사용할 수 없다.");
  
  myNinja(); // undefined 에러
  
  ninja.name; // myNinja
  window.myName; // undefined
  window.ninja; // function myNinja() { ... }
```
인라인 함수는 함수의 유효 범위가 함수가 선언된 곳 내부로 제한되어 있다. (밖에서는 유효하지 않다.)
변수의 이름과 유사하게, 해당 함수 내에서만 이름이 유효.


* callee(현재 실행되고 있는 함수 의미) 프로퍼티 활용하기
```
   var ninja = {
    chirp : function(n) {
        return n > 1 ? arguments.callee(n-1) + '-chirp' : 'chirp';
    }
  }
```
함수 호출 시 arguments 값이 전달. 
arguments 객체의 프로퍼티로 callee는 현재 실행하고 있는 메소드를 알려줌.
arguments.callee()를 활용하면 재귀를 나타내준다.

근데!
callee는 앞으로 deprecated될 속성이므로 사용하는데 유의한다!

* 함수에도 프로퍼티를 지정할 수 있다.

### 메모이징

메모이제이션 : 이전의 계산 결과를 기억하는 함수로 복잡한 연산을 반복하지 않아 성능 향상 효과

```
  function isPrime(value) {
    if (!isPrime.answers) isPrime.answers = {};

    if (isPrime.answers[value] != null) {
      return isPrime.answers[value];
    }

    var prime = value != 1;
    for (var i = 2; i < value; i++) {
      if (value % i == 0) {
        prime = false;
        break;
      }
    }

    return isPrime.answers[value] = prime;
  }
```
* answers 프로퍼티는 캐시로 사용   
장점
* 사용자는 이전에 연산된 값을 요청할 때 성능 향상을 얻을 수 있다.
* 사용자가 알 수 없게 이뤄진다. 
단점 
* 메모리 사용량이 늘어난다.
* 캐싱이 비즈니스 로직과 혼재되어서는 안된다...
* 알고리즘 자체의 성능 테스트가 어려워진다....


* 배열 메서드를 속이기

```
Array.prototype.push.call(this, elem);
```
Array 자체 메소드 사용.
call() 메소드를 통해 push() 실행 시 this를 컨텍스트로 잡고 실행하도록.
 

# 자바스크립트에서는 함수 오버로딩을 제공 X  
 함수의 arguments 프로퍼티(가변인자 목록)을 활용하면 유연하게 함수를 작성할 수 있다.

```
  Math.max(1,2,3);
  Math.min(1,2,3);
```
Math의 메소드는 파라미터로 배열 타입을 지원하지 않아,   
배열의 최소/최대 값을 얻고자 하면 메소드를 새로 작성해야한다.

* apply 이용해서 가변인자 길이의 인자 전달하기.
```
 function smallest(array) {
   return Math.min.apply(Math, array);
 }

 function largest(array) {
   return Math.max.apply(Math, array);
 }
```

* 인자를 순회하여 만들어보기

```
function merge(root) {
  console.log('root', root);
  console.log('arguments', arguments);
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
     console.log('arguments', arguments[i]);
      root[key] = arguments[i][key];
    }
  }

  return root;
}

var merged44 = merge({name:"Batou44"}, {city:"Niihama44"})
```

- 함수의 매개변수는 root 하나만 선언되어 있다.    
   ==> 하지만 필요에 따라 arguments를 활용하여 함수 호출 시 하나 이상의 매개변수를 받아올 수 있다.

- 인자 목록 원하는 대로 자르기   

```
function muiltiMax(multi) {
	return multi * Math.max.apply(Math, arguments.slice(1)); // 에러.
}

muiltiMax(3, 1,2,3);
```

위와 같은 코드는 에러 발생.  
왜? arguments는 유사 배열이지 배열이 아니기 때문에 slice 메소드가 존재하지 않는다.


```
function muiltiMax(multi) {
  console.log(multi);
  console.log('slice', Array.prototype.slice.call(arguments, 1)); // 3
	return multi * Math.max.apply(Math, Array.prototype.slice.call(arguments, 1));
}

muiltiMax(3, 1,2,3);
```

위와 같이 Array.prototype.slice.call로 호출하면 arguments를 진짜 배열처럼 호출할 수 있다.  


* 함수의 length 프로퍼티는 함수 선언시 매개변수의 갯수. vs arguments.length는 호출된 매개변수의 갯수

따라서 length 프로퍼티를 활용해서 매개변수의 갯수가 다른 경우에 대한    
함수 오버로딩을 구현할 수 있다.

```
  var ninjas = {
    values: ["Dean", "Sam", "Alex"]
  };

  addMethod(ninjas, "find", function() {
    return this.values;
  });

  addMethod(ninjas, "find", function(name) {
    var ret = [];
    for (var i = 0; i < this.values.length; i++) {
      if (this.values[i].indexOf(name) == 0 ) {
        ret.push(this.values[i]);
      }
      return ret;
    }
  });

  function addMethod(object, name, fn) {
    var old = object[name];
    object[name] = function() {
      if (fn.length == arguments.length) {
        return fn.apply(this, arguments);
      } else if( typeof old == 'function') {
        return old.apply(this, arguments);
      }
    }
  }
```
