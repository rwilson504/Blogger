Getting started with Git can get confusing at times.  Recently when looking back at one of the first projects I forked from GitHub (DefinitelyTyped) I realized I had done commits in my master branch instead of creating a branch.  I wanted to be able to merge changes back into the fork source so I figured it would be a good idea to reset my forked master back to the original git repo.  Also if you forked master is far behind the origin master you can also use this to bring your fork master up to date.

Here is the script for forcing your forked master to match the current origin master.

```
cd c:\code\DefinitelyTyped
git remote add upstream /url/to/original/repo
git fetch upstream
git checkout master
git reset --hard upstream/master  
git push origin master --force 
```

> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTg1MjcwNzg3OV19
-->