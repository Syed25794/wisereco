const cloudinary = require('cloudinary').v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// let newImage = image ; 
        // console.log(newImage,"image");
        // if( image ){
        //     const imageResponse = await cloudinary.uploader.upload(image,{
        //         upload_preset:"wiser_eco"
        //     });
        //     if( imageResponse ){
        //         newImage=imageResponse
        //     }
        // }
        // console.log(newImage,"image after");


//   //If image uploaded again
    //   if( image[0] === 'd'){
    //     if( image ){
    //         const imageResponse = await cloudinary.uploader.upload(image,{
    //             upload_preset:"wiser_eco"
    //         });
    //         if( imageResponse ){
    //             newImage=imageResponse
    //         }
    //     }
    //   }else{
    //     newImage = image ;
    //   }

module.exports = cloudinary ;