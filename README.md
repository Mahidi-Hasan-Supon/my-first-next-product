My First Next Product

A modern product showcase application built with Next.js 14, using dynamic routing, API integration, responsive UI, and clean folder structure.

🚀 Features

⚡ Next.js App Router based architecture

🎨 Tailwind CSS for responsive UI

🔗 Dynamic Product Routing (/products/[productId])

🌐 External API Fetching (Node/Express backend)

🖼️ Next/Image optimized images

🔁 Reusable Components

🧩 Clean & Organized Code Structure

🔥 Fast performance + SEO friendly

🛠️ Technologies Used
Frontend

Next.js 14 (App Router)

React

Tailwind CSS

Next/Image

Next/Link

Backend (Proxy Server)

Node.js + Express

CORS

dotenv

nodemon (development)

Custom routes such as:

GET /latest-products

GET /products/:id

📁 Folder Structure
my-first-next-product/
│── app/
│   ├── layout.js
│   ├── globals.css
│   ├── page.js
│   └── products/
│        └── [productId]/
│              └── page.js
│
│── components/
│── public/
│── package.json
│── README.md

⚙️ Environment Variables

ফ্রন্টএন্ড .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000


ব্যাকএন্ড .env:

PORT=5000

▶️ Getting Started
Clone the repository
git clone https://github.com/Mahidi-Hasan-Supon/my-first-next-product.git
cd my-first-next-product

Install packages
npm install

Run development server
npm run dev


Server will start at:

http://localhost:3000

🖥️ API Setup (Backend Server)

If using your own Node/Express server:

git clone https://github.com/Mahidi-Hasan-Supon/my-product-next-server.git
cd my-product-next-server
npm install
npm start


Backend runs at:

http://localhost:5000

📚 Pages Explained
Home Page

Shows latest products

Featured product section

API fetched content

Product Details Page

URL:

/products/[productId]


Features:

Dynamic routing

Product info based on ID

🧪 Future Improvements

🔐 Add authentication (login/register)

🛒 Add cart system

📦 Add admin dashboard

⭐ Add product rating/review system