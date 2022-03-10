# Flex Time App
Application that helps to track employee working hours. 
User interface implemented through the REST API service.

## Application functionality
* User has possibility to login the interface with email and password that was already exists in Backend server.
* User could add the ammount of working hours from the main list
* Updating of working hours happening through the modal window
* User has possibility to add the period of leave (vacation, sick leave, studing ...)
* Leaving period form has own page with 3 fields: Leave type, Start date, End date
* User has possibility to loggout from the application

### REST API documentation
* Get and Update hours [swagger link](https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/API/#/)
* Add employee leave [swagger link](https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/API/#/)
* Get token [swagger link](https://vladimir-gavrilov.outsystemscloud.com/HoursReport/rest/API/#/)

### Project setup
```
npm install
Also npm install vue-router and npm install bootstrap-vue is needed.
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
