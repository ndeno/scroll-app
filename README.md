# scroll-app
Infinite Scroll using the Intersection Observer API

As per [this codepen](https://codepen.io/ruppysuppy/pen/abBeZwj).

## GH Actions 
The Publish Action uses `aws-actions/configure-aws-credentials@v2` for bucket auth. 

A prereq is to have an assumable role to use via OIDC. 

For refence, see: 
- https://www.cloudtechsimplified.com/github-openid-connect-oidc-aws-secrets/
- https://www.automat-it.com/post/using-github-actions-with-aws-iam-roles
