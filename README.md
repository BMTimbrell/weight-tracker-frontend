# Weight Tracker

![weight-tracker](https://github.com/BMTimbrell/weight-tracker-frontend/assets/97784102/eb16f6e5-9b51-4989-bfb2-8faaa62c9809)

## About

This is an app I made for tracking changes in weight. It sends requests to a [server](https://github.com/BMTimbrell/weight-tracker-backend)
I made to fetch and update user data. I used a react library called recharts to display data on a graph. The website is hosted
on Render and can be viewed [here.](https://weight-tracker-mey7.onrender.com)


## Features

* User registration and login
* Ability to update user details
* Custom hooks such as useFetch and useLocalStorage
* Theme setter that defaults to light or dark based on user's browser settings
* Ability to submit weight and date, as well as update and delete
* Ability toggle preferred unit between lbs and kg
* Ability to filter data by year and month
* All preferences saved in local storage
* Data displayed on graph