// netlify/functions/authenticate.js
exports.handler = async (event) => {
  const { password } = JSON.parse(event.body);
  // const correctPassword = process.env.PASSWORD;
  const correctPassword = "aziz";
  console.log("password is " + correctPassword);

  if (password === correctPassword) {
    return {
      statusCode: 200,
      body: JSON.stringify({ authenticated: true }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid password" }),
    };
  }
};

// netlify/functions/get-content.js
exports.handler = async (event) => {
  const authHeader = event.headers.authorization;
  const correctPassword = process.env.PASSWORD;

  if (authHeader === `Bearer ${correctPassword}`) {
    const protectedContent = `
      <h1>Protected Content</h1>
      <p>This is your protected static content. Reema is awesome!</p>
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ content: protectedContent }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }
};
