# Spotify Connect v1 App

Spotify app built using TypeScript, React, Tailwind, and Spotify's API. Deployed on Heroku

<img width="1439" alt="Screen Shot 2022-05-01 at 7 15 40 PM" src="https://user-images.githubusercontent.com/52144063/166171034-86cf60d5-93eb-4d8a-9d84-44d88fbb4422.png">

<img width="1439" alt="Screen Shot 2022-05-01 at 7 15 47 PM" src="https://user-images.githubusercontent.com/52144063/166171046-85e80eed-da33-4c9d-84dd-1e4849f73763.png">

<img width="1439" alt="Screen Shot 2022-05-01 at 7 15 34 PM" src="https://user-images.githubusercontent.com/52144063/166171050-2a1dc046-6d25-4162-be64-1bc00fee351c.png">


## Local Installation & Set Up

1. Register a Spotify App in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and add `http://localhost:8888/callback` as a Redirect URI in the app settings

2. Create a `.env` file at the root of the project based on `.env.example` and add your unique `CLIENT_ID` and `CLIENT_SECRET` from the Spotify dashboard

3. Ensure [nvm](https://github.com/nvm-sh/nvm) and [npm](https://www.npmjs.com/) are installed globally

4. Install the correct version of Node

    ```shell
    nvm install
    ```

5. Install dependencies

    ```shell
    npm install
    ```

6. Run the React app on <http://localhost:3000> and the Node server on <http://localhost:8888>

    ```shell
    npm start
    ```
## Deploying to Heroku with Git

1. Create a [Heroku](https://www.heroku.com/) app

2. Add your Heroku app as a git remote

    ```shell
    heroku git:remote -a your-app-name
    ```

3. Add `http://your-app-name.herokuapp.com/callback` as a Redirect URI in your Spotify app's settings

4. In your app's **Settings** tab in the Heroku dashboard, add [config vars](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard).

   Based on the values in your `.env` file, the `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`, and `FRONTEND_URI` key value pairs. Make sure to replace the `localhost` URLs with your heroku app's URL.

   ```env
   REDIRECT_URI: http://your-app-name.herokuapp.com/callback
   FRONTEND_URI: http://your-app-name.herokuapp.com
   ```

5. Push to Heroku

    ```shell
    git push heroku main
    ```
