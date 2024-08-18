# Litwave

Litwave is an online platform where users can explore, purchase, and manage books. The store features both user and admin functionalities, providing a seamless experience for browsing and purchasing books.

## Features

### User Functionality

- **Sign Up & Login:**
  - Users can create an account by signing up with their details.
  - After signing up, users can log in to access their account.

- **Browse Books:**
  - Users can view recently added books.
  - The entire book collection is also available for browsing.

- **Cart & Favorites:**
  - Users can add books to their cart and favorites list for easy access.
  
- **Place Orders:**
  - In the cart section, users can place an order by clicking the "Place Order" button.

- **User Profile:**
  - Users can view their profile, which includes:
    - **Favorites:** List of books marked as favorites.
    - **Order History:** A record of all past orders.
    - **Logout Button:** Users can log out of their account.

### Admin Functionality

- **Manage Books:**
  - Admins have the ability to add, edit, and delete books from the collection.

- **Confirm Orders:**
  - Admins can view and confirm orders placed by users.

## Security

- **Password Encryption:**
  - User passwords are securely hashed using **bcrypt**.

- **Session Management:**
  - **JWT (JSON Web Token)** is used for secure session management.

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** Vite React, TailwindCSS
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **Deployment:** Vercel

