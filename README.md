## 🎯TANGO SOLVER LINKEDIN
- This is a *daily game* in linkedin I recently got playing.
- This chrome extension solves the `TANGO game`.
- So what does this repo do?
  - I have created `2` **extensions**,
    - The one you can use while you are not signed in `TANGO_EXTENSION`🏁
    - Then the next one where you have can use when u have logged in ***linkedin***,thne use `TANGO_EXTENSION_V2`🔑
- works with any size
- Follows the below rules



## 📜Game rules
- let's understand the `board` first,
    - we can have two types of shape let's say `sun` and `moon`. Onlciking each sq it changes from `sun`->`moon`->***being empty***
    - Some tiles are locked by default.
    - The `edge` may have **cross** and **equal** which tells the relationship between the *2 tiles*.
- **RULE-1**: The maximum count of `sun/moon` per row or column is ***3***
- **RULE-2**:there can't be *3 adjacent* `sun/moon`
- **RULE-3**:You should maintain the edge consistency.

## 🎥DEMO

https://github.com/user-attachments/assets/fe2099b3-3876-4ede-877a-b3a8b9c8c881

## HOW TO USE MY EXTENSION?🧠
- Download `TANGO_EXTENSION` or `TANGO_EXTENSION_V2` on your need.
- Go to `chrome://extensions/`
- Then on *top-right* enable ***developer mode***.
- Then on *top-left* click ***Load unpacked*** browse the path where have downloaded my folder.
- Click it.
- Now use it as per demo.
  
> ***FUN GUESS*** LinkedIn's Tango game likely got its name from the famous Tango dance, which is known for its synchronized and strategic movements between partners.🤭

## 💡WHY THIS REPO?
- I love shortcuts and smart work.🕺
- I wanted code *backtracking*,I am crazy on DSA.😁
- To learn how ***extension works!!*** 🏗️
- How to scrape and search in a web.🔍
- Te learn *async,await,promises*🔁

## REPO STRCUTURE
```
├── PROTOTYPE
│   ├── TEST CASES
│   └── tango.js
├── TANGO_EXTENSION
├── TANGO_EXTENSION_V2
│   ├── manifest.json
│   ├── popup.html
│   └── tango.js
├── paste.js
└── the_making.md
```
- `PROTOTYPE/tango.js` has the backtracking algo,u can run this using ***`node tango.js`***
- `PROTOTYPE/TEST CASES` contain the test-cases which I got for validation.
- `paste.js` is used to make my working easier.

