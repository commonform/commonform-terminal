```javascript
var terminal = require('commonform-terminal')
var assert = require('assert')

assert.equal(
  terminal(
    { "content": [
        "This ",
        { use: "Agreement" },
        " (this ",
        { "definition": "Agreement" },
        " is made effective as of the date the last ",
        { "use": "Party" },
        " signs this ",
        { "use": "Agreement" },
        " (the ",
        { "definition": "Effective Date" },
        ") by and between ",
        { "blank": "" },
        ", a ",
        { "blank": "" },
        " (",
        { "definition": "Company" },
        ") and the several purchasers named in ",
        { "reference": "Purchasers" },
        " (",
        { "definition": "Purchasers" },
        ", and together with ",
        { use: "Company"},
        ", each a ",
        { "definition": "Party" },
        ")." ] },
    [ /* no blank values */ ],
    { /* no options */ }),
  [ "    This \u001b[35mAgreement\u001b[39m (this \"",
    "\u001b[32mAgreement\u001b[39m\" is made effective as of ",
    "the date the last \u001b[35mParty\u001b[39m signs this ",
    "\u001b[35mAgreement\u001b[39m (the \"\u001b[32mEffective ",
    "Date\u001b[39m\") by and between \u001b[31m\u001b[4m[_]",
    "\u001b[24m\u001b[39m, a \u001b[31m\u001b[4m[_]",
    "\u001b[24m\u001b[39m (\"\u001b[32mCompany",
    "\u001b[39m\") and the several purchasers named in \u001b[33m",
    "Purchasers\u001b[39m (\"\u001b[32mPurchasers\u001b[39m\", and ",
    "together with \u001b[35mCompany\u001b[39m, each a \"\u001b[32m",
    "Party\u001b[39m\")." ].join(''))

assert.equal(
  terminal(
    { "content": [ { "blank": "" } ] },
    [ { blank: [ 'content', 0 ],
        value: 'NewCo, Inc.' } ],
    { /* no options */ }),
  "    \u001b[31m\u001b[4m[NewCo, Inc.]\u001b[24m\u001b[39m")
```
