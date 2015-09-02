```javascript
var terminal = require('commonform-terminal')
var assert = require('assert')

assert.equal(
  terminal(
    { "content": [
        "This Agreement (this ",
        { "definition": "Agreement" },
        " is made effective as of the date the last ",
        { "use": "Party" },
        " signs this ",
        { "use": "Agreement" },
        " (the ",
        { "definition": "Effective Date" },
        ") by and between ",
        { "blank": "Company's Name" },
        ", a ",
        { "blank": "Company's Form of Organization" },
        " (",
        { "definition": "Company" },
        ") and the several purchasers named in ",
        { "reference": "Purchasers" },
        " (",
        { "definition": "Purchasers" },
        ", and together with Company, each a ",
        { "definition": "Party" },
        ")." ] },
    { /* no blanks */ },
    { /* no options */ }),
    [ "    This Agreement (this \"\u001b[32mAgreement\u001b[39m\" is ",
      "made effective as of the date the last Party signs this ",
      "Agreement (the \"\u001b[32mEffective Date\u001b[39m\") by and ",
      "between \u001b[31m\u001b[4mCompany's Name\u001b[24m\u001b[39m, ",
      "a \u001b[31m\u001b[4mCompany's Form of Organization",
      "\u001b[24m\u001b[39m (\"\u001b[32mCompany\u001b[39m\") and the ",
      "several purchasers named in \u001b[33mPurchasers\u001b[39m ",
      "(\"\u001b[32mPurchasers\u001b[39m\", and together with Company, ",
      "each a \"\u001b[32mParty\u001b[39m\")." ]
      .join(''))
```
