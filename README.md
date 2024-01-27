# VocoRestaurant

## API Documents:
# VocoRestaurant API Documentation

## Base URL
- http://localhost:3500/vocov1/api/

## User

#### Register
- **Endpoint:** `/user/register`
- **Method:** `POST`
- **Example Request:**
  ```json
  {
    "username": "uur67",
    "password": "1994ugur",
    "email": "hmzugur.52@gmail.com",
    "age": 30
  }

#### Login
- **Endpoint:** `/user/login`
- **Method:** `POST`
- **Example Request:**
  ```json
  {
   "email":"hmzugur6767", // OR e-email
   "password" :"1994ugur"

  }

## Address

#### Create
- **Endpoint:** `/user/create-address`
- **Method:** `POST`
- **Example Request:**
```json
{
 "city": "Ankara7",
 "district": "Cankaya",
 "street": "Example Street",
 "location": "Example Location",
 "isDefault": true, // isDefault= true -> user current adress
 "coordinates": {
   "type": "Point",
   "coordinates": [40.8597, 40.9334]
   }
}
```

## Restaurant

#### Create
- **Endpoint:** `/restaurant/create`
- **Method:** `POST`
- **Example Request:**
```json
{
 "name": "Kebap7",
 "description": "En 5 kebap dönerleri bulabileceğiniz bir mekan",
 "logo": "doner_logo.png",
 "address": "65b4058ef9c6a4317843dbc6",
 "menus": [
   "65b4057ef9c6a4317843dbb6",
   "65b4057ef9c6a4317843dbb9"
 ],
 "types": ["Fast Food", "Türk Mutfağı"],
 "branches": ["65b4057ef9c6a4317843dbb6", "65b4057ef9c6a4317843dbb9"]
}

```

#### GET 5 nearest Restaurant
- **Endpoint:** `/restaurant/get-restaurant?searchQ=lahmacun`
- **Method:** `GET`

## ORDER

#### Create
- **Endpoint:** `/order/create-order`
- **Method:** `POST`
- **Example Request:**
```json
{
 "restaurantId": "65b4118e233d9b20029405f4",
 "items": [
   { "menu": "65b41643519f2898967ee083", "quantity": 1 },
   { "menu": "65b416a3519f2898967ee08c", "quantity": 2 }
 ],
 "addressIds": ["65b40546f9c6a4317843dbb3","65b40553f9c6a4317843dbb8","65b40599f9c6a4317843dbc9"],
 "comment": "Deliver to the door",
 "rating": 2
}

```

## MENU

#### Create
- **Endpoint:** `/restaurant/create-menu`
- **Method:** `POST`
- **Example Request:**
```json
{
   "name": "Tavuklu Wrap",
   "price": 12.99,
   "description": "Tavuklu wrap içeren nefis bir menü",
   "image": "tavuklu_wrap_image.jpg"
 }
```


## Environment Variables
- `DB_URL`
- `JWT_SECRET_KEY`
- `EMAIL_FROM`
- `EMAIL_PW`
- `FRONTEND_URL` (http://localhost)
- `PAS_SECURITY`
- `PORT`

---

## AddressModel.js:
- `city` | String
- `district` | String
- `street` | String
- `location` | String
- `isDefault` | Boolean
- `coordinates` |
  - `type` | String
  - `coordinates` | Array of Numbers

*Hiçbir alan zorunlu (required) olarak tanımlanmamıştır.*

---

## MenuModel.js:
- `name` | String | required
- `price` | Number | required
- `description` | String
- `image` | String

---

## OrderModel.js:
- `user` | ObjectId (ref: User) | required
- `restaurant` | ObjectId (ref: Restaurant) | required
- `items` | Array of
  - `menu` | ObjectId (ref: Menu) | required
  - `quantity` | Number | required
- `addresses` | Array of AddressModel
- `comment` | String
- `rating` | Number (min: 1, max: 5)
- `orderDate` | Date

---

## RestaurantModel.js:
- `name` | String | required
- `description` | String | required
- `logo` | String (default: "restaurant_default.png")
- `address` | ObjectId (ref: Address) | required
- `menus` | Array of ObjectId (ref: Menu)
- `types` | Array of String
- `branches` | Array of ObjectId (ref: Address)

---

## ReviewModel.js:
- `userId` | ObjectId (ref: User) | required
- `restaurantId` | ObjectId (ref: Restaurant) | required
- `rating` | Number | required
- `comment` | String
- `date` | Date

---

## UserModel.js:
- `username` | String | required | minlength: 3 | maxlength: 75 | unique
- `password` | String | required | minlength: 6
- `email` | String | required | unique
- `age` | Number | required | min: 18
- `gender` | String (enum: ["Male", "Female", "Other"])
- `profile_img` | String
- `addresses` | Array of AddressModel
- `orders` | Array of OrderModel
- `reviews` | Array of ReviewModel
- `activationToken` | String
- `isVerified` | Boolean (default: false)
- `resetPasswordToken` | String
- `resetPasswordExpiry` | Date
