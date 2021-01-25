Awesome-ERP Frontend([Click Here](https://github.com/awesome-erp/erp-fe))
===============================
<p>
<img width="30%" style="padding: 5%; display: inline-block" src="/src/assets/aerp-color.svg">
<img width="30%" style="padding: 5%; display: inline-block" src="/src/assets/aerp-white.svg">
<img width="30%" style="padding: 5%; display: inline-block" src="/src/assets/aerp-black.svg">
</p>

Infrastructure
--------------

deployed at: https://awesome-erp.herokuapp.com/

| Usecase     | Resource       |
|-------------|----------------|
| Frontend    | Angular  |
| Auth        | Firebase |
| Lint        | Eslint   |
| Deployment  | Heroku   |



Route Info
-----------
|      Route             | Info                                           | Permissions |
|------------------------|------------------------------------------------|-------------|
|   ```login```          | Login/ Signup.                                 | All         |
|   ```create```         | User Profile Creation.                         | All         |
|   ```request```        | Creating requests for leaves, bonus, or loans. | All         |
|   ```profile```        | View User Profile.                             | All         |
|   ```manage-request``` | Manage requests of employees.                  | Manager     |
|   ```employee-manage```| Manage and Assign employees and their payrolls.| Manager     |
|   ```search```         | Search for employees in Organization.          | Manager     |

Deployment
-----------
- Fork the repository
- Clone the fork `https://github.com/`GITHUB USERNAME`/erp-fe.git`
- Run `cd erp-fe`
- Build the files: `npm run build:prod`
- Fork https://github.com/awesome-erp/erp-fe-node-serve/tree/master
- Replace the files in the server with the updated build files from /dist/erp-fe/
- Deploy to Heroku

Development
----------
- Fork the repository
- Clone the fork `https://github.com/`GITHUB USERNAME`/erp-fe.git`
- Run `cd erp-fe`
- Run `npm install`  
- Build the development server `ng serve`
Angular allows hot reloading, so any changes in files would trigger automatic reloads.
This holds true for any changes in the files, but updates to `angular.json`, `tsconfig.json`
or the environment files won't trigger it.
