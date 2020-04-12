# Workify

## Getting Started

To install all of the required dependencies, run this command in the project folder.

```
npm install
```

After that, to access the correct back-end server, change the **baseURL** value in the **./src/axios.js** file to the URL you're going to use.

```
...

const instance = axios.create({
    baseURL: 'http://YOUR_URL'
});

...

```

Finally, to launch the application, run

```
npm start
```

