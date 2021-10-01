# DataLoader Test

This is a repo for testing dataloader functioning on Node.js.

## To test the GraphQL endpoints using `ab`
```bash
ab -n 5000 -T application/json -p ab/books.json http://localhost:3001/graphql/ & \
ab -n 5000 -T application/json -p ab/library.json http://localhost:3001/graphql/
```


## References
* https://medium.com/the-marcy-lab-school/how-to-use-dataloader-js-9727c527efd0
* https://soshace.com/optimizing-graphql-data-queries-with-data-loader/
* https://www.apollographql.com/docs/apollo-server/data/data-sources/#What-about-DataLoader
* https://www.yld.io/blog/graphgl-dataloader-utility-there-is-no-magic/

