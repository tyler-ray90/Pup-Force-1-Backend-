# Puppathon Backend (Express)

## Contributors:

-   Avisa Poshtkouhi
-   Genah Kim
-   Matthew Urban
-   Maurcell Melton
-   Row Kiefer
-   Tyler Conti
-   Tyler Ray
-   Ian Rackson: [![wakatime](https://wakatime.com/badge/github/tyler-ray90/Pup-Force-1-Backend-.svg)](https://wakatime.com/badge/github/tyler-ray90/Pup-Force-1-Backend-)


## Models

### Food    

| Key       | Type   | Required | Unique |
|-----------|--------|----------|--------|
| food      | string | true     | true   |
| animal    | string | true     | false  |
| edible    | string | true     | false  |
| notes     | string | false    | false  |


 


## Routes

      

| Path              | Method | Description                                            | Body                                             | Response                            |
|-------------------|--------|--------------------------------------------------------|--------------------------------------------------|-------------------------------------|
| /food             | GET    | Get All Foods in Database                              | Not Required                                     | Array of food objects               |
| /food             | POST   | Create new food object, or add data to exsisting oject | Requires Food, Animal, and Edible Properties     | JSON response object of the new food|
| /reset            | GET    | Resets Database Data                                   | Not Required                                     | JSON response object                |

