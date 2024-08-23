## Getting started
This app is created using React Native for front-end, Node.js for back-end, MongoDB for database, ExpoGo for development, EAS for deployment 

## Description
FindIT is a comprehensive lost and found application designed to help individuals within a community locate and return lost items. The app provides a user-friendly interface and a range of features to streamline the process of reporting and finding lost items.

## Features

- *Sign In / Sign Up*: Secure authentication to manage user accounts. New users can easily sign up, and existing users can sign in to access their profiles.
- *Home*: The main dashboard that displays important information and provides easy access to other sections of the app. Includes a carousel for featured items and quick links.
- *Statistics*: View real-time statistics on lost and found items, including counts and rates, to get insights into the effectiveness and usage of the app.
- *Lost Items*: A dedicated section for users to report lost items, including details and images. Users can easily submit new reports and track the status of their lost items.
- *Found Items*: A section for users to report and browse found items. Users can add details and images of items they've found, and others can view and claim these items.
- *Profile*: Manage user profiles and settings. View personal information, edit profile details, and manage account settings.
- *Maps*: Included maps in the previous version of app, but due to license issue from google, it was commented out.
  
## Commands

All commands are run from the FindIT directory of the project, from a terminal:

| Command                 | Action                                                 |
| :---------------------- | :----------------------------------------------------- |
| npm install         | Installs dependencies                                  |
| npm start           | You get Metro waiting on exp+findit://expo-development-client/?url=http%3A%2F%2F*10.30.43.54*%3A8081 --> Open ExpoGo app and put "exp://xx.xx.xx.xx:8081" where xx is bolded ip address.           |


## Deploy to production (manual)

*You can create an optimized production build with:*

## Build Instructions

1. **Remove "projectid" field in eas.json file**: Ensure that the projectid field is not present in the eas.json configuration file.
2. *Log in to EAS*: Run eas login to log in to your Expo account.
3. *Configure EAS Build*: Execute eas build:configure and select the Android device configuration after running the command.
4. *Build the Android App*: Run eas build --platform android to generate the .aab file.
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
