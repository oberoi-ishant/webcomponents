function debounce(func, wait, immediate=true) {
  var timeout;
   return function() {
   var context = this, args = arguments;
   var later = function() {
     timeout = null;
     if (!immediate) func.apply(context, args);
   };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait); 
     if (callNow) {
       console.log(timeout);
        func.apply(context, args);
     }
 };
};



/* Understanding Debounce:
Idea: Always clear the previous timeout and prevent function from running
and start a new timeout if there is a continuous function call like window scroll
resize or keypress event.
Once the contiuous event input stops, then the func is actually invoked as described below  

Understanding: immeditate:
if true(call at the starting of wait time given), call the function first then in the later 
function you clear the timeout so that the callNow condition becomes true after the wait ms is over. 
So first time: timeout is null, callNow(true) fires and a new timeout is set which will be
cleared in later function. So call as soon the continuous event stops.
So actual function call is when callNow condition is true. later function is only
used to clear timeout. func will not fire in later as immediate is true.

if false(call at the end of wait time given), callNow will never fire. So idea is after continuos 
event stops wait for the wait time given in ms and then invoke the function inside later 
function as !immediate check will be true. 
So first respect the timeout given then fire func as the normal setimeout generally works.

Also check the debounceWithoutImmediate function. It is simple and works!

*/


var timeout; // just to log the timeout value, it is made global
function debounceWithoutImmediate(func, wait) {
  // var timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
    console.log(timeout);
  }
}

/* keep clearing timeout if there is continuos event. Once the event stops,
the last timeout value is alive, it is not cleared by clearTimeout, hence the function fires
in setTimeoutfunction. */

window.addEventListener('scroll', function (evt) {
  myfun();
});

var myfun = debounceWithoutImmediate(loadImages, 2500);

function loadImages() {
  console.log('Hello', timeout);
}