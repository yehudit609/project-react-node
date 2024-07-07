Goodi-Goodies E-commerce Website
Project Overview
Goodi-Goodies is an e-commerce website for selling cakes, display cakes, petits fours, gluten-free products, and more. The website includes functionalities for user registration and login, product viewing and addition to the cart, sorting products by various parameters, order editing and finalization, and the ability to view previous orders and their statuses. Additionally, there is an option to log in as an administrator to manage products, customers, categories, orders, and order statuses. The project uses tokens to secure information.

Technologies Used
Frontend: React, CSS
Backend: Node.js
Database: MongoDB
Features:
User Features:
Registration and Login: Users can register and log in to the site.
Product Viewing: Users can browse and view various products available on the site.
Add to Cart: Users can add products to their shopping cart.
Product Filtering and Sorting: Users can filter products by category and sort them by price or name.
Order Management: Users can edit and finalize their orders.
Order History: Users can view their previous orders and check their statuses.

Admin Features:
Product Management: Admins can add, update, or delete products.
Customer Management: Admins can manage customer information.
Category Management: Admins can add, update, or delete product categories.
Order Management: Admins can manage orders and update their statuses.

Security:
Token-based Authentication: The application uses tokens to secure user information and ensure safe communication between the client and the server.
Installation
Clone the repository:
git clone https://github.com/yehudit609/goodi-goodies.git
Navigate to the project directory:
cd goodi-goodies
Install the dependencies:
bash
npm install
Running the Application
Set up environment variables: Copy the example environment files and fill in the required values.
cp .env-example .env
Start the backend server:

cd server
npm start
Start the frontend server:

bash
Copy code
cd frontend
npm start
Configuration
Database: Make sure you have MongoDB installed and running. Configure the database connection in the backend configuration files.
Environment Variables: Create a .env file in the root directory of the backend and frontend with the necessary environment variables. An example configuration is provided in .env-example.
.env-example
Create a .env-example file in both the backend and frontend directories to guide users on what environment variables they need to set. Here is an example of what those files might look like:

backend/.env-example:

makefile
Copy code
# Node environment
NODE_ENV=development

# Server port
PORT=7777

# MongoDB connection string
DATABASE_URI=mongodb://localhost:27017/goodi-goodies

# Secret key for token-based authentication
ACCESS_TOKEN_SECRET=your_secret_key
frontend/.env-example:

bash
Copy code
# API URL
REACT_APP_API_URL=http://localhost:7777
Users should copy .env-example to .env and fill in the appropriate values before running the application:

bash
Copy code
cp .env-example .env
Contribution
Feel free to fork this repository and contribute by submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License.

For any questions or issues, please contact [your-email@example.com].
