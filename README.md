<h1 align="center">
  <a align="center" href="http://petsy-cdm.herokuapp.com">
    <img
      align="center"
      src="https://petsy-cdm-seeds.s3-us-west-1.amazonaws.com/petsy_logo.png"
      alt="Petsy Logo"
    />
    <br>
    If it's a dog, cat, or other, it might be on Petsy
  </a>
</h1>

## Overview
Petsy is an etsy clone, meant to help users adopt lovable pets. This is managed through the following steps:
* Sign Up/Sign In: Registering for an account and then being logged in gives you access to the request system
* View our listings of adorable pets: On the index you'll be able to view all the pets we have to offer and make requests for adoption
* Wait for approval: When you make a request the pets current owner has to review your request and give approval

## Technologies
To manage the site we had to use a combination of the MERN Stack (MongoDB, Express, React, Node.js) for site functionality, and AWS (Amazon Web Services) for image storage.

## Features
### Pet Listings
* Option to make listings for pets you wish to adopt out
  * Ability to upload upto 5 images at a time
  ```js
    router.post('/pet-upload', function(req, res){
      multiUpload(req, res, function (err) {
      if (err) {
        return res.status(422).send({
          errors: [{
            title: 'File Upload Error',
            detail: err.message
          }]
        });
      } else{
        let imageArray = req.files,
          fileLocation;

        const imgLocationArray = [];
          for (let i = 0; i < imageArray.length; i++){
            fileLocation = imageArray[i].location;
            imgLocationArray.push(fileLocation) //iterate through the array of files and grab location
          }
      
        return res.json({
          'imageUrl': imgLocationArray //return the array of location urls from S3
        })};
      });
    });
  ```
### Requests
  * Users wishing to adopt a pet must make a request to the owner
    * The request can be cancelled from the Shopping Kennel
  * The Owner can then review a request and approve or deny it
    * when a request is approved all other requests for the same pet are denied
    ```js
      router.patch("/:requestId/approve",
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
          Request.findOneAndUpdate({_id: req.params.requestId , owner: req.user, status: "pending"},
            {status: "approved"},
            {new: true}) //approves specific request
              .then(approvedRequest => {
                Request.find({ pet: approvedRequest.pet, status: "pending" })
                    .then(otherRequests => {
                      let changedRequests = {};
                      changedRequests.approved = {};
                      changedRequests.denied = {};
                      changedRequests.approved[approvedRequest.id] = formatRequest(approvedRequest);
                      let deniedPromises = [];
                      otherRequests.forEach(otherRequest => {
                        otherRequest.status = "denied";
                        deniedPromises.push(otherRequest.save()
                          .then(deniedRequest => {
                            changedRequests.denied[deniedRequest.id] = formatRequest(deniedRequest._doc);
                          }));
                      }); //denies all other requests for the pet
                      Promise.all(deniedPromises)
                        .then(() => {
                          res.json(changedRequests);
                        })
                    })
                      .catch(err => res.status(500).json({
                        test: "test1"
                      }))
              })
                .catch(err => res.status(500).json({
                  request: "Something went wrong"
                }))
        });
    ```
### Comments
  * Users can add a comment to a pet listing 
    * A User's comments can be edited or removed
