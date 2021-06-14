# [Audio Shrub](https://audio-shrub.herokuapp.com/)
![](https://i.gyazo.com/a10aa8a130f82883e8db47de080f6221.png)

## Summary
Audio Shrub is a bandcamp clone where users can upload music and merch and browse for new music. Uploaded music and merch are stored on AWS. Uploaded content is stored following a RESTful api convention for organizational purposes. 

![](https://media.giphy.com/media/WuP1Unsm92g3QFfJmV/giphy.gif)

## Technologies
Audio Shrub uses Flask and React-Redux for its front and back end.

* Flask SQLAlchemy
* React-Redux
* boto3
* Faker
* PyJWT
* AWS

## Uploading Files
```

    if musicForm.validate_on_submit:
        print('inside post validation')
        music_post = Music_Post(
            user_id=form["user_id"],
            title=form["title"],
            description=form["description"],
            price=form["price"]
        )
        db.session.add(music_post)
        db.session.flush()
        
        
        # Upload image
        try:
            form_image = request.files['image']
            image_upload_success = user_upload(form_image, f"images/music/{music_post.id}")
            if image_upload_success:
                music_post.image = f'https://audio-shrub.s3.amazonaws.com/images/music/{music_post.id}'
            else:
                return {"errors":["image failed to upload"]}
        except Exception as e:
            return {"errors":['image failed to upload']}


```
When uploading files, it was necessary to create the post instance before uploading the file to generate the post's id that can then be used to link the file to the post it belongs to. On failure to submit, the post instance is dropped and nothing gets saved to AWS or the database.
## To Do:
* Search && Filter
* UPDATE/DELETE on merch posts
* auto updating carousel for the splash page


