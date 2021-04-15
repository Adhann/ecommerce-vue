# Fancy - product Rest API Documentation
This is api documentation for Rest API Kanban.
<br><br>

## Endpoint List
## 1. User (Authentication)
---
### Register
> Create new User.
- **URL** : `/users/register`
- **Method** : `POST`
- **Data Params** :
    ```
    name=string
    email=string
    password=string
    ```

    _Request Header_
    ```
    None
    ```
    
    _Request Body_
    ```json
    {
        "name": "admin",
        "email": "<user>@mail.com",
        "password": "<user-password>"
    }
    ```

- **Success Response**

    _Response(201 - Created)_
    ```json
    {
        "id": "<get auto by system>",
        "name": "dhan",
        "email": "<user>@mail.com"
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "Email already registered"
        ]
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

### Login
> Login & get access token for client
- **URL** : `/users/login`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string
    password=string
    ```

    _Request Header_
    ```
    None
    ```
    
    _Request Body_
    ```json
    {
        "email": "<user>@mail.com",
        "password": "<user-password>"
    }
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "access_token" : "<get-token-from-server>"
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "Invalid email or password"
        ]
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

## 2. product
---
### Create product
> Create new product.

- **URL** : `/products`
- **Method** : `POST`
- **Data Params** :
    ```
    name = string,
    description=string
    category=string
    image=string
    price=integer
    stock=integer    
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```json
    {
        "name": "<input product name>",
        "description": "<input product description>",
        "price": "<input product price>",
        "stock": "<input product stock>",
        "category": "<input product category>",
        "image_url": "<input product image>"
    }
    ```

- **Success Response**

    _Response(201 - Created)_
    ```json
    {
        "name": "<new product name>",
        "description": "<new product description>",
        "price": "<new product price>",
        "stock": "<new product stock>",
        "category": "<new product category>",
        "image_url": "<new product image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "The Name field is required",
            "The Description field is required",
            "The Price field is required",
            "The Stock field is required",
            "The Category field is required",
            "The Image Url field is required",
        ]
    }
    ```

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>


### Show All product
> Show All product.

- **URL** : `/products`
- **Method** : `GET`
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "<product id>",
        "name": "<product name>",
        "description": "<product description>",
        "price": "<product price>",
        "stock": "<product stock>",
        "category": "<product category>",
        "imaage_url": "<product image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Show product By Id
> Show one product.

- **URL** : `/products/:id`
- **Method** : `GET`
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "<product id>",
        "name": "<product name>",
        "description": "<product description>",
        "price": "<product price>",
        "stock": "<product stock>",
        "category": "<product category>",
        "imaage_url": "<product image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Error Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Update product
- **URL** : `/products/:id`
- **Method** : `PUT`
- **URL Params** : id=integer
- **Data Params** :
    ```
    name=string
    description=string
    price=integer
    stock=integer
    category=string
    image_url=string
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```json
    {
        "id": "<product id>",
        "name": "<product name>",
        "description": "<product description>",
        "price": "<product price>",
        "stock": "<product stock>",
        "category": "<product category>",
        "imaage_url": "<product image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "<product id>",
        "name": "<product name>",
        "description": "<product description>",
        "price": "<product price>",
        "stock": "<product stock>",
        "category": "<product category>",
        "imaage_url": "<product image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(400 - Bad Request)_
    ```json
    {
        "errors": [
            "The Name field is required",
            "The Description field is required",
            "The Price field is required",
            "The Stock field is required",
            "The Category field is required",
            "The Image Url field is required",
        ]
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Error Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Delete product
- **URL** : `/products/:id`
- **Method** : `DELETE`
- **URL Params** : id=integer
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "<product id>",
        "name": "<product name>",
        "description": "<product description>",
        "price": "<product price>",
        "stock": "<product stock>",
        "category": "<product category>",
        "imaage_url": "<product image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Error Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

## 3. banner
---
### Create banner
> Create new banner.

- **URL** : `/banners`
- **Method** : `POST`
- **Data Params** :
    ```
    title=string
    status=boolean
    image=string 
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```json
    {
        "title": "<input banner title>",
        "status": "<input banner status>",
        "image_url": "<input banner image>"
    }
    ```

- **Success Response**

    _Response(201 - Created)_
    ```json
    {
        "title": "<new banner title>",
        "status": "<new banner status>",
        "image_url": "<new banner image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "The title field is required",
            "The status field is required",
            "The image field is required",
        ]
    }
    ```

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>


### Show All banner
> Show All banner.

- **URL** : `/banners`
- **Method** : `GET`
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "<banner id>",
        "title": "<banner title>",
        "status": "<banner status>",
        "image": "<banner image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Show banner By Id
> Show one banner.

- **URL** : `/banners/:id`
- **Method** : `GET`
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "<banner id>",
        "title": "<banner title>",
        "status": "<banner status>",
        "image": "<banner image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Error Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Update banner
- **URL** : `/banners/:id`
- **Method** : `PUT`
- **URL Params** : id=integer
- **Data Params** :
    ```
    title=string
    status=boolean
    image=string
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```json
    {
        "title": "<update banner title>",
        "status": "<update banner status>",
        "image": "<update banner image>"
    }
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "<banner id>",
        "title": "<banner title>",
        "status": "<banner status>",
        "image": "<banner image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(400 - Bad Request)_
    ```json
    {
        "errors": [
            "The Title field is required",
            "The Status field is required",
            "The Image field is required"
        ]
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Error Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Delete banner
- **URL** : `/banners/:id`
- **Method** : `DELETE`
- **URL Params** : id=integer
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "<banner id>",
        "title": "<banner title>",
        "status": "<banner status>",
        "image": "<banner image url>",
        "updatedAt": "<date>",
        "createdAt": "<date>",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Error Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>



## 3. Cart
---
### Create Cart
> Create new banner.

- **URL** : `/carts`
- **Method** : `POST`
- **Data Params** :
    ```
    product_id=integer
    user_id=integer
    quantity=integer (default 1)
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```json
    {
        "product_id": 3
    }
    ```

- **Success Response**

    _Response(201 - Created)_
    ```json
    {
        "id": 1,
        "user_id": 1,
        "product_id": 3,
        "quantity": 1,
        "updatedAt": "<date>",
        "createdAt": "<date>"
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        
    }
    ```

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>


### Show All Cart By Id
> Show All Cart.

- **URL** : `/carts`
- **Method** : `GET`
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "<cart id>",
        "user_id": "<user id>",
        "product_id": "<product id>",
        "quantity": "<product quantity>",
        "createdAt": "<date>",
        "updatedAt": "<date>",
        "Product": {
            "id": "<product id>",
            "name": "<product name>",
            "description": "<product description>",
            "category": "<product category>",
            "image": "<product image>",
            "price": "<product price>",
            "stock": "<product stock>",
            "createdAt": "<date>",
            "updatedAt": "<date>"
        }
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "You must login first"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Update Quantity
> Show one banner.

- **URL** : `/carts/:id`
- **Method** : `PUT`
- **URL Params** : id=integer
- **Data Params** :
    ```
    roduct_id=integer
    user_id=integer
    quantity=integer
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "message": "Successfully update cart"
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Error Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Delete Cart
- **URL** : `/carts/:id`
- **Method** : `DELETE`
- **URL Params** : id=integer
- **Data Params** :
    ```
    none
    ```
    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```json
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "message": "Successfully delete cart"
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Error Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>