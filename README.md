Refer to : https://github.com/kantsuw/BXtoES

I break the monolith service into 3 micro services
  - selector_api : API that user can config the currency that they want to store data  and call to crypto_currency_api 
  
  - crypto_currency_api : API that call to exchange to get currency rate and call to keeper_api
  
  - keeper_api : API that transform currency rate from crypto_currency_api and send to elasticsearch

# crypto_currency_api

  API that call to exchange to get currency rate and call to keeper_api

# Prerequisite

- docker

- nodejs version > 8

# How to run 
  
  Checkout code from GitHub
  
  export cc_api_port=.....
  
  export keeper_host=.....
  
  export keeper_port=.....

  npm install
  
  node app.js/index.js

# Running with docker 

`docker run -d -p 1234:1234 -e cc_api_port=1234 \
-e keeper_host=kantz.space \
-e keeper_port=5678 xezor/crypto_currency_api
`
