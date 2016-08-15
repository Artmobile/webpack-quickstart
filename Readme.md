http://learn.javascript.ru/screencast/webpack

or

https://www.youtube.com/watch?v=kLMjOd-x0aQ&list=PLDyvV36pndZHfBThhg4Z0822EEG9VGenn&index=1

# Display build information
```
 webpack --display-modules -v
```

# Show build stats
Save the status into stats.json file (name of the file can be anything)
```
webpack --json --profile > stats.json   
```

Then upload it in the following link: http://webpack.github.io/analyse/

# Profile webpack
```
webpack --profile --display-modules --display-reasons
```