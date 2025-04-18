@echo off
echo Importing data into MongoDB...

set MONGODB_URI=mongodb://localhost:27017/CollegeWebsiteDb

echo Importing Departments...
mongoimport --uri=%MONGODB_URI% --collection=Departments --file=departments.json --jsonArray

echo Importing Faculty...
mongoimport --uri=%MONGODB_URI% --collection=Faculty --file=faculty.json --jsonArray

echo Importing Courses...
mongoimport --uri=%MONGODB_URI% --collection=Courses --file=courses.json --jsonArray

echo Importing Facilities...
mongoimport --uri=%MONGODB_URI% --collection=Facilities --file=facilities.json --jsonArray

echo Importing Students...
mongoimport --uri=%MONGODB_URI% --collection=Students --file=students.json --jsonArray

echo Importing Users...
mongoimport --uri=%MONGODB_URI% --collection=Users --file=users.json --jsonArray

echo Importing Feedback...
mongoimport --uri=%MONGODB_URI% --collection=Feedback --file=feedback.json --jsonArray

echo Importing Documents...
mongoimport --uri=%MONGODB_URI% --collection=Documents --file=documents.json --jsonArray

echo Importing Enrollments...
mongoimport --uri=%MONGODB_URI% --collection=Enrollments --file=enrollments.json --jsonArray

echo Importing Announcements...
mongoimport --uri=%MONGODB_URI% --collection=Announcements --file=announcements.json --jsonArray

echo Import completed successfully!
pause