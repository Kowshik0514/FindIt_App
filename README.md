## Getting started
This app is created using React Native for front-end, Node.js for back-end, MongoDB for database, ExpoGo for development, EAS for deployment 

## Description
FindIT is a comprehensive lost and found application designed to help individuals within a community locate and return lost items. The app provides a user-friendly interface and a range of features to streamline the process of reporting and finding lost items.

## Features

- **Sign In / Sign Up**: Secure authentication to manage user accounts. New users can easily sign up, and existing users can sign in to access their profiles.
- **Home**: The main dashboard that displays important information and provides easy access to other sections of the app. Includes a carousel for featured items and quick links.
- **Statistics**: View real-time statistics on lost and found items, including counts and rates, to get insights into the effectiveness and usage of the app.
- **Lost Items**: A dedicated section for users to report lost items, including details and images. Users can easily submit new reports and track the status of their lost items.
- **Found Items**: A section for users to report and browse found items. Users can add details and images of items they've found, and others can view and claim these items.
- **Profile**: Manage user profiles and settings. View personal information, edit profile details, and manage account settings.
- **Maps**: Included maps in the previous version of app, but due to license issue from google, it was commented out.Maps have detailed locations and markers to filter the items at specific locations in map.
  
## Commands

All commands are run from the FindIT directory of the project, from a terminal:
  ```bash
  cd FindIT
  npm install
  npm start
  ```
| Command                 | Action                                                 |
| :---------------------- | :----------------------------------------------------- |
| npm install         | Installs dependencies                                  |
| npm start           | You get Metro waiting on exp+findit://expo-development-client/?url=http%3A%2F%2F*10.30.43.54*%3A8081 --> Open ExpoGo app and put "exp://xx.xx.xx.xx:8081" where xx is bolded ip address.           |


## Deploy to production (manual)

*You can create an optimized production build with:*

## Build Instructions

1. *Remove projectid field in eas.json file:* Ensure that the `projectid` field is not present in the eas.json configuration file.
2. *Log in to EAS*: Run `eas login` to log in to your Expo account.
3. *Configure EAS Build*: Execute `eas build:configure` and select the Android device configuration after running the command.
4. *Build the Android App*: Run `eas build --platform android` to generate the .aab file.
5. *Convert .aab to .apk*: Convert the generated .aab file to an .apk file if needed.


### Lost Items Routes

#### Routes

- **POST /**: Creates a new lost item.  
  - **Request Body**: Must include properties defined in the Item model.  
  - **Response**: Returns the created item with a 201 status. On failure, returns a 500 error.

- **GET /**: Retrieves all lost items.  
  - **Response**: Returns an array of items with a 200 status. On failure, returns a 500 error.

#### Error Handling

Returns a 500 status and error message on exceptions.

---

### Express Server

Connects to MongoDB, configures middleware, and sets up routes for authentication, items, lost items, and sizes. Enables CORS and runs the server on port 3000. The `/signin` endpoint validates user credentials and returns appropriate success or error messages.

#### Requirements

- **express**: Web framework for Node.js.
- **connectDB**: MongoDB connection function.
- **authRoutes**: User authentication routes.
- **itemRoutes**: Item management routes.
- **lostitemRoutes**: Lost items routes.
- **sizes**: Size management routes.
- **cors**: Cross-Origin Resource Sharing middleware.

#### Usage

- **POST /**: Create a new item.
- **GET /**: Fetch all items.

The server logs a message when started.

## Contribution

**Front End:**
- Akash
- Kowshik
- Madhav
  
**Back End:**
- Sanjay
- Aarya
- Jyothiraditya
 <br>
Here are some of the snapshots of our app!!
<br>
![Open Screen](https://github.com/user-attachments/assets/e6768c27-d746-4bbb-b49e-370f9b7b207e)
<br>
![Sign In / Sign Up ](https://github.com/user-attachments/assets/a4576959-de63-4dbd-9a72-645620e70356)
<br>
![Home Screen](https://github.com/user-attachments/assets/dfbe873b-26da-429a-a844-4ea3f2bda8a9)
<br>
![Lost Page](https://github.com/user-attachments/assets/dc64b1a2-ec40-4167-9a08-1f5de0d32a13)
<br>
![Found Page](https://github.com/user-attachments/assets/c481c5ce-adb4-4a60-8cd8-786d1df28a64)
<br>
![Profile](https://github.com/user-attachments/assets/cb2cf553-5a29-4a32-9b4b-bb800233a15b)
<br>
![Edit Profile](https://github.com/user-attachments/assets/8f80c8dd-02e8-485c-b780-19067ea3adf9)
<br>
![Settings](https://github.com/user-attachments/assets/455f327b-5ffc-4264-a85f-465fdf0434b0)
<br>
![Settings/Privacy](https://github.com/user-attachments/assets/49cad1c9-efbd-4d73-a65d-47a744f2a54f)
<br>









