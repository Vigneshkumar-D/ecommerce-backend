

---

# E-Commerce Backend

This repository contains the backend implementation for an e-commerce platform. It provides endpoints for handling user management, product listings, shopping cart functionality, order management, and payment processing. The backend is built using Node.js and integrates with Stripe for payment processing.

## Table of Contents

1. [Setup](#setup)
2. [API Endpoints](#api-endpoints)
3. [Payment Integration](#payment-integration)
4. [Default Users](#default-users)
5. [Directory Structure](#directory-structure)
6. [Environment Configuration](#environment-configuration)
7. [Error Handling](#error-handling)

## Setup

### Prerequisites

- Node.js v20.13.1
- PostgreSQL, SQLite or another database
- Stripe account for payment processing

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   STRIPE_SECRET_KEY=your-stripe-secret-key
   SUPABASE_URL=your-supabase-key
   SUPABASE_ANON_KEY=your-supabase-anon-key
   JWT_SECRET_KEY=your-jwt-secret-key
   JWT_EXPIRATION=your-jwt-expiration
   DB_DIALECT=your-db-dialect
   DB_STORAGE=your-db-storage
   ```

4. Set up your database and configure the database connection in `config/config.js`.

5. Run database migrations (if applicable):

   ```bash
   npm run migrate
   ```

6. Start the application:

   ```bash
   npm start
   ```

## API Endpoints

### Orders

- **Create Order**: `POST /api/orders`
- **Get Order**: `GET /api/orders/:orderId`
- **Update Order**: `PUT /api/orders/:orderId`
- **Delete Order**: `DELETE /api/orders/:orderId`

### Products

- **List Products**: `GET /api/products`
- **Get Product**: `GET /api/products/:productId` (admin only)
- **Create Product**: `POST /api/products` (admin only)
- **Update Product**: `PUT /api/products/:productId` (admin only)
- **Delete Product**: `DELETE /api/products/:productId` (admin only)

### Users

- **Register User**: `POST /api/users/register`
- **Login User**: `POST /api/users/login`
- **Get User Profile**: `GET /api/users/:userId`
- **Update User Profile**: `PUT /api/users/:userId`

## Payment

- **Process Payment**: `POST /api/payments/process`

## Payment Integration

The payment processing is handled using Stripe. Ensure you have set up the following:

1. **Stripe API Key**: Set in the `.env` file as `STRIPE_SECRET_KEY`.

2. **Payment Processing**: The `processStripePayment` function in `services/paymentService.js` creates and confirms a PaymentIntent. The payment method ID is obtained using Stripe Elements on the client side.

3. **Supabase Url**: Set in the `.env` file as `SUPABASE_URL`.
4. **Supabase Secret Key**: Set in the `.env` file as `STRIPE_SECRET_KEY`.
5. **JWT Secret Key**: Set in the `.env` file as `JWT_SECRET_KEY`.
6. **DB Dialect**: Set in the `.env` file as `DB_DIALECT`.
7. **DB Storage**: Set in the `.env` file as `DB_STORAGE`.
### Example Request Payload

```json
{
  "orderId": 1,
  "paymentMethodId": "pm_1Hh5WJ2eZvKYlo2CcNFeZoXp",
  "amount": 200
}
```

## Default Users

For testing and development, the following default users are created:

- **Admin**: 
  - **Username**: `admin`
  - **Password**: `admin@123`
  
- **User**:
  - **Username**: `user`
  - **Password**: `user@123`

## Directory Structure

- **controllers/**: Contains route handlers for different endpoints.
- **middlewares/**: Contains middleware functions for request validation and authentication.
- **models/**: Defines database models using Sequelize.
- **routes/**: Contains route definitions and endpoint mappings.
- **config/**: Contains configuration files, including database configuration.
- **utils/**: Contains utility functions and helpers.
- **services/**: Contains business logic and service layer functions (e.g., payment processing).

## Environment Configuration

Make sure to configure your environment variables in the `.env` file. Key variables include:

- `STRIPE_SECRET_KEY`: Your Stripe secret key for payment processing.
- Database connection details as required.

## Error Handling

Errors are handled using HTTP status codes and descriptive error messages. Common errors include:

- **404 Not Found**: Resource not found.
- **400 Bad Request**: Invalid request payload or parameters.
- **500 Internal Server Error**: Server-side errors or exceptions.

---

Feel free to customize further based on any additional details or specific instructions you want to include!
