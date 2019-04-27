import { Observable } from 'rxjs';

const foo = Observable.create(function (observer) {
    console.log('Hello');
    observer.next(42);
    observer.next(100); // "return" another value
    observer.next(200); // "return" yet another
});

console.log('before');
foo.subscribe(function (x) {
    console.log(x);
});
console.log('after');