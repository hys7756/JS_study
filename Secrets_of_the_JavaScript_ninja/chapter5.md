* 클로저
함수 선언 시 만들어지는 유효 범위
함수는 클로저를 통해 선언될 때 속해 있는 유효 범위 내의 변수와 함수를 사용할 수 있고
변수 값을 변경할 수 있다.

```
var outerValue = 'ninja';
var later;

function outerFunction() {
console.log('outerFunction!!!!');

 var innerValue = 'samurai';

	function innerFunction() {
console.log('innerFunction!!!!');
		console.log('outerValue', outerValue);
		console.log('innerValue', innerValue);
	}

	later = innerFunction;
}

//console.log('outerFunction');
//outerFunction();
console.log('later');
later();
```

클로저는 보호막을 만드는 것.
이 보호막은 함수가 선언된 시점의 유효 범위에 있는 모든 함수와 변수를 갖고 있으며 사용할 수 있다.
함수가 동작하는 한 정보를 유지.

함수가 선언된 시점의 유효 범위에 있는 모든 변수와 함수를 갖고 있으면 필요하면 사용 가능.


```
var outerValue = 'ninja';
var later;

function outerFunction() {
console.log('outerFunction!!!!');

 var innerValue = 'samurai';

	function innerFunction(params) {
		console.log('outerValue', outerValue);
		console.log('innerValue', innerValue);
console.log('params', params);
console.log('toolate1', toolate1);
	}

	later = innerFunction;
}

console.log('toolate1??', toolate1);
var toolate1 = 'toolate1';
outerFunction();
later('ppp');
```
함수의 매개변수는 함수의 클로저에 포함되어 있다.
outer 유효 범위에 속한 변수
같은 유효 범위에 속한 변수라도 선언에 앞서 참조하지 못한다. (toolate1 참고.)


### 클로저를 이용해서 private 변수 만들기

```
function Ninja() {
    var feints = 0; // 이 변수의 유효 범위는 함수 내부. 따라서 외부에서 접근이 불가하므로 private 변수처럼 동작된다.
	// this.feints = 0; 으로 정의되어 있었다면 외부에서도 접근할 수 있었을 것이다.
    this.getFeints = function() {
        return feints;
    }

    this.feint = function() {
        feints++;
    }
}

var ninja = new Ninja();
ninja.feint();

console.log(ninja.getFeints()); // 1
console.log(ninja.feints); // undefined
```


생성자 함수 내의 변수는 외부에서 접근할 수 없지만,    
내부에 선언된 메소드는 클로저를 통해서 변수에 접근할 수 있기 때문에    
변수를 직접 노출하지 않으면서 변수의 상태를 관리할 수 있다.


### 콜백과 타이머
클로저를 사용하지 않으면 이벤트 처리나 애니메이션 또는 Ajax 요청과 같은 일을
한 번에 여러 개 처리하는 작업이 어려워진다.

```
function outer() {
	var outerA = 10;
	console.log('[outer] outerA', outerA);
	function inner() {
		console.log('[inner] outerA', outerA);
		var innerB = 20; 
		console.log('[inmmer] innerB', innerB);
	}
	
	inner();
	console.log('[inner] outerA', outerA);
	console.log('[inmmer] innerB', innerB);

}

outer();
//inner();
```

클로저 이용하면 생성 시 변수의 저장 값을 볼 뿐만 아니라 
클로저 내의 함수가 실행하는 동안 변수 값 변경 가능.


### 함수 콘텍스트 바인딩
```
<button id="test"/>
var button = {
	clicked : false,
	click : function() {
		this.clicked = true;
		console.log(button.clicked, "버튼 클릭");
	}
};

var elem = document.getElementById('test');
elem.addEventListener("click", button.click, false);
```

이벤트 핸들러로 사용 시, 
어떤 객체의 메서드를 사용하려고 할때
해당 메서드의 콘텍스트로 지정하는 경우 바인딩 함수를 사용한다.

