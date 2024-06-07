# CodeSphere-A_Collaborative_Coding_And_Proctored_Assesment_Platform
CodeSphere is a comprehensive platform designed to enhance E-Learning by providing a real-time interactive web-based lab environment for students and teachers. It integrates advanced proctoring features to ensure the integrity of online assessments, making it a perfect solution for remote learning and secure online examinations.

<hr>

## Introduction

The main goal of CodeSphere is to advance E-Learning by addressing two significant challenges: 
1. Providing practical knowledge through a real-time interactive web-based lab.
2. Ensuring the integrity of online assessments with robust proctoring mechanisms.

## Features

### CodeSphere Lab
- **Create Room**: The admin (teacher) can create a room with a secret link and password.
- **Join Room**: Participants can join the room using the link and password to complete programming tasks.
- **Code Editor**: Supports C, C++, Java, and Python, with enter, exit, run, and submit functionalities.
- **Real-time Live Coding**: Admin can manage the room, guide, and verify each student's code in real-time.
- **Code Checking**: Admin can download the submitted code as a PDF for review.

### Proctoring
- **Form Input**: Allows users to input their details and test invitation code.
- **Multiple Tab Detection**: Detects and alerts if multiple tabs are open.
- **Form Auto-fill**: Automatically fills in user details for subsequent tests using local storage.
- **Audio and Video Checks**: Ensures the candidate’s audio and video setup meets the requirements.
- **Live Webcam Feed**: Displays the candidate's live webcam feed on the page.
- **Image Capture and Upload**: Captures images at configurable intervals and uploads them to the server.
- **Admin Dashboard**: Displays all user information, allows setting the interval for image capture, and shows images with timestamps.

<hr>

## Tech Stack used : 

**Client:** Ejs, Bootstrap, CSS, JS

**Server:** NodeJs, MongoDB, Socket.io, Express.js

**Others:** PostMan API, JWT Authentication, Cloudinary 
<hr>

