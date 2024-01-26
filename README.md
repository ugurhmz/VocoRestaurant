# VocoRestaurant

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
