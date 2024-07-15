# Music controller
A react and django tutorial by [Tech with Tim]()

## To run
start server
```
./manage.py runserver
```

If there is a change to the code
```
./manage.py makemigrations
./manage.py migrate
```



### Install
```
pip install django djangorestframework
```

### Command line operations
the command that create the project
```
django-admin startproject music_controller
```

the command that creates the files
```
django-admin startapp api
django-admin startapp frontend
```

the command that setup the frontend
```
# in frontend/
npm init -y
```

install package
```
npm i webpack webpack-cli --save-dev 
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
# npm install @material-ui/core --legacy-peer-deps
npm install @mui/material @emotion/react @emotion/styled
# npm install @babel/plugin-proposal-class-properties
npm install @babel/plugin-transform-class-properties
npm install react-router-dom
# npm install @material-ui/icons --legacy-peer-deps
npm install @mui/icons-material
npm install --save-dev css-loader
```
