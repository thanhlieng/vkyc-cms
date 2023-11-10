# FrontEnd boilerplate WINDSoft 

Không chia sẻ source code lên git cá nhân hoặc public khi chưa được sự đồng ý bằng văn bản của WINDSoft.

## Branch Structure

#### Develop
* React-Storybook-Antd (build common components)

##### ReactJS & Vite
1. React-Storybook-ReactQuery-ReactContext-Antd
2. React-Storybook-ReactQuery-ReactContext-Mui
3. React-Storybook-ReactQuery-ReactContext-Antd-HookForm
4. React-Storybook-ReactQuery-Redux-Antd
5. React-Socket.io
6. React-i18n

* Anothor: change React to Vite

##### NextJS
1. Next-Redux
2. Next-Context
3. Next-Hook-Form
4. Next-i18n
5. Next-1-3-4
6. Next-2-3-4
## Tech Stack
##### Micro Frontend
- Coming soon...


##### ReactJS `(create by: Create React App | Vite)`
- Storybook
- React Query
- Styled-components
- React-router-dom (v6)
- Husky
- React Context | Redux Toolkit
- React chart
- Antd | MUI
- React Hook Form
- Socket.io
- i18n

##### NextJS
- NextUI
- React Hook Form
- Redux Toolkit
- Styled-components
- i18n

### Folder Structure `Branch: develop`
- api (*Custom axios*)
- assets (*Contain fonts and image*)
- components (*Contain components common*)
- config (*Contain config eg: style, router, ...*)
- constant (*Contain variables common*)
- context (*Contain context hook - reducer hook*)
- features (*Contain feature in app*)
- hooks (*Contain custom hook*)
- languages (*Contain custom multi language*)
- layouts (*Contain layouts in full app*)
- routes (*Contain list routes config*)
- types (*Contain typescript config common*)
- utils (*Contain common function*)

### Custom Hooks
- useCallContext (*Used for call context*)
- useWindowSize (*Used for get device width length*)
- useDeboune (*Used for prevent persistent user behavior*)
### Common Components

- FormComponent (*Custom form and form item antd*)
- I18Message (*Custom render language*)
- ButtonComponent (*Custom button add,edit,delete(propcomfirm)*)
- CardInfoComponent (*Custom card corresponding to each feature*)
- FilterComponent (*Custom filter list*)
- ImageComponent (*Custom image*)
- ModalComponent (*Custom modal*)
- PaginationComponent (*Custom pagination*)
- SelectComponent (*Custom select list call with api*)
- TableComponent (*Custom table*)
- UploaderComponent (*Custom uploader file and image*)
...


## Run Project

* Generate language convert to object
```bash
$  npm run li || yarn li
```
* Run project
```bash
$ touch .env .development .env.production
$ yarn install || npm install (or npm install --force)
$ yarn start || npm start
```
