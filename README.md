Display Common Forms at text terminals.

Install:

```shellsession
$ npm install --save commonform-tex
```

then:

```javascript
var tex = require('commonform-tex');

var form = {
  content: [
    { heading: 'Assignment',
	  form: {
	    content: [
		  'May assign to ',
		  { blank: 'Assignee' } ] } } ] };

typeof tex(form, { Assignee: 'Bob' }); // => 'string'
```
