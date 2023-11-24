# Fullstack Authentication Boilerplate

![GitHub Repo Stars](https://img.shields.io/github/stars/drejcreative/Next.js-Express.js-MongoDB-Authentication-Boilerplate-code-2023-24?style=social)
![GitHub Repo Forks](https://img.shields.io/github/forks/drejcreative/Next.js-Express.js-MongoDB-Authentication-Boilerplate-code-2023-24?style=social)
![GitHub License](https://img.shields.io/github/license/drejcreative/Next.js-Express.js-MongoDB-Authentication-Boilerplate-code-2023-24)

![alt text](app.gif "Title")

Welcome to the Fullstack Authentication Boilerplate repository! This boilerplate provides a robust foundation for building secure, full-stack web applications with authentication features. It combines the power of Express.js and MongoDB on the backend with Next.js on the frontend, all written in TypeScript. Additionally, it includes Jest for testing, SendGrid for sending emails, Framer Motion for animations, and Formik for form handling, Playwright for E2E tests.

## Features

- **Authentication**: Implement a complete user authentication system with registration, login, password reset, and account activation.
- **Express.js Backend**: Utilize Express.js to create a scalable and RESTful API.
- **MongoDB Database**: Store user data securely in a MongoDB database.
- **JWT Authentication**: Secure your API endpoints with JSON Web Tokens (JWT).
- **Email Verification**: Send verification emails to users during registration.
- **Password Reset**: Enable users to reset their passwords through email.
- **Testing**: Use Jest for unit and integration testing to ensure code reliability.
- **Frontend with Next.js**: Develop a modern and responsive user interface with Next.js.
- **Framer Motion**: Add smooth animations and transitions to enhance the user experience.
- **Formik**: Simplify form handling and validation on the frontend.
- **TypeScript**: Ensure type safety throughout the application for improved development productivity.
- **Playwright**: E2E coveradge

## Getting Started

To get started with this boilerplate, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone git@github.com:drejcreative/Next.js-Express.js-MongoDB-Authentication-Boilerplate-code-2023-24.git
```

2. Install backend dependencies and create an `.env` file (example provided):

```bash
cd auth-boilerplate/api
npm install
cp .env.example .env
```

3. Start the backend server:

```bash
npm run dev
```

4. Install frontend dependencies:

```bash
cd ../app
npm install
```

5. Start the frontend development server:

```bash
npm run dev
```

Now you have a fully functional authentication boilerplate running locally. You can start building your application on top of this foundation.

## Testing

This boilerplate includes a comprehensive testing setup using Jest. To run the tests, use the following command:

```bash
cd api
npm run test
```

```bash
cd app
npm run test |or| npm run test:ui
```

## Contributing

Contributions to this project are welcome! Whether you want to fix a bug, add a feature, or improve documentation, please feel free to open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This boilerplate was inspired by the need for a reliable and secure foundation for authentication in web applications.
- Many thanks to the open-source community for providing tools and libraries that make projects like this possible.

If you have any questions or run into any issues, please don't hesitate to reach out. Happy coding!