Prototype 라이브러리를 이용한 바인딩 코드 예제
```
Function.prototype.bind = function() {
	// this는 myFunction 함수 내용을 의미. 당연히 this는 bind 함수 실행한 주체겠지! 클로저에서 접근할 수 있도록 this를 따로 변수로 빼두었다.
	var fn = this, args = Array.prototype.slice.call(arguments),
	object = args.shift();

	return function() {
		return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
	};
};

var myObject = {};
function myFunction() {
	return this == myObject; 
}

console.log(!myFunction(), "아직 콘텍스트가 설정되지 않음");

var aFunction = myFunction.bind(myObject);
console.log(aFunction(), "콘텍스트가 제대로 설정됨.");
```

bind 함수의 목적은 지연된 콜백 실행을 위해 익명 함수와 클로저를 통해 콘텍스트를 제어하는 것이다.
이는 apply, call 함수와의 다른 목적으로 생겨난 함수인 셈이다.

apply, call : 메소드 실행 시의 컨텍스트를 맞추기 위한 것. 
특정 함수를 당장 컨텍스트를 바꿔 실행 할 때.
함수의 결과 값을 리턴.

bind : 콜백 함수 실행 시 컨텍스트를 제어.
특정 함수를 추후에 실행하고자 할 때 사용.
함수를 리턴.

### 부분 적용 함수
 함수가 실행되기 전에 인자를 미리 설정하는 기술.
프록시 함수(한 함수가 다른 함수를 감싸고 실행 시에는 감싸진 함수가 호출)에서 사용한 기법과 일치.

* 커링(currying) : 함수의 몇몇 인자를 채우는 기법.

```
	Function.prototype.curry = function() {
		// 1. 클로저 내에서 접근이 가능하도록 커링 대상 함수와 curry 함수에 전달된 인자를 변수에 저장.
		var fn = this,
		args = Array.prototype.slice.call(arguments);

		// 2. 익명의 커리 함수를 생성
		return function() {
			fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
		};
	};
```

함수는 자신의 콘텍스트를 가지기 때문에 콘텍스트는 클로저의 일부분이 될 수 없다.
하지만 콘텍스트의 값은 그 값을 저장하는 변수를 이용해서 클로저의 일부분이 되게할 수 있다.


### 함수 래핑
 함수의 로직은 외부로 드러내지 않으면서 기능을 추가하거나 확장하는 기법.

```
function wrap(object, method, wrapper) {
	var fn = object[method];

	return object[method] = function() {
		return wrapper.apply(tgusm [fn.bind(this)].concat(
					Array.prototype.slice.call(arguments)
		));
	};
}

if (Prototype.Broswer.Opera) {
	wrap(Element.Methods, "readAttribute", 
			function(original, elem, attr) {
				return attr == "title" ? elem.title : original(elem, attr);
			}
	);
}
```
 
위 예시는 오페라 브라우저에서 title 속성 접근 시 발생되는 버그를 수정하고자
wrap 메소드를 통해 우회하도록 되어 있다.

### 즉시 실행 함수
* 문법 : (함수 내용) ();  
함수 내용으로는 직접 함수 인스턴스를 생성하여 넣어줘도 되지만,    
함수를 참조하는 변수를 넣어도 무관하다.   


즉시 실행 함수는 즉시 실행되기 때문에 즉시 실행 함수 내부에 있는 변수와 함수는 어디서든 참조할 수 있게 된다.
또한 변수의 유효범위를 지정할 수 있다. 
```
(function(what) { 
	console.log(what);
})('hi there!')
```

* 분리된 유효 범위 내에서 유효한 이름 지정 예시
```
$ = function() {console.log("not JQuery!");};
(function($) {
	$('img').on('click', function(event) {
		$(event.target).addClass('clickOn');
	})
})(jQuery);
```
$가 새로운 내용으로 정의되어 있으나,
즉시 실행함수에서 jQuery로 다시 지정하였기 때문에 실행 내부에서 원래의 jQuery 값으로 할당되어 있는것.

매개변수가 전역 변수 보다 높은 우선순위.


