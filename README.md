# React-Firebase App
This is a React app connected to a Firebase realtime database.

You can add or remove cities in my Firebase database

Here is a [live version](https://cities-react-firebase-app.netlify.app/) hosted on Netlify.
<br><br>

# Usage
## Getting ready
* Clone repository
```
git clone https://github.com/m-somat/react-firebase-app.git
```
* Install required dependencies
```
npm install
```
* Add your own "firebase.config.js" in the "src/" directory. It includes firebase API key for your react app.
* Here are the steps to create your own [React Realtime Database](https://react-firebase-js.com/docs/react-firebase-realtime-database/getting-started)
<br><br>

## City Template
```JSON
{
    "id": {
        "city": "city name",
        "color": "item hex color",
        "id": "item id",
        "time": "publishing time",
        "zip": "zip code"
    }
}
```
<br>

# Side Note
This project is totally random but the concept was inspired from [Olena Drugalya](https://dev.to/olenadrugalya)'s article on [DEV](https://dev.to/olenadrugalya/connecting-react-project-with-firebase-2n3g).
