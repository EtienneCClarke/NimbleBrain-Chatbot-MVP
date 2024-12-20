# Script Injection Example

This is an example respository that shows how to use the script tag to inject a hosted javascript file into a webpage.

### JSDelivr

[JSDelivr](https://www.jsdelivr.com/?docs=gh) provides a free CDN for open source projects. Simply replace `user`, `repo`, and `file` to gain access globally.

`version` will be the commit SHA of the version you want to use. Optionally use `latest` to use the latest commit, however JSdelivr only updates this once every 12 hours. 

```bash
https://cdn.jsdelivr.net/gh/[user]/[repo]@[version]/[file]
```
