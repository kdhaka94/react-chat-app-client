const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

fetch(process.env.REACT_APP_SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        variables: {},
        query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
    }),
})
    .then(result => result.json())
    .then(result => {
        const possibleTypes = {};

        result.data.__schema.types.forEach(supertype => {
            if (supertype.possibleTypes) {
                possibleTypes[supertype.name] =
                    supertype.possibleTypes.map(subtype => subtype.name);
            }
        });

        
        fs.writeFile('./src/possibleTypes.json', JSON.stringify(possibleTypes), err => {
            if (err) {
                console.error('Error writing fragmentTypes file', err);
            } else {
                console.log('Fragment types successfully extracted!');
            }
        });
    })
  .catch(err => {
    console.log(err)
  });