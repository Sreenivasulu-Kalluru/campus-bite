# 🍔 Campus Bite - Smart Canteen Automation System

**Campus Bite** is a modern, full-stack web application designed to streamline food ordering in college canteens. It allows students to order food online, skip the queues, and track their order status in real-time, while providing administrators with a powerful dashboard to manage the menu and orders.

![Campus Bite Preview](https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80)

## 🚀 Features

### 👨‍🎓 For Students

- **Digital Menu**: Browse a visually appealing menu with categories (Breakfast, Lunch, Snacks, Drinks).
- **Search & Filter**: Quickly find items by name or category.
- **Cart System**: Add items to cart and review orders before checkout.
- **Real-time Tracking**: Watch your order status change live (Pending → Accepted → Cooking → Ready).
- **Order History**: View past orders.

### 👨‍🍳 For Admins

- **Live Dashboard**: Kanban-style or list view of all active orders.
- **Order Management**: Update order status (Accept, Cook, Ready, Complete) with a single click.
- **Menu Management**: Add, edit, delete, or toggle availability of menu items.
- **Secure Access**: Role-based authentication to protect admin routes.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: React Context + [SWR](https://swr.vercel.app/) (for real-time data)
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/campus-bite.git
    cd campus-bite
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory:

    ```env
    MONGODB_URI=mongodb://localhost:27017/campus-bite
    NEXTAUTH_SECRET=your_super_secret_key_here
    NEXTAUTH_URL=http://localhost:3000
    ```

4.  **Seed the Database**
    Populate the database with initial menu items and a default admin user:

    ```bash
    npm run seed        # Seeds menu items
    npm run seed:admin  # Seeds admin user
    ```

5.  **Run the Development Server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Default Credentials

**Admin Account:**

- **Email**: `admin@campusbite.com`
- **Password**: `admin123`

## 📂 Project Structure

```
campus-bite/
├── app/                  # Next.js App Router
│   ├── (student)/        # Student-facing routes (Home, Cart, Orders)
│   ├── admin/            # Admin dashboard routes
│   ├── api/              # API routes (Auth, Menu, Orders)
│   ├── login/            # Login page
│   └── register/         # Registration page
├── components/           # Reusable UI components
├── lib/                  # Database connection & utilities
├── models/               # Mongoose models (User, Order, MenuItem)
├── public/               # Static assets
└── types/                # TypeScript definitions
```

## 🔒 Security

- **Role-Based Access Control (RBAC)**: Middleware ensures only admins can access `/admin` routes.
- **Data Validation**: Strict types and checks on API inputs.
- **Secure Headers**: Next.js built-in security headers.

## 📄 License

This project is licensed under the MIT License.
