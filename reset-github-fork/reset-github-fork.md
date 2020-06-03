Getting started with Git can get confusing at times.  Recently when looking back at one of the first projects I forked from GitHub i realized i had done commits in my master branch instead of creating a 

```
git remote add upstream /url/to/original/repo
git fetch upstream
git checkout master
git reset --hard upstream/master  
git push origin master --force 
```

> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI3NTcxNjIxNF19
-->