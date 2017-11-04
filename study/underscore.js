// collection 


// obj의 속성의 값을 가져온다. 
_.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
}

// obj의 속성 값들을 차례로 돌며 함수 실행하여 새로운 collection을 생성한다.
_.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj), // boolean && number ==> true && 3 은 3이 리턴. false && 3 은 false가 리턴. 
    // _.keys : object의 키 값을 배열로 만들어서 반환한다.
        length = (keys || obj).length, // 괄호 안에서 값 || 로 선정 후 length 를 호출할 수 있구낭~~!!
        results = Array(length); // 입력된 obj의 크기만큼의 새로운 배열을 생성한다.

    for (var index = 0; index < length; index++) { // 입력된 obj의 크기만큼 반복하면서
        var currentKey = keys ? keys[index] : index; // array면 걍 index, object면 object 키 중 index 번째의 키 값을 꺼낸다.
        results[index] = iteratee(obj[currentKey], currentKey, obj); // 입력받은 collection이 함수 실행 후의 반환 값을 새로운 results 배열에 저장
    }

    return results;
}

// collection을 배열이나 객체로 반복해야하는지 여부를 결정한다.
var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= Math.pow(2, 53) - 1; // array면 true object면 false
}

// value 값 타입에 따라서 해당 값을 반환하도록 한다. (콜백 함수 호출)
var cb = function(value, context, argCount) {
    if (value == null) { // value가 null이면 기본 
        return _.identity;
    }

    if (_.isFunction(value)) { // 함수면 함수가 실행되도록 한다.
        return optimizeCb(value, context, argCount);
    }

    if (_.isObject(value)) { // object면 객체에 key:value에 해당되는 값이 있는지 확인하여 반환
        return _.matcher(value);
    }

    return _.property(value); // value에 대한 값 반환
};

//  기본 iteratee(collection에서 각 요소에 대한 값을 처리하는 콜백 함수를 반환)의 기본 기능을 유지하기 위한 함수
_.iteratee = function(value, context) {
    return cb(value, context, Infinity);
}

// 매개변수의 갯수에 따라서 함수를 실행하도록 한다. 
var optimizeCb = function(func, context, argCount) {
    if (context === void 0) { // context가 undefined인 경우 (undefined로 표시 안하고 void 0으로 표시한 이유는 무엇일까??) void 0 vs undefined
        return func;
    }

    switch (argCount == null ? 3 : argCount) {
        case 1 : return function(value) {
            return func.call(context, value);
        };
        case 2 : return function(value, other) {
            return func.call(context, value, other);
        };
        case 3 : return function(value, index, collection) {
            return func.call(context, value, index, collection);
        }
        case 4 : return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
        };
    }

    return function() {
        return func.apply(context, arguments);
    }
}

// 입력받은 값 (object 혹은 array)을 랜덤하게 섞은 array를 만들어 반환한다.
_.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj); // 오브젝트면 _.values 메소드를 통해 값 array를 할당 or 배열이면 배열 값 할당
    var length = set.length;
    var shuffled = Array(length); // 기존 입력 값의 크기만큼 배열을 만들어서
    for (var index = 0, rand; index < length; index++) { // for문을 돌며 랜덤한 인덱스에 
        rand = _.random(0, index); // 0과 index 값 사이의 랜덤 값을 받아서
        if (rand !== index) {
            shuffled[rand] = set[index]; // 새로운 배열에 할당
        }

        return shuffled;
    }
}

// array 중에서 predicate 함수 실행 결과가 참인 요소 array를 반환한다.
_.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    
    _.each(obj, function(value, index, list) { // obj를 차례로 돌며 반환되는 값들로 predicate 메소드 수행
        if (predicate(value, index, list)) { // 참이면
            results.push(value); // 결과 array에 값 넣는다.
        }
    });

    return results;
}

// 요소의 iteratee 함수 결과 값을 반환한다.
_.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;

    if (isArrayLike(obj)) { // array면 
        for (i = 0, length = obj.length; i < length; i++) {
            iteratee(obj[i], i, obj); // 그냥 array 인덱스로 값을 넣어서 콜백 실행 ( 값 , 키 , 전체배열) 순서!
        }
    } else { // object면
        var keys = _.keys(obj); // 각 오브젝트의 key 값을 빼오고 
        for( i = 0, length = keys.length; i < length; i++) { // key 값들을 기준으로 반복문 돌려서
            iteratee(obj[keys[i]], keys[i], obj); // key array를 기준으로 값을 빼와서 콜백 실행
        }
    }

    return obj;
}

// obj를 predicate 실행 시 참인 것과 거짓인 것들을 분리하여 만든 arry를 반환한다.
_.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context); // predicate를 콜백함수 만들고
    var pass = [], fail = [];

    _.each(obj, function(value, key, obj) {
        ( predicate(value, key, obj) ? pass : fail).push(value);    
    })

    return [pass, fail];
}

var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0; 

    for( var i = startIndex || 0, length = getIndex(input); i < length; i++) {
        var value = iput[i];
        if (isArrayList(value) && (_.isArray(value) || _.isArguments(value))) { // array의 index 번째 값이 array면

            if (!shallow) { // shallow 값이 false면 재귀 호출하여 안에 있는 하위 array를 상위 array로 빼온다. 
                value = flatten(value, shallow, strict);
            }

            var j = 0, len = value.length; // value 자체의 배열 크기 만큼 len을 꺼내서
            output.length += len;
            while (j < len) {
                output[idx++] = value[j++];
            } // 결과 배열에 넣어준다.
        } else if (!strict) {
            output[idx++] = value; // array가 아니면 그냥 값을 결과 배열에 넣어준다.
        }
    }

        return output;
}

// array 안의 array가 있는 경우 지워 하나의 array 반환한다.
// ex) _.flatten([1, 2, [3], [4, 5, [6, 7]]]) = [1,2,3,4,5,6,7]
// ex) _.flatten([1, 2, [3], [4, 5, [6, 7]]], true) = [1,2,3,4,5,[6,7]]
_.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
}