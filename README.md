This app requires that you have npm (v. 6.14.5+), ruby (v. 2.7.0+), and bundler (v. 2.1.4+) installed.

To run this app:

1. git clone this repository, as well as the backend at https://github.com/unclezap/backendsports2020/
2. Install your ruby gems by running $ bundle install from the backend directory.
3. Start your backend database by running $ postgres -D [filepath to your postgres*]
4. Create your postgres database by running $ rails db:create and $ rails db:migrate from the backend directory.
5. Start your backend server by running $ rails s in the console from the backend directory.
6. Install your frontend dependencies by running $ npm install from the frontend directory.
7. Start your frontend by running $ npm start in the console from the frontend directory.
8. Sign up as a user.  The first sign-in will scrape all the available articles this project analyzes, which will take about a minute.  Subsequent sign-ups and sign-ins will not require further downloading and will be much faster.
9. Log in and enjoy the site!

* If you don't know this filepath, try /usr/local/var/postgres