## Architecture of Extension
![My image](https://res.cloudinary.com/dt9ckenyh/image/upload/v1678415195/my-images/Proctor_Vision_qkmqap.png)
<hr>

## Flow Diagram
<p align="center">
  <img src="Demo/Screenshot 2024-06-07 143137.png" alt="image"/>
</p>

<hr>

## Screenshots

<p align="center">
  <p>Landing Page</p>
  <img src="Demo/Screenshot (782).png" alt="image"/>
</p>

<p align="center">
  <p>Form Details to create room</p>
  <img src="Demo/Screenshot (783).png" alt="image"/>
</p>

<p align="center">
  <p>Links of created rooms</p>
  <img src="Demo/Screenshot (784).png" alt="image"/>
</p>

<p align="center">
  <p>Allows users to input their details and test invitation code.</p>
  <img src="Demo/Screenshot (785).png" alt="image"/>
</p>

<p align="center">
  <p>Join room by filling details[Proctoring is Started by webcam]</p>
  <img src="Demo/Screenshot (786).png" alt="image"/>
</p>

<p align="center">
  <p>Filled the details</p>
  <img src="Demo/Screenshot (787).png" alt="image"/>
</p>

<p align="center">
  <p>Time limited Room alloted to student named Sarvesh with random question allocated with proctoring On</p>
  <img src="Demo/Screenshot (788).png" alt="image"/>
</p>

<p align="center">
  <p>Admin room, Admin can manage the room, guide, and verify each student's code in real-time.</p>
  <img src="Demo/Screenshot (789).png" alt="image"/>
</p>

<p align="center">
  <p>Tab switch Alert, After 3 alerts student test will end</p>
  <img src="Demo/Screenshot (790).png" alt="image"/>
</p>

<p align="center">
  <p>Admin can download the submitted code as a PDF for review.</p>
  <img src="Demo/Screenshot (791).png" alt="image"/>
</p>

<p align="center">
  <p>Admin dashboard, Displays all user information, allows setting the interval for image capture, and shows images with timestamps.
</p>
  <img src="Demo/Screenshot (792).png" alt="image"/>
</p>

<p align="center">
  <p>Our Extension</p>
  <img src="Demo/Screenshot 2024-06-07 093233.png" alt="image"/>
</p>

<hr>

## API Reference

### Get All Users Data

```http
  GET /retrieve-data
```
- The /retrieve-data endpoint is used to retrieve all user data and images stored on the server. The endpoint accepts a GET request with no query parameters. The endpoint returns an array of all user data and their images stored on the server.


#### Request
```
Method: GET
Endpoint: /retrieve-data
Query Parameters: none
```

#### Response
```
Status Code: 200 OK
Body:
data: an array containing all user data and their images stored on the server
```

#### Example
Retrieving all user data and images:
```
GET /retrieve-data
```
```
Status: 200 OK
{
  "data": [
    {
      "_id": "615e93613a85de4fa0d6a0e2",
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "testInvitation": "12345",
      "id": "1633521057017",
      "images": [
        {
          "url": "https://example.com/image1.jpg",
          "timestamp": 1633521057017
        },
        {
          "url": "https://example.com/image2.jpg",
          "timestamp": 1633521063119
        }
      ],
      "__v": 0
    },
    {
      "_id": "615e93613a85de4fa0d6a0e3",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "janedoe@example.com",
      "testInvitation": "56789",
      "id": "1633521068371",
      "images": [
        {
          "url": "https://example.com/image3.jpg",
          "timestamp": 1633521068371
        }
      ],
      "__v": 0
    }
  ]
}

```

### SET New Interval

```http
  GET /set_interval?interval=value
```

- The /set_interval endpoint is used to set the interval of image capturing in the extension. The endpoint accepts a GET request with the interval query parameter. The value of the interval parameter is in minutes, which is then converted to milliseconds and set as the interval for capturing images.

#### Request
```
Method: GET
Endpoint: /set_interval
Query Parameters:
interval: a number representing the interval in minutes (e.g., interval=5)

```

#### Response
```
Status Code: 200 OK
Body:
success: a boolean value (true) indicating that the interval was set successfully
```

#### Example
Setting the interval to 5 minutes:
```
GET /set_interval?interval=5
```
```
Status: 200 OK
{
  "success": true
}

```


- This route is used to set the interval for sending images to the server during an online assessment.
- The route accepts a single query parameter:

- `interval`: The time interval, in minutes, between image uploads. This parameter is required.

- Provide an example of how to use the route, including the expected response. For example:


```
Example Request:
GET /set_interval?interval=5

Example Response:
{
  success: true
}

```

### POST New User

```http
  POST /createUser
```
- The /createUser endpoint is used to create a new user in the system. This endpoint accepts a JSON object in the POST request body with the following properties:


```
firstName (required): The first name of the user.
lastName (required): The last name of the user.
email (required): The email address of the user.
testInvitation (required): The invitation code for the test the user is taking.

```
- The API endpoint generates a unique id for the user and stores the user's information, along with an empty array of images, in the database

#### Request
```
HTTP Method: POST
Endpoint: /createUser
Request Body: JSON object with the following properties:
firstName (string, required)
lastName (string, required)
email (string, required)
testInvitation (string, required)
```

```
Example Request:
POST /createUser
Content-Type: application/json

{
  "firstName" : "John",
  "lastName" :"Doe",
  "email" : "johndoe@example.com",
  "testInvitation" : "12345"
}
```

#### Response
- HTTP Status Code: 200 if successful, 500 if an error occurred
- Response Body: JSON object with the following properties:
```
userid (string): The unique id assigned to the new user
error (string): If an error occurred while creating the user.
```
- In response you will get unique userid of user

```
HTTP/1.1 200 OK
Content-Type: application/json

{
    "userid": "1646726117427",
}

```



### POST Upload Image of User
```http
  POST /upload-image
```

- The /upload-image route is used to upload an image for a specific user to the cloud. The route accepts a POST request and expects two parameters in the request body: image and userid.

- The image parameter should contain the base64-encoded image data. The userid parameter should contain the user ID for which the image is being uploaded.

- Upon receiving the request, the route generates a timestamp and uses it to create a unique file name for the image. It then uploads the image data to the cloud using the Cloudinary API and saves the image URL in the user's record in the database.

- If there is an error in uploading the image, the route responds with a 500 status code and an error message. If the image is uploaded successfully, the route responds with a 200 status code and a JSON object containing the interval.

####
```
HTTP Method: POST

Endpoint: /upload-image

Headers:

Content-Type: application/json
```
- Body:
```
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAIAAAC0tAIdAAAgAElEQVR4nOzde5zU1d8/8D/rZKlNtSpJhN....", // base64 encoded image data
  "userid": "12345" // User ID to associate the image with
}
```

#### Response:
```
HTTP Status Code: 200 OK
```
- Body:
```
{
  "interval": 60000 // Time interval set for capturing screenshots in milliseconds
}
```
- If an error occurs during the image upload process, the response will have an HTTP status code of 500 and the body will contain an error message, for example:

- HTTP Status Code: 500 Internal Server Error

- Body:

```
{
  "error": "Failed to save image"
}
```
